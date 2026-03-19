// import { getAllTutorProfile } from "@/actions/tutor.action";
// import FindTutorPage from "@/components/commonLayout/FindTutorPage";
// import { userService } from "@/services/user.service";

// export default async function TutorProfilePage() {
//     const response = await getAllTutorProfile(10,parms);
//     const { data } = await userService.getSession();

//     return (
//         <div>
//             <FindTutorPage response={response, parms} data={data} />
//         </div>
//     )
// }

import { finalGetAllCategory } from "@/actions/finalCategory.action";
import { getAllTutorProfile } from "@/actions/tutor.action";
import FindTutorPage from "@/components/commonLayout/FindTutorPage";
import { userService } from "@/services/user.service";

// Next.js সার্ভার কম্পোনেন্টে searchParams সরাসরি প্রপ হিসেবে আসে
export default async function TutorProfilePage({ 
  searchParams 
}: { 
  searchParams: Promise<{ [key: string]: string | undefined }> 
}) {
    // searchParams একটি Promise, তাই এটি await করতে হবে
    const params = await searchParams;

    // ফিল্টার অবজেক্ট তৈরি করা
    const filters = {
        search: params.search,
        categoryId: params.categoryId,
        maxPrice: params.maxPrice ? Number(params.maxPrice) : undefined,
        minRating: params.minRating ? Number(params.minRating) : undefined,
    };

    // এপিআই কল করা
    const response = await getAllTutorProfile(10, filters);
    const { data } = await userService.getSession();

    const allcategory = await finalGetAllCategory();
    console.log("allcategory",allcategory.data)

    return (
        <div>
            {/* FindTutorPage-এ response এবং filters পাস করা হচ্ছে */}
            <FindTutorPage response={response} filters={filters} data={data} allCAtegory={allcategory.data} />
        </div>
    );
}