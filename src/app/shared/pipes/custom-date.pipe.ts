import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'customDate'
})
export class CustomDatePipe extends DatePipe implements PipeTransform {
    // Add your code here
    override transform(value: any, format: string = 'dd.MM.yyyy'): any {
        return super.transform(value, format);
    }
}
