export class PolicyholderModel{
    constructor(
        public last_name?: string,
        public first_name?: string,
        public patronymic?: string,
        public birth_date?: string,
        public credential = [new CredentialModel("RUSSIAN_INTERNAL_PASSPORT")],
        public address = [
            new AddressModel('','LEGAL_ADDRESS'),
            new AddressModel('', 'ACTUAL_ADDRESS')
        ],
        public contact = [
            new ContactModel('PHONE'),
            new ContactModel('EMAIL')
        ]
    )
    {

    }
}

export class CredentialModel{
    constructor(
        public credential_type?: string,
        public issue_date?: string,
        public issue_point?: string,
        public issue_point_code?: string,
        public number?: string,
        public series?: string
    ){}
}

export class AddressModel{
    constructor(
        public address_query?: string,
        public address_type?: string
    ){}
}

export class ContactModel{
    constructor(
        public contact_type?: string,
        public data?: string
    ){}
}