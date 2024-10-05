import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { error, log } from 'console';
import { Product } from '../../models/Product';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.scss']
})
export class AllProductsComponent implements OnInit {
  products:Product[]=[];
  categories:string[]=[];
  loading:boolean=false;
  cartProducts:any[]=[]


  constructor(private service:ProductsService) { }

  ngOnInit(): void {
    this.getProducts();
    this.getCategories()
  }
  toggleLoading() {
    this.loading = !this.loading;
  }
  getProducts(){
    this.toggleLoading();
    this.service.getAllProducts().subscribe((res:any) =>{
      this.products = res;
       this.toggleLoading();
    },error=>{
       this.toggleLoading();
      ;alert(error.message);
      })
  };
  getCategories() {
     this.toggleLoading();
    this.service.getAllCategories().subscribe(
      (res: any) => {
        this.categories = res;

         this.toggleLoading();
      },
      (error) => {
         this.toggleLoading();
        console.error('Error occurred:', error);
        alert('Error: ' + error.message);
      }
    );
  }
  filterCategories(event:any){
let k=event.target.value;

  (k==='All') ?this.getProducts():this.getPCategory(k)

  }
  getPCategory(keyword:string){
     this.toggleLoading();
    this.service.getPByCategory(keyword).subscribe((res:any)=>{
      this.products = res;
       this.toggleLoading();
    })
  }
  addToCart(event:any){
// JSON.stringfy() ----- send data
// JSON.parse()    ------ recieve data
if('cart' in localStorage){
  this.cartProducts=JSON.parse(localStorage.getItem('cart')!);
  let exist=this.cartProducts.find(item=>item.item.id==event.item.id);
  if(exist){
    alert('already here!!')
  }else{

    this.cartProducts.push(event);
      localStorage.setItem('cart',JSON.stringify(this.cartProducts))
  }

}else{
  this.cartProducts.push(event);
    localStorage.setItem('cart',JSON.stringify(this.cartProducts))
}
  }
}
