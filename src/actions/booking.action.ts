"use server";

import { BookingData, bookingService } from "@/services/booking.service";

export const getBookings = async () => {
    return await bookingService.getBookings();
};
export const createBooking = async (updateData: Partial<BookingData>, revalidate?: number) => {
    return await bookingService.createBooking(updateData, { revalidate });
};
export const createBookingIntoDB = async (updateData: Partial<BookingData>, revalidate?: number) => {
    return await bookingService.createBookingIntoDB(updateData, { revalidate });
};