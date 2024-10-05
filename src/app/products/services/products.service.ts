import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http:HttpClient) { }
  getAllProducts(){
      return this.http.get(environment.baseApi+'products')
  }
  getAllCategories():Observable<any>{
      return this.http.get(environment.baseApi+'products/categories')
  }
  getPByCategory(cat:string){

      return this.http.get(environment.baseApi+`products/category/${cat}`)
    }
    getPById(id:any){

      return this.http.get(environment.baseApi+`products/${id}`)
  }

}
