import db from "$lib/db";

export async function load({ params }) {
    return {
        // Get product by id
        product: await db.getProduct(params.id)
    }
}