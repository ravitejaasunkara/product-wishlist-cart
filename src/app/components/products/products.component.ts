import { Component, OnInit } from '@angular/core';
import { ProductService } from './../../services/product.service';
import { CartService } from './../../services/cart.service';
import { WishlistService } from './../../services/wishlist.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  constructor(private productService:ProductService,private cartService:CartService,private wishlistService:WishlistService) { }
  productData:any[] = [];
  ngOnInit(): void {
    this.getProductData();
  }

  getProductData(){
    this.productService.getProducts().subscribe((res:any) => {
      this.productData = res;
    },
    (error:any) => {
      console.log(error.status);
    }
    )
  }

  addtocart(item:any){
    this.cartService.addToCart(item);
  }
  addToWishlist(item:any){
    this.wishlistService.addItemsToWishilist(item);
  }

}
