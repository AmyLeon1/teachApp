import {Component, OnInit} from '@angular/core';
import {HardCodedAuthenticationService} from "../service/hard-coded-authentication.service";
import {User} from "../user";
import {RegistrationService} from "../service/registration.service";
import {Router} from "@angular/router";

declare var window: any;

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  //variable/object declaration
  user = new User();
  formModal: any;
  regFormModal: any;
  invalidLogin = false
  errorMessage = "Invalid credentials entered. Please try again. " //error message for login modal
  msg = "";
  currentUserRole: User //currentUserRole to hold the role of logged-in user

  constructor(public hardcodedAuthenticationService: HardCodedAuthenticationService, public regService: RegistrationService,
              private router: Router) {
  }

  ngOnInit(): void {
    //methods that need to be executed upon loading of webpage

    this.formModal = new window.bootstrap.Modal(
      document.getElementById("loginModal")!
    )
    this.regFormModal = new window.bootstrap.Modal(
      document.getElementById("registrationModal")!
    )

    this.getSelectedCountry();
    this.hardcodedAuthenticationService.isUserLoggedIn();
   this.toggleNavbar();
  }

  /* Method to open navbar on smaller screen size*/
  toggleNavbar(){
    // let menu=document.querySelector('menu-icon');
    let menu=document.getElementById('menu-icon');
    let navbar = document.querySelector('.navbar');
    menu!.onclick = () =>{
      menu!.classList.toggle('bx-x');
      navbar!.classList.toggle('open');
    }
  }

  /* Open login modal */
  openModal() {
    this.formModal.show();
  }

  /* Open registration modal */
  openRegistrationModal() {
    this.regFormModal.show();
  }

  /* Close registration modal and open login modal */
  closeRegModalOpenLoginModal() {
    this.regFormModal.hide();
    this.formModal.show();
  }

  /* Close login modal and open registration modal */
  closeLoginOpenRegModal() {
    this.formModal.hide();
    this.regFormModal.show();
  }

  /* Close Modals */
  hideModal() {
    this.formModal.hide();
    this.regFormModal.hide();
  }

  // ****     method to log out of the system     ****//
  // redirect to the homepage and call the logout method
  // from service to clear session storage of user's details
  logout() {
    this.router.navigate(['home']);
    this.hardcodedAuthenticationService.logout();
  }

  /* Method to login user */
  loginUser() {
    this.regService.loginUserFromRemote(this.user).subscribe(
      {
        next: data => {
          //if login is successful these items will be set
          sessionStorage.setItem("authenticatedUser", this.user.email);
          sessionStorage.setItem("username", this.user.username);
          this.currentUserRole = data;
          //setting the role of current user into session storage
          sessionStorage.setItem('role', this.currentUserRole.role)
          this.router.navigate(["profile"]);
          this.formModal.hide();
          this.invalidLogin = false;
        },
        error: err => {
          console.log("error occured");
          this.invalidLogin = true;
        }
      }
    )
  }

  /* Method to get name/username from session storage */
  getUsername() {
    sessionStorage.getItem("username")
  }

  /* Method to check if user is logged in to the system */
  isUserLoggedIn() {
    //retreive key from session storage
    //if user object isn't empty then user is logged in
    let user = sessionStorage.getItem("authenticatedUser");
    return !(user == null)
  }

  /* Method to utilise RestCountries API */
  getSelectedCountry() {
    //fire once html doc is completely loaded. Don;t wait for stylesheets etc
    document.addEventListener('DOMContentLoaded', () => {
        //get the element from html file
        const selectDrop = document.getElementById('countries');
        //use fetch api to retrieve countries from restcountries api
        //returns a promise .then() is used
        fetch('https://restcountries.com/v3.1/all').then(response => {
          //return response
          return response.json();
        }).then(data => {
          let output = "";
          //iterate through list of countries
          data.forEach((country: { name: any; }) => {
            //append output to html <option>
            output += `
       <!--  set value of dropdown with the country's name     -->
      <option value="${country.name.common}">${country.name.common}</option>`;
          })
          //set html dropdown with output
          selectDrop!.innerHTML = output;
        }).catch(err => {
          console.log(err);
        });
      }
    )
  }

  // *** REGISTER USER ***
  registerUser() {
    //get input from about-me-text
    let input: any = document.getElementById("about-me-text");
    //get input from countries
    let nationality: any = document.getElementById("countries");
    //assign it to user's aboutme section
    this.user.aboutMe = input.value;
    //assign it to user's nationality
    this.user.nationality = nationality.value;
    console.log(this.user.nationality)
    this.regService.registerUserFromRemote(this.user)
      .subscribe({
          next: data => {
            /* upon successful registration close the registration modal,
            * and open the login modal */
            this.regFormModal.hide(),
              this.formModal.show(),
              this.msg = "Registration successful"
          },
          error: err => {
            //if error is thrown indicating that this email is already registered
            //display this message to the user.
            this.msg = "This email is already registered on the system. " +
              " Please enter another email address or login."
          }
        }
      );
  }

}
