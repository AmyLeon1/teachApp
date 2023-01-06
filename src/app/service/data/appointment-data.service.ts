import {Injectable} from '@angular/core';
import {API_URL} from "../../constants";
import {HttpClient} from "@angular/common/http";
import {Appointment} from "../../appointment";
import {User} from "../../user";
import {availableTime} from "../../availableTime";
import {availableDate} from "../../availableDate";
import {AppDate} from "../../AppDate";

@Injectable({
  providedIn: 'root'
})
export class AppointmentDataService {

  constructor(private http: HttpClient) {
  }

  /* Method to delete appointment */
  cancelAppointment(id: any) {
    return this.http.delete(`${API_URL}/users/appointments/${id}`)
  }

  /* Method to retrieve all times for a certain date */
  getAllTimesForDate(id: any) {
    return this.http.get<availableTime[]>(`${API_URL}/appointmentTimes/${id}/times/id`);
  }

  /* Method to retrieve a particular date object */
  getDate(email: any, date: any) {
    return this.http.get<AppDate>(`${API_URL}/appointmentDates/user/${email}/dates/${date}`)
  }


  updateAppointment(email: any, appId: any, appointment: Appointment) {
    return this.http.put(`${API_URL}/users/${email}/appointments/${appId}`, appointment);
  }

  /* Method to create new booking */
  createAppointment(email: any, appointment: Appointment) {
    return this.http.post(`${API_URL}/users/${email}/appointments`, appointment);

  }

  /* Method to retrieve all appointments for a teacher */
  retrieveAllAppointments(email: any) {
    return this.http.get<Appointment[]>(`http://localhost:8080/users/${email}/appointments`)
  }

  /* Method to retrieve all appointments for particular student */
  retrieveAllStudentAppointments(email: any) {
    return this.http.get<Appointment[]>(`http://localhost:8080/users/${email}/appointments/studentEmail`)
  }

  /* Method to retrieve user by email */
  retrieveUser(email: any) {
    return this.http.get<User>(`${API_URL}/users/${email}`
    )
  }

  // method for teachers to add a date //
  addDate(email: any, availableDate: availableDate) {
    return this.http.post(`${API_URL}/users/${email}/availableDates1`, availableDate)
  }

  // Method to retrieve times //
  retrieveAllTimes(email: any, date: any) {
    return this.http.get<availableTime[]>(`http://localhost:8080/users/${email}/availableDates/${date}/availableTimes`)

  }

  /* Method to retrieve all dates for a teacher*/
  retrieveAllDates(email: any) {
    return this.http.get<AppDate[]>(`http://localhost:8080/appointmentDates/${email}/dates`)
  }

}
