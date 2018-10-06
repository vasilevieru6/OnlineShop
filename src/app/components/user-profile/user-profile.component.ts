import {Component, OnInit, HostListener} from '@angular/core';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  isHidden = true;
  isDisabled = true;
  constructor() { }

  ngOnInit() {
  }

  showCard() {
    this.isHidden = !this.isHidden;

  }

  editUsername(disable: any) {
    console.log("Salut");
    disable.disabled = false;//!this.disabled;
    //this.ngControl.disabled[]
  }
}
