import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserDTO } from 'src/app/interfaces/DTO.interface';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/interfaces/user.interface';
import { timer, Subscription } from 'rxjs';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit, OnDestroy{

  public allList: User[] = []
  public dataSource: User[] = [];
  public pageSize = 5;
  public currentPage = 0;
  public totalSize = 0;

  public refreshTimer = timer(0, 30000)
  private subscription: Subscription = this.refreshTimer.subscribe()

  constructor(private userService: UserService) {

  }

  ngOnInit(): void {

    this.subscription = this.refreshTimer.subscribe(() => {
      this.userService.getAllUsers().subscribe((res: any) => {

        let users: UserDTO[] = res;

        let newList = users.map((el) => {
          return this.userService.transform(el)
        })

        if (newList.length !== this.allList.length) {
          this.allList = users.map((el) => {
            return this.userService.transform(el)
          })
          this.dataSource = this.allList.slice(0, this.pageSize)
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
    const part = this.allList.slice(start, end);
    this.dataSource = part;
  }
}
