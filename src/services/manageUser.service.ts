import { env } from "@/env";

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

export interface UserData {
    role: string;
    status: string;
}

export const manageUserService = {
    updateStatusRoleById: async function (id: string, updateData: Partial<UserData>, options?: ServiceOptions) {
        try {
            const url = `${API_URL}/dashboard/user/${id}`; // ডাইরেক্ট স্ট্রিং ইন্টারপোলেশন

            // Get cookies for authentication
            const { cookies } = await import("next/headers"); // Importing inside the function to avoid issues in non-server contexts
            const cookiestore = await cookies(); // Get the cookies store for send login user token or session in header for authentication 

            const config: RequestInit = {
                method: "PATCH", // <--- এটি অবশ্যই যোগ করতে হবে
                credentials: 'include', // কুকি বা সেশন পাঠানোর জন্য
                headers: {
                    "Content-Type": "application/json",
                    Cookie: cookiestore.toString(),
                },
                body: JSON.stringify(updateData),
            };

            if (options?.cache) {
                config.cache = options.cache;
            }

            // Next.js স্পেসিফিক ক্যাশ লজিক (যদি প্রয়োজন হয়)
            if (options?.revalidate) {
                config.next = { revalidate: options.revalidate };
            }

            // রিভ্যালিডেশনের জন্য ট্যাগ (যেমন: ডিলিট করার পর লিস্ট আপডেট হবে)
            config.next = { ...config.next, tags: ["user"] };

            const res = await fetch(url, config);

            // যদি রেসপন্স ঠিক না থাকে (যেমন: ৪০১, ৪০৪ বা ৪০০ এরর)
            if (!res.ok) {
                const errorData = await res.json().catch(() => ({}));
                return {
                    data: null,
                    error: { message: errorData.error || errorData.message || "Update failed" }
                };
            }

            const data = await res.json();
            return { data: data, error: null };

        } catch (err) {
            console.error("Delete Fetch Error:", err);
            return { data: null, error: { message: "Something went wrong during deletion." } };
        }
    },



    userDeleteById: async function (id: string, options?: ServiceOptions) {
        try {
            const url = `${API_URL}/dashboard/user/${id}`; // ডাইরেক্ট স্ট্রিং ইন্টারপোলেশন

            // Get cookies for authentication
            const { cookies } = await import("next/headers"); // Importing inside the function to avoid issues in non-server contexts
            const cookiestore = await cookies(); // Get the cookies store for send login user token or session in header for authentication 

            const config: RequestInit = {
                method: "DELETE", // <--- এটি অবশ্যই যোগ করতে হবে
                credentials: 'include', // কুকি বা সেশন পাঠানোর জন্য
                headers: {
                    "Content-Type": "application/json",
                    Cookie: cookiestore.toString(),
                },
            };

            if (options?.cache) {
                config.cache = options.cache;
            }

            // Next.js স্পেসিফিক ক্যাশ লজিক (যদি প্রয়োজন হয়)
            if (options?.revalidate) {
                config.next = { revalidate: options.revalidate };
            }

            // রিভ্যালিডেশনের জন্য ট্যাগ (যেমন: ডিলিট করার পর লিস্ট আপডেট হবে)
            config.next = { ...config.next, tags: ["user"] };

            const res = await fetch(url, config);

            // যদি রেসপন্স ঠিক না থাকে (যেমন: ৪০১, ৪০৪ বা ৪০০ এরর)
            if (!res.ok) {
                const errorData = await res.json().catch(() => ({}));
                return {
                    data: null,
                    error: { message: errorData.error || errorData.message || "Update failed" }
                };
            }

            const data = await res.json();
            return { data: data, error: null };

        } catch (err) {
            console.error("Delete Fetch Error:", err);
            return { data: null, error: { message: "Something went wrong during deletion." } };
        }
    },



}