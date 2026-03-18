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

export const getMyBookingsFromDB = async () => {
    return await bookingService.getMyBookingsFromDB();
};
export const cancelBookingFromDB = async (bookingId: string, revalidate?: number) => {
    return await bookingService.cancelBookingFromDB(bookingId);
};

export const updateBookingFromDB = async (bookingId: string, revalidate?: number) => {
    return await bookingService.updateBookingFromDB(bookingId);
};