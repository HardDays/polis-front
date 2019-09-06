export class PeriodModel{
    constructor(
        public id?: number,
        public title?: string,
        public code?: string,
        public Kterm?: string,
        public month_count?: 4,
        public term?: 1
    ){}
}