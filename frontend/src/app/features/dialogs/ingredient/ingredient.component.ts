import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IngredientService } from 'src/app/core/services/ingredient.service';
import { StrapiService } from 'src/app/core/services/strapi.service';

@Component({
  selector: 'ingredient-dialog',
  templateUrl: './ingredient.component.html',
  styleUrl: './ingredient.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class IngredientDialogComponent {
  public content: any;
  public ingredient: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private ingredientService: IngredientService,
    private strapiService: StrapiService) {
      this.ingredient = data.ingredient;
      ingredientService.getById(this.ingredient.id).subscribe((response) => {
        this.ingredient.components = response.components;
        strapiService.getProductPage(response.strapiContentId).subscribe((response) => {
          this.content = response.data.attributes;
        });
      });
    }
}
