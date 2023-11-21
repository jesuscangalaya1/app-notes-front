import { Component } from '@angular/core';
import {CategoryService} from "../../../services/category.service";
import {SweetAlertService} from "../../../services/alert/sweet-alert.service";

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.scss']
})
export class CreateCategoryComponent {
  category = {
    name: ''
  };
  constructor(private categoryService: CategoryService,
              private alertService: SweetAlertService,
              ) { }

  submitCategory() {
    console.log('Enviando categoría:', this.category);
    this.categoryService.createCategory(this.category).subscribe(
      response => {
        console.log('Categoría creada:', response);
        this.alertService.notification('Category successfully created!', 'success');
        setTimeout(() => {
          location.reload();
        }, 1000);
      },
      error => {
        console.error('Error al crear categoría:', error);
      }
    );
  }
  }


