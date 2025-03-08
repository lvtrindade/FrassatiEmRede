import { Directive, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appPhoneFormat]'
})
export class PhoneFormatDirective {

  constructor(private ngControl: NgControl) {}

  @HostListener('input', ['$event'])

  onInput(event: Event) : void{
    const input = event.target as HTMLInputElement;

    let value = input.value.replace(/\D/g, '');

    if (value.length > 11) {
      value = value.substring(0, 11);
    }

    if (value.length > 0) {
      value = `(${ value.substring(0,2) }) ${ value.substring(2,7) }-${ value.substring(7,11) }`;
    }

    this.ngControl.control?.setValue(value, { emitEvent:false });
  }
}
