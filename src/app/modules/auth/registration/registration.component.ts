import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, ValidationErrors, AbstractControl } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  registrationForm!: FormGroup

  constructor(private fb: FormBuilder, private authService: AuthService) {}

  ngOnInit(): void {

    this.initForm()
  }

  initForm() {
    this.registrationForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, this.passwordValidator]],
      fio: ['', [Validators.required]]
    })
  }

  private passwordValidator(control: FormControl): ValidationErrors | null {
    const value = control.value;
    const hasNumber = /[0-9]/.test(value); // Проверка на содержание цифр
    const hasCapitalLetter = /[A-Z]/.test(value); // Проверка на содержание заглавных букв
    const hasLowercaseLetter = /[a-z]/.test(value); // Проверка на содержание прописных букв
    const isLengthValid = value ? value.length > 7 : false; // Проверка на минимальную длину пароля

    /** Общая проверка */
    const passwordValid = hasNumber && hasCapitalLetter && hasLowercaseLetter && isLengthValid;

    if (!passwordValid) {
      return { invalidPassword: 'Пароль должен содержать заглавные, прописные латинские буквы, цифры, минимум 7 символов' };
    }
    return null;
  }

  isControlInvalid(controlName: string): boolean {
    const control = this.registrationForm.controls[controlName];
    const result = control.invalid && control.touched;

    return result;
  }

  get _email() {
    return this.registrationForm.get('email')!
  }

  get _password() {
    return this.registrationForm.get('password')!
  }

  get _fio() {
    return this.registrationForm.get('fio')!
  }

  registration() {

    if (this.registrationForm.invalid) {
      alert('Заполните все поля формы')
    } else {
      this.authService.registration(
        this._email.getRawValue(),
        this._password.getRawValue(),
        this._fio.getRawValue()
      )
    }
  }




}
