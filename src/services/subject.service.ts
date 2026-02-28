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

export const subjectService = {
    createSubject: async function (updateData: Partial<SubjectData>, options?: ServiceOptions) {
        try {
            const url = new URL(`${API_URL}/subject/`);


            const { cookies } = await import("next/headers"); // Importing inside the function to avoid issues in non-server contexts
            const cookiestore = await cookies();

            // console.log("updateData:", JSON.stringify(updateData));
            const config: RequestInit = {
                method: 'POST',
                credentials: 'include', // Include cookies for authentication
                headers: {
                    'Content-Type': 'application/json',
                    Cookie: cookiestore.toString(), // Pass auth cookies/session in headers
                },
                body: JSON.stringify(updateData),
            };

            if (options?.cache) {
                config.cache = options.cache;
            }

            if (options?.revalidate) {
                config.next = { revalidate: options.revalidate }
            }

            config.next = { ...config.next, tags: ["subjects"] };

            const res = await fetch(url.toString(), config);

            const data = await res.json();

            return { data: data, error: null };
        } catch (err) {
            return { data: null, error: { message: "Something went wrong." } }
        }
    },

    getAllSubject: async function (params?: GetTutorProfileParams, options?: ServiceOptions) {
        try {
            const url = new URL(`${API_URL}/subject/`);

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

            config.next = { ...config.next, tags: ["subjects"] };

            const res = await fetch(url.toString(), config);

            const data = await res.json();

            return { data: data, error: null };
        } catch (err) {
            return { data: null, error: { message: "Something went wrong." } }
        }
    },


    getDeleteSubjectById: async function (id: string, options?: ServiceOptions) {
        try {
            const url = `${API_URL}/subject/${id}`; // ডাইরেক্ট স্ট্রিং ইন্টারপোলেশন

            // Get cookies for authentication
            const { cookies } = await import("next/headers"); // Importing inside the function to avoid issues in non-server contexts
            const cookiestore = await cookies(); // Get the cookies store for send login user token or session in header for authentication 


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
            config.next = { ...config.next, tags: ["subject"] };

            const res = await fetch(url, config);

            // যদি রেসপন্স ঠিক না থাকে (যেমন: ৪০১, ৪০৪ বা ৪০০ এরর)
            if (!res.ok) {
                try {
                    const errorData = await res.json();
                    console.error("Delete API Error:", errorData);
                    return { data: null, error: { message: errorData.error || errorData.message || "Failed to delete subject." } };
                } catch (err) {
                    console.error("Delete response error - Status:", res.status, res.statusText);
                    return { data: null, error: { message: `Failed to delete subject. Status: ${res.status}` } };
                }
            }

            const data = await res.json();
            return { data: data, error: null };

        } catch (err) {
            console.error("Delete Fetch Error:", err);
            return { data: null, error: { message: "Something went wrong during deletion." } };
        }
    },


    updateSubjectById: async function (id: string,updateData: Partial<SubjectData>, options?: ServiceOptions) {
            try {
                const url = `${API_URL}/subject/${id}`; // ডাইরেক্ট স্ট্রিং ইন্টারপোলেশন
    
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
                config.next = { ...config.next, tags: ["subject"] };
    
                const res = await fetch(url, config)
    
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

        getSingleSubjectById: async function (id: string, options?: ServiceOptions) {
        try {
            const url = new URL(`${API_URL}/subject/${id}`);

            const { cookies } = await import("next/headers"); // Importing inside the function to avoid issues in non-server contexts
            const cookiestore = await cookies();



            const config: RequestInit = {
                credentials: 'include', // Include cookies for authentication
                headers: {
                    'Content-Type': 'application/json',
                    Cookie: cookiestore.toString(), // Pass auth cookies/session in headers
                }
            };

            if (options?.cache) {
                config.cache = options.cache;
            }

            if (options?.revalidate) {
                config.next = { revalidate: options.revalidate }
            }

            config.next = { ...config.next, tags: ["subject"] };

            const res = await fetch(url.toString(), config);

            const data = await res.json();

            return { data: data, error: null };
        } catch (err) {
            return { data: null, error: { message: "Something went wrong." } }
        }
    },
    



};