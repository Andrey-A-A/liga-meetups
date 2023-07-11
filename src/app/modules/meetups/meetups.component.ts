import { Component, ChangeDetectionStrategy, AfterContentChecked,  DoCheck, OnInit, SimpleChanges, OnDestroy } from '@angular/core';
import { MeetupService } from '../../services/meetup.service'
import { MeetupDTO } from '../../interfaces/DTO.interface';
import { Meetup, FromPage } from "../../interfaces/meetup.interface";
import { Router } from '@angular/router';
import { delay } from 'rxjs/operators';
import { Subscription, timer } from 'rxjs';

@Component({
  selector: 'app-meetups',
  templateUrl: './meetups.component.html',
  styleUrls: ['./meetups.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class MeetupsComponent implements OnInit, OnDestroy {

  public allList: Meetup[] = [];
  public filteredList: Meetup[] = [];
  public dataSource: Meetup[] = [];
  public fromPage = FromPage.AllMeetups;
  public pageSize = 5;
  public currentPage = 0;
  public totalSize = 0;

  public isLoading = true;

  public refreshTimer = timer(0, 30000)
  private subscription: Subscription = this.refreshTimer.subscribe()

  constructor(public meetupService: MeetupService, private router: Router) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('changes', changes);
  }


  ngOnInit() {

    this.subscription = this.refreshTimer.subscribe(() => {

      this.meetupService.getListHTTP().pipe(delay(1500)).subscribe((res: any) => {

      let meetups: MeetupDTO[] = res;

      let newList = meetups.map(el => {
        return this.meetupService.transform(el)
      })

      if (newList.length !== this.allList.length) {
        this.isLoading = true;

        this.allList = meetups.map(el => {
          return this.meetupService.transform(el)
        })

        this.filteredList = meetups.map(el => {
          return this.meetupService.transform(el)
        })

        this.dataSource = this.filteredList.slice(0, this.pageSize)
        delay(1500)
        this.isLoading = false;
        } else {
          console.log('данные не изменились');
        }
      })
    })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

  public handlePage(e: any) {
    this.currentPage = e.pageIndex;
    this.pageSize = e.pageSize;
    this.iterator();
  }

  private iterator() {
    const end = (this.currentPage + 1) * this.pageSize;
    const start = this.currentPage * this.pageSize;
    const part = this.filteredList.slice(start, end);
    this.dataSource = part;
  }

  searchTextUpdated(text: string) {
    this.filteredList = this.allList.filter(el => {
      return this.filterText(el?.description, text) || this.filterText(el.title, text) || this.filterText(el.author, text) || this.filterDate(el.time, text)
    })
    this.iterator();
  }

  private filterText(str: string | null | undefined, text: string): boolean {
    return str !== null && str !== undefined && str.toLowerCase().indexOf(text.toLowerCase()) !== -1
  }

  private filterDate(date: Date | null | undefined, text: string): boolean {

    if (date) {
      const dayText = ('0' + date.getUTCDate()).slice(-2)
      const monthText = ('0' + (date.getUTCMonth() + 1)).slice(-2)

      const yearText = date.getUTCFullYear().toString().slice(-2);
      const dateText = `${dayText}.${monthText}.${yearText}`
      return dateText === text
    } else {
      return false
    }
  }

}
