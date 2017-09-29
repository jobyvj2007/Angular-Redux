import { Directive, TemplateRef, ViewContainerRef, OnInit } from '@angular/core';

@Directive({
  selector: '[bcMyDirective]'
})
export class MyDirectiveDirective implements OnInit {

  constructor(private template: TemplateRef<Object>, private viewcontainer: ViewContainerRef) {}

  ngOnInit() {
    const condition = true;
    if(condition) {
      this.viewcontainer.createEmbeddedView(this.template);
    }
    else {
      this.viewcontainer.clear();
    }
  }
}
