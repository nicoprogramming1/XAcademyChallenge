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
      firstName: new FormControl('', [Validators.required, Validators.minLength(6)]),
      lastName: new FormControl('', [Validators.required, Validators.minLength(3)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
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

  showFirstNameErrors() {
    const firstName = this.registerForm.get('firstName');

    if (firstName?.touched && !firstName.valid) {
      switch (true) {
        case firstName.errors!['required']:
          return 'El nombre es obligatorio';
        case firstName.errors!['minLength']:
          return 'El nombre debe tener al menos 3 caracteres';
        default:
          return null;
      }
    }
    return null;
  }

  showLastNameErrors() {
    const lastName = this.registerForm.get('lastName');

    if (lastName?.touched && !lastName.valid) {
      switch (true) {
        case lastName.errors!['required']:
          return 'El apellido es obligatoria';
        case lastName.errors!['minLength']:
          return 'El apellido debe tener al menos 3 caracteres';
        default:
          return null;
      }
    }
    return null;
  }

  showEmailErrors() {
    const email = this.registerForm.get('email');

    if (email?.touched && !email.valid) {
      switch (true) {
        case email.errors!['required']:
          return 'El Email es obligatoria';
        case email.errors!['email']:
          return 'Debe tener formato email';
        default:
          return null;
      }
    }
    return null;
  }

  showPasswordErrors() {
    const password = this.registerForm.get('password');

    if (password?.touched && !password.valid) {
      switch (true) {
        case password.errors!['required']:
          return 'La contraseña es obligatoria';
        case password.errors!['minLength']:
          return 'La contraseña debe tener al menos 6 caracteres';
        default:
          return null;
      }
    }
    return null;
  }
}
