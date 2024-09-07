import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { FlowbiteService } from '../../../shared/services/flowbite/flowbite.service';
import { OrderService } from '../../../shared/services/order/order.service';

@Component({
  selector: 'app-shipping-address',
  standalone: true,
  imports: [ReactiveFormsModule , RouterLink],
  templateUrl: './shipping-address.component.html',
  styleUrl: './shipping-address.component.scss'
})
export class ShippingAddressComponent implements OnInit {
  errmsg!: string;
  constructor(private _OrderService:OrderService , private _Router:Router ,private _FlowbiteService:FlowbiteService ,private  _ActivatedRoute:ActivatedRoute){}
  ngOnInit(): void {
    if( typeof localStorage!= 'undefined')
      localStorage.setItem('currentpage','/shippingAddress/:id')
    this._FlowbiteService.loadFlowbite(flowbite => {
      // Your custom code here

    });
  }
  isLoading: boolean = false;
  ShippingAddressForm:FormGroup = new FormGroup({
    details : new FormControl(null,Validators.required),
    phone : new FormControl(null,[Validators.required,Validators.pattern(/^01[0125][0-9]{8}$/)]),
    city : new FormControl(null,Validators.required,),
  })
  submitShippingAddress(){this.isLoading = true;
    if(this.ShippingAddressForm.valid){
      //connect api
      this._ActivatedRoute.paramMap.subscribe({next: params => {

        this._OrderService.checkout(params.get("id")!,this.ShippingAddressForm.value).subscribe({
          next:(res)=>{
            this.isLoading = false;
            window.open(res.session.url, '_self')
          },
          error:(err) => {

            this.isLoading = false;
            this.errmsg = err.error.message;
          }
        });
      }})

    }
  }
}
