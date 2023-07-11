import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MeetupDTO } from 'src/app/interfaces/DTO.interface';
import { Meetup } from 'src/app/interfaces/meetup.interface';
import { MeetupService } from 'src/app/services/meetup.service';

@Component({
  selector: 'app-create-meetup',
  templateUrl: './create-meetup.component.html',
  styleUrls: ['./create-meetup.component.scss']
})
export class CreateMeetupComponent implements OnInit{

  createMeetupForm!: FormGroup;
  isEditMode: boolean = false;
  meetup?: Meetup;

  constructor(private fb: FormBuilder, private meetupService: MeetupService, private router: Router) {}

  ngOnInit() {
    const meetupToEdit = this.meetupService.currentEditableMeetup
    if (meetupToEdit) {
      this.meetup = meetupToEdit
      this.isEditMode = true;
      this.meetupService.currentEditableMeetup = null
    } else this.isEditMode = false;

    this.initForm()

  }

  initForm() {
    this.createMeetupForm = this.fb.group({
      title: [this.meetup?.title, [Validators.required]],
      date: [this.getDate(this.meetup?.time), [Validators.required]],
      time: [this.getTime(this.meetup?.time), [Validators.required]],
      duration: [this.meetup?.duration, [
        Validators.required,
        Validators.min(10),
        Validators.max(120)
      ]],
      location: [this.meetup?.location, [
        Validators.required,
        Validators.minLength(4)
      ]],
      description: [this.meetup?.description, [
        Validators.required,
        Validators.maxLength(255)
      ]],
      targetAudience: [this.meetup?.targetAudience, [Validators.required]],
      needToKnow: [this.meetup?.needToKnow, [Validators.required]],
      willHappen: [this.meetup?.willHappen, [Validators.required]],
      reasonToCome: [this.meetup?.reasonToCome, [Validators.required]],
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
        id: this.meetup?.id,
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
      if (this.meetupService.isEditMode) {
        this.meetupService.editMeetup(requestBody).subscribe((res) => {
          if (res.id) {
            this.meetupService.isEditMode = false;
            setTimeout(() => {this.router.navigate(['my-meetups'])}, 500)
          } else {
            alert('Не удалось отредактировать митап');
          }
        })
      } else {
        this.meetupService.createMeetup(requestBody).subscribe((res: MeetupDTO) => {

          if (res.id) {
            setTimeout(() => {this.router.navigate(['my-meetups'])}, 500)
          } else {
            alert('Не удалось создать митап')
          }
        })
      }
    }
  }

  getDate(date?: Date):string {
    if (date) {
      const dateObj = new Date(date)
      return dateObj.toISOString().substring(0, 10)

    } else return ''
  }

  getTime(date?: Date):string {
    if (date) {
      const hours = ('0' + date.getUTCHours()).slice(-2)
      const minutes = ('0' + date.getUTCMinutes()).slice(-2)
      return `${hours}:${minutes}`;
    } else return ''
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
    return invalid;
  }

  public combineDateAndTime(date:string, time:string) {
    const timeString = `${date}T${time}:00.000Z`
    return timeString;
  };
}


