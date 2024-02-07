package com.example.demo.service;

import java.util.List;

import com.example.demo.entity.Booking;

public interface BookingService {
    
    Booking getByBookingId(long bookingId);

    List<Booking> getBookingsByParticipantId(long participantId);

    List<Booking> getAllBookings();

    Booking saveBooking(Booking booking, long participantId, int eventId);

    void deleteBooking(long bookingId);
}
