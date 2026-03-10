import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Star, Clock, Briefcase, GraduationCap, DollarSign, Calendar } from "lucide-react";
import Link from "next/link";

// Helper to convert dayOfWeek number to String
const getDayName = (day: number) => {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return days[day] || "Unknown";
};

export default function TutorProfilePage({ data }: { data: any }) {
    const { id, user, categories, availability, bio, hourlyFee, monthlyFee, experience, rating } = data;
    console.log("ddddd", data)

    return (
        <div className="max-w-5xl mx-auto p-4 md:p-8 space-y-8">
            {/* Top Profile Header */}
            <div className="flex flex-col md:flex-row gap-6 items-center md:items-start bg-card border p-6 rounded-2xl shadow-sm ">
                <Avatar className="h-24 w-24 border-2 border-primary/10">
                    <AvatarImage src={user.image} />
                    <AvatarFallback className="text-xl bg-primary/5">{user.name.charAt(0)}</AvatarFallback>
                </Avatar>

                <div className="flex-1 space-y-3 text-center md:text-left">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">{user.name}</h1>
                        <p className="text-muted-foreground">{user.email}</p>
                    </div>

                    <div className="flex flex-wrap justify-center md:justify-start gap-3">
                        <div className="flex flex-wrap justify-center md:justify-start gap-2">
                            {categories?.map((cat: any) => (
                                <Badge key={cat.id} variant="outline" className="bg-slate-50">
                                    {cat.name}
                                </Badge>
                            ))}
                        </div>
                        <Badge variant="outline" className="gap-1">
                            <Briefcase size={14} />
                            {experience} Years Exp.
                        </Badge>
                    </div>
                </div>

                <div className="flex flex-col gap-2 w-full md:w-auto">
                    {/* <Link href={`/tutor-dashboard/tutor-profile/${initialData?.id}`}> */}
                    <Link href={`/tutor-dashboard/tutor-profile/${id}`}>
                        <Button form="create-subject-form" type="submit" className="">
                            Edit Profile
                        </Button>
                    </Link>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column: Details */}
                <div className="lg:col-span-2 space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <GraduationCap className="text-primary" size={20} />
                                About Me
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-slate-600 leading-relaxed">{bio}</p>
                        </CardContent>
                    </Card>

                    <Tabs defaultValue="availability">
                        <TabsList>
                            <TabsTrigger value="availability">Schedule</TabsTrigger>
                            <TabsTrigger value="reviews">Reviews (0)</TabsTrigger>
                        </TabsList>

                        <TabsContent value="availability" className="pt-4">
                            <Card>
                                <CardContent className="pt-6">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        {availability.map((slot: any) => (
                                            <div key={slot.id} className="flex items-center justify-between p-3 border rounded-lg bg-slate-50/50">
                                                <div className="flex items-center gap-3">
                                                    <Calendar size={16} className="text-primary" />
                                                    <span className="font-medium text-sm">{getDayName(slot.dayOfWeek)}</span>
                                                </div>
                                                <div className="text-xs font-mono bg-white px-2 py-1 rounded border shadow-sm">
                                                    {slot.startTime} - {slot.endTime}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="reviews" className="text-center py-8 text-muted-foreground italic">
                            No reviews yet for this tutor.
                        </TabsContent>
                    </Tabs>
                </div>

                {/* Right Column: Pricing Sidebar */}
                <div className="space-y-6">
                    <Card className="border-primary/20 shadow-md overflow-hidden">
                        <div className="bg-primary/5 p-4 border-b">
                            <h3 className="font-bold text-center text-primary">Tuition Fees</h3>
                        </div>
                        <CardContent className="p-6 space-y-6">
                            <div className="flex justify-between items-center">
                                <div className="flex items-center gap-2 text-muted-foreground">
                                    <Clock size={18} />
                                    <span>Hourly</span>
                                </div>
                                <span className="text-xl font-bold text-slate-900">{hourlyFee} BDT</span>
                            </div>

                            {monthlyFee && (
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center gap-2 text-muted-foreground">
                                        <DollarSign size={18} />
                                        <span>Monthly</span>
                                    </div>
                                    <span className="text-xl font-bold text-slate-900">{monthlyFee} BDT</span>
                                </div>
                            )}

                            <div className="pt-4 border-t space-y-2">
                                <p className="text-xs text-muted-foreground flex items-center gap-2">
                                    <span className="h-1 w-1 bg-green-500 rounded-full" />
                                    Instant Booking Available
                                </p>
                                <p className="text-xs text-muted-foreground flex items-center gap-2">
                                    <span className="h-1 w-1 bg-green-500 rounded-full" />
                                    Verified Identity
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}