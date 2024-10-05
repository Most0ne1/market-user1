import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cartProducts:any[] = [];
  total:any=0;
  orderSuccess = false;

constructor(private service:CartService){}

  ngOnInit(){
    this.getCartProducts()
  }


  getCartProducts(){
    if('cart' in localStorage){
      this.cartProducts=JSON.parse(localStorage.getItem('cart')!)

    }
    this.getTotalPrice();

  }
  getTotalPrice() {
    this.total = 0;
    for (let product of this.cartProducts) {
      this.total += Math.floor(product.item.price * product.quantity)
    }
  }


  increaseQuantity(item: any): void {
    item.quantity++;
    localStorage.setItem('cart',JSON.stringify(this.cartProducts));
    this.getTotalPrice();
  }

  decreaseQuantity(item: any): void {
    if (item.quantity > 1) {
      item.quantity--;

    }
    localStorage.setItem('cart',JSON.stringify(this.cartProducts));
    this.getTotalPrice();
  }
  detectChange(){
    localStorage.setItem('cart',JSON.stringify(this.cartProducts));
    this.getTotalPrice();
  }

  removeItem(item: any): void {
    const index = this.cartProducts.indexOf(item);
    if (index > -1) {
      this.cartProducts.splice(index, 1);
    }
    localStorage.setItem('cart' ,JSON.stringify(this.cartProducts));
    this.getTotalPrice();
  }
  clearCart(){
    this.cartProducts=[];
    localStorage.setItem('cart' ,JSON.stringify(this.cartProducts));
    this.getTotalPrice();
}
  orderNow(): void {
    let products=this.cartProducts.map((item)=>{
      return {productId:item.item.id,quantity:item.quantity}
    });

    let Model={
      userId:5,
      date:new Date,
      products:products
    }
this.service.createNewCardrt(Model).subscribe((res:any) =>{

  this.orderSuccess = true;
})
  }
}
