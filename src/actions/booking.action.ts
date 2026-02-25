"use server";

import { bookingService } from "@/services/booking.service";

export const getBookings = async () => {
    return await bookingService.getBookings();
};