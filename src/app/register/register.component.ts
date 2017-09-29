import { Component, OnInit, Input, AfterViewInit, AfterContentInit, Renderer2, ElementRef, Inject, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators  } from '@angular/forms';
import { states, heroes } from './data-model';
import { ConfirmComponent } from '../confirm/confirm.component';
import { DialogService } from "ng2-bootstrap-modal";

import { DataService } from '../services/data-service';
import $ from 'jquery/dist/jquery';
import * as select2 from 'select2/dist/js/select2';
import * as datepicker from 'jquery-datepicker/jquery-datepicker';
import * as slider from 'jquery-ui/ui/widgets/slider';

import { EventManager, DOCUMENT  } from '@angular/platform-browser';
import { trigger,state,style,transition,animate,keyframes } from '@angular/animations';
//import { SelectBoxComponent } from '../components/selectbox.component';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'bc-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, AfterViewInit, AfterContentInit {
  
  rForm: FormGroup;
  description:string = '';
  name:string = '';
  titleAlert:string = 'This field is required';
  states = states;

  heroes = heroes;
  power: string = '';
  sidekick: string = '';
  country: string;
  language: string;
  date: string;
  amount: string;
  fruits: string;
  birds: string;
  
  @Input() langs: string[] = [
    'English',
    'French',
    'German'
  ]

  @Input() countries: string[] = [
    'Argentina',
    'Armenia',
    'Bahamas',
    'Bhutan',
    'Bolivia'
  ]
  selectData: string[];
  selectBirdData: String[];
  fruitBox:string = 'fruits';
  selectBird: string = 'birds';
  //@ViewChild( "mySelectBox" ) selectboxcomp: SelectBoxComponent;

  constructor(private fb: FormBuilder, private dataservice: DataService, private dialogService:DialogService, 
  private eventManager: EventManager, private renderer:Renderer2, private elementref: ElementRef,
  @Inject(DOCUMENT) private document: Document) {
    this.createForm();
    select2;
    slider;
  }

  ngAfterViewInit() {
  
    // datetime picker
    $( "#datepicker" ).datepicker(datepicker);
    // slider
    $( "#slider" ).slider({
			value:1,
			min: 1,
			max: 3,
			step:1,
			slide: function( event, ui ) {
				$( "#amount" ).val( ui.value );
			}
		})
    .each(function() {
      var opt = $(this).data().uiSlider.options;
      var vals = opt.max - opt.min;    
      for (var i = 0; i <= vals; i++) {      
        var el = $('<label class="slide-bar"></label><label class="slide-number">'+(i)+'</label>').css('left',(i/vals*100)+'%');    
        $( "#slider" ).append(el);      
      }
    });  
    $( "#amount" ).val( $( "#slider" ).slider( "value" ) );
    // autocomplete select box
    $(".chosen-select").select2();
    
    $(".chosen-state").select2().change(function() {
      $(".chosen-state").find('option[value='+$(this).val()+']').attr('selected', true);
    });

    $(".chosen-country").select2().change(function() {
      $(".chosen-country").find('option[value='+$(this).val()+']').attr('selected', true);
    });
    
    $(".chosen-lang").select2().change(function() {
      $(".chosen-lang").find('option[value='+$(this).val()+']').attr('selected', true);
    });
  }

  ngAfterContentInit() { }

  ngOnInit() {
    this.selectData =  ['', 'Apple', 'Orange', 'Mango', 'Water Melon'];
    this.selectBirdData =  ['', 'Parrot', 'Pigion', 'Sparrow', 'Robin'];
    
    //this.selectboxcomp.selectData = ['', 'Apple', 'Orange', 'Mango', 'Water Melon'];
    console.log("--------------------------------------------");
    //console.log(this.selectboxcomp.selectData);

    this.rForm.get('sidekick').valueChanges
    .subscribe(

      (validate) => {
        
        if (validate == '1') {
          this.rForm.get('name').setValidators([Validators.required, Validators.minLength(3)]);
          this.titleAlert = "You need to specify at least 3 characters";
        } else {
          this.rForm.get('name').setValidators(Validators.required);
        }

        this.rForm.get('state').setValue($(".chosen-state").val());
        this.rForm.get('language').setValue($(".chosen-lang").val());
        this.rForm.get('country').setValue($(".chosen-country").val());
        this.rForm.get('date').setValue($("#datepicker").datepicker("getDate"));
        this.rForm.get('amount').setValue($( "#amount" ).val());

        this.rForm.get('fruits').setValue($( ".fruits" ).val());
        this.rForm.get('birds').setValue($( ".birds" ).val());

        this.rForm.get('name').updateValueAndValidity();
      }
    );
  }

  createForm() {
    this.rForm = this.fb.group({
      
      'name': [ this.heroes[0].name, Validators.required ],//new FormControl(),
      'description': [ null, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(500)])],
      'state': [ null, Validators.required ],
      'power': [ null, Validators.required ],
      'sidekick': [ null, Validators.required ],
      'language': [ null, Validators.required ],
      'country': [null, Validators.required],
      'date': [null, Validators.required],
      'amount': [null, Validators.required],
      'fruits': [null],
      'birds': [null, Validators.required],

  });

    /*
    this.form.valueChanges
      .filter((valid) => this.form.valid)
      .map((form) => {
        form.lastUpdateTS = new Date();
        return form;
      })
      .map((form) => {
        form.commet = form.commet.replace(/<(?:.|\n)*?>/gm, '');//remove special chars from comment
        return form;
      })
      .subscribe((form) => console.log(JSON.stringify(form)));
    */
    //console.log(this.hero[0].name)
    /*this.rForm.setValue({
      name:    this.hero[0].name
    });*/
  }

  addPost(post:any) {
    
    /*Object.defineProperties(post, {
      'country': {
        value: $('.chosen-box').val(),
        writable: true
      }
    });*/

    console.log(JSON.stringify(post));
    this.dataservice.storage = JSON.stringify(post);
    //this.rForm.reset();
    this.description = post.description;
    this.name        = post.name;
    this.states      = post.state;
    this.sidekick    = post.sidekick;
    this.power       = post.power;
    this.language    = post.language; 
    this.country     = post.country;
    this.date        = post.date; 
    this.amount      = post.amount;
    this.fruits      = post.fruits;
    this.birds      = post.birds;
  }
  
  showConfirm() { 
      
      let disposable = this.dialogService.addDialog(ConfirmComponent, {
        title:'Confirm title', 
        message:'Confirm message'})
        .subscribe((isConfirmed)=>{
          if(isConfirmed) {
              alert('accepted');
          }
          else {
              alert('declined');
          }
          $('div.ui-widget-overlay').remove();
            //We get dialog result
      });

      //We can close dialog calling disposable.unsubscribe();
      //If dialog was not closed manually close it by timeout
      /*setTimeout(()=>{
          disposable.unsubscribe();
      },10000);*/
  }

  myAccordion(event) {
    
    console.log(this);
    console.log(this.elementref.nativeElement);
    console.log(this.renderer);
    console.log(this.document);
    console.log(this.elementref.nativeElement.children);

    let elem = (event.target as Element);
    let siblingElm = elem.parentElement.nextElementSibling;
    //console.log(siblingElm.);
    //alert(nextElm);
    let elementClass = elem.parentElement.classList;
    
    if(elementClass.contains('closed')) {
      //siblingElm.dispatchEvent
      siblingElm.classList.add('slide-down');
      siblingElm.classList.remove('slide-up');
      elementClass.add('opened');
      elementClass.remove('closed');

    }
    else if(elementClass.contains('opened')) {
     // $('.acc-content').slideUp(500);
      siblingElm.classList.add('slide-up');
      siblingElm.classList.remove('slide-down');
      elementClass.add('closed');
      elementClass.remove('opened');
    }
    
    //alert($(this).closest('.accordion').attr('class'));
    /*if($(this).closest('.accordion').hasClass('closed') == true) {
      $('.acc-content').slideDown(500);
      $(this).closest('.accordion').addClass('opened').removeClass('closed');
    }
    else {
      $('.acc-content').slideUp(500);
      $(this).closest('.accordion').addClass('closed').removeClass('opened');
    }*/
  }
}