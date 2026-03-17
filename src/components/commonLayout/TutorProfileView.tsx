import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    Star,
    Clock,
    Briefcase,
    GraduationCap,
    CheckCircle2,
    CalendarCheck,
    MessageCircle,
    CalendarDays
} from "lucide-react";
import defaultTutor from "../../../public/Image/defaultTutor.png";

export default function TutorProfileView({ profile }: { profile: any }) {
    const { user, categories, availability, reviews, experience, rating, hourlyFee, monthlyFee, bio } = profile.data || {};
    console.log("this is from profile", profile)
    const imageSrc = user.image ? user.image : defaultTutor.src;

    return (
        <div className="container mx-auto py-10 px-4 max-w-6xl mt-12">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-8 p-6 bg-card border rounded-xl">
                <Avatar className="h-32 w-32 border-4 border-background shadow-xl">
                    {/* <AvatarImage src={user.image} /> */}
                    {user.image ? (<AvatarImage src={user.image} />) : (<AvatarImage src={imageSrc} alt="Default Avatar" />)}
                    <AvatarFallback className="text-2xl">{user.name.charAt(0)}</AvatarFallback>
                </Avatar>

                <div className="flex-1 text-center md:text-left space-y-2">
                    <div className="flex flex-col md:flex-row md:items-center gap-2">
                        <h1 className="text-3xl font-bold">{user.name}</h1>
                        <div className="flex items-center justify-center gap-1 bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full text-sm font-bold">
                            <Star size={16} className="fill-current" /> {rating.toFixed(1)}
                        </div>
                        {user.emailVerified && (
                            <Badge variant="secondary" className="bg-blue-50 text-blue-600 border-blue-200">
                                <CheckCircle2 size={12} className="mr-1" /> Verified Tutor
                            </Badge>
                        )}
                    </div>

                    <div className="flex flex-wrap justify-center md:justify-start gap-2">
                        {categories?.map((cat: any) => (
                            <Badge key={cat.id} variant="outline" className="bg-slate-50">
                                {cat.name}
                            </Badge>
                        ))}
                    </div>

                    <div className="flex flex-wrap justify-center md:justify-start items-center gap-4 text-muted-foreground pt-2">
                        <div className="flex items-center gap-1 text-sm">
                            <Briefcase size={16} /> {experience} Years Experience
                        </div>
                        <div className="flex items-center gap-1 text-sm">
                            <Clock size={16} /> Response time: ~2h
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-2 w-full md:w-auto">
                    <Button size="lg" className="gap-2">
                        <CalendarCheck size={18} /> Book a Lesson
                    </Button>
                    <Button variant="outline" size="lg" className="gap-2">
                        <MessageCircle size={18} /> Send Message
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content Area */}
                <div className="lg:col-span-2 space-y-8">
                    <section className="space-y-3">
                        <h3 className="text-xl font-bold flex items-center gap-2">
                            <GraduationCap className="text-primary" /> About Me
                        </h3>
                        <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                            {bio}
                        </p>
                    </section>

                    <Separator />

                    <section>
                        <Tabs defaultValue="schedule" className="w-full">
                            <TabsList className="mb-4">
                                <TabsTrigger value="schedule">Availability</TabsTrigger>
                                <TabsTrigger value="reviews">Reviews ({reviews?.length || 0})</TabsTrigger>
                            </TabsList>

                            {/* Availability Tab */}
                            <TabsContent value="schedule" className="space-y-4">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    {availability && availability.length > 0 ? (
                                        availability.map((slot: any) => (
                                            <div
                                                key={slot.id}
                                                className="flex items-center justify-between p-4 border rounded-lg bg-card shadow-sm"
                                            >
                                                <div className="flex items-center gap-3">
                                                    <div className="bg-primary/10 p-2 rounded-full text-primary">
                                                        <CalendarDays size={18} />
                                                    </div>
                                                    <div>
                                                        <p className="font-semibold text-sm">{slot.day}</p>
                                                        <p className="text-xs text-muted-foreground">Weekly</p>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <Badge variant="secondary" className="font-mono">
                                                        {slot.startTime} - {slot.endTime}
                                                    </Badge>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <p className="text-muted-foreground text-sm italic py-4">No availability set.</p>
                                    )}
                                </div>
                            </TabsContent>

                            {/* Reviews Tab */}
                            <TabsContent value="reviews" className="space-y-6 pt-2">
                                {reviews && reviews.length > 0 ? (
                                    reviews.map((review: any) => (
                                        <div key={review.id} className="space-y-2 pb-6 border-b last:border-0">
                                            <div className="flex justify-between items-start">
                                                <div className="flex items-center gap-2">
                                                    <div className="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center font-bold text-xs uppercase">
                                                        {review?.user?.name.charAt(0)}
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-semibold">{review?.user?.name}</p>
                                                        <p className="text-[10px] text-muted-foreground">
                                                            {new Date(review.createdAt).toLocaleDateString()}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="flex text-yellow-500">
                                                    {Array.from({ length: 5 }).map((_, i) => (
                                                        <Star
                                                            key={i}
                                                            size={14}
                                                            className={i < Math.floor(review?.rating) ? "fill-current" : "text-slate-300"}
                                                        />
                                                    ))}
                                                </div>
                                            </div>
                                            <p className="text-sm text-slate-600 pl-10 italic">"{review?.comment}"</p>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-center py-10 border-2 border-dashed rounded-lg">
                                        <p className="text-muted-foreground">No reviews yet. Be the first to book!</p>
                                    </div>
                                )}
                            </TabsContent>
                        </Tabs>
                    </section>
                </div>

                {/* Sticky Pricing Sidebar */}
                <div className="space-y-6">
                    <Card className="sticky top-6 border-primary/20 shadow-lg">
                        <CardHeader className="bg-primary/5">
                            <CardTitle className="text-center text-primary">Pricing</CardTitle>
                        </CardHeader>
                        <CardContent className="pt-6 space-y-4">
                            <div className="flex justify-between items-center">
                                <span className="text-muted-foreground">Hourly Rate</span>
                                <span className="text-2xl font-bold text-primary">${hourlyFee}</span>
                            </div>
                            {monthlyFee && (
                                <div className="flex justify-between items-center pb-2 border-b">
                                    <span className="text-muted-foreground">Monthly Plan</span>
                                    <span className="text-xl font-semibold">${monthlyFee}</span>
                                </div>
                            )}
                            <div className="bg-muted/30 p-3 rounded-lg text-xs text-muted-foreground">
                                <p>✓ All lesson materials included</p>
                                <p>✓ 24-hour cancellation policy</p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}