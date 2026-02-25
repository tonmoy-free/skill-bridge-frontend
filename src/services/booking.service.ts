import { env } from "@/env"

const API_URL = env.API_URL;

//* No Dynamic and No { cache: no-store } : SSG -> Static Page
//* { cache: no-store } : SSR -> Dynamic Page
//* next: { revalidate: 10 } : ISR -> Mix between static and dynamic

interface ServiceOptions {
    cache?: RequestCache;
    revalidate?: number;
}

interface GetTutorProfileParams {
    isFeatured?: boolean;
    search?: string;
}

export const bookingService = {
    getBookings: async function (params?: GetTutorProfileParams, options?: ServiceOptions) {
        try {
            const url = new URL(`${API_URL}/dashboard/booking/`);

            // url.searchParams.append("key", "value");
            if (params) {
                Object.entries(params).forEach(([key, value]) => {
                    if (value != undefined && value != null && value != "") {
                        url.searchParams.append(key, value);
                    }
                })
            }

            const config: RequestInit = {
                credentials: 'include', // Include cookies for authentication
                headers: {
                    'Content-Type': 'application/json',
                }
            };

            if (options?.cache) {
                config.cache = options.cache;
            }

            if (options?.revalidate) {
                config.next = { revalidate: options.revalidate }
            }

            config.next = { ...config.next, tags: ["blogPosts"] };

            const res = await fetch(url.toString(), config);

            const data = await res.json();

            return { data: data, error: null };
        } catch (err) {
            return { data: null, error: { message: "Something went wrong." } }
        }
    },


};