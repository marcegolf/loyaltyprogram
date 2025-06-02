import db from "$lib/db";

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
            poster: "/images/placeholder.png"
        }

        await db.createProduct(product);
        return { success: true }
    }
}