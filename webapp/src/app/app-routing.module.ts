import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { AdminhomeComponent } from './components/admin/admin-home/admin-home.component';
import { AdminloginComponent } from './components/admin/admin-login/admin-login.component';
import { ParticipanthomeComponent } from './components/admin/participant/participant-home/participant-home.component';
import { ParticipantloginComponent } from './components/admin/participant/participant-login/participant-login.component';
import { ParticipantsignupComponent } from './components/admin/participant/participant-sign-up/participant-sign-up.component';
import { AdminVieweventComponent } from './components/admin/admin-viewevent/admin-viewevent.component';
import { WelcomeComponent } from './components/admin/welcome/welcome.component';
import { participantViewComponent } from './components/admin/participant-view/participant-view.component';
import { BookingViewComponent } from './components/admin/booking-view/booking-view.component';
// import { PaymentViewComponent } from './components/admin/payment-view/payment-view.component';
import { AddEventComponent } from './components/admin/add-event/add-event.component';
import { AddBookingComponent } from './components/admin/participant/add-booking/add-booking.component';
import { ViewEventComponent } from './components/admin/participant/view-event/view-event.component';
import { MyProfileComponent } from './components/admin/participant/my-profile/my-profile.component';
import { MyBookingComponent } from './components/admin/participant/my-booking/my-booking.component';
// import { MyPaymentComponent } from './components/admin/participant/my-payment/my-payment.component';
// import { AddPaymentComponent } from './components/admin/participant/add-payment/add-payment.component';
// import { PaymentOptionsComponent } from './components/admin/participant/payment-options/payment-options.component';


const routes: Routes = [
  {path:'',component:WelcomeComponent},
  {path: 'admin/home', component:AdminhomeComponent },
  {path:'admin/event',component:AdminVieweventComponent},
  {path:'admin/login',component:AdminloginComponent},
  {path:'admin/participant/veiwall',component:participantViewComponent},          
  {path:'admin/booking/veiwall',component:BookingViewComponent},
  // {path:'admin/payment/veiwall',component:PaymentViewComponent},
  {path:'admin/event/add',component:AddEventComponent},
  {path:'admin/updateEvent/:id',component:AddEventComponent},
  {path: 'participant/home', component:ParticipanthomeComponent },
  {path:'participant/signup',component:ParticipantsignupComponent},
  {path:'participant/login',component:ParticipantloginComponent},
  {path:'participant/placebooking/:id',component:AddBookingComponent},
 
  {path:'participant/event',component:ViewEventComponent},
  {path:'participant/myprofile',component:MyProfileComponent},
  {path:'participant/mybookings',component:MyBookingComponent},
  // {path:'participant/mypayment',component:MyPaymentComponent},
  // {path:'participant/addpayment',component:AddPaymentComponent},
  // {path:'participant/paymentoptions',component:PaymentOptionsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  
 }
