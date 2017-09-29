import { Component, OnInit, trigger, state, style, Input, EventEmitter, Output, transition, animate } from '@angular/core';
import { DataService } from '../services/data-service';
@Component({
  selector: 'bc-animations',
  templateUrl: './animations.component.html',
  styleUrls: ['./animations.component.css'],
  animations: [
    trigger('signal', [
      state('void', style ({
        'transform': 'translateY(-100%)'
      })),
      state('go', style ({
        'background-color': 'blue',
        'height': '100px'
      })),
      state('stop', style ({
        'background-color': 'red',
        'height': '50px'
      })),
      transition('* => *', animate(500))
    ])
  ]
})
export class AnimationsComponent implements OnInit {

  signal;
  isHere = false;
  @Input() sentData:any;

  constructor(private dataservice: DataService) { }
  ngOnInit () {
    console.log("Passed data from register module");
    console.log(this.dataservice.storage);
    this.sentData = this.dataservice.storage;
  } 

  goClick () {
    this.signal = 'go';
  }
  stopClick () {
    this.signal = 'stop'; 
  }
  toggleClick () {
    this.isHere = !this.isHere;
  }
}