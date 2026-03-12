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

export interface BookingData {
    tutorId: string;
    date: Date;
    startTime: string;
    endTime: string;
    duration: number;
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

    createBooking: async function (updateData: Partial<BookingData>, options?: ServiceOptions) {
        try {
            const url = new URL(`${API_URL}/dashboard/booking/`);


            const { cookies } = await import("next/headers"); // Importing inside the function to avoid issues in non-server contexts
            const cookiestore = await cookies();
            console.log(updateData);
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

            config.next = { ...config.next, tags: ["booking"] };

            const res = await fetch(url.toString(), config);

            const data = await res.json();

            return { data: data, error: null };
        } catch (err) {
            return { data: null, error: { message: "Something went wrong." } }
        }
    },

    createBookingIntoDB: async function (updateData: Partial<BookingData>, options?: ServiceOptions) {
    try {
        const url = new URL(`${API_URL}/dashboard/booking/`);

        const { cookies } = await import("next/headers");
        const cookiestore = await cookies();
        
        const config: RequestInit = {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                Cookie: cookiestore.toString(),
            },
            body: JSON.stringify(updateData),
        };

        if (options?.cache) config.cache = options.cache;
        if (options?.revalidate) config.next = { revalidate: options.revalidate };
        config.next = { ...config.next, tags: ["booking"] };

        const res = await fetch(url.toString(), config);

        // ১. রেসপন্সটি JSON এ কনভার্ট করুন
        const result = await res.json();

        // ২. চেক করুন রেসপন্সটি সফল (200-299) কি না
        if (!res.ok) {
            // ব্যাকএন্ড থেকে পাঠানো { message: "This time slot is already booked" } এখানে রিটার্ন হবে
            return { 
                data: null, 
                error: { message: result.message || "Failed to create booking" } 
            };
        }

        // ৩. সফল হলে ডাটা রিটার্ন করুন
        return { data: result, error: null };

    } catch (err: any) {
        // নেটওয়ার্ক এরর বা অন্য কোনো টেকনিক্যাল এরর
        console.error("Fetch Error:", err);
        return { 
            data: null, 
            error: { message: err.message || "Something went wrong." } 
        };
    }
},



};