import { getSingleCategoryById } from "@/actions/category.action";
import UpdateCategoryComponent from "@/components/modules/admin/category/UpdateCategory";


export default async function SingleCategoryPage({ params }: { params: Promise<{ id: string }> }) {
    // ১. params-কে await করতে হবে (Next.js 15 এর নিয়ম)
    const { id } = await params;

    console.log("Resolved ID:", id);

    // ২. এবার id দিয়ে ডেটা ফেচ করুন
    const response = await getSingleCategoryById(id, 10);
    console.log("Response from getSingleCategoryById:", response);

    return (
        <UpdateCategoryComponent initialData={response?.data} />
    );
}