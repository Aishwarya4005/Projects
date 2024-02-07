
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { participant } from '../../../../class/participant';
import { EventManagementSystemService } from '../../../../service/eventmanagementsystem.service';

@Component({
  selector: 'app-my-booking',
  templateUrl: './my-booking.component.html',
  styleUrls: ['./my-booking.component.css']
})
export class MyBookingComponent implements OnInit {
  p: number = 1;
  count: number = 10;
  isEditable!: boolean;
  booking: any
  participant!: participant;
  constructor(private eventmanagementsystemservice: EventManagementSystemService, private router: Router, private activateRoute: ActivatedRoute) { }

  ngOnInit(): void {
    const participantString = sessionStorage.getItem("participant");
  
    if (participantString) {
      this.participant = JSON.parse(participantString);
      this.activateRoute.paramMap.subscribe(() => this.getBookingbyparticipantid());
    } else {
      // Handle the case when participantString is null
      // You might want to add some error handling or redirect the user
      console.error('Participant data not found in sessionStorage');
    }
  
    this.checkSessionAndNavigate();
  }
  
  getBookingbyparticipantid() {
    const cust_id = this.participant.participantId;

    console.log(cust_id);
    if (cust_id > 0) {
      this.isEditable = true;
      this.eventmanagementsystemservice.getbookingbyparticipantid(cust_id).subscribe((data: any) => {
        this.booking = data;
        console.log(this.booking)
      });
    }

  }
 
  logout() {
    if (sessionStorage.getItem("participant")) {
      sessionStorage.clear()
      localStorage.clear()
      alert("Logout Successfully")
      this.router.navigateByUrl("/participant/login")
    }
    else {
      alert("No user loged in")
    }
  }
  checkSessionAndNavigate() {
    if (!this.participant) {
      this.router.navigateByUrl("/participant/login");
    }

  }
}
