import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Admin } from '../class/admin';
import { Event } from '../class/event';
// import { Payment } from '../class/payment';
import { participant } from '../class/participant';
import { Booking } from '../class/booking';


@Injectable({
  providedIn: 'root'
})
export class EventManagementSystemService {
  [x: string]: any;
  apiUrl: any;
 
  private newparticipanturl = "http://localhost:8080/participant/signup";
  private viewparticipantbyidurl = "http://localhost:8080/participant/id";
  private loginparticipanturl =  "http://localhost:8080/participant/login";
  private loginadminurl =  "http://localhost:8080/admin/login";
  private vieweventurL = "http://localhost:8080/Event/event";
  private eventUpdateurl = "http://localhost:8080/Event/event/update";
  private eventsaveURl = "http://localhost:8080/Event/event";
  private eventdeleteURl = "http://localhost:8080/Event/delete";
  private viewuserbyusernameurl = "http://localhost:8080/participant/username";
  private participantdeleteURl = "http://localhost:8080/participant/delete";
  private viewallbookingurl = "http://localhost:8080/Bookings"; 
  private viewparticipanturl = "http://localhost:8080/participant/showparticipant"; 
  private deletebookingurl = "http://localhost:8080/Bookings/delete"; 
  private viewpaybybookingidurl = "http://localhost:8080/payments/bookingId";
  private viewpaybyparticipantidurl = "http://localhost:8080/payments/participant";
  private viewallpayurl="http://localhost:8080/payments";
  private deletebypayidurl ="http://localhost:8080/payments/delete";
  private addbookingurl ="http://localhost:8080/Bookings/create";
  private addpaymenturl = "http://localhost:8080/payments";
  private viewalleventsurl="http://localhost:8080/Event/showevents";
  private viewbookingbyparticipantidurl="http://localhost:8080/Bookings/participant";
  constructor(private http:HttpClient) { }


  //SignUP-participant
  saveUser(participant: participant): Observable<participant> {
    const httpOptions = { 
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'auth-token',
        'Access-Control-Allow-Origin': '*'
      })
    };
    return this.http.post<participant>(this.newparticipanturl, participant, httpOptions);
  }
  
  //Login-participant
  getlogin(participant: participant): Observable<participant> {
    console.log(participant);
    return this.http.post<participant>(`${this.loginparticipanturl}`, participant);
  }
  //GetUserById
  getuserbyid(uid: number):Observable<participant>  {
    const uidUrl = this.viewparticipantbyidurl + "/" + uid;
    return this.http.get<participant>(uidUrl);
  }

  updateUser(participant: participant): Observable<participant> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'auth-token',
        'Access-Control-Allow-Origin': '*'
      })
    };
    return this.http.put<participant>(this.viewparticipanturl + `/${participant}`, participant, httpOptions);
  }


 
  //Login-Admin
  getadminlogin(admin: Admin): Observable<Admin> {
    console.log(admin);
    return this.http.post<Admin>(`${this.loginadminurl}`, admin);
  }

  updateEvent(event: Event): Observable<Event> {
    const headers = { 'content-type': 'application/json' };
    const body = JSON.stringify(event);
    return this.http.put<Event>(this.eventUpdateurl, body, { 'headers': headers });
  }
  //add event
  SaveEvent(event:Event):Observable<any>
  {
    const httpOptions = {
      headers : new HttpHeaders({
          'Content-Type' : 'application/json',
          'Authorization' : 'auth-token',
          'Access-Control-Allow-Origin' : '*'
      })
    };
    return  this.http.post<Event>(this.eventsaveURl,event,httpOptions);
  }
//GeteventById
geteventbyid(uid: number):Observable<Event>  {
  const uidUrl = this.eventsaveURl + "/" + uid;
  return this.http.get<Event>(uidUrl);
  
}
//get Menu by modelEventName
  getEventBymodelEventName(modelEventName:any):Observable<Event>
  {
    const searchURL =   "http://localhost:8080/event/event/modelEventName"+"/"+ modelEventName;
    return  this.http.get<Event>(searchURL);
  }
//getallevent
  getAllEvent():Observable<any>
  {
   return this.http.get(this.viewalleventsurl);
  }
//getevent
  getEvent():Observable<any>{
    return this.http.get(this.vieweventurL);
  }

  //get all participate
getAllParticipant():Observable<any>
{
 return this.http.get(this.viewparticipanturl);
}

//delete Event by ID
  deleteEvent(id: number) {
   
    const httpOptions = {
      headers : new HttpHeaders({
          'Content-Type' : 'application/json',
          'Authorization' : 'auth-token',
          'Access-Control-Allow-Origin' : '*'
      })
    };
    return  this.http.delete<Event>(this.eventdeleteURl+`/${id}`,httpOptions);
  }

//Get participant by username
getParticipantByUsername(username:String):Observable<participant>  {
  const uidUrl = this.viewuserbyusernameurl + "/" + username;
  return this.http.get<participant>(uidUrl);
}

//delete participate by id


deleteParticipant(id: number) {
   
  const httpOptions = {
    headers : new HttpHeaders({
        'Content-Type' : 'application/json',
        'Authorization' : 'auth-token',
        'Access-Control-Allow-Origin' : '*'
    })
  };
  return  this.http.delete<participant>(this.participantdeleteURl+`/${id}`,httpOptions);
}
//GetbookingById
getBookingById(bookingId: number): Observable<any> {
  //const uidUrl = `this.viewallbookingurl/${bookingId}`;
  return this.http.get(`${this.viewallbookingurl}/id/${bookingId}`);
  //return this.http.get<Booking>(uidUrl);
}
//GetBookingByParticipantId
getbookingbyparticipantid(participantId: number):Observable<Booking>  {
  const participantIdUrl = this['viewbookingbyparticipantidurl'] + "/" + participantId;
  return this.http.get<Booking>(participantIdUrl);
}

//Get All Orders
getAllBooking():Observable<any>
{
 return this.http.get(this.viewallbookingurl);
}

//Order Menu
placeBooking(eventId:number,participantId:number,quan:any):Observable<any>
{
  const headers={'content-type':'application/json'};
  const body=JSON.stringify(quan);
  return this.http.post(this.addbookingurl+"/"+eventId+"/"+participantId,body,{'headers':headers});
}

//delete booking by ID
deleteBooking(id: number): Observable<any> {
  const headers = new HttpHeaders({ 'Authorization': 'auth-token' }); 
  const url = `${this.deletebookingurl}/${id}`;
  return this.http.delete<Booking>(url, { headers });
}
// //GetpaymentById
// getpaymentbyid(uid: number):Observable<Payment>  {
//   const uidUrl = this.viewpaybybookingidurl + "/" + uid;
//   return this.http.get<Payment>(uidUrl);
// }

//Get All Payments
getAllPayments():Observable<any>
{
 return this.http.get(this.viewallpayurl);
}

// //delete payment by ID
// deletePayment(id: number) {
   
//   const httpOptions = {
//     headers : new HttpHeaders({
//         'Content-Type' : 'application/json',
//         'Authorization' : 'auth-token',
//         'Access-Control-Allow-Origin' : '*'
//     })
//   };
//   return  this.http.delete<Payment>(this.deletebypayidurl+`/${id}`,httpOptions);
// }
//Order Event
BookingEvent(itemId:number,participantId:number,quan:any):Observable<any>
{
  const headers={'content-type':'application/json'};
  const body=JSON.stringify(quan);
  return this.http.post(this.addbookingurl+"/"+itemId+"/"+participantId,body,{'headers':headers});
}
// //GetpaymentByparticipantId
// getpaymentparticipantbyid(uid: number):Observable<Payment>  {
//   const uidUrl = this.viewpaybyparticipantidurl + "/" + uid;
//   return this.http.get<Payment>(uidUrl);
// }

//add payments code
addPayment(payment: any, orderId: number, participantId: number): Observable<any> {
  const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  const url = `${this.addpaymenturl}/${orderId}/${participantId}`;
  return this.http.post(url, payment, { headers });
}
}
