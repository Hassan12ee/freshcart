import { Component, OnInit } from '@angular/core';
import { CatgeoryService } from '../../../shared/services/catgeory/catgeory.service';
import { Category } from '../../../shared/interfaces/category';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-categorslider',
  standalone: true,
  imports: [CarouselModule],
  templateUrl: './categorslider.component.html',
  styleUrl: './categorslider.component.scss'
})
export class CategorsliderComponent implements OnInit {
  isLoading:boolean =false;
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 7
      },

    },
    nav: true
  }
  categoryList !:Category[];
  constructor(private _CatgeoryService:CatgeoryService){}
    ngOnInit(): void{
this.getAllcategories();
    }
getAllcategories()
{
  this.isLoading=true;
this._CatgeoryService.getAllCategories().subscribe({
  next : res =>{
    this.categoryList = res.data

    this.isLoading=false;
  },
  error:err =>{
    console.log(err);
    this.isLoading=false;
  }

})
}

}
