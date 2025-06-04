import db from "$lib/db";

export async function load({ locals }) {
    return {
        total_points: await db.getCustomerRewardPoints(locals.user.id),
        rewards: await db.getRewards(),
        levels: await db.getLevels(),
        user: locals.user
    };
}

export const actions = {
    redeemReward: async ({ request, locals }) => {
        // TODO: Check if chan be done with locals.user
        const user = locals.user;
        const data = await request.formData();
        const reward = JSON.parse(data.get("reward"))

        user.rewards = user.rewards || [];
        user.rewards.push(reward);

        await db.updateCustomer(user);

        return { success: true };
    }
}