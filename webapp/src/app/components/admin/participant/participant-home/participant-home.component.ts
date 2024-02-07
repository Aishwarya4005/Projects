import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { participant } from '../../../../class/participant';
import { EventManagementSystemService } from '../../../../service/eventmanagementsystem.service';
@Component({
  selector: 'app-participant-home',
  templateUrl: './participant-home.component.html',
  styleUrls: ['./participant-home.component.css']
})
export class ParticipanthomeComponent implements OnInit {
  participant!: participant;
  constructor(private eventmanagementsystem:EventManagementSystemService,public router:Router, private activeRoute:ActivatedRoute) { }
    
    ngOnInit(): void {
      this.activeRoute.paramMap.subscribe(() => {
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
      });
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