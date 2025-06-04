import { redirect } from "@sveltejs/kit";
import db from "$lib/db";

export async function load({ params, locals }) {
    // Check if user is authenticated
    if (!locals.user) {
        throw redirect(302, '/signin');
    }

    return {
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