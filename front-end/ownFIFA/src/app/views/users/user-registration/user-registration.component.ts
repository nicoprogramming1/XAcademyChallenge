import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { Role, User } from '../../../interfaces/user.interface';
import { TitleH1Component } from '../../../shared/title-h1/title-h1.component';

@Component({
  selector: 'app-user-registration',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TitleH1Component],
  templateUrl: './user-registration.component.html',
  styleUrl: './user-registration.component.scss',
})
export class UserRegistrationComponent {
  private userService = inject(UserService);
  private fb = inject(FormBuilder);

  public invalidForm: boolean = false;
  public registerForm!: FormGroup;
  public successMessage: string | null = null;

  public title: string = "Registrar invitado"

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const formValues = this.registerForm.value;

      const user: User = {
        firstName: formValues.firstName,
        lastName: formValues.lastName,
        email: formValues.email,
        password: formValues.password,
        role: Role.INVITADO,
      };

      this.userService.saveUser(user).subscribe({
        next: (res) => {
          console.log('Se ha registrado con éxito al usuario: ', res?.lastName);
          this.invalidForm = false;
          this.successMessage = 'El usuario se ha creado con éxito';
        },
        error: (err) => {
          console.error('Ha habido un error en el registro', err);
          this.invalidForm = true;
        },
        complete: () => {
          this.resetForm();
        },
      });
    } else {
      this.invalidForm = true;
      console.log('El formulario no está validado');
    }
  }

  resetForm(): void {
    this.registerForm.reset();
    this.invalidForm = false;
  }
}
