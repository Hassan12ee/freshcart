import { product } from './../../../shared/interfaces/product';
import { Component, OnInit } from '@angular/core';
import { CartService } from '../../../shared/services/cart/cart.service';
import { Data } from '../../../shared/interfaces/cart';
import { SearchPipe } from "../../../shared/pipes/search.pipe";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [SearchPipe ,RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {
  data !:Data;
  isLoading:boolean= true;
  errmsg!:string;
  constructor(private _CartService:CartService){}
  ngOnInit(): void {
    if( typeof localStorage!= 'undefined')
   localStorage.setItem('currentpage','/Cart')
  this.getLoggedUserCart();

  }




getLoggedUserCart(){
  this._CartService.getLoggedUserCart().subscribe({
    next: res=>{
      this.data = res.data
      this.isLoading = false;
      console.log(res.data)
    }, error: err =>{
      this.isLoading = false;
      this.errmsg = err.message;
    }
  })
}

updateProductCartCount(productId:string ,count:number){
  console.log(count);

  if(count <= 0){
  this._CartService.deleteProductFromCart(productId)
  }
  else{
    this._CartService.updateProductCartCount(productId, count.toString()).subscribe({
      next: res=>{
        this.data = res.data;
      }
    })
  }
}
deleteProductFromCart(productId:string){
  this._CartService.deleteProductFromCart(productId).subscribe({
    next: res=>{
      this.data = res.data;
    },
    error: err =>{}
  })
}

}
