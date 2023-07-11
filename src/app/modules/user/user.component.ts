import { Component, Input, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/user.interface';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserComponent implements OnInit {

  userForm!: FormGroup;
  public editMode = false;
  public valueSelect = 1;

  constructor(private fb: FormBuilder, private userService: UserService ) {
  }

  @Input() user!: User;

  ngOnInit(): void {
    this.valueSelect = this.user.roles[0].name === 'ADMIN' ? 2 : 1
    this.initForm()
  }

  initForm() {
    this.userForm = this.fb.group({
      email: [ this.user.email, [Validators.required, Validators.email]],
      password: ['********', [Validators.required]],
      role: [null, [Validators.required]],
    })
  }

  editClick() {
    this.editMode = !this.editMode;
  }

  cancelClick() {
    this.editMode = !this.editMode;
    this._email.setValue(this.user.email);
    this._password.setValue('********');
    this._role.setValue(this.valueSelect);
  }

  saveClick() {
    const newEmail = this._email.getRawValue();
    const newPassword = this._password.getRawValue();
    const newRole = this._role.getRawValue();

    const isEmailChange = newEmail !== this.user.email;
    const isPasswordChange = newPassword !== '********';

    if (isEmailChange || isPasswordChange) {
      this.userService.updateUser(isEmailChange ? newEmail : null, isPasswordChange ? newPassword : null, this.user.id).subscribe((res:any) => {
        if (res.id) {
          console.log('данные пользователя успешно обновлены');
        } else {
          this._email.setValue(this.user.email)
          alert('Данные пользователя не удалось обновить')
        };
        this._password.setValue('********')
      })
    }

    if (newRole !== this.valueSelect) {
      const role = newRole === '2' ? ['ADMIN'] : ['USER'];
      this.userService.setRole(this.user.id, role).subscribe(
        (res) => {
          if (res.userId) {
            console.log('роль успешна назначена');
          } else {
            this._role.setValue(this.valueSelect)
            alert('не удалось назначить роль')
          }
        }
      )
    }

    this.editMode = !this.editMode;
  }

  editStyle() {
    if (this.editMode) {
      return 'border: 3px solid #4C3F78;';
    }
    return ''
  }

  selectionChange(value: string) {
    this._role?.setValue(value)
  }

  get _email() {
    return this.userForm.get('email')!
  }

  get _password() {
    return this.userForm.get('password')!
  }

  get _role() {
    return this.userForm.get('role')!
  }

}
