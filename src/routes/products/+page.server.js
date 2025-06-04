// src/routes/products/+page.server.js
import db from "$lib/db";

// TODO: what is load and locals
// export async function load({ locals }) {
export async function load() {
    // you can also expose the user to the page if you want
    return {
        products: await db.getProducts(),
        // user: locals.user
    };
}

export const actions = {
    addToCart: async ({ request, locals }) => {
        // TODO: Check if user has role customer
        // TODO: Check if chan be done with locals.user
        const user = locals.user;
        const data = await request.formData();
        const product = JSON.parse(data.get("product"));

        user.cart = user.cart || [];
        user.cart.push(product);

        await db.updateCustomer(user);

        return { success: true };
    }
};