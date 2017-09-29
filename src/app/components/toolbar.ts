import { Component, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'bc-toolbar',
  template: `
    <md-toolbar color="primary">
      <button md-icon-button (click)="openMenu.emit()">
        <md-icon>menu</md-icon>
      </button>
      <ng-content></ng-content>
    </md-toolbar>
  `,
  styles: [
    `
      .mat-toolbar.mat-primary {
          background: #90EE90;
          color: rgba(255,255,255,.87);
      }
    `
  ]
})
export class ToolbarComponent {
  @Output() openMenu = new EventEmitter();
}
