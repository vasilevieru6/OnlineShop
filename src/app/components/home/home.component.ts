import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {AuthService} from '../../services/auth.service';
import {NavigationEnd, Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  isLoggedIn$: Observable<boolean>;
  currentUr: string;

  constructor(private authService: AuthService, private router: Router) {
    router.events.subscribe((_: NavigationEnd) => this.currentUr = _.url);
  }

  ngOnInit() {
    this.isLoggedIn$ = this.authService.isLoggedIn;
  }
}
