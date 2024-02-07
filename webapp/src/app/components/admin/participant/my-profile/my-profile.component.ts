import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EventManagementSystemService } from '../../../../service/eventmanagementsystem.service';
import { participant } from '../../../../class/participant';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {
  username: any
  participant!: participant;
  isEditable: boolean = false;
 
  ngOnInit(): void {
    const participantString = sessionStorage.getItem("participant");
  
    if (participantString) {
      try {
        this.participant = JSON.parse(participantString);
      } catch (error) {
        console.error('Error parsing participant data:', error);
        // Handle the error, e.g., show an error message or redirect to login
      }
    } else {
      // Handle the case when participantString is null
      // You might want to add some error handling or redirect the user
      console.error('Participant data not found in sessionStorage');
    }
  
    this.checkSessionAndNavigate();
  }
  
  constructor(private eventmanagementsystem: EventManagementSystemService, public router: Router, private activeRoute: ActivatedRoute) { }

  getParticipantById() {
    const username = this.participant.username;

    console.log(username);
    if (username != null) {
      this.isEditable = true;
      this.eventmanagementsystem.getParticipantByUsername("username").subscribe(data => {
        this.participant = data;
        console.log(this.participant)
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