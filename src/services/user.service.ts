import { env } from "@/env";

const AUTH_URL = env.AUTH_URL;

export const userService = {
    getSession: async function () {
        try {
            // This function should be called from server components only
            // so we dynamically import `cookies` to avoid bundling it into client code
            const { cookies } = await import("next/headers");

            const cookiestore = await cookies();

            const res = await fetch(`${AUTH_URL}/get-session`, {
                headers: {
                    Cookie: cookiestore.toString()
                },
                cache: "no-store",
            });

            const session = await res.json();

            if (session === null) {
                return { data: null, error: { message: " Session is missing" } }
            }

            return { data: session, error: null };
        } catch (err) {
            console.error(err);
            return { data: null, error: { message: "Something went wrong." } }
        }
    }
}