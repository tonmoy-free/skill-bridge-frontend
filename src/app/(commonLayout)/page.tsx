import { TutorCard } from "@/components/modules/homepage/TutorCard";
import { blogService } from "@/services/blog.service";
import { TutorProfile } from "@/types";


export default async function Home() {
  const { data } = await blogService.getBlogPosts({
    isFeatured: true,
    search: "",
  },
    {
      // cache: "no-store"
      revalidate: 10,
    });

  console.log(data)
  return (
    <div className="grid grid-cols-3 max-w-7xl mx-auto px-4 gap-5">
      {data?.map((post: TutorProfile) => (
        <TutorCard key={post.id} post={post} />
      ))}
    </div>
  );
}
