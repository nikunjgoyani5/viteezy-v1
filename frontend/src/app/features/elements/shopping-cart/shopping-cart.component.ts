import { Component, Inject, Input, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { UIRouterState, UserManager } from 'src/app/ajs-upgraded-providers';
import { BlendService } from 'src/app/core/services/blend.service';
import { IngredientService } from 'src/app/core/services/ingredient.service';
import { StrapiService } from 'src/app/core/services/strapi.service';

@Component({
  selector: 'shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class ShoppingCartComponent {
  @Input('addedProduct') addedProduct: any;
  public cartVisible = false;
  public ingredients: any[];
  public totalPrice: any = 0;
  private shopDescriptions: any[];

  constructor(
    @Inject(UIRouterState) private $state,
    @Inject(UserManager) private UserManager,
    private blendService: BlendService,
    private ingredientService: IngredientService,
    private strapiService: StrapiService) {
      strapiService.getProductPages().subscribe(response => {
        this.shopDescriptions = response.data;
      });
  }

  ngOnInit(): void {
    this.getCartProducts();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.getCartProducts();
    this.cartVisible = !changes.addedProduct.firstChange;
  }

  public toggleCart() {
    this.getCartProducts();
    this.cartVisible = !this.cartVisible
  }

  private getCartProducts = () => {
    let ingredients = [];
    if (this.UserManager.getBlendExternalReference() !== undefined) {
      this.blendService.getBlendIngredientsByExternalReference(this.UserManager.getBlendExternalReference())
        .subscribe((blendIngredients) => {
          blendIngredients.forEach(blendIngredient => {
            this.ingredientService.getById(blendIngredient.ingredientId).subscribe(ingredient => {
              ingredients.push({
                id: ingredient.id,
                name: ingredient.name,
                content: this.getContent(ingredient),
                price: blendIngredient.price,
                isActive: ingredient.isActive,
              });
              this.ingredients = ingredients;
            }).add(() => {
              this.totalPrice = this.ingredients.filter(item => item.isActive).map(item => item.price).reduce((a, b) => a + b, 0);
            });
          });
        });
    }
  };

  private getContent(ingredient: any) {
    let content;
    try {
      content = this.shopDescriptions.filter(productPage => productPage.id === ingredient.strapiContentId)[0].attributes;
    } catch {
      content = null;
    }
    return content;
  }

  public redirectBlend = () => {
    this.$state.go("blend", { blendStep: 2 });
  };
}
