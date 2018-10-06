import {Component, HostListener, OnInit} from '@angular/core';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isLoggedIn$: Observable<boolean>;
  isNavbarOpen = false;
  public shouldStick = false;
  constructor() { }

  ngOnInit() {
    //this.isLoggedIn$ = this.authService.isLoggedIn;
  }

  onLogout() {
    //this.authService.logout();

  }

  toggleNavbar() {
    if(this.isNavbarOpen === true){
      this.isNavbarOpen = false;
    }else{
      this.isNavbarOpen = true;
    }
  }

  // @HostListener('window:scroll', ['$event'])
  // onWindowScroll($event) {
  //   const number = $event.target.scrollTop;
  //   if (number > 40) {
  //     this.shouldStick = true;
  //   } else if (this.shouldStick && number < 10) {
  //     this.shouldStick = false;
  //   }
  // }
}
