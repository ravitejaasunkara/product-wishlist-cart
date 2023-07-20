import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, shareReplay, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http:HttpClient) { }
  cachedProductsData$:any;
  getProducts(){
    if(!!this.cachedProductsData$){
      return this.cachedProductsData$;
    }else{
      this.cachedProductsData$ = this.http.get('https://api.escuelajs.co/api/v1/product').pipe(
        map((response:any) => response),
        catchError((error:any) => {
          console.log(error);
          return throwError({status:404,response:'something wrong with server!!'});
        }),
        shareReplay(1));
      return this.cachedProductsData$;
    }
  }
}
