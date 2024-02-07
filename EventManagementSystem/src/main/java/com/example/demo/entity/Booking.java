package com.example.demo.entity;


import java.util.Date;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;

@Entity
@Table(name = "Bookings")
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "booking_id")
    private Long bookingId;

    @ManyToOne(targetEntity = Participants.class, cascade = { CascadeType.MERGE }, fetch = FetchType.EAGER)
    @JoinColumn(name = "participant_id", referencedColumnName = "participant_id")
    private Participants participants;

    @Column(name = "starts_time")
    private Date startTime;

    @Column(name = "event_date")
    private Date eventDate;

    @ManyToOne(targetEntity = Event.class, cascade = { CascadeType.MERGE }, fetch = FetchType.EAGER)
    @JoinColumn(name = "event_id", referencedColumnName = "event_id")
    private Event event;

    @Column(name = "noofevents")
    private double noofevents;

    @Column(name = "amount")
    private double amount;

    @NotBlank(message = "Order status cannot be blank")
    @Column(name = "status")
    private String status;

    public Booking() {
    }

   
    public Booking(Long bookingId, Participants participants, Date startTime, Date eventDate, Event event,
			double noofevents,  String status) {
		this.bookingId = bookingId;
		this.participants = participants;
		this.startTime = startTime;
		this.eventDate = eventDate;
		this.event = event;
		this.noofevents = noofevents;
		//this.amount = amount;
		this.status = status;
		calculateTotalPrice();
	}
    


	public Long getBookingId() {
		return bookingId;
	}


	public void setBookingId(Long bookingId) {
		this.bookingId = bookingId;
	}


	public Participants getParticipants() {
		return participants;
	}


	public void setParticipants(Participants participants) {
		this.participants = participants;
	}


	public Date getStartTime() {
		return startTime;
	}


	public void setStartTime(Date startTime) {
		this.startTime = startTime;
	}


	public Date getEventDate() {
		return eventDate;
	}


	public void setEventDate(Date eventDate) {
		this.eventDate = eventDate;
	}


	public Event getEvent() {
		return event;
		
	}


	public void setEvent(Event event) {
		this.event = event;
		calculateTotalPrice();
	}


	public double getNoofevents() {
		return noofevents;
	}


	public void setNoofevents(double noofevents) {
		this.noofevents = noofevents;
		calculateTotalPrice();
	}


	public double getAmount() {
		return amount;
	}


	public void setAmount(double amount) {
		this.amount = amount;
	}


	public String getStatus() {
		return status;
	}


	public void setStatus(String status) {
		this.status = status;
	}


	// Calculate total price based on menu item price and quantity
    public void calculateTotalPrice() {
        if (event != null) {
            amount = event.getPrice() * noofevents;
        } else {
            amount = 0.0;
        }
    }

    @Override
    public String toString() {
        return "Booking [bookingId=" + bookingId + ", participants=" + participants + ", startTime=" + startTime
                + ", eventDate=" + eventDate + ", noofevents=" + noofevents + ", event=" + event + ", amount=" + amount
                + ", status=" + status + "]";
    }

}
