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
    createAvailability: async function (updateData: Partial<CreateAvailabilityData>, options?: ServiceOptions) {
          const { data } = await userService.getSession();
            
              const session = data?.user || null;
               const id = session.id
            //   console.log("from navbar",session.id)
        try {
            const url = new URL(`${API_URL}/tutor/availability/`);
              const finalData = {id,...updateData}

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

    createTutorProfile: async function (updateData: Partial<CreateTutorProfileData>, options?: ServiceOptions) {
          const { data } = await userService.getSession();
            
              const session = data?.user || null;
               const {id : userId}= session
            //   console.log("from navbar",session.id)
        try {
            const url = new URL(`${API_URL}/tutors/tutors-profile`);
              const finalData = {userId,...updateData}

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


    



};