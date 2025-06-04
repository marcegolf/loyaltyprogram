import db from "$lib/db";

export async function load({ locals }) {
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