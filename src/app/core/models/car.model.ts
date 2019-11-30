export class CarModel{
    constructor(
        public car_model_id?: number,
        public engine_power?: number,
        public chassis_number?: string,
        public car_body_number?: string,
        public vin_number?: string,
        public number_plate?: string,
        public manufacturing_year?: number,
        public max_mass?: string,
        public has_trailer = false,
        public credential?: CarCredentialModel[]
    ){

    }
}


export class CarCredentialModel{
    constructor(
        public credential_type?: string,
        public issue_date?: string,
        public number?: string,
        public series?: string
    ){}
}