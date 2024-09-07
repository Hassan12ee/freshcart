import { code } from './../../../shared/interfaces/data';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ForgetpasswordComponent } from '../forgetpassword/forgetpassword.component';
import { FlowbiteService } from '../../../shared/services/flowbite/flowbite.service';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-changepassword',
  standalone: true,
  imports: [ForgetpasswordComponent ,ReactiveFormsModule],
  templateUrl: './changepassword.component.html',
  styleUrl: './changepassword.component.scss'
})
export class ChangepasswordComponent implements OnInit{
constructor(private _FlowbiteService:FlowbiteService ,private _AuthService:AuthService , private _Router:Router) { }
  ngOnInit(): void {
    this._FlowbiteService.loadFlowbite(flowbite => {
      // Your custom code here
      console.log('Flowbite loaded', flowbite);

    });

  }
   isLoading: boolean=false ;
  errmsg!: string;
  @Input() email!: any;

  changepasswordform:FormGroup = new FormGroup({

    email : new FormControl(this.email),
    newPassword : new FormControl(null, [Validators.required, Validators.pattern(/^[A-Z][A-Za-z0-9]{8,}$/)]),

  })

  submitchangepasswordform(){
    this.isLoading = true;
    console.log(this.changepasswordform.value)
    this.changepasswordform.value.email=this.email;
    if(this.changepasswordform.valid){
      //connect api
      this._AuthService.resetPassword(this.changepasswordform.value).subscribe({
        next:(res)=>{
          this.isLoading = false;
          this._Router.navigate(["/login"]);
        },
        error:(err) => {

          this.isLoading = false;
          this.errmsg = err.error.message;
        }
      });
    }
  }
}
