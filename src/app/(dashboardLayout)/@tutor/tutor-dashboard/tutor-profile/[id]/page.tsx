import { getAllCategory } from "@/actions/category.action";
import { getTutorProfileById } from "@/actions/tutor.action";
import TutorProfileComponent from "@/components/modules/tutor/TutorProfileComponent";
import { notFound } from "next/navigation";

// Define the type for the URL params
interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function TutorProfile({ params }: PageProps) {
  // 1. Await the params to get the ID from the URL
  const { id } = await params;

  // 2. Fetch data in parallel for better performance
  const [response, allCategory] = await Promise.all([
    getTutorProfileById(10),
    getAllCategory(), // Usually categories don't need the tutor ID to be fetched
  ]);

  // 3. Handle 404 if no tutor is found
  if (!response?.data) {
    notFound();
  }

  // console.log("Response from getAllCategory:", allCategory?.data);

  return (
    <TutorProfileComponent 
      initialData={response.data} 
      allCategory={allCategory?.data || []} 
    />
  );
}




// import { getAllCategory } from "@/actions/category.action";
// import { getTutorProfileById } from "@/actions/tutor.action";
// import TutorProfileComponent from "@/components/modules/tutor/TutorProfileComponent";


// export default async function TutorProfile() {

//     const response = await getTutorProfileById(10);
//     const allCategory = await getAllCategory(10);
//     console.log("Response from getAllCategory:", allCategory.data);

//     return (
//         <TutorProfileComponent initialData={response?.data} allCategory = {allCategory?.data}/>
//     );
// }
