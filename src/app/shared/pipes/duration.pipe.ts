import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'duration'
})
export class DurationPipe implements PipeTransform {
    // Add your code here
    transform(value: number = 0): string {
        if (value == 0) {
            return '';
        }
        const hours = Math.floor(value / 60);
        const minutes = value % 60;
        let hourText = 'hours';
        if (hours == 1) {
            hourText = 'hour';
        }
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')} ${hourText}`;
    }
}
