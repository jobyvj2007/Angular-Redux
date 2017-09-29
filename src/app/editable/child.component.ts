import { Component } from '@angular/core';

@Component({
  selector: 'child-profile',
  template: `<button>@ViewChild component</button>`
})

export class ChildComponent {
  constructor() {}
  sendData() {
    console.log("view child component is invoked");
    alert('view child component is invoked');
  }
}
