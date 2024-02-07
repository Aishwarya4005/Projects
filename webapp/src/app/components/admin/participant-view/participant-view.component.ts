import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EventManagementSystemService } from '../../../service/eventmanagementsystem.service';
import { Admin } from '../../../class/admin';
//import { ParticipantService} from '../../../participant.service';


@Component({
  selector: 'app-participant-view',
  templateUrl: './participant-view.component.html',
  styleUrls: ['./participant-view.component.css']
})
// ... Other imports and component decorator ...

export class participantViewComponent implements OnInit {
  participant: any;
  hasSearchName!: boolean;
  searchName: string = ""; // Initialize searchName with an empty string
  admin!: Admin;
  p: number = 1;
  count: number = 5;

  constructor(
    private eventmanagementsystemservice: EventManagementSystemService,
    public router: Router,
    private activeRoute: ActivatedRoute, 
    //private participantService: ParticipantService
  ) {}
  // constructor(private participantService: ParticipantService) {}

  ngOnInit(): void {
    this.activeRoute.paramMap.subscribe(() => this.getAllParticipant());
    this.admin = JSON.parse(sessionStorage.getItem("admin") ?? "{}");
    this.checkSessionAndNavigate();
  }

  getAllParticipant() {
    this.hasSearchName = this.activeRoute.snapshot.paramMap.has("username");
    if (this.hasSearchName) {
      this.searchName = this.activeRoute.snapshot.paramMap.get("username") ?? "";
      console.log(this.searchName);
      this.eventmanagementsystemservice
        .getParticipantByUsername(this.searchName)
        .subscribe((data) => {
          console.log(data);
          this.participant = data;
        });
    } else {
      this.eventmanagementsystemservice.getAllParticipant().subscribe((data) => {
        console.log(data);
        this.participant = data;
      });
    }
  }

  
  logout() {
    if (sessionStorage.getItem("admin")) {
      sessionStorage.clear()
      localStorage.clear()
      alert("Logout Successfully")
      this.router.navigateByUrl("/admin/login")
    }
    else {
      alert("No user loged in")
    }
  }
  checkSessionAndNavigate() {
    if (!this.admin) {
      this.router.navigateByUrl("/admin/login");
    }
  }
}





