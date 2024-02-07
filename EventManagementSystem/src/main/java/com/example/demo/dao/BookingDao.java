package com.example.demo.dao;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.demo.entity.Booking;

@Repository
public interface BookingDao extends JpaRepository<Booking, Long> {

    @Query(value = "SELECT * FROM Bookings u WHERE u.booking_id = ?", nativeQuery = true)
    Booking findByBookingId(long bookingId);

    List<Booking> findByParticipants_ParticipantId(long participantId);
    
    // Add other custom query methods as needed

}
