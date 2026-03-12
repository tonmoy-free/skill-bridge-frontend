"use client"

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Star, Search, MapPin, BookOpen } from "lucide-react";
import Link from "next/link";
import TutorCard from "./TutorCard";

export default function FindTutorPage({ response ,data}: { response: any ,data:any}) {
  
  return (
    <div className="container mx-auto py-8 px-4 mt-12">
      <div className="flex flex-col md:flex-row gap-8">

        {/* LEFT SIDE: Filters */}
        <aside className="w-full md:w-80 space-y-6">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold tracking-tight">Browse Tutors</h2>
            <p className="text-sm text-muted-foreground">Find the perfect match for your goals.</p>
          </div>

          <div className="space-y-4 p-4 border rounded-lg bg-card">
            <div className="space-y-2">
              <Label>Search by Subject</Label>
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Math, Physics..." className="pl-8" />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Category</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="academic">Academic</SelectItem>
                  <SelectItem value="language">Languages</SelectItem>
                  <SelectItem value="music">Music & Arts</SelectItem>
                  <SelectItem value="coding">Programming</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between">
                <Label>Max Price/hr</Label>
                <span className="text-sm font-medium">$100</span>
              </div>
              <Slider defaultValue={[50]} max={200} step={5} />
            </div>

            <div className="space-y-2">
              <Label>Minimum Rating</Label>
              <Select defaultValue="4">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">5 Stars</SelectItem>
                  <SelectItem value="4">4+ Stars</SelectItem>
                  <SelectItem value="3">3+ Stars</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button className="w-full">Apply Filters</Button>
          </div>
        </aside>

        {/* RIGHT SIDE: Tutor Cards */}
        <main className="flex-1">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-6">
            {/* {[1, 2, 3, 4].map((i) => (
              <TutorCard key={i} />
            ))} */}

            {response.data.map((tutor: any) => (
              <TutorCard key={tutor.id} tutor={tutor} data={data}/>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}

// function TutorCard() {
//   return (
//     <Card className="overflow-hidden hover:shadow-md transition-shadow">
//       <CardHeader className="flex flex-row items-center gap-4 space-y-0">
//         <div className="h-16 w-16 rounded-full bg-slate-200 animate-pulse flex-shrink-0" />
//         <div className="flex-1">
//           <div className="flex justify-between items-start">
//             <h3 className="font-bold text-lg leading-none">Sarah Jenkins</h3>
//             <div className="flex items-center text-yellow-500 text-sm font-medium">
//               <Star className="fill-current w-4 h-4 mr-1" /> 4.9
//             </div>
//           </div>
//           <p className="text-sm text-muted-foreground mt-1">Senior Mathematics Tutor</p>
//         </div>
//       </CardHeader>

//       <CardContent className="text-sm space-y-3">
//         <div className="flex items-center gap-2 text-muted-foreground">
//           <BookOpen size={14} />
//           <span>Calculus, Algebra, Statistics</span>
//         </div>
//         <div className="flex items-center gap-2 text-muted-foreground">
//           <MapPin size={14} />
//           <span>Remote / New York</span>
//         </div>
//         <p className="line-clamp-2 text-zinc-600">
//           Helping students master complex concepts for over 8 years. Specialized in SAT/ACT preparation...
//         </p>
//       </CardContent>

//       <CardFooter className="flex gap-3 border-t bg-slate-50/50 pt-4">
//         <Link href={"/tutors/Nwe432eloj4SX6mbQXY4Ot2k68udQwc2"}>
//           <Button variant="outline" className="flex-1">View Profile</Button>
//         </Link>
//         <Button className="flex-1">Book Tutor</Button>
//       </CardFooter>
//     </Card>
//   );
// }