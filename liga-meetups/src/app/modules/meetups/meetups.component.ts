import { Component, ChangeDetectionStrategy, AfterContentChecked,  DoCheck, OnInit, SimpleChanges } from '@angular/core';
import { MeetupService } from '../../services/meetup.service'
import { MeetupDTO } from '../../interfaces/DTO.interface';
import { Meetup, FromPage } from "../../interfaces/meetup.interface";
import { Router } from '@angular/router';
import { delay, filter, map, max, reduce } from 'rxjs/operators';
import { from, of, first, take,  } from 'rxjs';
import { SpinnerComponent } from 'src/app/shared/spinner/spinner.component';

@Component({
  selector: 'app-meetups',
  templateUrl: './meetups.component.html',
  styleUrls: ['./meetups.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class MeetupsComponent implements OnInit {

  public allList: Meetup[] = [];
  public filteredList: Meetup[] = [];
  public dataSource: Meetup[] = [];
  public fromPage = FromPage.AllMeetups;
  public pageSize = 5;
  public currentPage = 0;
  public totalSize = 0;

  public isLoading = false;

  constructor(public meetupService: MeetupService, private router: Router) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('changes', changes);
  }


  ngOnInit() {
    this.isLoading = true;

    this.meetupService.getListHTTP().pipe(delay(1500)).subscribe((res: any) => {

      let meetups: MeetupDTO[] = res;


      this.allList = meetups.map(el => {
        return this.meetupService.transform(el)
      })

      this.filteredList = meetups.map(el => {
        return this.meetupService.transform(el)
      })

      this.dataSource = this.filteredList.slice(0, this.pageSize)

      this.test()

      this.isLoading = false;
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
    const part = this.filteredList.slice(start, end);
    this.dataSource = part;
  }

  searchTextUpdated(text: string) {
    console.log('получили у родителя текст', text);
    this.filteredList = this.allList.filter(el => {
      return this.filterText(el?.description, text) || this.filterText(el.title, text) || this.filterText(el.author, text) || this.filterDate(el.time, text)
    })
    console.log('filteredList', this.filteredList);
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
      console.log('dateText', dateText);
      return dateText === text
    } else {
      return false
    }


    // return str !== null && str !== undefined && str.toLowerCase().indexOf(text.toLowerCase()) !== -1
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
