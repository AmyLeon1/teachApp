import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  //variable to hold entered value
  enteredSearchValue = ''

  //create custom event - event emitter to share data between parent and child components
  @Output()
  searchTextChanged: EventEmitter<string> = new EventEmitter<string>();

  /* Method to raise the custom event*/
  onSearchTextChanged(){
    //emit value that is stored in the enteredSearchValue property
    this.searchTextChanged.emit(this.enteredSearchValue)
  }

}
