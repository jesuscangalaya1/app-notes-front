import { Component } from '@angular/core';
import {CategoryService} from "../../../services/category.service";

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.scss']
})
export class CreateCategoryComponent {
  category = {
    name: ''
  };
  constructor(private categoryService: CategoryService) { }

  submitCategory() {
    console.log('Enviando categoría:', this.category);
    this.categoryService.createCategory(this.category).subscribe(
      response => {
        console.log('Categoría creada:', response);
        location.reload()
      },
      error => {
        console.error('Error al crear categoría:', error);
      }
    );
  }
  }


