import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  constructor() { }
  wishlistItems:any[] = [];
  wishlistItemsList = new BehaviorSubject<any[]>(this.wishlistItems);

  getTotalWishlistItems(){
    return this.wishlistItemsList.asObservable();
  }
  addItemsToWishilist(item:any){
    this.wishlistItems.push(item);
    const uniqueWishlistItems = this.wishlistItems.reduce((acc:any,curr:any) => {
      const isExist = acc.find((item:any) => item.id === curr.id && item.name === curr.name);
      if(isExist){
        isExist.count++;
      }else{
        acc.push({ ...curr, count: 1 });
      }
      return acc;
    },[])
    this.wishlistItemsList.next(uniqueWishlistItems);
  }
  removeItemFromWishlist(ele:any){
    this.wishlistItems.map((item:any,index) => {
      if(ele.id == item.id){
        this.wishlistItems.splice(index, 1);
      }
    })
    this.wishlistItemsList.next(this.wishlistItems);
  }
  emptyWishList(){
    this.wishlistItems = [];
    this.wishlistItemsList.next(this.wishlistItems);
  }
  filterWishlistItems(arr:any){
    this.wishlistItems = arr;
    this.wishlistItemsList.next(this.wishlistItems);
  }
}
