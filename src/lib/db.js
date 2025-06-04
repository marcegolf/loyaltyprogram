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
        // Sort price lowest to highest
        products.sort((a, b) => a.price - b.price);
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

async function deleteProduct(id) {
    try {
        const collection = db.collection("products");
        const query = { _id: new ObjectId(id) };
        const result = await collection.deleteOne(query);

        if (result.deletedCount === 0) {
            console.log("No product with id " + id);
        } else {
            console.log("Product with id " + id + " has been successfully deleted.");
            return id;
        }
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

        // Duplicate the customer object to avoid mutating the original
        const updatedCustomer = { ...customer };
        // Remove stringified id before updating
        delete updatedCustomer.id;
        const result = await collection.updateOne(query, { $set: updatedCustomer });

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

async function getRewards() {
    let rewards = [];
    try {
        const collection = db.collection("rewards");
        const query = {};
        rewards = await collection.find(query).toArray();
        rewards.forEach(reward => {
            reward._id = reward._id.toString();
        });
        // Sort from lowest to highest point reward
        rewards.sort((a, b) => a.points - b.points);
    } catch (error) {
        console.log(error.message);
    }
    return rewards;
}

async function getCustomerRewardPoints(customer_id) {
    let rewardPoints = 0;
    try {
        const pipeline = [
            {
                $match: {
                    user_id: customer_id
                }
            },
            {
                $group: {
                    _id: customer_id,
                    totalRewardPoints: {
                        $sum: "$totalPrice"
                    }
                }
            }
        ];

        const collection = db.collection("sales");
        const result = await collection.aggregate(pipeline).toArray();
        // TODO: This is not optimal and should have an error handling
        if (result.length > 0) {
            rewardPoints = result[0].totalRewardPoints || 0;
        }
    } catch (error) {
        console.log(error.message);
    }
    return rewardPoints;
}

async function getLevels() {
    let levels = [];
    try {
        const collection = db.collection("levels");
        const query = {};
        levels = await collection.find(query).toArray();
        levels.forEach(level => {
            level._id = level._id.toString();
        });
        // Sort from lowest to highest
        levels.sort((a, b) => a.points_needed - b.points_needed);
    } catch (error) {
        console.log(error.message);
    }
    return levels;
}

export default {
    getProducts,
    getProduct,
    createProduct,
    deleteProduct,
    getCustomers,
    getCustomer,
    getCustomerCart,
    updateCustomer,
    createSale,
    getRewards,
    getCustomerRewardPoints,
    getLevels
}