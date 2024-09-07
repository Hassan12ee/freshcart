
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Enviroment } from '../../../base/Enviroment';
import { Observable } from 'rxjs';
import { CartRes } from '../../interfaces/cart';

// <i class="fa-solid fa-heart"></i>
@Injectable({
  providedIn: 'root'
})
export class CartService {
  userTokenHeader = {
    token : localStorage.getItem("userToken") || '',
  }
  constructor(private _HttpClient:HttpClient) { }
  addProductToCart(productId:string):Observable<CartRes>
  {
    return this._HttpClient.post<CartRes>(`${Enviroment.baseUrl}/api/v1/cart `, { productId: productId },
      {
        headers: this.userTokenHeader
      }
    );
  }
  getLoggedUserCart():Observable<CartRes>
  {
    return this._HttpClient.get<CartRes>(`${Enviroment.baseUrl}/api/v1/cart `,
      {
        headers: this.userTokenHeader
      }
    );
  }
  updateProductCartCount(productId:string ,count:string):Observable<CartRes>
  {
    return this._HttpClient.put<CartRes>(`${Enviroment.baseUrl}/api/v1/cart/${productId} `, {count:count} ,
      {
        headers: this.userTokenHeader
      }
    );
  }
  deleteProductFromCart(productId:string):Observable<CartRes>
  {
    return this._HttpClient.delete<CartRes>(`${Enviroment.baseUrl}/api/v1/cart/${productId} `,
      {
        headers: this.userTokenHeader
      }
    );
  }

}
