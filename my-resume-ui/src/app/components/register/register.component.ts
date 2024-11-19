import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { UserModel } from '../../models/user.model';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  registrationForm!: FormGroup;
  errorMessage!: string;
  registerRequest!: UserModel;
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.registrationForm = this.formBuilder.group({
      fname: [null, Validators.required],
      lname: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(6)]],
    });
  }

  handleRegistration() {
    this.registerRequest = this.registrationForm.value;

    this.authService.register(this.registerRequest).subscribe({
      next: (response) => {
        // Assuming a successful response contains 'message'
        Swal.fire({
          title: 'Success',
          text: response.message,
          icon: 'success',
        });
        this.registrationForm.reset();
        this.router.navigateByUrl('/login');
      },
      error: (errorResponse) => {
        if (errorResponse.status === 409) {
          Swal.fire({
            title: 'Oops...',
            text: 'Email already exists',
            icon: 'error',
          });
        } else if (errorResponse.error?.message) {
          Swal.fire({
            title: 'Oops...',
            text: errorResponse.error.message,
            icon: 'error',
          });
        } else {
          Swal.fire({
            title: 'Error',
            text: 'An unexpected error occurred',
            icon: 'error',
          });
        }
      },
    });
}

}
