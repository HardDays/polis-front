export class AgreementModel{
    constructor(
        public id = 0,
        public multidrive = 0,
        public insurerIsOwner = 1,
        public purpose = "personal",
        public licensePlate?: string,
        public registeredAbroad = 0,
        public registrationWay = 0,
        public useTrailer = 0,
        public violations = 0,
        public usePeriod = 12,
        public date?: string,
        public phone?: string,
        public email?: string,
        public name?: string,
        public access_id?: string,
        public access_code?: string,
        public car_id?: number,
        public owner_id?: number,
        public insurer_id?: number,
        public created_at?: string,
        public updated_at?: string,
        public vehicle = new VehicleModel(),
        public owner = new OwnerModel(),
        public insurer?: OwnerModel,
        public drivers?:DriverModel[]
    ){}
}

export class VehicleModel{
    constructor(
        public id = 0,
        public type = 1,
        public power?: number,
        public year?: number,
        public vin?: string,
        public docType = 1,
        public docSerial?: string,
        public docNumber?: string,
        public brand?: string,
        public model?: string,
        public dc?: string,
        public dcDate?: string,
        public bodyNum?: string,
        public chassisNum?: string,
        public docDate?: string,
        public dcIssueDate?: string,
        public created_at?: string,
        public updated_at?: string
    ){}
}

export class OwnerModel{
    constructor(
        public id = 0,
        public lastname?: string,
        public firstname?: string,
        public middlename?: string,
        public birthdate?: string,
        public passportSerial?: string,
        public passportNumber?: string,
        public passportDate?: string,
        public city?: string,
        public street?: string,
        public house?: string,
        public apartment?: string,
        public fullkladr?: string,
        public zip?: string,
        public fullAddress?: string
    )
    {}
}

export class DriverModel{
    constructor(
        public id = 0,
        public lastname?: string,
        public firstname?: string,
        public middlename?: string,
        public birthdate?: string,
        public age?: number,
        public exp?: number,
        public expdate?: string,
        public licenseSerial?: string,
        public licenseNumber?: string,
        public licenseDate?: string
    ){}
}