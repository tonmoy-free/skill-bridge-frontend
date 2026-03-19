// "use client"

// import { useState } from "react";
// import { useRouter, usePathname, useSearchParams } from "next/navigation";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { Slider } from "@/components/ui/slider";
// import { Badge } from "@/components/ui/badge";
// import { Star, Search, MapPin, BookOpen } from "lucide-react";
// import Link from "next/link";
// import TutorCard from "./TutorCard";

// export default function FindTutorPage({ 
//   response, 
//   data, 
//   filters 
// }: { 
//   response: any, 
//   data: any, 
//   filters: any 
// }) {
//   const router = useRouter();
//   const pathname = usePathname();
//   const searchParams = useSearchParams();

//   // ২. ফিল্টারের ডিফল্ট ভ্যালু সেট করার জন্য স্টেট ব্যবহার করতে পারেন
//   const [search, setSearch] = useState(filters?.search || "");
//   const [maxPrice, setMaxPrice] = useState(filters?.maxPrice || 100);

//   const handleApplyFilters = () => {
//     const params = new URLSearchParams(searchParams.toString());

//     if (search) params.set("search", search); else params.delete("search");
//     if (maxPrice) params.set("maxPrice", maxPrice.toString());

//     router.push(`${pathname}?${params.toString()}`);
//   };

//   return (
//     <div className="container mx-auto py-8 px-4 mt-12">
//       <div className="flex flex-col md:flex-row gap-8">

//         {/* LEFT SIDE: Filters */}
//         <aside className="w-full md:w-80 space-y-6">
//           <div className="space-y-2">
//             <h2 className="text-2xl font-bold tracking-tight">Browse Tutors</h2>
//             <p className="text-sm text-muted-foreground">Find the perfect match for your goals.</p>
//           </div>

//           <div className="space-y-4 p-4 border rounded-lg bg-card">
//             <div className="space-y-2">
//               <Label>Search by Subject</Label>
//               <div className="relative">
//                 <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
//                 <Input placeholder="Math, Physics..." className="pl-8" value={search}
//                   onChange={(e) => setSearch(e.target.value)}/>
//               </div>
//             </div>

//             <div className="space-y-2">
//               <Label>Category</Label>
//               <Select>
//                 <SelectTrigger>
//                   <SelectValue placeholder="Select Category" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="academic">Academic</SelectItem>
//                   <SelectItem value="language">Languages</SelectItem>
//                   <SelectItem value="music">Music & Arts</SelectItem>
//                   <SelectItem value="coding">Programming</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>

//             <div className="space-y-4">
//               <div className="flex justify-between">
//                 <Label>Max Price/hr</Label>
//                 <span className="text-sm font-medium">${maxPrice}</span>
//               </div>
//               <Slider 
//                 value={[maxPrice]} 
//                 max={500} 
//                 step={5} 
//                 onValueChange={(vals) => setMaxPrice(vals[0])}
//               />
//             </div>

//             <div className="space-y-2">
//               <Label>Minimum Rating</Label>
//               <Select defaultValue="4">
//                 <SelectTrigger>
//                   <SelectValue />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="5">5 Stars</SelectItem>
//                   <SelectItem value="4">4+ Stars</SelectItem>
//                   <SelectItem value="3">3+ Stars</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>

//             <Button className="w-full" onClick={handleApplyFilters}>Apply Filters</Button>
//           </div>
//         </aside>

//         {/* RIGHT SIDE: Tutor Cards */}
//         <main className="flex-1">
//           <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-6">
//             {/* {[1, 2, 3, 4].map((i) => (
//               <TutorCard key={i} />
//             ))} */}

//             {response.data.map((tutor: any) => (
//               <TutorCard key={tutor.id} tutor={tutor} data={data}/>
//             ))}
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// }


"use client"

import { useState } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Search } from "lucide-react";
import TutorCard from "./TutorCard";

export default function FindTutorPage({ response, data, filters, allCAtegory }: { response: any, data: any, filters: any, allCAtegory: any }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // ১. সকল ফিল্টারের জন্য স্টেট ডিফাইন করা
  const [search, setSearch] = useState(filters?.search || "");
  const [category, setCategory] = useState(filters?.categoryId || "");
  const [maxPrice, setMaxPrice] = useState(filters?.maxPrice || 500);
  const [minRating, setMinRating] = useState(filters?.minRating?.toString() || "");

  console.log("search", search)

  const handleApplyFilters = () => {
    const params = new URLSearchParams(searchParams.toString());

    // ২. প্রতিটি ফিল্টার চেক করে URL-এ সেট করা
    if (search) params.set("search", search); else params.delete("search");
    if (category && category !== "all") params.set("categoryId", category); else params.delete("categoryId");
    if (maxPrice) params.set("maxPrice", maxPrice.toString());
    if (minRating) params.set("minRating", minRating); else params.delete("minRating");

    // ৩. নতুন URL-এ পুশ করা (এটি সার্ভার কম্পোনেন্টকে রি-ফেচ করাবে)
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="container mx-auto py-8 px-4 mt-12">
      <div className="flex flex-col md:flex-row gap-8">
        <aside className="w-full md:w-80 space-y-6">
          <div className="space-y-4 p-4 border rounded-lg bg-card">

            {/* Subject Search */}
            <div className="space-y-2">
              <Label>Search by Name & Bio</Label>
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Math, Physics..."
                  className="pl-8"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>

            {/* Category Filter */}
            <div className="space-y-2">
              <Label>Category</Label>
              <Select value={category} onValueChange={(val) => setCategory(val)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>

                  {/* ডাইনামিক ক্যাটাগরি লুপ */}
                  {allCAtegory?.map((cat: any) => (
                    <SelectItem key={cat.id} value={cat.id}>
                      {cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Max Price Slider */}
            <div className="space-y-4">
              <div className="flex justify-between">
                <Label>Max Price/hr</Label>
                <span className="text-sm font-medium">${maxPrice}</span>
              </div>
              <Slider
                value={[maxPrice]}
                max={1000}
                step={10}
                onValueChange={(vals) => setMaxPrice(vals[0])}
              />
            </div>

            {/* Minimum Rating Filter */}
            <div className="space-y-2">
              <Label>Minimum Rating</Label>
              <Select value={minRating} onValueChange={(val) => setMinRating(val)}>
                <SelectTrigger>
                  <SelectValue placeholder="Any Rating" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">Any Rating</SelectItem>
                  <SelectItem value="5">5 Stars</SelectItem>
                  <SelectItem value="4">4+ Stars</SelectItem>
                  <SelectItem value="3">3+ Stars</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button className="w-full" onClick={handleApplyFilters}>Apply Filters</Button>

            {/* <Button variant="ghost" className="w-full text-xs" onClick={() => router.push(pathname)}>
              Reset Filters
            </Button> */}
            <Button
              variant="ghost"
              className="w-full text-xs"
              onClick={() => {
                setSearch("");
                setCategory("");
                setMaxPrice(500);
                setMinRating("");
                router.push(pathname);
              }}
            >
              Reset Filters
            </Button>
          </div>
        </aside>

        <main className="flex-1">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {response?.data?.length > 0 ? (
              response.data.map((tutor: any) => (
                <TutorCard key={tutor.id} tutor={tutor} data={data} />
              ))
            ) : (
              <div className="col-span-full text-center py-20 text-muted-foreground">
                No tutors found matching your criteria.
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
