import { redirect } from "@sveltejs/kit";
import db from "$lib/db";

export async function load({ locals }) {
    // Check if user is authenticated
    if (!locals.user) {
        throw redirect(302, '/signin');
    }

    return {
        products: await db.getProducts(),
        user: locals.user
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