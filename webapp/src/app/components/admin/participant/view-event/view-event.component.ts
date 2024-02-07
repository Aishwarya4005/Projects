

import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { participant } from '../../../../class/participant';
import { EventManagementSystemService } from '../../../../service/eventmanagementsystem.service';

@Component({
  selector: 'app-view-event',
  templateUrl: './view-event.component.html',
  styleUrls: ['./view-event.component.css']
})
export class ViewEventComponent {
tempevent: any;
  count :number=5;
p: any;
  event:any;
  participant!: participant;
  hasSearchName!: boolean;
    searchName!: string;
deleteEvent: any;
    constructor(private eventmanagementsystemservice:EventManagementSystemService,public router:Router, private activeRoute:ActivatedRoute) { }
    ngOnInit(): void {
      const participantString = sessionStorage.getItem("participant");
    
      if (participantString) {
        this.participant = JSON.parse(participantString);
        this.activeRoute.paramMap.subscribe(() => this.getAllEvent());
      } else {
        // Handle the case when participantString is null
        // You might want to add some error handling or redirect the user
        console.error('Participant data not found in sessionStorage');
      }
    
      this.checkSessionAndNavigate();
    }
    
  getAllEvent() {
      this.hasSearchName = this.activeRoute.snapshot.paramMap.has("modelEventName");
    
      // Provide a default value if modelEventName is not present in the route
      this.searchName = this.activeRoute.snapshot.paramMap.get("modelEventName") ?? '';
    
      console.log(this.searchName);
    
      if (this.hasSearchName) {
        this.eventmanagementsystemservice.getAllEvent().subscribe((data: any) => {
          console.log(data);
          this.event = data;
        });
      } else {
        this.eventmanagementsystemservice.getAllEvent().subscribe(data => {
          console.log(data);
          this.event = data;
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

   bookingEvent(id:number)
  {
    this.router.navigateByUrl("participant/placebooking/"+id);
  
  }
  checkSessionAndNavigate() {
    if (!this.participant) {
      this.router.navigateByUrl("/participant/login");
    }

  }
}