import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor() { }

  cartItems:any[] = [];
  totalCartValue = 0;
  private cartItemsList = new BehaviorSubject<any>(this.cartItems);

  getCartItem(){
    return this.cartItemsList.asObservable();
  }
  addToCart(item:any){
    this.cartItems.push(item);
    this.cartItemsList.next(this.cartItems);
  }
  getTotalCartValue(){
    this.totalCartValue = 0;
    this.cartItems.forEach((item:any) => {
      this.totalCartValue = this.totalCartValue+(+item.price);
    });
    return this.totalCartValue;
  }
  removeItemFromCart(product:any){
    this.cartItems.map((item:any,index:any) => {
      if(product.id === item.id){
        this.cartItems.splice(index,1);
      }
    });
    this.cartItemsList.next(this.cartItems);
  }
  emptyCart(){
    this.cartItems = [];
    this.cartItemsList.next(this.cartItems);
  }

}
