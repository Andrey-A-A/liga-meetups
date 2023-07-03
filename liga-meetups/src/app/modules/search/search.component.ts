import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, ValidationErrors, AbstractControl } from '@angular/forms';
import { delay, filter, map, max, reduce, debounceTime } from 'rxjs/operators';

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
      console.log('data', data);
      this.parentEvent.emit(data)
    })
  }

  initForm() {
    this.searchForm = this.fb.group({
      text: ['']
    })
  }


}
