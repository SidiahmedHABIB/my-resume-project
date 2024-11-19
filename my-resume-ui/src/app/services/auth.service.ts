import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { LoginResponse, UserModel } from '../models/user.model';
import { Router } from '@angular/router';
import { Constants } from '../../constants';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8088/api/v1/users'; // Change this to your backend API URL
  public UserToken!: String;

  constructor(private http: HttpClient, private router: Router) {}

  register(userData: UserModel): Observable<any> {
    console.log(userData);
    return this.http.post<any>(`${this.apiUrl}/register`, userData);
  }

  public login(userData: UserModel): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, userData).pipe(
      map((response: LoginResponse) => {
        if (response.message === 'Login successful') {
          localStorage.setItem(Constants.isAuthenticated, 'true');
          localStorage.setItem(Constants.userId, response.userId);
          localStorage.setItem(Constants.userName, response.fname);
        }
        return response;
      })
    );
  }

  logout() {
    localStorage.clear();
    this.router.navigateByUrl('/login');
  }
}
