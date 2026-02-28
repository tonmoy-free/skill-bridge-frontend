// src/app/(dashboardLayout)/admin/subject/[id]/page.tsx

import { getSingleSubjectsById } from "@/actions/subject.action";
import SingleSubjectComponent from "@/components/modules/admin/subject/singleSubjectPage/SingleSubjectPage";


export default async function Page({ params }: { params: Promise<{ id: string }> }) {
    // ১. params-কে await করতে হবে (Next.js 15 এর নিয়ম)
    const { id } = await params;
    
    console.log("Resolved ID:", id);

    // ২. এবার id দিয়ে ডেটা ফেচ করুন
    const response = await getSingleSubjectsById(id, 10);
    console.log("Response from getSingleSubjectsById:", response);

    return (
        <div className="p-6">
            <SingleSubjectComponent initialData={response?.data} />
        </div>
    );
}