import { product, Subcategory } from './../../../shared/interfaces/product';
import { ProductService } from './../../../shared/services/product/product.service';
import { Component, OnInit } from '@angular/core';
import { CategorsliderComponent } from '../../additions/categorslider/categorslider.component';
import { HomesliderComponent } from "../../additions/homeslider/homeslider.component";
import { RouterLink } from '@angular/router';
import { CurrencyPipe, LowerCasePipe, UpperCasePipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { SearchPipe } from "../../../shared/pipes/search.pipe";
import { CartService } from '../../../shared/services/cart/cart.service';
import { FormsModule } from '@angular/forms';
import { WishListService } from '../../../shared/services/wishlist/wish-list.service';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CategorsliderComponent, HomesliderComponent,FormsModule, RouterLink, UpperCasePipe, LowerCasePipe, CurrencyPipe,  SearchPipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  isLoading:boolean=false;
  productlist!:product[];
  arr !:string[];
  userWord:string='';
  toastr: any;
  constructor(private _ProductService:ProductService,private _CartSrevice:CartService,private toaster:ToastrService, private _WishListService:WishListService ){}
  ngOnInit(): void {
    if( typeof localStorage!= 'undefined')
   localStorage.setItem('currentpage','/Home')

  this.getallproducts();
  this.GetLoggedUserWishlist()
  }

  getallproducts()
  {
  this.isLoading=true;
    this._ProductService.getallproducts().subscribe({
      next : res =>{
        this.productlist = res.data;
        console.log(this.productlist)
        this.isLoading=false;
      },
      error : err =>{
        console.log(err);
        this.isLoading=false;
      }
    })

  }
  addProductToCart(ProductId:string)
  {
this._CartSrevice.addProductToCart(ProductId).subscribe({
  next:res=>{
    console.log(res);
    
    this.toastr.sucess(res.message,'',{
    progreesBar:true,
    postionClass :'toast-to-right'
    })
  }
})
  }

  GetLoggedUserWishlist(){
    this._WishListService.GetLoggedUserWishlist().subscribe({
      next :res =>{
         let arr:string[] =[];
         arr.pop();
        for(let item of res.data){
          console.log(item._id);
          arr.push(item._id);
        }
        this.arr = arr;
        console.log(this.arr)
        },
        error:err =>{
          console.log(err)
        }


    })
  }
  addProductToWishlist(preoductId:string)
  {
    this._WishListService.addProductToWishlist(preoductId).subscribe({
      next: res =>{
        console.log(res);
        this.toastr.success(res.message ,'',{
          progressBar: true,
        });
      },
      error: err =>{}
    })
  }
  removeProductToWishlist(preoductId:string)
  {
    this._WishListService.removeProductToWishlist(preoductId).subscribe({
      next: res =>{
        console.log(res);
        this.toastr.success(res.message ,'',{
          progressBar: true,
        });
      },
      error: err =>{}
    })
  }

}
