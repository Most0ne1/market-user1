import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-products-details',
  templateUrl: './products-details.component.html',
  styleUrls: ['./products-details.component.scss']
})
export class ProductsDetailsComponent implements OnInit {
id:any;
data:any;
loading:boolean=false
  constructor( private route:ActivatedRoute , private service:ProductsService) {
    this.id=this.route.snapshot.paramMap.get('id');
    console.log(this.id);

  }

  ngOnInit(): void {
   this.getPData()
  }
  getPData(){
    this.loading = !this.loading;

    this.service.getPById(this.id).subscribe((res)=>{

      this.data=res;
      this.loading = !this.loading;


    console.log(this.data);

  },
  (error) => {

    console.error('Error occurred:', error);
    alert('Error: ' + error.message);
  }
  )
  }

}
