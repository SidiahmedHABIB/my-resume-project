import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Constants } from '../../../constants';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {
  userName: string | null = null; // Initialize username variable

  constructor(protected authService: AuthService){}
  ngOnInit(): void {
    this.getUserFromLocalStorage()
  }

  getUserFromLocalStorage(): void {
    // Get username from local storage
    this.userName = localStorage.getItem(Constants.userName);
    // If you have a Constants class, replace 'userName' with Constants.userName
  }
  handleLogout(): void {
    this.authService.logout()
  }

}
