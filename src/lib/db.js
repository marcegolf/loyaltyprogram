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
        const query = { _id: new ObjectId(id) };
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

async function getCustomers() {
    let customers = [];
    try {
        const collection = db.collection("users");
        const query = { role: "customer" };
        customers = await collection.find(query).toArray();
        customers.forEach(customers => {
            customers._id = customers._id.toString();
        });
    } catch (error) {
        console.log(error.message);
    }
    return customers
}

async function getCustomer(id) {
    let customer = null;
    try {
        const collection = db.collection("users");
        const query = { _id: new ObjectId(id) };
        customer = await collection.findOne(query);
        if (!customer) {
            console.log("No customer with id " + id);
        } else {
            customer._id = customer._id.toString();
        }
    } catch (error) {
        console.log(error.message);
    }
    return customer;
}

async function getCustomerCart(id) {
    let customer = null;
    let customerCart = null;
    try {
        customer = await getCustomer(id);
        customerCart = customer.cart;
    } catch (error) {
        console.log(error.message);
    }
    return customerCart;
}

async function updateCustomer(customer) {
    try {
        const collection = db.collection("users");
        const query = { _id: new ObjectId(customer.id) };
        const result = await collection.updateOne(query, { $set: customer });

        if (result.matchedCount === 0) {
            console.log("No customer with id " + customer.id);
            // TODO: errorhandling
        } else {
            console.log("Customer with id " + customer.id + " has been updated.");
            return customer.id;
        }
    } catch (error) {
        // TODO: errorhandling
        console.log(error.message);
    }
    return null;
}

async function createSale(sale) {
    try {
        const collection = db.collection("sales");
        const result = await collection.insertOne(sale);
        return result.insertedId.toString;
    } catch (error) {
        console.log(error.message);
    }
    return null;
}

export default {
    getProducts,
    getProduct,
    createProduct,
    getCustomers,
    getCustomer,
    getCustomerCart,
    updateCustomer,
    createSale
}