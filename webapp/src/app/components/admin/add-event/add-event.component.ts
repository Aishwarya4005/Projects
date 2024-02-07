import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Admin } from '../../../class/admin';
import { Event } from '../../../class/event';  // Import Event class
import { EventManagementSystemService } from '../../../service/eventmanagementsystem.service';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css']
})
export class AddEventComponent implements OnInit {
deleteaddevent(arg0: any) {
throw new Error('Method not implemented.');
}
tempevent: any;
addevent: any;
count: string|number|undefined;
logout() {
throw new Error('Method not implemented.');
}
  // event: Event = new Event(0, "", 0, "");
  event: Event = new Event(0, '', 0, '', 0, '');  

  isEditable: boolean = false;  // Initialize isEditable
  admin: Admin | undefined;

  constructor(
    private eventmanagementsystemservice:EventManagementSystemService,
    private router: Router,
    private activateRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activateRoute.paramMap.subscribe(() => {
      this.getEventById(); 
    });
     this.admin = JSON.parse(sessionStorage.getItem("admin") ?? "null");
    const adminString = sessionStorage.getItem("admin");
    this.admin = adminString ? JSON.parse(adminString) : undefined;

    this.checkSessionAndNavigate();
  }

  onSubmit() {
    console.log(this.event);
    if (this.isEditable) {
      // this.eventmanagementsystemservice.updateEvent(this.event).subscribe((data: any) => {
      //   console.log(data);
      //   alert("The event is updated");
      //   this.router.navigateByUrl("/admin/event");
      // });
      this.eventmanagementsystemservice.updateEvent(this.event).subscribe(
        (data: Event) => {
          console.log(data);
          alert("The event is updated");
          this.router.navigateByUrl("/admin/event");
        },

        (error) => {
          console.error("Error updating event:", error);
          // Handle the error, for example, show an error message
        }
      );
      

    } else {
      this.eventmanagementsystemservice.SaveEvent(this.event).subscribe((data: any) => {
        console.log(data);
        alert("The event is added");
        this.router.navigateByUrl("/admin/event");
      });
    }
  }

 

  getEventById() {
    const item_id = parseInt(this.activateRoute.snapshot.paramMap.get("id") || "0", 10);
  
    console.log(item_id);
    if (item_id > 0) {
      this.isEditable = true;
      this.eventmanagementsystemservice.geteventbyid(item_id).subscribe(
        (data: Event) => {
          this.event = data;
          console.log(this.event);
        },
        (error) => {
          console.error("Error fetching event by ID:", error);
          // Handle the error, for example, show an error message
        }
      );
    }
  }
  

  checkSessionAndNavigate() {
    if (!this.admin) {
      this.router.navigateByUrl("/admin/login");
    }
  }
}
