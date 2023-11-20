import {Component, OnInit} from '@angular/core';
import {CategoryService} from "../../../services/category.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-details-category',
  templateUrl: './details-category.component.html',
  styleUrls: ['./details-category.component.scss']
})
export class DetailsCategoryComponent implements OnInit {
  categoryId: number | undefined;
  categoryDetails: any;

  constructor(
    private categoryService: CategoryService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.categoryId = this.route.snapshot.params['categoryId'];
    this.loadCategoryDetails();
  }

  loadCategoryDetails() {
    this.categoryService.getCategoryWithNotes(this.categoryId).subscribe(response => {
      this.categoryDetails = response;
    });
  }
}
