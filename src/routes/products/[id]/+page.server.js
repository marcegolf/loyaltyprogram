import db from "$lib/db";
import { redirect } from "@sveltejs/kit";

export async function load({ params, locals }) {
    return {
        // Get product by id
        product: await db.getProduct(params.id),
        user: locals.user
    }
}

export const actions = {
    delete: async ({ request }) => {
        const data = await request.formData()

        await db.deleteProduct(data.get("id"))
        redirect(303, "/products")
    }
};