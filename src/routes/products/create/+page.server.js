import { redirect } from "@sveltejs/kit";
import db from "$lib/db";

export async function load({ locals }) {
    // Check if user is authenticated
    if (!locals.user) {
        throw redirect(302, '/signin');
    }
}

export const actions = {
    create: async ({ request }) => {
        const data = await request.formData();

        // parse string of ingredients into an array
        const ingredientsString = data.get("ingredients") ?? "";
        const ingredients = ingredientsString
            .split(",")
            .map((s) => s.trim())

        let product = {
            name: data.get("name"),
            price: data.get("price"),
            ingredients: ingredients,
            poster: "/images/placeholder.jpg"
        }

        await db.createProduct(product);
        return { success: true }
    }
}