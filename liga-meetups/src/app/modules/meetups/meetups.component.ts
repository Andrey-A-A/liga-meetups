import { Component, ChangeDetectionStrategy, AfterContentChecked,  DoCheck, OnInit, SimpleChanges } from '@angular/core';
import { MeetupService } from '../../services/meetup.service'
import { MeetupDTO } from '../../interfaces/meetupDTO.interface';
import { Meetup, FromPage } from "../../interfaces/meetup.interface";
import { Router } from '@angular/router';
import { delay, filter, map, max, reduce } from 'rxjs/operators';
import { from, of, first, take,  } from 'rxjs';

@Component({
  selector: 'app-meetups',
  templateUrl: './meetups.component.html',
  styleUrls: ['./meetups.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class MeetupsComponent implements OnInit {

  public allList: Meetup[] = []
  public dataSource: Meetup[] = [];
  public fromPage = FromPage.AllMeetups;
  public pageSize = 5;
  public currentPage = 0;
  public totalSize = 0;

  constructor(public meetupService: MeetupService, private router: Router) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('changes', changes);
  }


  ngOnInit() {
    // console.log('мы в OnInit');

    this.meetupService.getListHTTP().subscribe((res: any) => {

      let meetups: MeetupDTO[] = res;


      this.allList = meetups.map(el => {
        return this.meetupService.transform(el)
      })

      this.dataSource = this.allList.slice(0, this.pageSize)
      // console.log('результат приехал');
      // console.log('list', this.allList)

      this.test()
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
    const part = this.allList.slice(start, end);
    this.dataSource = part;
  }

  test():void {
    this.meetupService.getListHTTP().subscribe((res: MeetupDTO[]) => {
      from(res).pipe(
        filter(i => i.location.includes('переговорка')),
        delay(500),
        map((i:MeetupDTO) => {return this.meetupService.transform(i)}),
        max((a, b) => a.id - b.id)
      ).subscribe(i => {
        console.log('i =', i);
      })
      console.log('res', res);
    })

    of(1, 2, 3, 5, 3, 0, 9, 2, 6, 7, 4)
      .pipe(
        take(6),
        reduce((acc, curr) => acc + curr, 0)
        )
      .subscribe((v) => console.log(`value: ${v}`));

      //Промисификация setTimeout(), внутри которого происходит подсчёт суммы элементов массива;
      const arr = [1, 2, 3, 5, 3, 0, 9, 2, 6, 7, 4]

      const resolveInTwoSeconds = (arr: number[]) => {
        return new Promise((resolve) => {
          setTimeout(() => resolve(arr.reduce((acc, curr) => acc + curr, 0)), 2000);
        })
      };

      (async function (arr:number[]) {
        const result = await Promise.all([resolveInTwoSeconds(arr)])
        console.log('сумма элементов массива', result);

      })(arr)

  }


}
