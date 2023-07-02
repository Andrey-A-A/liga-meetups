import { Component, OnInit } from '@angular/core';
import { UserDTO } from 'src/app/interfaces/DTO.interface';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/interfaces/user.interface';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit{

  public allList: User[] = []
  public dataSource: User[] = [];
  public pageSize = 5;
  public currentPage = 0;
  public totalSize = 0;

  constructor(private userService: UserService) {

  }

  ngOnInit(): void {

    this.userService.getAllUsers().subscribe((res: any) => {

      let users: UserDTO[] = res;

      this.allList = users.map((el) => {
        return this.userService.transform(el)
      })

      this.dataSource = this.allList.slice(0, this.pageSize)

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
}
