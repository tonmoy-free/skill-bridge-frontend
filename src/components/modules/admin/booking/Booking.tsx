"use client";

import {
    MoreHorizontal,
    ShieldCheck,
    Trash2,
    Search,
    ChevronLeft,
    ChevronRight,
    UserCog,
} from "lucide-react";
import { useEffect } from "react";
import { getBookings } from "@/actions/booking.action";

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import React, { use, useState } from "react";
import { cn } from "@/lib/utils";
import { set } from "zod";

// Types based on your Prisma Schema
export type Booking = {
    id: string;
    [key: string]: any;
};

export default function BookingPage() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [booking, setBooking] = useState<Booking[]>([]);
    const [totalBooking, setTotalBooking] = useState(0);
    const [totalPagesState, setTotalPagesState] = useState(1);

    useEffect(() => {
        const loadBookings = async () => {
            try {
                setLoading(true);
                setError(null);
                const response = await getBookings();
                console.log("Full API Response:", response);
                console.log("Response Data Type:", typeof response.data);
                console.log("Response Data:", response.data);
                
                // Handle the response structure { data, error }
                if (response.error) {
                    setError(response.error.message);
                    setBooking([]);
                    return;
                }

                let bookingsArray: Booking[] = [];

                // If data is an array, use it directly
                if (Array.isArray(response.data)) {
                    bookingsArray = response.data as Booking[];
                } 
                // If data has a bookings property (array)
                else if (response.data?.bookings && Array.isArray(response.data.bookings)) {
                    bookingsArray = response.data.bookings as Booking[];
                }
                // If data has a data property (nested), extract it
                else if (response.data?.data && Array.isArray(response.data.data)) {
                    bookingsArray = response.data.data as Booking[];
                }
                // If data has results property
                else if (response.data?.results && Array.isArray(response.data.results)) {
                    bookingsArray = response.data.results as Booking[];
                }
                // If data is an object with numeric keys (object array)
                else if (response.data && typeof response.data === 'object' && !Array.isArray(response.data)) {
                    bookingsArray = Object.values(response.data).filter(item => item && typeof item === 'object') as Booking[];
                }
                else {
                    console.warn("Unexpected response structure:", response.data);
                    setError("Unable to parse bookings data");
                }

                console.log("Parsed Bookings Array:", bookingsArray);
                setBooking(bookingsArray);
                setTotalBooking(bookingsArray.length);
            } catch (err) {
                console.error("Error loading bookings:", err);
                setError(err instanceof Error ? err.message : "Failed to load bookings");
                setBooking([]);
            } finally {
                setLoading(false);
            }
        };
        loadBookings();
    }, []);

    console.log("Bookings state:", booking);

    const [searchTerm, setSearchTerm] = React.useState("");
    const [currentPage, setCurrentPage] = React.useState(1);
    const [itemsPerPage, setItemsPerPage] = React.useState<number>(10); // server limit param

    // client-side filtering within current page
    const filteredBooking = booking.filter((item) =>
        String(item.id).toLowerCase().includes(searchTerm.toLowerCase())
    );

    const totalPages = Math.max(1, totalPagesState || Math.ceil(totalBooking / itemsPerPage));
    const indexOfFirstItem = (currentPage - 1) * itemsPerPage;
    const startCount = totalBooking === 0 ? 0 : indexOfFirstItem + 1;
    const endCount = totalBooking === 0 ? 0 : Math.min(indexOfFirstItem + filteredBooking.length, totalBooking);
    const currentItems = filteredBooking;
    return (
        <div className="w-full p-6 space-y-6 bg-white dark:bg-slate-950 min-h-screen">
            {/* Header Area */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">All Booking</h2>
                    <p className="text-muted-foreground">All booking that are currently active or pending.</p>
                </div>
                <Button className="w-fit cursor-pointer">
                    <UserCog className="mr-2 h-4 w-4 cursor-pointer" /> Create Booking
                </Button>

                {/* Filter Bar */}
            </div>
            <div className="flex items-center relative max-w-sm">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                    placeholder="Search by name or email..."
                    // value={searchTerm}
                    // onChange={(e) => {
                    //     setSearchTerm(e.target.value);
                    //     setCurrentPage(1); // Reset to page 1 on search
                    // }}
                    className="pl-10"
                />
            </div>

            {/* Per-page selector */}
            <div className="flex items-center gap-3">
                <label className="text-sm text-muted-foreground">Per page:</label>
                <select
                    // value={itemsPerPage}
                    // onChange={(e) => {
                    //     const v = parseInt(e.target.value, 10) || 10;
                    //     setItemsPerPage(v);
                    //     setCurrentPage(1);
                    // }}
                    className="px-2 py-1 rounded border bg-white dark:bg-slate-900 text-sm"
                >
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                    <option value={30}>30</option>
                    <option value={50}>50</option>
                    <option value={100}>100</option>
                </select>
            </div>

            {/* Manual Table Implementation */}
            <div className="rounded-xl border shadow-sm overflow-hidden">
                <Table>
                    <TableHeader className="bg-slate-50 dark:bg-slate-900">
                        <TableRow>
                            <TableHead className="w-[200px]">Date & Time</TableHead>
                            <TableHead>Student</TableHead>
                            <TableHead>Tutor</TableHead>
                            <TableHead>Duration</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {loading ? (
                            <TableRow>
                                <TableCell colSpan={5} className="h-32 text-center text-muted-foreground">
                                    Loading bookings...
                                </TableCell>
                            </TableRow>
                        ) : error ? (
                            <TableRow>
                                <TableCell colSpan={5} className="h-32 text-center text-rose-600">
                                    {error}
                                </TableCell>
                            </TableRow>
                        ) : currentItems.length > 0 ? (
                            currentItems.map((item) => (
                                <TableRow key={item.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-900/50">
                                    <TableCell>
                                        <div className="flex flex-col">
                                            <span className="font-semibold text-slate-900 dark:text-slate-100 text-sm">
                                                {item.date ? new Date(item.date).toLocaleDateString() : "-"}
                                            </span>
                                            <span className="text-xs text-muted-foreground">
                                                {item.startTime} - {item.endTime}
                                            </span>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex flex-col">
                                            <span className="font-semibold text-slate-900 dark:text-slate-100 text-sm">
                                                {item.student?.name || "-"}
                                            </span>
                                            <span className="text-xs text-muted-foreground">
                                                {item.student?.email || "-"}
                                            </span>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex flex-col">
                                            <span className="font-semibold text-slate-900 dark:text-slate-100 text-sm">
                                                Tutor
                                            </span>
                                            <span className="text-xs text-muted-foreground">
                                                Fee: ৳{item.tutor?.hourlyFee || "-"}/hour
                                            </span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-sm">
                                        {item.duration} mins
                                    </TableCell>
                                    <TableCell>
                                        <Badge
                                            className={cn(
                                                "rounded-md px-2 py-0.5 border-none",
                                                item.status === "BOOKED" || item.status === "CONFIRMED"
                                                    ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                                                    : item.status === "PENDING"
                                                    ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                                                    : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                                            )}
                                        >
                                            {item.status || "PENDING"}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" className="h-8 w-8 p-0">
                                                    <MoreHorizontal className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end" className="w-48">
                                                <DropdownMenuLabel>Booking Actions</DropdownMenuLabel>
                                                <DropdownMenuItem onClick={() => navigator.clipboard.writeText(item.id)}>
                                                    Copy ID
                                                </DropdownMenuItem>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem className="cursor-pointer">
                                                    <ShieldCheck className="mr-2 h-4 w-4 text-blue-500" /> View Details
                                                </DropdownMenuItem>
                                                <DropdownMenuItem className="cursor-pointer text-rose-600 focus:text-rose-600 focus:bg-rose-50 dark:focus:bg-rose-950">
                                                    <Trash2 className="mr-2 h-4 w-4" /> Cancel Booking
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={5} className="h-32 text-center text-muted-foreground">
                                    No bookings found.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* Custom Pagination Controls */}
            <div className="flex items-center justify-between px-2">
                <p className="text-sm text-muted-foreground">
                    Showing {startCount} to {endCount} of {totalBooking} bookings
                </p>
                <div className="flex items-center space-x-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1 || totalBooking === 0}
                    >
                        <ChevronLeft className="h-4 w-4 mr-1" /> Previous
                    </Button>
                    <div className="flex items-center gap-1">
                        {Array.from({ length: totalPages }, (_, i) => (
                            <Button
                                key={i + 1}
                                variant={currentPage === i + 1 ? "default" : "outline"}
                                size="sm"
                                className="h-8 w-8 p-0"
                                onClick={() => setCurrentPage(i + 1)}
                            >
                                {i + 1}
                            </Button>
                        ))}
                    </div>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages || totalBooking === 0}
                    >
                        Next <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                </div>
            </div>
        </div>
    );
}