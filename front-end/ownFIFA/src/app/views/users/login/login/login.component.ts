import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UserService } from '../../../../services/user.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  private userService = inject(UserService);
  private fb = inject(FormBuilder);
  private router = inject(Router);

  public loginForm!: FormGroup;
  public errorMessage: string | null = null;
  public successMessage: string | null = null;

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  get email() {
    return this.loginForm.get('email');
  }
  get password() {
    return this.loginForm.get('password');
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const payload = {
        email: this.loginForm.value.email,
        password: this.loginForm.value.password,
      };

      this.userService.login(payload).subscribe({
        next: (res) => {
          if (res) {
            localStorage.setItem('token', res.token!); // guarda el token en localStorage

            this.router.navigate(['/dashboard']); // redirige al dashboard
            this.successMessage = 'Inicio de sesión exitoso';
            this.errorMessage = null;
          }
        },
        error: (error) => {
          this.errorMessage =
            'Error en el inicio de sesión. Por favor, verifica tus credenciales.';
          this.successMessage = null;
        },
      });
    }
  }
}
