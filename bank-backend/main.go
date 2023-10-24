package main

import (
    "context"
    "encoding/json"
    "fmt"
    "log"
    "net/http"
    "sync"
    "github.com/gorilla/mux"
    "go.mongodb.org/mongo-driver/bson"
    "go.mongodb.org/mongo-driver/mongo"
    "go.mongodb.org/mongo-driver/mongo/options"
    "io/ioutil"
    "github.com/gorilla/handlers"

)

type Account struct {
    ID           string  `json:"id"`
    AccountNumber string `json:"accountNumber"`
    Balance      float64 `json:"balance"`
}

var (
    mu         sync.Mutex
    collection *mongo.Collection
)

func getPassword() string {
    password, err := ioutil.ReadFile("mongodb_password.txt")
    if err != nil {
        log.Fatalf("Failed to read MongoDB password: %v", err)
    }
    return string(password)
}

func main() {
    router := mux.NewRouter()
    corsHandler := handlers.CORS(
        handlers.AllowedHeaders([]string{"Content-Type"}),
        handlers.AllowedMethods([]string{"GET", "POST", "PUT", "DELETE"}),
        handlers.AllowedOrigins([]string{"http://localhost:3000"}),  // Replace with the origin of your React app
    )
    http.Handle("/", corsHandler(router))

    password := getPassword()

    clientOptions := options.Client().ApplyURI(
        "mongodb+srv://alfettox:" + password + "@cluster0.ph7vire.mongodb.net/?retryWrites=true&w=majority",
    )

    client, err := mongo.NewClient(clientOptions)
    if err != nil {
        log.Fatal(err)
    }

    ctx := context.TODO()
    err = client.Connect(ctx)
    if err != nil {
        log.Fatal(err)
    }

    collection = client.Database("bank-db").Collection("bank-container-db")

    router.HandleFunc("/", Home).Methods("GET")
    router.HandleFunc("/accounts", GetAccounts).Methods("GET")
    router.HandleFunc("/accounts", CreateAccount).Methods("POST")
    router.HandleFunc("/operations", HandleOperations).Methods("POST")

    fmt.Println("Server is running on :8080")
    http.ListenAndServe(":8080", router)
}

func Home(w http.ResponseWriter, r *http.Request) {
    // Handle the root path request
    fmt.Fprint(w, "Welcome to the bank service!")
}

func GetAccounts(w http.ResponseWriter, r *http.Request) {
    w.Header().Set("Content-Type", "application/json")
    mu.Lock()
    defer mu.Unlock()

    cur, err := collection.Find(context.TODO(), bson.D{})
    if err != nil {
        log.Println("Error while querying the database:", err)
        w.WriteHeader(http.StatusInternalServerError)
        return
    }

    defer cur.Close(context.TODO())

    var accounts []Account
    for cur.Next(context.TODO()) {
        var account Account
        if err := cur.Decode(&account); err != nil {
            log.Println("Error decoding account:", err)
            w.WriteHeader(http.StatusInternalServerError)
            return
        }
        accounts = append(accounts, account)

        // Log the retrieved account
        log.Printf("Retrieved account: %v", account)
    }

    if err := cur.Err(); err != nil {
        log.Println("Error while iterating through results:", err)
        w.WriteHeader(http.StatusInternalServerError)
        return
    }

    json.NewEncoder(w).Encode(accounts)
}

func CreateAccount(w http.ResponseWriter, r *http.Request) {
    var account Account
    _ = json.NewDecoder(r.Body).Decode(&account)

    _, err := collection.InsertOne(context.TODO(), account)
    if err != nil {
        log.Println(err)
        w.WriteHeader(http.StatusInternalServerError)
        return
    }

    log.Printf("Received POST request to create account: %v", account)

    w.Header().Set("Content-Type", "application/json")
    json.NewEncoder(w).Encode(account)
}

type OperationRequest struct {
    AccountNumber string  `json:"accountNumber"`
    Operation     string  `json:"operation"`
    Amount        float64 `json:"amount"`
}

type OperationResponse struct {
    Approved   bool    `json:"approved"`
    NewBalance float64 `json:"newBalance"`
}

func HandleOperations(w http.ResponseWriter, r *http.Request) {
    var opRequest OperationRequest
    if err := json.NewDecoder(r.Body).Decode(&opRequest); err != nil {
        http.Error(w, err.Error(), http.StatusBadRequest)
        return
    }

    // Retrieve the account from the database based on the provided AccountNumber
    filter := bson.M{"accountNumber": opRequest.AccountNumber}
    var foundAccount Account
    if err := collection.FindOne(context.TODO(), filter).Decode(&foundAccount); err != nil {
        http.Error(w, "Account not found", http.StatusNotFound)
        return
    }

    opResponse := OperationResponse{
        Approved:   false,
        NewBalance: foundAccount.Balance,
    }

    if opRequest.Operation == "deposit" {
        if opRequest.Amount > 0 {
            foundAccount.Balance += opRequest.Amount
            opResponse.Approved = true
            opResponse.NewBalance = foundAccount.Balance
        }
    } else if opRequest.Operation == "withdraw" {
        if opRequest.Amount > 0 && foundAccount.Balance >= opRequest.Amount {
            foundAccount.Balance -= opRequest.Amount
            opResponse.Approved = true
            opResponse.NewBalance = foundAccount.Balance
        }
    }

    // Update the account's balance in the database
    update := bson.M{"$set": bson.M{"balance": foundAccount.Balance}}
    if _, err := collection.UpdateOne(context.TODO(), filter, update); err != nil {
        http.Error(w, err.Error(), http.StatusInternalServerError)
        return
    }

    w.Header().Set("Content-Type", "application/json")
    json.NewEncoder(w).Encode(opResponse)
}

