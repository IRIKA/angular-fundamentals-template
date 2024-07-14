import { Directive } from "@angular/core";
import { AbstractControl, ValidationErrors } from "@angular/forms";

@Directive({
    selector: '[emailValidator]',
    providers: [/*Add your code here*/]
})
export class EmailValidatorDirective {
    // Add your code here
    validate(control: AbstractControl): ValidationErrors | null {
        throw new Error("Method not implemented.");
    }
    registerOnValidatorChange?(fn: () => void): void {
        throw new Error("Method not implemented.");
    }
}
