import { Component, OnInit } from '@angular/core';
import { CartService } from './../../services/cart.service';
import { WishlistService } from './../../services/wishlist.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor(private cartService:CartService,private wishlistService:WishlistService) { }
  cartData:any[] = [];
  totalCartValue = 0;
  uniqueArr:any[] =[];
  ngOnInit(): void {
    this.getCartData();
  }

  getCartData(){
    this.cartService.getCartItem().subscribe((res:any) => {
      this.cartData = res;
      this.uniqueArr = this.cartData.reduce((acc, curr) => {
        const existing = acc.find((item:any) => item.id === curr.id && item.name === curr.name);
        if (existing) {
          existing.count++;
        } else {
          acc.push({ ...curr, count: 1 });
        }
        return acc;
      }, []);
      
      this.getCartValue();
    })
  }
  removeFromCart(item:any){
    this.cartService.removeItemFromCart(item);
  }
  getCartValue(){
    this.totalCartValue = this.cartService.getTotalCartValue();
  }
  emptyCart(){
    this.cartService.emptyCart();
  }
  moveItemToWishlistAndRemoveTheSameItemFromCart(item:any){
    if(window.confirm('Are you sure you waant to move this item to wishlist, it will move this item to wishlist and removes item from cart')){
      this.wishlistService.addItemsToWishilist(item);
      this.cartService.removeItemFromCart(item);
    }
  }


}
