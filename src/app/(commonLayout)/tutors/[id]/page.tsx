import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { blogService } from "@/services/blog.service";
import { TutorProfile } from "@/types";
import { notFound } from "next/navigation";

// export async function generateStaticParams() {
//   const { data } = await blogService.getBlogPosts();

//   return data?.data?.map((blog: TutorProfile) => ({ id: blog.id })).splice(0, 3);
// }

export default async function TutorProfileSinglePage({ params }: { params: Promise<{ id: string }>; }) {

    const { id } = await params;

    // const {data } = await blogService.getTutorById(id);

    const response = await blogService.getTutorById(id);
    const data: TutorProfile | null = response.data;

    if (!data) {
        return notFound();
    }

    return (
        <div className="container mx-auto py-10 px-4">
            <Card className="max-w-3xl mx-auto shadow-xl rounded-2xl">
                <CardContent className="p-8 space-y-6">

                    {/* Name Section */}
                    <div>
                        <h1 className="text-3xl font-bold">
                            {data.user?.name || "Unknown Tutor"}
                        </h1>
                        <p className="text-muted-foreground">
                            {data.user?.email}
                        </p>
                    </div>

                    <Separator />

                    {/* Bio */}
                    <div>
                        <h2 className="text-xl font-semibold mb-2">About</h2>
                        <p className="text-gray-700 leading-relaxed">
                            {data.bio}
                        </p>
                    </div>

                    <Separator />

                    {/* Info Grid */}
                    <div className="grid grid-cols-2 gap-4">

                        <div className="space-y-1">
                            <p className="text-sm text-muted-foreground">Hourly Fee</p>
                            <Badge variant="secondary" className="text-lg">
                                ৳ {data.hourlyFee}
                            </Badge>
                        </div>

                        <div className="space-y-1">
                            <p className="text-sm text-muted-foreground">Monthly Fee</p>
                            <Badge variant="secondary" className="text-lg">
                                ৳ {data.monthlyFee ?? "N/A"}
                            </Badge>
                        </div>

                        <div className="space-y-1">
                            <p className="text-sm text-muted-foreground">Experience</p>
                            <Badge>{data.experience ?? 0} Years</Badge>
                        </div>

                        <div className="space-y-1">
                            <p className="text-sm text-muted-foreground">Rating</p>
                            <Badge>{data.rating ?? 0} ⭐</Badge>
                        </div>

                    </div>

                </CardContent>
            </Card>
        </div>
    );
}