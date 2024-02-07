import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EventManagementSystemService } from '../../../service/eventmanagementsystem.service';
import { Admin } from '../../../class/admin';

@Component({
  selector: 'app-admin-viewevent',
  templateUrl: './admin-viewevent.component.html',
  styleUrls: ['./admin-viewevent.component.css']
})
export class AdminVieweventComponent {
  event: any;
  hasSearchName!: boolean;
  searchName: string | null = null; // Initialize with null
  admin: Admin | undefined;
  p: number = 1;
  count: number = 4;
  add: any;

  constructor(private eventmanagementsystemservice: EventManagementSystemService, public router: Router, private activeRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activeRoute.paramMap.subscribe(() => this.getAllEvent());
    // this.activeRoute.paramMap.subscribe(() => (this.admin = JSON.parse(sessionStorage.getItem('admin'))));
    this.activeRoute.paramMap.subscribe(() => {
      const adminData = sessionStorage.getItem('admin');
      this.admin = adminData ? JSON.parse(adminData) : undefined;
    });
    
    this.checkSessionAndNavigate();
  }

  getAllEvent() {
    this.hasSearchName = this.activeRoute.snapshot.paramMap.has('modelEventname');
    if (this.hasSearchName) {
      this.searchName = this.activeRoute.snapshot.paramMap.get('modelEventname') || null; // Assign null if undefined
      console.log(this.searchName);
      this.eventmanagementsystemservice.getEventBymodelEventName(this.searchName).subscribe(
        (data: any) => {
          console.log(data);
          this.event = data;
        },
        (error) => {
          console.error(error);
          // Handle error here if needed
        }
      );
    } else {
      this.eventmanagementsystemservice.getAllEvent().subscribe(
        (data: any) => {
          console.log(data);
          this.event = data;
        },
        (error) => {
          console.error(error);
          // Handle error here if needed
        }
      );
    }
  }

  deleteEvent(id: number): void {
    console.log(id);
    if (confirm('Do you want to delete ?')) {
      this.eventmanagementsystemservice.deleteEvent(id).subscribe((data) => {
        console.log(data);
        this.getAllEvent();
      });
    }
  }

  updateEvent(id: number) {
    this.router.navigateByUrl('/admin/updateEvent/' + id);
  }

  addEvent(): void {
    this.router.navigateByUrl('/admin/event/add');
  }

  logout() {
    if (sessionStorage.getItem('admin')) {
      sessionStorage.clear();
      localStorage.clear();
      alert('Logout Successfully');
      this.router.navigateByUrl('/admin/login');
    } else {
      alert('No user logged in');
    }
  }

  checkSessionAndNavigate() {
    if (!this.admin) {
      this.router.navigateByUrl('/admin/login');
    }
  }
}





