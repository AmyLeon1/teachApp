import {Component, OnInit} from '@angular/core';
import {HardCodedAuthenticationService} from "../service/hard-coded-authentication.service";
import {User} from "../user";
import {RegistrationService} from "../service/registration.service";
import {Router} from "@angular/router";
import {FileHandler} from "../file-handler";
import {DomSanitizer} from "@angular/platform-browser";
import {windowCount} from "rxjs";
import {Buffer} from "buffer";

declare var window: any;

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {


  user = new User();
  formModal: any;
  regFormModal: any;
  invalidLogin = false
  errorMessage = "Invalid Credentials"
  msg = "";
  currentUserRole: User //currentUserRole to hold the role of logged-in user
  constructor(public hardcodedAuthenticationService: HardCodedAuthenticationService, public regService: RegistrationService, private router: Router,
              private sanitizer: DomSanitizer) {
  }

  ngOnInit(): void {
    this.formModal = new window.bootstrap.Modal(
      document.getElementById("loginModal")!
    )
    this.regFormModal = new window.bootstrap.Modal(
      document.getElementById("registrationModal")!
    )

    this.getSelectedCountry();
  }

  openModal() {
    this.formModal.show();
  }

  openRegistrationModal() {
    this.regFormModal.show();
  }

  closeRegModalOpenLoginModal() {
    this.regFormModal.hide();
    this.formModal.show();
  }

  closeLoginOpenRegModal() {
    this.formModal.hide();
    this.regFormModal.show();
  }


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

  loginUser() {
    this.regService.loginUserFromRemote(this.user).subscribe(
      {
        next: data => {
          console.log("success");
          //let username = this.user.username;
          //TODO: not sure if this is working sessionStorage
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
          //this.errorMessage;
        }
      }
    )
  }

  getUsername() {
    sessionStorage.getItem("username")

  }

  gotoregistration() {
    this.router.navigate(["register"]);
  }

  isUserLoggedIn() {
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


  input: any = document.getElementById("about-me-text");
  // user.about =  this.input.value;

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
            // this.router.navigate(['login']),
            this.regFormModal.hide(),
              this.formModal.show(),
              this.msg = "Registration successful"
          },
          error: err => {
            console.log("error occured"),
              this.msg = err.error
          }
        }
      );
  }

  onFileSelection(event: any) {
    console.log(event);
    if (event.target.files) {
      const file = event.target.files[0];
      const fileHandler: FileHandler = {
        file: file,
        //create URL from the file
        url: this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(file))
      }
    }
  }

}
