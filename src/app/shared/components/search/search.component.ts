import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  @Input() placeholder: string | undefined;
  @Output() search = new EventEmitter<string>();

  searchAction(value: string) {
    this.search.emit(value);
  }
}