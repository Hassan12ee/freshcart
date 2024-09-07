import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FlowbiteService } from '../../../shared/services/flowbite/flowbite.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators,} from "@angular/forms";

import { ForgetpasswordComponent } from '../forgetpassword/forgetpassword.component';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-reset-code',
  standalone: true,
  imports: [ForgetpasswordComponent ,ReactiveFormsModule],
  templateUrl: './reset-code.component.html',
  styleUrl: './reset-code.component.scss'
})
export class ResetCodeComponent implements OnInit {
  constructor(private _AuthService:AuthService , private _Router:Router ,private _FlowbiteService:FlowbiteService ) { }

  ngOnInit(): void {
    this._FlowbiteService.loadFlowbite(flowbite => {
      // Your custom code here
      console.log('Flowbite loaded', flowbite);
    });
  }
 isLoading: any ;
 errmsg!:string ;
@Output() resetformflag =new EventEmitter<boolean>();
@Output() changepasswordformflag =new EventEmitter<boolean>();
 verifyResetCodeForm:FormGroup = new FormGroup({
  resetCode : new FormControl(null,[Validators.required,Validators.pattern(/^[0-9]{4,}$/)]),

})

submitverifyResetCode(){
  this.isLoading = true;
  if(this.verifyResetCodeForm.valid){
    //connect api
    this._AuthService.verifyResetCode(this.verifyResetCodeForm.value).subscribe({
      next:(res)=>{
        this.isLoading = false;
        this.resetformflag.emit(false);
        this.changepasswordformflag.emit(true);
      },
      error:(err) => {

        this.isLoading = false;
        this.errmsg = err.error.message;
      }
    });
  }
}

}
