import { Injectable } from "@angular/core";


@Injectable()
export class TranslateService
{
    private ru = {
        'а': '(a|(ai))', 
        'б': '(b)', 
        'в': '(v|w|f)', 
        'г': '(g|j|(gh)|(zh)|q)', 
        'д': '(d)', 
        'е': '(e|a|(ae)|(ey)|(ie)|(ye)|(et)|(ea)|(ai)|(eu))', 
        'ё': '(e|(yo)|y|(yu))', 
        'ж': '(g|j|(gh)|(zh)|(ge))', 
        'з': '(z|(zh)|(th)|s)', 
        'и': '(i|y|e|(ee)|(ey)|(ea))',
        'й': '(i|y|e|(ey))', 
        'к': '(k|c|(ck)|(ch)|q)', 
        'л': '(l|(ll))', 
        'м': '(m)', 
        'н': '(n|(ng))', 
        'о': '(o|(woo)|w|(ow)|a|(eot)|(ault))', 
        'п': '(p)', 
        'р': '(r|p|(rr))', 
        'с': '(s|c|(th)|(sh)|(ss)|(sc))', 
        'т': '(t|(ght)|(th))', 
        'у': '(u|(oo)|y|(ough)|(woo)|w|(ow))', 
        'ф': '(v|w|f)', 
        'х': '(x|h|(ch)|(kh))', 
        'ц': '(c|(ts)|s|(sc))', 
        'ч': '((ch)|(sh)|(shch)|s|(tz)|c)', 
        'ш': '((ch)|(sh)|(shch)|s|(sch))', 
        'щ': '((ch)|(sh)|(shch)|s)',
        'ь': '',
        'ъ': '', 
        'ы': '(i|y|e|(ee))', 
        'э': '(a|e|(ae)|(ai))', 
        'ю': '(u|y|(yu)|(iu)|(you)|(ju))', 
        'я': '((ia)|(ya)|(ja)|a)',
        'дж': '(g|j|(gh)|(zh)|(ge))',
        'кс': '(x|h|(ch)|(kh)|(ks))',
        'ай': '(i|y|e|(ee)|(ey)|(ea)|(ai)|(ay))'
    }
    constructor() 
    {
    }

    public RuToLatin(str: string)
    {
        let n_str = [];

        str = str.replace(/[ъь]+/g, '');

        for( let i=0; i< str.length; )
        {
            const char = str[i].toLowerCase();
            const combo = (char + str[i + 1]).toLowerCase();
            if(this.ru[combo])
            {
                n_str.push(this.ru[combo]);
                i += 2;
            }
            else{
                n_str.push(
                    this.ru[char] ? this.ru[char] : char
                )
                ++i;
            }
        }

        return n_str.join('');
    }
}
