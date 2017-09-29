import { Component, OnInit, Input, AfterContentInit, ElementRef } from '@angular/core';
import { DialogComponent, DialogService } from "ng2-bootstrap-modal";
import { EventManager } from '@angular/platform-browser';
import $ from 'jquery/dist/jquery';

export interface ConfirmModel {
  title:string;
  message:string;
}
@Component({  
    selector: 'confirm',
    template: `<div class="modal-dialog">
                <div class="modal-content">
                   <div class="modal-header">
                     <button type="button" class="close" (click)="close()" >&times;</button>
                     <h4 class="modal-title">{{title || 'Confirm'}}</h4>
                   </div>
                   <div class="modal-body">
                     <p>{{message || 'Are you sure?'}}</p>
                     <div><label>Your name: </label><input type="text" name="" /></div>
                   </div>
                   <div class="modal-footer">
                     <button type="button" class="btn btn-primary" (click)="confirm()">OK</button>
                     <button type="button" class="btn btn-default" (click)="close()" >Cancel</button>
                   </div>
                 </div>
              </div>`,
    host: {
      '(document:click)': 'onClick($event)',
    }          
})
export class ConfirmComponent extends DialogComponent<ConfirmModel, boolean> implements ConfirmModel {

  title: string;
  message: string;
  @Input() hideOnEsc = true;
  testPopup: boolean = false;

  constructor(dialogService: DialogService, private eventManager: EventManager, private _eref: ElementRef) {
    super(dialogService);
    $('body').append('<div class="ui-widget-overlay"></div>');
  }
  
  ngOnInit() {

    $('div.custom-overlay').addClass('ui-widget-overlay'); 
    this.testPopup = true; 
    this.eventManager.addGlobalEventListener("window",'keyup.esc', () => {
        if (this.hideOnEsc) {
            this.close();
        }
    });
  }

  onClick(event) {
    if (!this._eref.nativeElement.contains(event.target)) {
      console.log(event.target);
      if(event.target.classList.contains('modal')) {
         this.close();
      }
    }   
  }

  confirm() {
    // we set dialog result as true on click on confirm button, 
    // then we can get dialog result from caller code 
    this.result = true;
    this.close();
  }
  
}