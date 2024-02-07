package com.example.demo.service;


import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.dao.BookingDao;
import com.example.demo.entity.Booking;
import com.example.demo.entity.Event;
import com.example.demo.entity.Participants;

@Service
public class BookingServiceImpl implements BookingService {

    private final BookingDao bookingDao;
    private final ParticipantService participantService;
    private final EventService eventService;

    @Autowired
    public BookingServiceImpl(BookingDao bookingDao, ParticipantService participantService, EventService eventService) {
        this.bookingDao = bookingDao;
        this.participantService = participantService;
        this.eventService = eventService;
    }

    @Override
    public Booking getByBookingId(long bookingId) {
        return bookingDao.findByBookingId(bookingId);
    }

    @Override
    public List<Booking> getBookingsByParticipantId(long participantId) {
        return bookingDao.findByParticipants_ParticipantId(participantId);
    }

    @Override
    public List<Booking> getAllBookings() {
        return bookingDao.findAll();
    }

    @Override
    public Booking saveBooking(Booking booking, long participantId, int eventId) {
        Participants participant = participantService.findParticipantById(participantId)
                .orElseThrow(() -> new IllegalArgumentException("Invalid participant ID"));

        Event event = eventService.findByEventId(eventId)
                .orElseThrow(() -> new IllegalArgumentException("Invalid event ID"));

        booking.setEventDate(new Date());
        booking.setStartTime(new Date());
        booking.calculateTotalPrice();
        booking.setStatus("Not Paid");
        booking.setParticipants(participant);
        booking.setEvent(event);
        booking.setAmount(booking.getAmount());
        return bookingDao.save(booking);
    }

    @Override
    public void deleteBooking(long bookingId) {
        bookingDao.deleteById(bookingId);
    }
}
