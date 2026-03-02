import { finalGetSingleCategoryById } from "@/actions/finalCategory.action";
import FinalSingleCategoryComponent from "@/components/modules/admin/finalCategory/FinalSingleCategoryComponent";


export default async function FinalSingleCAtegoryPage({ params }: { params: Promise<{ id: string }> }) {
    // ১. params-কে await করতে হবে (Next.js 15 এর নিয়ম)
    const { id } = await params;
    
    console.log("Resolved ID:", id);

    // ২. এবার id দিয়ে ডেটা ফেচ করুন
    const response = await finalGetSingleCategoryById(id, 10);
    console.log("Response from finalGetSingleCategoryById:", response);

    return (
        <div className="p-6">
            <FinalSingleCategoryComponent initialData={response?.data} />
        </div>
    );
}