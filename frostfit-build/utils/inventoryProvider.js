import inventory from './inventory'

/*
Inventory items should adhere to the following schema:
type Product {
  id: ID!
  categories: [String]!
  price: Float!
  name: String!
  image: String!
  description: String!
  currentInventory: Int!
  brand: String
  sku: ID
}
*/

async function fetchInventory() {
  // const inventory = API.get(apiUrl)
  return Promise.resolve(inventory)
}

async function fetchInventoryInCategory(cat) {
  // const inventory = API.get(apiUrl)
  return Promise.resolve(inventory.filter(product => product.categories.includes(cat)))
}

export {
  fetchInventory, fetchInventoryInCategory , inventory as staticInventory
}