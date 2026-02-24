// Client-side user API helpers
export async function getUsersFromApi({ page = 1, limit = 10 } = {}) {
    try {
        const url = `http://localhost:5000/dashboard/user/?limit=${limit}&page=${page}`;
        const res = await fetch(url, { cache: "no-store" });
        if (!res.ok) {
            const text = await res.text();
            throw new Error(text || res.statusText || "Failed to fetch users");
        }
        const json = await res.json();

        // Normalize common pagination shapes
        const items = json.data ?? json.users ?? json.items ?? json.results ?? json.docs ?? json;
        const total = json.total ?? json.count ?? json.meta?.total ?? json.pagination?.total ?? json.totalDocs ?? json.meta?.count ?? 0;
        const totalPages = json.totalPages ?? json.pages ?? json.meta?.pages ?? Math.ceil((total || 0) / limit);

        return {
            data: Array.isArray(items) ? items : [],
            total: typeof total === 'number' ? total : parseInt(total) || 0,
            totalPages: typeof totalPages === 'number' ? totalPages : parseInt(totalPages) || 0,
            page,
            limit
        };
    } catch (err: any) {
        console.error("getUsersFromApi", err);
        return { data: [], total: 0, totalPages: 0, page, limit, error: err?.message ?? String(err) };
    }
}
