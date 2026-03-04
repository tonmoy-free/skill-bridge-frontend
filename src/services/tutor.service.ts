import { env } from "@/env"
import { userService } from "./user.service";

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

export interface ID {
    tutorId: string;
}

export interface CreateAvailabilityData {
    dayOfWeek: number;
    startTime: string;
    endTime: string;
    isActive?: boolean; // default true হবে
}

export interface CreateTutorProfileData {
    bio: string;
    hourlyFee: number;
    monthlyFee: number;
    experience: number;
}

export const tutorService = {
    createAvailability: async function (tutorId: ID, updateData: Partial<CreateAvailabilityData>, options?: ServiceOptions) {
        const { data } = await userService.getSession();

        const session = data?.user || null;
        const id = session.id
        //   console.log("from navbar",session.id)
        try {
            const url = new URL(`${API_URL}/tutor/availability/`);
            const finalData = { tutorId, ...updateData }

            console.log(finalData)
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
                body: JSON.stringify(finalData),
            };

            if (options?.cache) {
                config.cache = options.cache;
            }

            if (options?.revalidate) {
                config.next = { revalidate: options.revalidate }
            }

            config.next = { ...config.next, tags: ["availability"] };

            const res = await fetch(url.toString(), config);

            const data = await res.json();

            return { data: data, error: null };
        } catch (err) {
            return { data: null, error: { message: "Something went wrong." } }
        }
    },

    getAvailabilityById: async function (id: any, options?: ServiceOptions) {
        const { data } = await userService.getSession();

        // const session = data?.user || null;
        // const id = session.id;
        //   console.log("from navbar",session.id)
        try {
            const url = new URL(`${API_URL}/tutor/availability/${id}`);

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

            config.next = { ...config.next, tags: ["availiability"] };

            const res = await fetch(url.toString(), config);

            const data = await res.json();

            return { data: data, error: null };
        } catch (err) {
            return { data: null, error: { message: "Something went wrong." } }
        }
    },

    createTutorProfile: async function (updateData: Partial<CreateTutorProfileData>, options?: ServiceOptions) {
        const { data } = await userService.getSession();

        const session = data?.user || null;
        const { id: userId } = session
        //   console.log("from navbar",session.id)
        try {
            const url = new URL(`${API_URL}/tutors/tutors-profile`);
            const finalData = { userId, ...updateData }

            console.log(finalData)
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
                body: JSON.stringify(finalData),
            };

            if (options?.cache) {
                config.cache = options.cache;
            }

            if (options?.revalidate) {
                config.next = { revalidate: options.revalidate }
            }

            config.next = { ...config.next, tags: ["availability"] };

            const res = await fetch(url.toString(), config);

            const data = await res.json();

            return { data: data, error: null };
        } catch (err) {
            return { data: null, error: { message: "Something went wrong." } }
        }
    },

    updateTutorProfileById: async function ( updateData: Partial<CreateTutorProfileData>, options?: ServiceOptions) {
        const { data } = await userService.getSession();

        const session = data?.user || null;
        const { id } = session
        try {
            const url = `${API_URL}/tutors/tutors-profile/${id}`; // ডাইরেক্ট স্ট্রিং ইন্টারপোলেশন

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
            config.next = { ...config.next, tags: ["tutorProfile"] };

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

    getTutorProfileById: async function (options?: ServiceOptions) {
        const { data } = await userService.getSession();

        const session = data?.user || null;
        const id = session.id;
        //   console.log("from navbar",session.id)
        try {
            const url = new URL(`${API_URL}/tutors/tutors-profile/${id}`);

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


    getDeleteAvailabilitytById: async function (id: string, options?: ServiceOptions) {
        try {
            const url = `${API_URL}/tutor/availability/${id}`; // ডাইরেক্ট স্ট্রিং ইন্টারপোলেশন

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
            config.next = { ...config.next, tags: ["availability"] };

            const res = await fetch(url, config);

            // যদি রেসপন্স ঠিক না থাকে (যেমন: ৪০১, ৪০৪ বা ৪০০ এরর)
            if (!res.ok) {
                try {
                    const errorData = await res.json();
                    console.error("Delete API Error:", errorData);
                    return { data: null, error: { message: errorData.error || errorData.message || "Failed to delete availability." } };
                } catch (err) {
                    console.error("Delete response error - Status:", res.status, res.statusText);
                    return { data: null, error: { message: `Failed to delete availability. Status: ${res.status}` } };
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