import { Component, Input } from '@angular/core';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas, IconName, IconPrefix } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {

  constructor(library: FaIconLibrary) {
    library.addIconPacks(fas);
  }

  // Use the names for the inputs `buttonText` and `iconName`.
  @Input() buttonText = '';
  @Input() type = 'button';
  @Input() iconName!: [IconPrefix, IconName];
  @Input() buttonStyles: { [key: string]: string } = {};
  @Input() disabled = false;
}
