import { Injectable } from '@angular/core';
import { HttpService } from '../core/services/http.service';
import { Router } from '@angular/router';
import { CompanyModel } from '../core/models/company.model';

@Injectable()
export class SimpleService
{
    Companies = [];
    CarModel: any = {
        "car_model_id": "",
        "engine_power": 0,
        "chassis_number": null,
        "car_body_number": null,
        "vin_number": null,
        "number_plate": null,
        "manufacturing_year": 0,
        "max_mass": null,
        "has_trailer": false,
        "credential":[
            {
                "credential_type": "VEHICLE_REGISTRATION",
                "issue_date": "",
                "expiration_date":"",
                "number": "",
                "series":""
            },
            {
                "credential_type": "DIAGNOSTIC_CHART",
                "issue_date": "",
                "number": "",
                "expiration_date":"",
                "series":"series"
            }
        ]
    };

    HolderModel: any = null as any;
    OwnerModel: any = null as any;
    DriverModel: any = null as any;
    Agreement : any = null as  any;
    AggreementModel: any = {
        "car_id": "",
        "valid_from": this.GetValidFrom(),
        "valid_to": this.GetValidTo(),
        "engine_power": 102,
        "is_car_without_registration": false,
        "car_type": "B",
        "target_of_using": 11,
        "has_car_trailer": false,
        "insurance_period": 8,
        "owner_registration": {
            "address_query": "",
            "registration_kladr_id": "",
            "kladr_id": "",
            "city_kladr_id": ""
        },
        "periods": [],
        "drivers_ids": []
    };

    FullObject = {
        car: {},
        driver:{},
        holder: {},
        agreement: {
            "car_id": "",
            "valid_from": this.GetValidFrom(),
            "valid_to": this.GetValidTo(),
            "engine_power": 102,
            "is_car_without_registration": false,
            "car_type": "B",
            "target_of_using": 11,
            "has_car_trailer": false,
            "insurance_period": 8,
            "owner_registration": {
                "address_query": "",
                "registration_kladr_id": "",
                "kladr_id": "",
                "city_kladr_id": ""
            },
            "drivers_ids": []
        }
    };

    DriversCount = 1;

    IsOwner = true;

    constructor(public http: HttpService, private router: Router) 
    {
        this.CarModel = this.GetValFromLocalStorage('car') ? JSON.parse(this.GetValFromLocalStorage('car')) : {
            "car_model_id": "",
            "engine_power": 0,
            "chassis_number": null,
            "car_body_number": null,
            "vin_number": null,
            "number_plate": null,
            "manufacturing_year": 0,
            "max_mass": null,
            "has_trailer": false,
            "credential":[
                {
                    "credential_type": "VEHICLE_REGISTRATION",
                    "issue_date": "",
                    "number": "",
                    "series":""
                },
                {
                    "credential_type": "DIAGNOSTIC_CHART",
                    "issue_date": "",
                    "number": "",
                    "expiration_date":""
                }
            ]
        };

        this.DriverModel = localStorage.getItem('driver') ? JSON.parse(localStorage.getItem('driver')) : null as any;

        this.AggreementModel = localStorage.getItem('agr') ? JSON.parse(localStorage.getItem('agr')) : {
            "car_id": "",
            "valid_from": this.GetValidFrom(),
            "valid_to": this.GetValidTo(),
            "engine_power": 102,
            "is_car_without_registration": false,
            "car_type": "B",
            "target_of_using": 11,
            "has_car_trailer": false,
            "insurance_period": 8,
            "owner_registration": {
                "address_query": "",
                "registration_kladr_id": ""
            },
            "periods": [],
            "drivers_ids": []
        };

        this.Agreement = localStorage.getItem('agreement') ? JSON.parse(localStorage.getItem('agreement')) : null as any;
        this.HolderModel = localStorage.getItem('holder') ? JSON.parse(localStorage.getItem('holder')) : null as any;
        this.OwnerModel = localStorage.getItem('owner') ? JSON.parse(localStorage.getItem('owner')) : null as any;
        
        this.GetCompanies();
    }

    CheckCarPlateNumber(number: string, success?: (ok) => void, fail?: (err) => void)
    {
        this.http.CommonRequest(
            () => this.http.PostData("/v2/insured_objects/cars/by_number_plate", {"number_plate": number}),
            (res) => {
                this.CarModel = res;
                var checkTOBody = {
                    "ident_type": "",
                    "ident_number": ""
                };

                if(this.CarModel.vin_number)
                {
                    checkTOBody.ident_type = "VIN";
                    checkTOBody.ident_number = this.CarModel.vin_number;
                }
                else{
                    checkTOBody.ident_type = "BodyNumber";
                    checkTOBody.ident_number = this.CarModel.number_plate;
                }
                if(res.credential)
                {
                    for(let i in res.credential)
                    {
                        this.CarModel.credential[i] = res.credential[i];
                    }
                }
                this.CarModel.credential[0].issue_date = "2019-04-28";
                this.CheckTO(checkTOBody,
                    (res)=>{
                        if(res)
                        {
                            if(!this.CarModel.credential[1])
                            {
                                this.CarModel.credential.push({});
                            }
                            this.CarModel.credential[1].expiration_date = res.next_to;
                            this.CarModel.credential[1].number = res.number;
                            this.CarModel.credential[1].credential_type = "DIAGNOSTIC_CHART";
                            this.WriteValToLocalStorage('car', JSON.stringify(this.CarModel));
                            if(success && typeof success == 'function')
                            {
                                success(res);
                            }
                        }
                    });
                
                
            },
            fail
        )
    }

    CheckTO(data:any, success?: (ok) => void, fail?: (err) => void)
    {
        this.http.CommonRequest(
            () => this.http.PostData("/v1/insured_objects/cars/ticket_check", data),
            success,
            fail
        )
    }

    PreferedSC(agrId, success?: (ok) => void, fail?: (err) => void )
    {
        this.http.CommonRequest(
            () => this.http.PatchData("/v1/agreements/" + agrId, {"addition_info":{"preferred_company":"ALPHA_STRAH"}}),
            success,
            fail
        );
    }

    UpdateContacts(agrId,data, success?: (ok) => void, fail?: (err) => void )
    {
        this.http.CommonRequest(
            () => this.http.PostData("/v1/agreements/" + agrId + "/insurants/contacts", data),
            success,
            fail
        );
    }

    UpdateContacts2(agrId,data, success?: (ok) => void, fail?: (err) => void )
    {
        this.http.CommonRequest(
            () => this.http.PostData("/v1/agreements/" + agrId + "/insurants_contacts", data),
            success,
            fail
        );
    }

    CheckContact(agrId,data, success?: (ok) => void, fail?: (err) => void )
    {
        this.http.CommonRequest(
            () => this.http.PostData("/v1/agreements/" + agrId + "/insurants/contacts/check", data),
            success,
            fail
        );
    }

    CreateCarObject(object: any, success?: (ok) => void, fail?: (err) => void)
    {
        this.http.CommonRequest(
            () => this.http.PostData("/v2/insured_objects/cars", object),
            (res) => {

                this.AggreementModel.car_id = res.id; 
                if(success && typeof success == 'function')
                {
                    success(res);
                }

            },
            fail
        );
    }

    CreateDriver(object: any, success?: (ok) => void, fail?: (err) => void)
    {
        this.http.CommonRequest(
            () => this.http.PostData("/v1/insured_objects/drivers", object),
            (res) => {
                this.DriverModel = res;
                localStorage.setItem('driver', JSON.stringify(this.DriverModel));
                // console.log(res);
                this.AggreementModel.drivers_ids = [res.id]; 
                if(success && typeof success == 'function')
                {
                    success(res);
                }

            },
            fail
        );
    }

    CreateHolder(object: any, success?: (ok) => void, fail?: (err) => void)
    {
        this.http.CommonRequest(
            () => this.http.PostData("/v1/insured_objects/insurants/natural_persons", JSON.stringify(object)),
            (res) => {
                this.HolderModel = res;
                localStorage.setItem('holder', JSON.stringify(this.HolderModel));

                this.CreateOwner(object, success, fail);
                // console.log(res);
                // this.AggreementModel.drivers_ids = [res.id]; 
                // if(success && typeof success == 'function')
                // {
                //     success(res);
                // }

            },
            fail
        );
    }

    CreateOwner(object: any, success?: (ok) => void, fail?: (err) => void)
    {
        this.http.CommonRequest(
            () => this.http.PostData("/v1/insured_objects/owners/natural_persons", JSON.stringify(object)),
            (res) => {
                this.OwnerModel = res;
                localStorage.setItem('owner', JSON.stringify(this.OwnerModel));
                // console.log(res);
                // this.AggreementModel.drivers_ids = [res.id]; 
                if(success && typeof success == 'function')
                {
                    success(res);
                }

            },
            fail
        );
    }

    CreateUpdateObject(data, success?: (ok) => void, fail?: (err) => void)
    {
        this.http.CommonRequest(
            () => this.http.PostData("/v1/insured_objects/", JSON.stringify(data)),
            success,
            fail
        )
    }

    UpdateAgreement(aggr_id, data,success?: (ok) => void, fail?: (err) => void)
    {
        this.http.CommonRequest(
            () => this.http.PatchData("/v1/agreements/" + aggr_id, data),
            success,
            fail
        );
    }

    GetAgreementInfo(aggr_id,success?: (ok) => void, fail?: (err) => void)
    {
        this.http.CommonRequest(
            () => this.http.GetData("/v1/agreements/" + aggr_id, ''),
            success,
            fail
        );
    }

    GetFinalCalculations(aggr_id, CMP, success?: (ok) => void, fail?: (err) => void)
    {
        this.http.CommonRequest(
            () => this.http.PostData("/v1/agreements/"+ aggr_id + "/results/" + CMP, null),
            success,
            fail
        )
    }

    GetPaymentLink(aggr_id, CMP, success?: (ok) => void, fail?: (err) => void)
    {
        this.http.CommonRequest(
            () => this.http.PostData("/v2/agreements/"+ aggr_id + "/results/" + CMP + "/buy", null),
            success,
            fail
        )
    }

    GetStatus(aggr_id, CMP, success?: (ok) => void, fail?: (err) => void)
    {
        this.http.CommonRequest(
            () => this.http.PostData("/v1/agreements/"+ aggr_id + "/results/" + CMP + "/status", ''),
            success,
            fail
        )
    }

    GetLink(aggr_id, CMP, success?: (ok) => void, fail?: (err) => void)
    {
        this.http.CommonRequest(
            () => this.http.PostData("/v1/agreements/"+ aggr_id + "/results/" + CMP + "/buy", ''),
            success,
            fail
        )
    }

    WriteValToLocalStorage(key, val)
    {
        localStorage.setItem(key, val);
    }

    GetValFromLocalStorage(key)
    {
        return localStorage.getItem(key);
    }

    GetCarModelFullInfo(modelId: number, success?: (ok) => void, fail?: (err) => void)
    {
        this.http.CommonRequest(
            () => this.http.GetData("/v1/dicts/car_models/"+modelId),
            success,
            fail
        );
    }

    GetValidFrom()
    {
        let date = new Date();
        date.setDate(date.getDate() + 4);
        let str = date.toISOString();
        return str.split("T")[0];
    }

    GetValidTo()
    {
        let date = new Date(this.GetValidFrom());

        date.setFullYear(date.getFullYear() + 1);

        date.setDate(date.getDate() - 1);
        let str = date.toISOString();
        return str.split("T")[0];
    }

    GetCompanies(success?: (ok) => void, fail?: (err) => void)
    {
        this.Companies = [];
        this.http.CommonRequest(
            () => this.http.GetData("/v1/companies/", ''),
            (res) => {

                for(const item of res)
                {
                    this.Companies.push(new CompanyModel(item.title, this.http.GetQueryStr(item.logo), item.id, item.code));
                }
                // console.log(this.Companies);
                

            },
            fail
        );
    }

    Calculate(obj, success?: (ok) => void, fail?: (err) => void)
    {
        this.http.CommonRequest(
            () => this.http.PostData("/v1/agreements/calculations", obj),
            success,
            fail
        );
    }

    CalculateFull(success?: (ok) => void, fail?: (err) => void)
    {
        this.http.CommonRequest(
            () => this.http.PostData("/v1/agreements/calculations", this.AggreementModel),
            res => {
                this.Agreement = res;
                localStorage.setItem('agreement', JSON.stringify(this.Agreement));
                console.log(this.Agreement);
                if(success && typeof success == 'function')
                {
                    success(res);
                }
            },
            fail
        );
    }

    CalculateCompany(Code, success?: (ok) => void, fail?: (err) => void)
    {
        this.http.CommonRequest(
            () => this.http.PostData("/v1/agreements/calculations/" + Code, this.AggreementModel),
            success,
            fail
        );
    }

    CalculateCompanyByObject(Code, Obj, success?: (ok) => void, fail?: (err) => void)
    {
        this.http.CommonRequest(
            () => this.http.PostData("/v1/agreements/calculations/" + Code, Obj),
            success,
            fail
        );
    }

    UpdateInsurant(id, Obj, success?: (ok) => void, fail?: (err) => void)
    {
        this.http.CommonRequest(
            () => this.http.PatchData("/v1/insured_objects/insurants/" + id, Obj),
            success,
            fail
        );
    }
}