import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators, ValidationErrors, AbstractControl } from '@angular/forms';
import { MeetupDTO } from 'src/app/interfaces/DTO.interface';
import { MeetupService } from 'src/app/services/meetup.service';
import { Time } from '@angular/common';

@Component({
  selector: 'app-create-meetup',
  templateUrl: './create-meetup.component.html',
  styleUrls: ['./create-meetup.component.scss']
})
export class CreateMeetupComponent implements OnInit{

  createMeetupForm!: FormGroup;

  // createMeetupForm!: FormGroup<{
  //   title: FormControl<string | null>;
  //   date: FormControl<string | null>;
  //   time: FormControl<string | null>;
  //   location: FormControl<string | null>;
  //   description: FormControl<string | null>;
  //   targetAudience: FormControl<string | null>;
  //   needToKnow: FormControl<string | null>;
  //   willHappen: FormControl<string | null>;
  //   reasonToCome: FormControl<string | null>;
  // }>

  constructor(private fb: FormBuilder, private meetupService: MeetupService, private router: Router) {}

  ngOnInit() {
    this.initForm()
  }

  initForm() {
    this.createMeetupForm = this.fb.group({
      title: ['', [Validators.required]],
      date: ['', [Validators.required]],
      time: ['', [Validators.required]],
      duration: ['', [
        Validators.required,
        Validators.min(10),
        Validators.max(120)
      ]],
      location: ['', [
        Validators.required,
        Validators.minLength(4)
      ]],
      description: ['', [
        Validators.required,
        Validators.maxLength(255)
      ]],
      targetAudience: ['', [Validators.required]],
      needToKnow: ['', [Validators.required]],
      willHappen: ['', [Validators.required]],
      reasonToCome: ['', [Validators.required]],
    })
  }

  isControlInvalid(controlName: string): boolean {
    const control = this.createMeetupForm.controls[controlName];

    const result = control.invalid && control.touched;

    return result;
  }

  onSubmit() {

    this.findInvalidControls()
    if (this.createMeetupForm.invalid) {
      alert('Заполните все поля формы')
    } else {

      const requestBody: MeetupDTO = {
        name: this._title?.getRawValue(),
        description: this._description?.getRawValue(),
        duration: 90,
        location: this._location?.getRawValue(),
        target_audience: this._targetAudience?.getRawValue(),
        need_to_know: this._needToKnow?.getRawValue(),
        will_happen: this._willHappen?.getRawValue(),
        time: this.combineDateAndTime(this._date?.getRawValue(), this._time?.getRawValue()),

        reason_to_come: this._reasonToCome?.getRawValue()
      }
      this.meetupService.createMeetup(requestBody).subscribe((res: MeetupDTO) => {

        if (res.id) {
          setTimeout(() => {this.router.navigate(['all-meetups'])}, 500)
        } else {
          alert('Не удалось создать митап')
        }
        console.log('res=', res);
      })
    }
  }



  get _title() {
    return this.createMeetupForm.get('title')
  }

  get _description() {
    return this.createMeetupForm.get('description')
  }

  get _targetAudience() {
    return this.createMeetupForm.get('targetAudience')
  }

  get _needToKnow() {
    return this.createMeetupForm.get('needToKnow')
  }

  get _willHappen() {
    return this.createMeetupForm.get('willHappen')
  }

  get _reasonToCome() {
    return this.createMeetupForm.get('reasonToCome')
  }

  get _location() {
    return this.createMeetupForm.get('location')
  }

  get _date() {
    return this.createMeetupForm.get('date')
  }

  get _time() {
    return this.createMeetupForm.get('time')
  }

  get _duration() {
    return this.createMeetupForm.get('duration')
  }

  public findInvalidControls() {
    const invalid = [];
    const controls = this.createMeetupForm.controls;
    for (const name in controls) {
        if (controls[name].invalid) {
            invalid.push(name);
        }
    }
    console.log('invalid=', invalid);
    return invalid;
  }

  public combineDateAndTime(date:string, time:string) {
    const timeString = `${date}T${time}:00.000Z`
    return timeString;
  };
}


