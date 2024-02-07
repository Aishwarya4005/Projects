import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EventManagementSystemService } from '../../../../service/eventmanagementsystem.service';
import { participant } from '../../../../class/participant';

@Component({
  selector: 'app-participant-sign-up',
  templateUrl: './participant-sign-up.component.html',
  styleUrls: ['./participant-sign-up.component.css']
})
export class ParticipantsignupComponent implements OnInit {
  participant:participant=new participant(0,"","","","","")
  isEditable!: boolean;
  // participant!: any;
  constructor(public eventmanagementsystemservice:EventManagementSystemService,public route:Router,public activateRoute: ActivatedRoute){}

  ngOnInit(): void {
    this.activateRoute.paramMap.subscribe(()=>this.getuserbyid())
    this.activateRoute.paramMap.subscribe(() => this.getuserbyid())
  }
  
  getuserbyid(): void {
    const uidParam = this.activateRoute.snapshot.paramMap.get("uid");
  
    if (uidParam !== null) {
      const uid = parseFloat(uidParam);
  
      if (!isNaN(uid) && uid > 0) {
        this.isEditable = true;
  
        this.eventmanagementsystemservice.getuserbyid(uid).subscribe(data => {
          this.participant = data;
          console.log(this.participant);
        });
      } else {
        console.error('Invalid uid:', uid);
      }
    } else {
      console.error('uid is null');
    }
  }
  
  
  
  SaveUsers(){
    if(this.isEditable){
      this.eventmanagementsystemservice.updateUser(this.participant).subscribe(data=>{
        alert("Successfully updated "+this.participant.username)
        sessionStorage.clear()
        localStorage.clear()
        this.route.navigateByUrl("/participant/login")});
    }
    else{
      
    this.eventmanagementsystemservice.saveUser(this.participant).subscribe(data =>{
      alert("Successfully Register ")
      this.route.navigateByUrl("/participant/login")
    },
    error => alert("enter the user data / change the user name")
      );
      
  }

}
onSubmit() {
  this.route.navigateByUrl("/welcomeuser");

}
}

