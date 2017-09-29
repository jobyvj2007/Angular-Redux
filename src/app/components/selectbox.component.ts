import { Component, Input, AfterContentInit } from '@angular/core';
import $ from 'jquery/dist/jquery';
import * as select2 from 'select2/dist/js/select2';

@Component({
  selector: 'bc-selectbox',
  template: `
    <select class="form-control chosen-select chosen-state {{selElmClass}}"  style="width: 172px;height: 22px;">
        <option *ngFor="let dataItem of selectData" [value]="dataItem">{{dataItem}}</option>
    </select>
  `,
  styles: [`
  
  `]
})
export class SelectBoxComponent implements AfterContentInit {

  @Input() selectData: string[];
  @Input() selElmClass: string;
  constructor() {
    select2;
  }
  ngAfterContentInit() {
      $(".chosen-select").select2();
  }
  
}
