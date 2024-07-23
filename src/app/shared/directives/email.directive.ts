import { Directive, forwardRef } from "@angular/core";
import { AbstractControl, NG_VALIDATORS, Validator, ValidationErrors } from "@angular/forms";

@Directive({
    selector: '[emailValidator] [ngModel]',
    providers: [{
        provide: NG_VALIDATORS,
        useExisting: forwardRef(() => EmailValidatorDirective),
        multi: true
    }]
})
export class EmailValidatorDirective implements Validator {
    // Add your code here

    static validate(control: AbstractControl): ValidationErrors | null {
        const value = control.value;
        if (!value) {
            return { email: true };
        }
        const emailRegex = new RegExp('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$', "i");
        const valid = emailRegex.test(value);

        return valid ? null : { email: true };
    }

    validate(control: AbstractControl): ValidationErrors | null {
        return EmailValidatorDirective.validate(control);
    }
}
