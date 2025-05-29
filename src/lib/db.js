import { MongoClient, ObjectId } from "mongodb";
import { DB_URI } from "$env/static/private";

const client = new MongoClient(DB_URI);
await client.connect();
const db = client.db("loyaltyprogram");

async function getProducts() {
    let products = [];
    try {
        const collection = db.collection("products");
        const query = {};
        products = await collection.find(query).toArray();
        products.forEach(products => {
            products._id = products._id.toString();
        });
    } catch (error) {
        console.log(error.message);
    }
    return products
}

async function getProduct(id) {
    let product = null;
    try {
        const collection = db.collection("products");
        const query = { _id: new ObjectId(id) }; // filter by id
        product = await collection.findOne(query);
        if (!product) {
            console.log("No product with id " + id);
        } else {
            product._id = product._id.toString();
        }
    } catch (error) {
        console.log(error.message);
    }
    return product;
}

async function createProduct(product) {
    try {
        const collection = db.collection("products");
        const result = await collection.insertOne(product);
        return result.insertedId.toString;
    } catch (error) {
        console.log(error.message);
    }
    return null;
}

export default {
    getProducts,
    getProduct,
    createProduct
}