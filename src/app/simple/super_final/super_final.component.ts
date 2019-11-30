import { Component, OnInit } from '@angular/core';
import { SimpleService } from '../simple.service';

@Component({
    selector: 'super-final-cmp',
    templateUrl: './super_final.component.html'
})

export class SuperFinalComponent implements OnInit {
    Companies = [];
    Agreement = {} as any;
    Owner = {} as any;
    Holder = {} as any;
    Full = {} as any;
    Token = '';
    constructor(protected service: SimpleService)
    {
        this.Full = JSON.parse(localStorage.getItem('full'));
        
        
    }
    Refresh()
    {
        // console.log(this.Full);
        // this.Full["holder"].contact = [];
        // console.log(this.service.AggreementModel);
        // console.log(this.Full["holder"]);
        this.Full["agreement"].valid_from = this.service.GetValidFrom();
        this.Full["agreement"].valid_to = this.service.GetValidTo();
        // "valid_to": this.GetValidTo(),
        this.Companies = this.service.Companies;

        this.service.CreateCarObject(this.Full['car'],
            (res) => {
                this.Full["agreement"]["car_id"] = res.id;
                this.service.CreateDriver(this.Full["driver"],(res) => {
                    this.Full["agreement"]["drivers_ids"] = [res.id];
                    this.Full["agreement"].owner_registration = JSON.parse(JSON.stringify(this.service.AggreementModel.owner_registration));
                    this.service.Calculate(this.Full["agreement"],
                    (res) => {
                        this.Agreement = res;
                        // console.log(res);
                        this.service.UpdateContacts(this.Agreement.id, {"phone": "+79885413188"},
                        (res) => {
                            // console.log(res);
                        })
                        
                    })
                })
                
            }
        )
            

    }

    ngOnInit(): void 
    {
        this.Refresh();
        // const agr = this.service.Agreement;
        // this.AgrId = agr.id;
        // const holder = this.service.HolderModel;
        // const owner = this.service.OwnerModel;
        // const driver = this.service.DriverModel;
        // this.service.AggreementModel.drivers_ids = [driver.id];
        // this.service.CalculateFull((res) => {
        //     console.log(res);
        //     this.service.CreateUpdateObject({
        //         "car":agr.calculation.data.car_id,
        //         "drivers":[driver.id],
        //         "insurant":holder.person,
        //         "owner":holder.person
        //     },
        //     (res) => {
        //         // this.AgrId = res.id;
        //         this.service.UpdateAgreement(this.AgrId, {"insured_object": res.id},
        //         (res) => {
        //             this.AgrId = res.id;
        //             this.Refresh();
        //             console.log(res);
        //         })
        //         // console.log(res);
        //     },
        //     (err) => {
        //         console.log(err);
        //     })
        // })
        // console.log(this.service.AggreementModel.drivers_ids);
        // console.log(agr);
        // console.log(holder);

        // console.log(this.service.AggreementModel);
        
    }

    CheckContacts()
    {
        this.service.CheckContact(this.Agreement.id, {"phone":"+79885413188",  "token" : this.Token},
        (res) => {
            console.log('check_contact', res);
            const ins_id = res.insurant_id;
            
            this.service.UpdateInsurant(ins_id, this.Full["holder"],
                (res) => {
                    console.log('update ins', res);
                    this.Owner = res.natural_person;
                    this.Holder = res.natural_person;
                    
                    this.service.CreateUpdateObject(
                        {
                            "drivers": this.Full.agreement.drivers_ids,
                            "car": this.Full.agreement.car_id,
                            "insurant":this.Holder.person,
                            "owner":this.Owner.person
                        },
                        (res) => {
                            console.log('create update obj', res);
                            // this.AgrId = res.id;
                            this.service.UpdateAgreement(this.Agreement.id, {"insured_object": res.id},
                            (res) => {
                                console.log('update agreement', res);
                                this.Agreement = res;
                                    this.service.PreferedSC(this.Agreement.id, (res) => {
                                        // console.log(res);
                                        for(let cmp of this.Companies)
                                        {
                                            this.service.GetFinalCalculations(this.Agreement.id, cmp.code,
                                                (res) => {
                                                    console.log('final', cmp.code, res);
                                                    cmp.can_buy = true;
                                                    cmp.data = res.parameters.premium;
                                                },
                                                (err) => {
                                                    // console.log(err);
                                                    cmp.can_buy = false;
                                                    cmp.data = err.body.error;
                                                });
                                            
                                        }
                                    })
                                })
                            })
                        },
                        (err) => {
                        })
                }
            );
    }

    Buy(Cmp)
    {
        this.service.GetPaymentLink(this.Agreement.id, Cmp,
            (res) => {
                console.log(res);
                window.location = res.pay_parameters.pay_link;
            },
            (err) => {

            });
    }
}