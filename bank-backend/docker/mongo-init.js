db = new Mongo().getDB("bank-db");
use bank-db

db.createUser({
  user: "admin",
  pwd: "admin",
  roles: [{ role: "readWrite", db: "bank-db" }]
});

const names = [
  "Jean Dupont", "Marie Lefebvre", "Pierre Tremblay",
  "Isabelle Martin", "Michel Gagnon", "Sophie Roy",
  "Jacques Girard", "Élise Bouchard", "Luc Dubois",
  "Sylvie Caron", "Robert Beaulieu", "Nathalie Poirier",
  "Yves Lemieux", "Brigitte Leblanc", "André Dion",
  "John Smith", "Sarah Johnson", "David Williams",
  "Linda Brown", "Michael Jones", "Emily Davis",
  "Robert Taylor", "Jennifer Miller", "William Wilson",
  "Karen Anderson", "Richard Martinez", "Laura Gonzalez",
  "Marco Rossi", "Alessia Bianchi", "Francesco Russo",
  "Sofia Ferrari", "Matteo Esposito", "Giulia Romano",
  "Luca Ricci", "Chiara Moretti", "Lorenzo Rizzo",
  "Alessandra Barbieri", "Giovanni Greco", "Maria Conti"
];

const addresses = [
  "1234 Elm Street", "5678 Oak Avenue", "9101 Maple Lane",
  "2468 Birch Road", "1357 Pine Drive", "8642 Cedar Boulevard",
  "3579 Willow Way", "6820 Spruce Court", "1925 Sycamore Place",
  "4356 Redwood Lane", "7890 Poplar Street", "3267 Sequoia Drive",
  "5731 Cherry Circle", "9512 Magnolia Avenue", "2143 Dogwood Road",
  "8109 Locust Lane", "6074 Chestnut Court", "1235 Acacia Street",
  "8976 Cypress Avenue", "4321 Linden Road", "6543 Hemlock Drive",
  "3789 Ash Way", "1098 Walnut Place", "7654 Alder Court",
  "5312 Birchwood Lane", "2468 Willowcrest Drive", "9137 Pinegrove Avenue",
  "4826 Redfern Road", "1654 Elmwood Lane", "7298 Maplewood Court",
  "3579 Juniper Circle", "6820 Mulberry Lane", "1925 Hickory Street",
  "4356 Tamarack Avenue", "7890 Pineview Road", "3267 Cedarhurst Drive",
  "5731 Birchhill Lane", "9512 Chestnutridge Court", "2143 Evergreen Street",
  "8109 Oakhill Avenue", "6074 Maplewood Drive", "1235 Ashgrove Place",
  "8976 Magnolia Hill Road", "4321 Cedarwood Lane", "6543 Pinegrove Avenue",
  "3789 Cedarcrest Drive", "1098 Elmwood Circle", "7654 Sycamore Place",
];

const postalCodes = [
  "H2J 1A1", "H3K 2B2", "H4M 3C3", "H2S 4D4", "H3T 5E5",
  "H4R 6F6", "H2U 7G7", "H3V 8H8", "H4W 9I9", "H2X 0J0",
  "H3Y 1K1", "H4Z 2L2", "H2A 3M3", "H3B 4N4", "H4C 5O5",
  "H2D 6P6", "H3E 7Q7", "H4F 8R8", "H2G 9S9", "H3H 0T0",
  "H4I 1U1", "H2J 2V2", "H3K 3W3", "H4L 4X4", "H2M 5Y5",
  "H3N 6Z6", "H4O 7A7", "H2P 8B8", "H3Q 9C9", "H4R 0D0",
  "H2S 1E1", "H3T 2F2", "H4U 3G3", "H2V 4H4", "H3W 5I5",
  "H4X 6J6", "H2Y 7K7", "H3Z 8L8", "H4A 9M9", "H2B 0N0",
  "H3C 1O1", "H4D 2P2", "H2E 3Q3", "H3F 4R4", "H2G 5S5",
  "H3H 6T6", "H2I 7U7", "H3J 8V8", "H2K 9W9", "H3L 0X0",
  "H2M 1Y1", "H3N 2Z2", "H2O 3A3", "H3P 4B4", "H2Q 5C5",
  "H3R 6D6", "H2S 7E7", "H3T 8F8", "H2U 9G9", "H3V 0H0",
  "H2W 1I1", "H3X 2J2", "H2Y 3K3", "H3Z 4L4", "H2A 5M5",
];

function generateRandomBalance() {
  return parseFloat((1000 + Math.random() * 9000).toFixed(2));
}

for (let i = 0; i < 60; i++) {
  const account = {
    id: (i + 1).toString(),
    accountNumber: generateAccountNumber(),
    balance: generateRandomBalance(),
    owner: names[i],
    address: addresses[i],
    postalCode: postalCodes[i]
  };
  db.accounts.insert(account);
}

function generateAccountNumber() {
  const randomNumber = Math.floor(100000 + Math.random() * 900000);
  return "CD" + randomNumber.toString();
}

function generateRandomBalance() {
  return parseFloat((1000 + Math.random() * 9000).toFixed(2));
}
