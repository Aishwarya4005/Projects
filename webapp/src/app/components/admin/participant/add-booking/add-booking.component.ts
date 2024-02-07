import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Booking } from '../../../../class/booking';
import { participant } from '../../../../class/participant';
import { Event } from '../../../../class/event';
import { EventManagementSystemService } from '../../../../service/eventmanagementsystem.service';

@Component({
  selector: 'app-add-booking',
  templateUrl: './add-booking.component.html',
  styleUrls: ['./add-booking.component.css']
})
export class AddBookingComponent implements OnInit {
  event: Event = new Event(0, '', 0, '', 0, '');
  participant!: participant;
  booking!: Booking;
  noofevents = 1; // Replace with the initial value you prefer
  isEditable!: boolean;

  constructor(
    private activeRoute: ActivatedRoute,
    private http: HttpClient,
    public router: Router,
    private eventmanagementsystemservice: EventManagementSystemService
  ) {}

  ngOnInit(): void {
    this.activeRoute.paramMap.subscribe((paramMap) => {
      const participantString = sessionStorage.getItem("participant");
      this.participant = participantString ? JSON.parse(participantString) : {} as participant;
    });

    this.getEventById();
  }

  getEventById() {
    const idParam = this.activeRoute.snapshot.paramMap.get("id");
    const event_id = idParam ? parseInt(idParam, 10) : 0;

    console.log(event_id);

    if (event_id > 0) {
      this.isEditable = true;
      this.eventmanagementsystemservice.geteventbyid(event_id).subscribe(
        (data: any) => {
          this.event = data;
          console.log('Event:', this.event);
        },
        (error: any) => {
          console.error('Error getting event:', error);
        }
      );
    }
  }

  logout() {
    if (sessionStorage.getItem("participant")) {
      sessionStorage.clear();
      localStorage.clear();
      alert("Logout Successfully");
      this.router.navigateByUrl("/participant/login");
    } else {
      alert("No user logged in");
    }
  }

  placeBooking() {
    if (this.event && this.participant && this.noofevents !== undefined && this.noofevents > 0) {
      const eventId = this.event.event_id;
      const participantId = this.participant.participantId;
      const quan = { noofevents: +this.noofevents };

      this.eventmanagementsystemservice.placeBooking(eventId, participantId, quan).subscribe(
        (response: { bookingId: string }) => {
          console.log('Booking placed successfully', response);
          alert('Booking Successfully Placed');
          localStorage.setItem('generatedBookingId', response.bookingId);
          this.router.navigateByUrl('/participant/payment-options');
        },
        (error: any) => {
          console.error('Error placing booking', error);
          alert('Booking failed. Please try again.');
        }
      );
    } else {
      console.error('Invalid noofevents or missing event/participant');
    }
  }
}
