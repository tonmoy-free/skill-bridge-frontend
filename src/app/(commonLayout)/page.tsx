
import { TutorCard } from "@/components/modules/homepage/TutorCard";
import { Button } from "@/components/ui/button";
import { blogService } from "@/services/blog.service";


export default async function Home() {
  const { data } =await blogService.getBlogPosts();

  console.log(data)
  return (
    <div>
      <Button variant="outline">Click Here</Button>
      <TutorCard></TutorCard>
    </div>
  );
}
