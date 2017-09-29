import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MyDirectiveDirective } from '../editable/my-directive.directive';
import { ChildComponent } from '../editable/child.component';
import { SelectBoxComponent } from '../components/selectbox.component';

@Component({
  selector: 'bc-editable',
  templateUrl: './editable.component.html',
  styleUrls: ['./editable.component.css'],
  providers: [MyDirectiveDirective]
})
export class EditableComponent implements AfterViewInit, OnInit {

  //@ViewChild(ChildComponent) childcomponent: ChildComponent;
  @ViewChild('myChild') childcomponent: ChildComponent;
  @ViewChild( SelectBoxComponent ) selectbox: SelectBoxComponent;

  editableSelect = 2;
  editableSelectOptions =[
    {value: 1, text: 'status1'},
    {value: 2, text: 'status2'},
    {value: 3, text: 'status3'},
    {value: 4, text: 'status4'}
  ];

  constructor() {
    //console.log(this.selectbox.states);  
  }

  ngOnInit() {
    this.selectbox.selectData = ['', 'Apple', 'Orange', 'Mango', 'Water Melon'];
  }

  ngAfterViewInit() {
    //console.log(this.selectbox.states); 
  }
  update() {
    this.childcomponent.sendData();
  }
  saveEditable(value) {
    //call to http service
    console.log('http.service: ' + value);
  }
}
