import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { EventManagementSystemService } from './service/eventmanagementsystem.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule} from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule , } from '@angular/material/sidenav';
import { AdminloginComponent } from './components/admin/admin-login/admin-login.component';
import { ParticipantsignupComponent } from './components/admin/participant/participant-sign-up/participant-sign-up.component';
import { ParticipanthomeComponent } from './components/admin/participant/participant-home/participant-home.component';
import { AdminVieweventComponent } from './components/admin/admin-viewevent/admin-viewevent.component';
import { WelcomeComponent } from './components/admin/welcome/welcome.component';
import { BookingViewComponent } from './components/admin/booking-view/booking-view.component';
// import { PaymentViewComponent } from './components/admin/payment-view/payment-view.component';
import { AddEventComponent } from './components/admin/add-event/add-event.component';
import { AddBookingComponent } from './components/admin/participant/add-booking/add-booking.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { AddPaymentComponent } from './components/admin/participant/add-payment/add-payment.component';
import { MyProfileComponent } from './components/admin/participant/my-profile/my-profile.component';
import { MyBookingComponent } from './components/admin/participant/my-booking/my-booking.component';
// import { MyPaymentComponent } from './components/admin/participant/my-payment/my-payment.component';
// import { PaymentOptionsComponent } from './components/admin/participant/payment-options/payment-options.component';
import { ParticipantloginComponent } from './components/admin/participant/participant-login/participant-login.component';
import { AdminhomeComponent } from './components/admin/admin-home/admin-home.component';
import { participantViewComponent } from './components/admin/participant-view/participant-view.component';
import { ViewEventComponent } from './components/admin/participant/view-event/view-event.component';
import { NgxPaginationModule } from 'ngx-pagination';



@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    AdminhomeComponent,
    AdminloginComponent,
    AdminVieweventComponent,
    ParticipantloginComponent,
    ParticipantsignupComponent,
    ParticipanthomeComponent,
    participantViewComponent,
    BookingViewComponent,
    // PaymentViewComponent,
    AddEventComponent,
    AddBookingComponent,
    ViewEventComponent,
    // AddPaymentComponent,
    MyProfileComponent,
    MyBookingComponent,
    // MyPaymentComponent,
    // PaymentOptionsComponent
  ],

  imports: [
BrowserModule,
AppRoutingModule,
HttpClientModule,
FormsModule,
MatSidenavModule,
MatToolbarModule,
MatButtonModule,
MatIconModule,
BrowserAnimationsModule,
NgxPaginationModule
  ],
  providers: [  EventManagementSystemService],
  bootstrap: [AppComponent]
})
export class AppModule { }
