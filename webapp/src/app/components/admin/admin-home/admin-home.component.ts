import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Admin } from '../../../class/admin';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminhomeComponent implements OnInit {
  admin!: Admin;

  constructor(private activateroute: ActivatedRoute, private route: Router) {}

  ngOnInit(): void {
    const adminString = sessionStorage.getItem('admin');
    if (adminString) {
      this.admin = JSON.parse(adminString);
    }
    this.checkSessionAndNavigate();
  }

  logout() {
    if (sessionStorage.getItem('admin')) {
      sessionStorage.clear();
      localStorage.clear();
      alert('Logout Successfully');
      this.route.navigateByUrl('/admin/login');
    } else {
      alert('No user logged in');
    }
  }

  checkSessionAndNavigate() {
    if (!this.admin) {
      this.route.navigateByUrl('/admin/login');
    }
  }
}
