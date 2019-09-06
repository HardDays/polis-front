export class UserModel{
    constructor(
        public id?: string,
        public username?: string,
        public first_name?: string,
        public last_name?: string,
        public patronymic?: string,
        public department?: string|DepartmentModel,
        public is_active?: boolean,
        public groups?: GroupModel[]
        
    ) {}
}

export class DepartmentModel{
    constructor(
        public id?:string,
        public title?: string,
        public parent?: string,
        public users?: UserModel[]
        ){
    }
}

export class GroupModel{
    constructor(
        public name?: string,
        public code?: string
    ){}
}