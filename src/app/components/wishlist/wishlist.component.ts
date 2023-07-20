import { Component, OnInit } from '@angular/core';
import { WishlistService } from './../../services/wishlist.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {

  constructor(private wishlistService:WishlistService) { }
  wishlistItems:any[] = [];
  totalWishlistItemsCount = 0;
  uniqueWishlistItems :any[] =[];
  ngOnInit(): void {
    this.getWishlistItems();
  }
  
  getWishlistItems(){
    this.wishlistService.getTotalWishlistItems().subscribe((res:any) => {
      this.wishlistItems = res;
      this.totalWishlistItemsCount = res.length;
      this.uniqueWishlistItems = this.wishlistItems.reduce((acc, curr) => {
        const existing = acc.find((item:any) => item.id === curr.id && item.name === curr.name);
        if (existing) {
          existing.count = 1;
        } else {
          acc.push({ ...curr, count: 1 });
        }
        return acc;
      }, []);
    });
    this.wishlistService.filterWishlistItems(this.uniqueWishlistItems);
  }
  removeFromWishlist(item:any){
    this.wishlistService.removeItemFromWishlist(item);
  }
  emptyWishlist(){
    this.wishlistService.emptyWishList();
  }

}
