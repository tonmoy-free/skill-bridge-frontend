import AllClassTable from "@/components/modules/admin/createClass/allClass/AllClass";

export default async function AllClassPage({
    searchParams, // params এর বদলে searchParams ব্যবহার করুন
}: {
    searchParams: Promise<{ error?: string , success?: string, id?: string }>; // এখানে type ও পরিবর্তন হবে
}) {
    // searchParams থেকে error বের করে আনা
    const { error,success,id } = await searchParams;

    console.log("Received error from URL query:", error ,id); // এখন এটি 'empty' প্রিন্ট করবে

    return (
        <div>
            {/* যদি আপনি এই এররটি টেবিল কম্পোনেন্টে দেখাতে চান, তবে প্রপস হিসেবে পাঠিয়ে দিন */}
            <AllClassTable urlError={error} urlId={id} urlSuccess={success} />
        </div>
    );
}