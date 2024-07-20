import { Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[togglePassword]',
  exportAs: 'togglePassword'
})
export class TogglePasswordDirective {
  isVisible = true;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2
  ) { }

  getEl(): any {
    return this.el.nativeElement;
  }

  toggleView() {
    if (this.isVisible) {
      this.renderer.setAttribute(this.getEl(), 'type', 'text');
    } else {
      this.renderer.setAttribute(this.getEl(), 'type', 'password');
    }
    this.isVisible = !this.isVisible;
  }
}
