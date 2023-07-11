import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  searchForm!: FormGroup

  constructor(private fb: FormBuilder) {

  }

  @Output()
  public parentEvent = new EventEmitter();

  ngOnInit(): void {

    this.initForm()

    this.searchForm.get('text')?.valueChanges.pipe(debounceTime(2000)).subscribe((data) => {
      this.parentEvent.emit(data)
    })
  }

  initForm() {
    this.searchForm = this.fb.group({
      text: ['']
    })
  }


}
