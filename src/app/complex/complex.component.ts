import { Component, OnInit, ViewChild } from '@angular/core';
import { CompanyModel } from '../core/models/company.model';
import { PeriodComponent } from '../period/preiod.component';
import { TransportComponent } from '../transport/transport.component';
import { PolicyholderComponent } from '../policyholder/policyholder.component';
import { OwnerComponent } from '../owner/owner.component';
import { DriversComponent } from '../drivers/drivers.component';
import { MainService } from '../core/services/main.service';

@Component({
    selector: 'complex-cmp',
    templateUrl: './complex.component.html'
})

export class ComplexComponent implements OnInit {
    ngOnInit(): void {
        for(const i in this.Data)
        {
          this[i].SetData(this.ReadFromLocalStorage(i));
        }
    
        this.CalculationObject = JSON.parse(this.ReadFromLocalStorage("CalculationObject"));
    
        this.GetSCompaniesData();
        // this.Calculate();
      }
      title = 'gde-polis';
      Data = {
        period: {},
        transport: {},
        policyholder: {},
        owner: {},
        drivers:[]
      };
    
      SaveVals = {
        period: {},
        transport: {},
        policyholder: {},
        owner: {},
        drivers:[]
      };
    
      CalculationObject = {};
      FinalCalculation = {};
    
      PolicyHolder: any = {};
      Car:any = {};
      Owner: any = {};
    
      CanCombine = false;
      CombineDataString = "";
    
      CombineId: string = '';
      SCompanies:CompanyModel[] = [];
      @ViewChild('period') period: PeriodComponent;
      @ViewChild('transport') transport: TransportComponent;
      @ViewChild('policyholder') policyholder: PolicyholderComponent;
      @ViewChild('owner') owner: OwnerComponent;
      @ViewChild('drivers') drivers: DriversComponent;
    
    
      constructor(private main: MainService)
      {
        this.SaveVals = this.ReadFromLocalStorage("save_vals") ? JSON.parse(this.ReadFromLocalStorage("save_vals")) : {
          period: {},
          transport: {},
          policyholder: {},
          owner: {},
          drivers:[]
        };
    
        this.CalculationObject = this.ReadFromLocalStorage("CalculationObject") ? JSON.parse(this.ReadFromLocalStorage("CalculationObject")) : {};
        this.FinalCalculation = this.ReadFromLocalStorage('FinalCalculation') ? JSON.parse(this.ReadFromLocalStorage('FinalCalculation')) : {};
        // console.log(FinalCalculation);
        
        // console.log(this.CalculationObject);
      }
    
    
    
      Calculate()
      {
        for(const i in this.Data)
        {
          this.Data[i] = this[i].GetData();
          this.WriteToLocalStorage(i, this[i].GetData());
        }
        this.WriteToLocalStorage("save_vals", this.SaveVals);
    
        this.CreateDrivers();
        // console.log(this.Data);
      }
    
      WriteToLocalStorage(property, data)
      {
        localStorage.setItem(property, JSON.stringify(data));
      }
    
      ReadFromLocalStorage(property)
      {
        const val = localStorage.getItem(property);
        return val ? val : null;
      }
    
      CreateDrivers()
      {
        this.SaveVals.drivers = [];
        if(this.Data.drivers && this.Data.drivers.length > 0)
        {
          let i = 0, n = this.Data.drivers.length;
          for(let item of this.Data.drivers)
          {
            this.main.CreateDrivers(item, 
              (res) => {
                console.log("Create driver", res);
                this.SaveVals.drivers.push(res);
                this.WriteToLocalStorage("save_vals", this.SaveVals);
                i = i + 1;
                if(i == n)
                {
                  this.CreateCalculation();
                }
              },
              (err) => {
    
              });
          }
          
        }
        else{
          this.SaveVals.drivers = [];
        }
      }
    
      CreateCalculation()
      {
        this.CalculationObject = {
        } as any;
        for(const i in this.Data.period)
        {
          this.CalculationObject[i.toString()] = this.Data.period[i];
        }
        this.CalculationObject["target_of_using"] = 11;
        this.CalculationObject["car_type"] = "B";
        this.CalculationObject["has_car_trailer"] = false;
        this.CalculationObject["is_car_without_registration"] = false;
        
        if(this.Data.period["insurance_period"] != 8)
        {
          this.CalculationObject["periods"] = [{
            "start_date" : this.CalculationObject["valid_from"],
            "end_date": this.CalculationObject["valid_to"]
          }];
        }
        
        this.CalculationObject["drivers_ids"] = [];
        for(const item of this.SaveVals.drivers)
        {
          this.CalculationObject["drivers_ids"].push(item.id);
        }
        this.CalculationObject["engine_power"] = this.Data.transport["engine_power"];
        this.CalculationObject["owner_registration"] = {
          "address_query" : "Удачный Город",
          "region_kladr_id": "1401700200000"
        };
    
        this.WriteToLocalStorage("CalculationObject", this.CalculationObject);
    
        this.main.Calculations(this.CalculationObject,
          (res) => {
            console.log("Create first calculations", res);
            this.FinalCalculation = res;
            this.GetAggrInfo(this.FinalCalculation["id"]);
            // console.log(res);
            this.WriteToLocalStorage("FinalCalculation", this.FinalCalculation );
            // setTimeout(
            //   () => this.CreatePolicyholder(),
            //   1000
            // );
            this.CreatePolicyholder();
          },
          (fail) =>{
            console.log(fail);
          })
      }
    
      CreatePolicyholder()
      {
        this.main.CreatePolicyHolder(this.Data.policyholder,
          (res)  => {
            console.log("Create policyholder", res);
            this.PolicyHolder = res;
            this.WriteToLocalStorage("PolicyHolder", this.PolicyHolder);
            // console.log(res);
    
            // setTimeout(
            //   () => this.CreateCar(),
            //   1000
            // );
            this.CreateCar();
          },
          (err) =>{
            console.log(err);
          });
      }
    
      CreateCar()
      {
        this.main.CreateCar(this.Data.transport,
          (res) => {
            console.log("create car", res);
            this.Car = res;
            this.WriteToLocalStorage("Car", this.Car);
            // console.log(res);
            // setTimeout(
            //   () => this.CreateOwner(),
            //   1000
            // );
            this.CreateOwner();
          },
          (err) => {
            console.log(err);
          })
      }
    
      CreateOwner()
      {
        // console.log(this.owner.IsOwnerEqualPolicyholder);
        if(!this.owner.IsOwnerEqualPolicyholder)
        {
          this.main.CreateOwner(this.Data.owner,
            (res) => {
              console.log("create owner", res);
              this.Owner = res;
              this.WriteToLocalStorage("Owner", this.Owner);
              this.CanCombine = true;
              // setTimeout(() => this.Combine(), 1000)
              this.Combine();
            },
            (err) => {
              console.log(err);
            })
        }
        else{
          this.CanCombine = true;
          this.Combine();
        }
    
        
        
      }
    
      Combine()
      {
        let data = {
          // "owner": this.owner.IsOwnerEqualPolicyholder ? null : this.Owner.person,
          "car": this.Car.id,
          "drivers": [],
          "insurant": this.PolicyHolder.person
        };
        // this.CalculationObject["drivers_ids"] = [];
        for(const item of this.SaveVals.drivers)
        {
          data["drivers"].push(item.id);
        }
    
    
        if(!this.owner.IsOwnerEqualPolicyholder)
          data["owner"] = this.Owner.person;
    
    
          this.CombineDataString = JSON.stringify(data);
        console.log(data);
        this.main.Combine(data,
          (res) => {
            console.log("combine", res);
            this.CombineId = res.id;
          },
          (err) => {
            console.log(err);
          })
      }
    
      Continue()
      {
        this.main.UpdateAgreement(this.FinalCalculation["id"], {"insured_object": this.CombineId},
        res => {
          this.GetAggrInfo(res.id);
          this.GetOffers();
        },
        err => {
          console.log(err);
        })
      }
    
    
      GetAggrInfo(Id)
      {
        this.main.GetAggreementInfo(Id,
          (res) => {
            console.log("agreement info", res);
          },
          err => {
            console.log(err);
          }
        )
      }
      GetOffers()
      {
        for(let item of this.SCompanies)
        {
          this.main.GetScompanyOffer(this.FinalCalculation["id"], item.code,
            (res) => {
              item.data = JSON.stringify(res);
            },
            err => {
              item.data = JSON.stringify(err.body);
              // console.log(err);
            }
          )
        }
      }
      
    
      GetSCompaniesData()
      {
        this.SCompanies = [];
        this.main.GetSCompanies(
          (res) => {
            for(const item of res)
            {
              this.SCompanies.push(new CompanyModel(item.title, this.main.GetLogoFullPath(item.logo), item.id, item.code));
            }
            console.log(this.SCompanies);
            // console.log(res);
          },
          (err) => {
            console.log(err);
          }
        )
      }
}