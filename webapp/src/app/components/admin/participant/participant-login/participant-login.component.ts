

import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EventManagementSystemService } from '../../../../service/eventmanagementsystem.service';
import { participant } from '../../../../class/participant';

@Component({
  selector: 'app-participant-login',
  templateUrl: './participant-login.component.html',
  styleUrls: ['./participant-login.component.css']
})
export class ParticipantloginComponent implements OnInit {
  participant: participant = new participant(0, "", "", "", "", "");
  username!: string;
  participantName: string | undefined;
  participantPhone!: string;
  userpassword!: string;
  participantId!: number;
  email!: string;

  constructor(private eventmanagementsystemservice: EventManagementSystemService, private route: Router, public activateRoute: ActivatedRoute) { }

  ngOnInit(): void {
    const participantData = sessionStorage.getItem("participant");
    sessionStorage.setItem('participant', JSON.stringify(participantData));
    // declare const sessionStorage: Storage;

    if (participantData) {
      this.participant = JSON.parse(participantData);
      // Your code to handle the participant data
      console.log('Participant data found:', participantData);
    } else {
      console.error('Participant data not found in sessionStorage');
    }

    // Call the method to retrieve participant data
    this.retrieveParticipantData();
  }

  private retrieveParticipantData(): void {
    // When retrieving participant data
    const storedParticipantData = sessionStorage.getItem('participantData');
    if (storedParticipantData) {
      const participant = JSON.parse(storedParticipantData);
      // Now you have the participant data
    }
  }

  Getlogin(): void {
    this.eventmanagementsystemservice.getlogin(this.participant).subscribe(
      data => {
        alert("Login Successfully");
        console.log("Response Data", data);
        sessionStorage.setItem("participant", JSON.stringify(data));
        this.route.navigateByUrl("/participant/home");
      },
      error => alert("Sorry Please Enter correct Username And Password")
    );
  }

  newregistration() {
    this.route.navigateByUrl("/participant/signup");
  }

  onSubmit() {
    this.route.navigateByUrl("/participant/home");
  }
}
