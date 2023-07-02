import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { MeetupService } from '../../services/meetup.service'
import { Meetup, FromPage } from '../../interfaces/meetup.interface'
import { MeetupDTO } from 'src/app/interfaces/DTO.interface';
import { MeetupStatus} from '../../interfaces/meetup.interface'
import { AuthService } from '../../services/auth.service'
import { Router } from '@angular/router';


@Component({
  selector: 'app-meetup',
  templateUrl: './meetup.component.html',
  styleUrls: ['./meetup.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MeetupComponent {
  constructor(private meetupService: MeetupService, private authService: AuthService, private router: Router) {}

  @Input() meetup!: Meetup;
  @Input() fromPage!: FromPage;
  public isFull = false;

  public statusDone = MeetupStatus.Done;

  public statusNew = MeetupStatus.New

  public fromAll = FromPage.AllMeetups
  public fromMy = FromPage.MyMeetups

  fullContent() {
    this.isFull = !this.isFull;
  }

  public register() {
    this.meetupService.registerToMeetup(this.meetup.id, this.authService.user!.id).subscribe((res: MeetupDTO) => {
      if (res.id) {
        this.router.navigate(['my-meetups']);
      }
    })
  }
  public unRegister() {
    this.meetupService.unRegisterMeetup(this.meetup.id, this.authService.user!.id).subscribe((res: MeetupDTO) => {
      if (res.id) {
        this.router.navigate(['all-meetups']);
      }
    })
  }
  public edit() {}

}
