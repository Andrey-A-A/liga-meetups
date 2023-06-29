import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { MeetupService } from '../../services/meetup.service'
import { Meetup } from '../../interfaces/meetup.interface'
import { MeetupStatus} from '../../interfaces/meetup.interface'

@Component({
  selector: 'app-meetup',
  templateUrl: './meetup.component.html',
  styleUrls: ['./meetup.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MeetupComponent {
  constructor(public meetupService: MeetupService) {}

  @Input() meetup!: Meetup;
  public isFull = false;

  public statusDone = MeetupStatus.Done;

  public statusNew = MeetupStatus.New


  fullContent() {
    this.isFull = !this.isFull;
    this.statusDone
  }

}
