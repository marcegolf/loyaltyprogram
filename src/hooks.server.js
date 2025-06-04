import { auth } from "$lib/auth";
import { svelteKitHandler } from "better-auth/svelte-kit";

export async function handle({ event, resolve }) {
    const fetchedSession = await auth.api.getSession({
        headers: event.request.headers
    });

    if (fetchedSession) {
        const { user, session } = fetchedSession;
        event.locals.session = session;
        event.locals.user = user;
    } else {
        delete event.locals.session;
        delete event.locals.user;
    }
    
    return await svelteKitHandler({ event, resolve, auth });
}