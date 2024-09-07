import { product, productRes  } from './../../interfaces/product';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Enviroment } from '../../../base/Enviroment';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private _Httpclient:HttpClient) { }
  getallproducts():Observable<productRes>
  {
     return this._Httpclient.get<productRes>(`${Enviroment.baseUrl}/api/v1/products`);
  }
  getProductById(productId:string):Observable<{data:product}>
  {
     return this._Httpclient.get<{data:product}>(`${Enviroment.baseUrl}/api/v1/products/${productId}`);
  }

}
