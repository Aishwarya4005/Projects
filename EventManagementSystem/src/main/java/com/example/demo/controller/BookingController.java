package com.example.demo.controller;

import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


import com.example.demo.entity.Booking;
import com.example.demo.exception.BookingNotFoundException;

import com.example.demo.service.BookingService;



@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/Bookings")
public class BookingController {

 private final BookingService bookingService;

 @Autowired
 public BookingController(BookingService bookingService) {
     this.bookingService = bookingService;
 }

 @GetMapping
 public ResponseEntity<List<Booking>> getAllBookings() {
     List<Booking> bookings = bookingService.getAllBookings();
     System.out.println("Returning all bookings: " + bookings);
     return ResponseEntity.ok(bookings);
 }

 @GetMapping("/id/{bookingId}")
 public ResponseEntity<Booking> getBookingById(@PathVariable Long bookingId) {
     System.out.println("Received a request to fetch booking by ID: " + bookingId);
     Booking booking = bookingService.getByBookingId(bookingId);
     if (booking == null) {
         System.out.println("Booking not found for ID: " + bookingId);
         throw new BookingNotFoundException("Booking with ID " + bookingId + " not found.");
     }
     System.out.println("Returning booking for ID " + bookingId + ": " + booking);
     return ResponseEntity.ok(booking);
 }

 @GetMapping("/participant/{participantId}")
 public ResponseEntity<?> getBookingsByParticipantId(@PathVariable Long participantId) {
     System.out.println("Received a request to fetch bookings by participant ID: " + participantId);
     try {
         List<Booking> bookings = bookingService.getBookingsByParticipantId(participantId);
         if (bookings.isEmpty()) {
             System.out.println("No bookings found for participant ID: " + participantId);
             return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
         }
         System.out.println("Returning bookings for participant ID " + participantId + ": " + bookings);
         return ResponseEntity.ok(bookings);
     } catch (Exception e) {
         System.out.println("An error occurred while fetching bookings for participant ID " + participantId + ": " + e.getMessage());
         return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                 .body("An error occurred: " + e.getMessage());
     }
 }

 @PostMapping("/create/{eventId}/{participantId}")
 public ResponseEntity<Booking> createBooking(@RequestBody Booking booking, @PathVariable long participantId, @PathVariable int eventId) {
     System.out.println("Received a request to create a booking for participant ID: " + participantId + " and event ID: " + eventId);
     Booking savedBooking = bookingService.saveBooking(booking, participantId, eventId);
     System.out.println("Booking created successfully: " + savedBooking);
     return ResponseEntity.ok(savedBooking);
 }

 @DeleteMapping("/delete/{bookingId}")
 public ResponseEntity<Void> deleteBooking(@PathVariable Long bookingId) {
     System.out.println("Received a request to delete booking by ID: " + bookingId);
     bookingService.deleteBooking(bookingId);
     System.out.println("Booking deleted successfully for ID: " + bookingId);
     return ResponseEntity.noContent().build();
 }
}
