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

interface ID {
    id: string;
}

export interface SubjectData {
    name: string;
}

export const assignTutorService = {
    

    getAllTutor: async function (params?: GetTutorProfileParams, options?: ServiceOptions) {
        try {
            const url = new URL(`${API_URL}/tutors/tutors-profile`);

            // url.searchParams.append("key", "value");
            if (params) {
                Object.entries(params).forEach(([key, value]) => {
                    if (value != undefined && value != null && value != "") {
                        url.searchParams.append(key, value);
                    }
                })
            }

            const { cookies } = await import("next/headers"); // Importing inside the function to avoid issues in non-server contexts
            const cookiestore = await cookies();

            // console.log("updateData:", JSON.stringify(updateData));
            const config: RequestInit = {
                method: 'GET',
                credentials: 'include', // Include cookies for authentication
                headers: {
                    'Content-Type': 'application/json',
                    Cookie: cookiestore.toString(), // Pass auth cookies/session in headers
                },
            };

            if (options?.cache) {
                config.cache = options.cache;
            }

            if (options?.revalidate) {
                config.next = { revalidate: options.revalidate }
            }

            config.next = { ...config.next, tags: ["tutor"] };

            const res = await fetch(url.toString(), config);

            const data = await res.json();

            return { data: data, error: null };
        } catch (err) {
            return { data: null, error: { message: "Something went wrong." } }
        }
    },
    



};