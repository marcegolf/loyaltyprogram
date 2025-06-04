import { redirect } from "@sveltejs/kit";
import db from "$lib/db";

export async function load({ locals }) {
    // Check if user is authenticated
    if (!locals.user) {
        throw redirect(302, '/signin');
    }
    return {
        user: locals.user
    }
}

export const actions = {
    updateProfile: async ({ request, locals }) => {
        const data = await request.formData();

        const user = locals.user;
        user.name = data.get("name");
        user.email = data.get("email");

        await db.updateCustomer(user);

        return { success: true };
    }
}