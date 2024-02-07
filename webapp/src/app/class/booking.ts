import { participant } from "./participant"; // Ensure correct import name
import { Event } from "./event";

export class Booking {
  participant: participant;
  eventDate: Date;
  startTime: string;
  event: Event;
   noofevents:any;
  bookingId: number;
  totalPrice: any;
  totalAmount: any;

  constructor(
    bookingId: number,
    participant: participant,
    eventDate: Date,
    startTime: string, // Assuming orderTime is a string, adjust accordingly
    event: Event,
    noofevents:any,

  ) {
    this.bookingId = bookingId;
    this.participant = participant;
    this.eventDate = eventDate;
    this.startTime = startTime;
    this.event = event;
    this.noofevents=noofevents;
  };
}

