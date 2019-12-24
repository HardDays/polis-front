import { Pipe, PipeTransform } from '@angular/core';
 
@Pipe({
    name: 'moneypipe'
})
export class MoneyPipe implements PipeTransform {
    transform(value: number, args?: any): string {

        let string = value.toString();
        let reverse = string.split('').reverse()
        let str = '';
        let res_arr = [];

        for(const i in reverse)
        {
            str = reverse[i] + str;
            if(str.length == 3)
            {
                res_arr.push(str);
                str = '';
            }
        }

        if(str.length > 0)
        {
            res_arr.push(str);
        }

        return res_arr.reverse().join(' ') + "₽";
    }
}