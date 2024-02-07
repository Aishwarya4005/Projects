import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EventManagementSystemService } from '../../../service/eventmanagementsystem.service';
import { Admin } from '../../../class/admin';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminloginComponent implements OnInit {
  
  admin: Admin = new Admin(0, "", "", "", "");
  admins!: Admin | null;

  constructor(
    private eventmanagementsystemservice: EventManagementSystemService,
    private route: Router,
    public activateRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const adminData = sessionStorage.getItem("admin");
    this.admins = adminData ? JSON.parse(adminData) : null;
  }

  Getlogin(): void {
    this.eventmanagementsystemservice.getadminlogin(this.admin).subscribe(
      data => {
        alert("Login Successfully");
        console.log("login response" + data);

        sessionStorage.setItem("admin", JSON.stringify(data));

        this.route.navigateByUrl("/admin/home");
      },
      error => alert("Sorry, Please Enter correct Username And Password")
    );
  }

  onSubmit() {
    this.route.navigateByUrl("/admin/home");
  }
}
