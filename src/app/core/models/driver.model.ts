export class DriverModel
{
    constructor(
        public first_name?: string,
        public last_name?: string,
        public patronymic?: string,
        public birth_date?: string,
        public gender = 'M',
        public driving_experience_started?: string,
        public driver_licenses = [new DriverLicenseModel()]
    ){}
}

export class DriverLicenseModel
{
    constructor(
        public credential_type = "DRIVER_LICENSE",
        public number ?: string,
        public series?: string,
        public issue_date?: string
    ){}
}