import {Component, OnInit} from '@angular/core';
import {CategoryService} from "../../../services/category.service";
import {CreateCategoryComponent} from "../create-category/create-category.component";
import {MatDialog} from "@angular/material/dialog";
import {SweetAlertService} from "../../../services/alert/sweet-alert.service";

@Component({
  selector: 'app-list-categories',
  templateUrl: './list-categories.component.html',
  styleUrls: ['./list-categories.component.scss']
})
export class ListCategoriesComponent implements OnInit {
  categories: any[] =[];

  constructor(private categoryService: CategoryService,
              private dialog: MatDialog,
              private alertservice: SweetAlertService,
              ) { }

  ngOnInit() {
    this.loadCategories();

  }
  loadCategories() {
    this.categoryService.getAllCategories().subscribe(response => {
      this.categories = response.data.content;
    });
  }
  openCreateCategoryDialog(): void {
    const dialogRef = this.dialog.open(CreateCategoryComponent, {
      width: '500px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.categoryService.createCategory({ name: result }).subscribe(() => {
          this.loadCategories();
        });
      }
    });
  }
}
