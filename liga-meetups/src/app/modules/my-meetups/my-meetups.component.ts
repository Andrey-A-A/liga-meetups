import { Component, OnInit } from '@angular/core';
import { MeetupService } from '../../services/meetup.service';
import { Router } from '@angular/router';
import { Meetup, FromPage } from "../../interfaces/meetup.interface";
import { MeetupDTO, UserDTO } from '../../interfaces/DTO.interface';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-my-meetups',
  templateUrl: './my-meetups.component.html',
  styleUrls: ['./my-meetups.component.scss']
})
export class MyMeetupsComponent implements OnInit {

  public myMeetupList: Meetup[] = []
  public dataSource: Meetup[] = [];
  public fromPage = FromPage.MyMeetups;
  public pageSize = 5;
  public currentPage = 0;
  public totalSize = 0;

  constructor(public meetupService: MeetupService, private router: Router, private authService: AuthService) {
  }

  ngOnInit() {

    this.meetupService.getListHTTP().subscribe((res: any) => {

      let meetups: MeetupDTO[] = res;


      this.myMeetupList = meetups.filter((currentMeetup: MeetupDTO) => {
        const user = this.authService.user!;
        const isOwner = currentMeetup.createdBy === user.id;

        const isMember = currentMeetup.users?.find((currentUser: UserDTO) => {
          return user.id === currentUser.id
        })?.id


        return isOwner || isMember
      }).map(el => {
        return this.meetupService.transform(el)
      })

      console.log('myMeetupList', this.myMeetupList);


      this.dataSource = this.myMeetupList.slice(0, this.pageSize)
      // console.log('результат приехал');
      // console.log('list', this.allList)


    })

  }

  public handlePage(e: any) {
    console.log('e', e);

    this.currentPage = e.pageIndex;
    this.pageSize = e.pageSize;
    this.iterator();
  }

  private iterator() {
    const end = (this.currentPage + 1) * this.pageSize;
    const start = this.currentPage * this.pageSize;
    const part = this.myMeetupList.slice(start, end);
    this.dataSource = part;
  }
}
