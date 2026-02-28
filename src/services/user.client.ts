export async function getUsersFromApi(
  {
    page = 1,
    limit = 10,
    cookieHeader,
  }: {
    page?: number;
    limit?: number;
    /**
     * If you already have the cookies string from a request (for example
     * from a server component using `cookies()`), pass it here. If omitted
     * the helper will call `cookies()` itself, which **must** only happen in
     * a request scope (server component / route handler).
     */
    cookieHeader?: string;
  } = {}
) {
  try {
    const url = `http://localhost:5000/dashboard/user/?limit=${limit}&page=${page}`;

    // ১. আগে কুকি সংগ্রহ করুন
    let cookieStr = cookieHeader;
    if (!cookieStr) {
      if (typeof window === "undefined") {
        // running on the server – we must be in a request scope
        cookieStr = (await import("next/headers")).cookies().toString();
        if (!cookieStr) {
          throw new Error(
            "getUsersFromApi: no cookies available; make sure you're calling this from a server request or pass cookieHeader"
          );
        }
      } else {
        // client fallback – browser provides cookies automatically,
        // but we can still read document.cookie if needed
        cookieStr = document.cookie;
      }
    }

    // ২. কনফিগ ফাইলটি আগে তৈরি করুন
    const config: RequestInit = {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Cookie: cookieStr, // Pass auth cookies/session in headers
      },
      cache: "no-store" // ক্যাশ বন্ধ রাখা হয়েছে
    };

        // ৩. এখন fetch করুন এবং config টি পাস করুন
        const res = await fetch(url, config);

        if (!res.ok) {
            const errorText = await res.text().catch(() => "Unknown error");
            throw new Error(errorText || `Error ${res.status}: ${res.statusText}`);
        }

        const json = await res.json();

        // ৪. ডেটা নরমালাইজেশন (আগের মতোই)
        const items = json.data ?? json.users ?? json.items ?? json.results ?? json.docs ?? json;
        const total = json.total ?? json.count ?? json.meta?.total ?? json.pagination?.total ?? json.totalDocs ?? json.meta?.count ?? 0;
        const totalPages = json.totalPages ?? json.pages ?? json.meta?.pages ?? Math.ceil((Number(total) || 0) / limit);

        return {
            data: Array.isArray(items) ? items : [],
            total: Number(total) || 0,
            totalPages: Number(totalPages) || 0,
            page,
            limit
        };

    } catch (err: any) {
        console.error("getUsersFromApi Error:", err.message);
        return { 
            data: [], 
            total: 0, 
            totalPages: 0, 
            page, 
            limit, 
            error: err?.message ?? "Something went wrong" 
        };
    }
}
