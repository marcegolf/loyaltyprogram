import { redirect } from "@sveltejs/kit";
import db from "$lib/db";


export async function load({ locals }) {
    // Check if user is authenticated
    if (!locals.user) {
        throw redirect(302, '/signin');
    }

    return {
        cart: await db.getCustomerCart(locals.user.id)
    }
}

export const actions = {
    makeCheckout: async ({ request, locals }) => {
        // TODO: use locals directly
        const user = locals.user;
        const data = await request.formData();

        const cart = JSON.parse(data.get("cart"));

        // create new array with only the fields you need
        const simplifiedCart = cart.map(item => ({
            _id: item._id,
            name: item.name,
            price: item.price
        }));

        // TODO: Can I pass totalPrice from svelte page??
        const sale = {
            user_id: user.id,
            cart: simplifiedCart,
            totalPrice: cart.reduce((sum, item) => sum + item.price, 0)
        }

        await db.createSale(sale);

        // Reset user cart after sale
        user.cart = [];
        await db.updateCustomer(user);

        return { success: true };
    }
}