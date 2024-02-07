import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EventManagementSystemService } from '../../../service/eventmanagementsystem.service';
import { Admin } from '../../../class/admin';

@Component({
  selector: 'app-booking-view',
  templateUrl: './booking-view.component.html',
  styleUrls: ['./booking-view.component.css']
})
export class BookingViewComponent {


  booking : any;
  hasSearchId!: boolean;
  searchId!: number;
  p: number = 1;
  count: number = 5;
  admin!: Admin;

  constructor(private eventmanagementsystemService:EventManagementSystemService,public router:Router, private activeRoute:ActivatedRoute) { }
  ngOnInit(): void {
    this.activeRoute.paramMap.subscribe(() => {
      const adminString = sessionStorage.getItem("admin");
  
      if (adminString) {
        try {
          this.admin = JSON.parse(adminString);
        } catch (error) {
          console.error('Error parsing admin data:', error);
          // Handle the error, e.g., show an error message or redirect to login
        }
      } else {
        // Handle the case when adminString is null
        // You might want to add some error handling or redirect the user
        console.error('Admin data not found in sessionStorage');
      }
  
      this.getAllBookings();
      this.checkSessionAndNavigate();
    });
  }
  checkSessionAndNavigate() {
    throw new Error('Method not implemented.');
  }
  
  
  getAllBookings(): void {
    // throw new Error('Method not implemented.');
  this.hasSearchId = this.activeRoute.snapshot.paramMap.has("BookingId");
     if(this.hasSearchId)
     {this.searchId  = Number(this.activeRoute.snapshot.paramMap.get("BookingId"));
      console.log(this.searchId)
      this.eventmanagementsystemService['getbookingbyid'](this.searchId).subscribe((data: any)=>{
      console.log(data);
      this.booking= data;
      })
    }
    else{
    this.eventmanagementsystemService.getAllBooking().subscribe((data: any)=>{
      console.log(data);
      this.booking=data;
    });
  }
  }
  
  deleteBooking(BookingId: number): void {
    console.log(BookingId);
    if (confirm('Do you want to delete?')) {
      this.eventmanagementsystemService.deleteBooking(BookingId).subscribe(data => {
        console.log(data);
        this.getAllBookings();
      });
    }
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
}



