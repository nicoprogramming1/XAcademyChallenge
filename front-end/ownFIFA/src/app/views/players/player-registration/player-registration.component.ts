import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-player-registration',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './player-registration.component.html',
  styleUrl: './player-registration.component.scss'
})
export class PlayerRegistrationComponent {
public registerForm!: FormGroup
private fb = inject(FormBuilder)

ngOnInit(): void {
  this.registerForm = this.fb.group({
    longName: ,
    
  })
}

onSubmit(){

}
}
