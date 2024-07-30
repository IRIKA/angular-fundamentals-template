import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'customDate'
})
export class CustomDatePipe extends DatePipe implements PipeTransform {
    constructor() {
        super('en-US');
    }
    override transform(value: any, format: string = 'dd.MM.yyyy'): any {
        if (!value) {
            return value;
        }
        const dateParts = value.split('/');
        const dateObject = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]);

        return super.transform(dateObject, format);
    }
}
