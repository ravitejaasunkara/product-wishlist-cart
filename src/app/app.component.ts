import { Component } from '@angular/core';
import { CartService } from './services/cart.service';
import { WishlistService } from './services/wishlist.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private cartService:CartService,private wishlistService:WishlistService){}
  totalCartItems = 0;
  totalWishlistItems = 0;
  ngOnInit(){
    this.cartService.getCartItem().subscribe((res:any) => {
      this.totalCartItems = res.length;
    });
    this.wishlistService.getTotalWishlistItems().subscribe((res:any) => {
      this.totalWishlistItems = res.length;
    })
  }
}
