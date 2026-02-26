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

export const classService = {
    getAllClass: async function (params?: GetTutorProfileParams, options?: ServiceOptions) {
        try {
            const url = new URL(`${API_URL}/class/`);

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


    getDeleteClassById: async function (id: string, options?: ServiceOptions) {
        try {
            const url = `${API_URL}/class/${id}`; // ডাইরেক্ট স্ট্রিং ইন্টারপোলেশন

            // Get cookies for authentication
            const { cookies } = await import("next/headers");
            const cookiestore = await cookies();

            const config: RequestInit = {
                method: 'DELETE', // <--- এটি অবশ্যই যোগ করতে হবে
                credentials: 'include', // কুকি বা সেশন পাঠানোর জন্য
                headers: {
                    'Content-Type': 'application/json',
                    Cookie: cookiestore.toString(), // Pass auth cookies/session in headers
                }
            };

            // Next.js স্পেসিফিক ক্যাশ লজিক (যদি প্রয়োজন হয়)
            if (options?.revalidate) {
                config.next = { revalidate: options.revalidate };
            }

            // রিভ্যালিডেশনের জন্য ট্যাগ (যেমন: ডিলিট করার পর লিস্ট আপডেট হবে)
            config.next = { ...config.next, tags: ["classes"] };

            const res = await fetch(url, config);

            // যদি রেসপন্স ঠিক না থাকে (যেমন: ৪০১, ৪০৪ বা ৪০০ এরর)
            if (!res.ok) {
                try {
                    const errorData = await res.json();
                    console.error("Delete API Error:", errorData);
                    return { data: null, error: { message: errorData.error || errorData.message || "Failed to delete class." } };
                } catch {
                    console.error("Delete response error - Status:", res.status, res.statusText);
                    return { data: null, error: { message: `Failed to delete class. Status: ${res.status}` } };
                }
            }

            const data = await res.json();
            return { data: data, error: null };

        } catch (err) {
            console.error("Delete Fetch Error:", err);
            return { data: null, error: { message: "Something went wrong during deletion." } };
        }
    },


};