/*import { Component, OnInit} from '@angular/core';
@Component({
  selector: 'app-first-time-visitor',
  template: `
    <h1>Welcome to our Page!</h1>
  `,
})
export class FirstTimeVisitorComponent {}
@Component({
  selector: 'app-frequent-visitor',
  template: `
  <h1>Welcome Back!</h1>
`,
})
export class FrequentVisitorComponent {}
@Component({
  selector: 'app-root',
  template: `       
    <h1>Hello Angular v4!</h1>
    <ng-container *ngComponentOutlet="welcome"></ng-container>
`,
})
export class App implements OnInit {
  welcome = FirstTimeVisitorComponent;
  checkUser = true;
  ngOnInit() {
    if(!this.checkUser) {
      this.welcome = FrequentVisitorComponent;
    }
  }
}  */