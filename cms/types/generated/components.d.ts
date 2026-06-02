import type { Schema, Attribute } from '@strapi/strapi';

export interface ProductpageAdditionalProducts extends Schema.Component {
  collectionName: 'components_productpage_additional_products';
  info: {
    displayName: 'additional product';
    description: '';
  };
  attributes: {
    title: Attribute.String;
    url: Attribute.String;
    image: Attribute.Media;
  };
}

export interface ProductpageCheck extends Schema.Component {
  collectionName: 'components_productpagina_checks';
  info: {
    displayName: 'check';
    description: '';
  };
  attributes: {
    text: Attribute.String;
    active: Attribute.Boolean;
  };
}

export interface ProductpageDiet extends Schema.Component {
  collectionName: 'components_productpage_diets';
  info: {
    displayName: 'diet';
    description: '';
  };
  attributes: {
    text: Attribute.String;
    active: Attribute.Boolean;
    image: Attribute.Media;
  };
}

export interface ProductpageIngredientComponentHeader extends Schema.Component {
  collectionName: 'components_productpage_ingredient_component_headers';
  info: {
    displayName: 'ingredientComponent';
    description: '';
  };
  attributes: {
    text: Attribute.String;
    amount: Attribute.String;
    percentage: Attribute.String;
  };
}

export interface ProductpageIngredientComponentNotice extends Schema.Component {
  collectionName: 'components_productpage_ingredient_component_notices';
  info: {
    displayName: 'ingredientComponentNotice';
    description: '';
  };
  attributes: {
    text: Attribute.Text;
  };
}

export interface ReviewReviews extends Schema.Component {
  collectionName: 'components_review_reviews';
  info: {
    displayName: 'item';
    description: '';
  };
  attributes: {
    score: Attribute.Decimal;
    text: Attribute.Text;
    name: Attribute.String;
    image: Attribute.Media;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'productpage.additional-products': ProductpageAdditionalProducts;
      'productpage.check': ProductpageCheck;
      'productpage.diet': ProductpageDiet;
      'productpage.ingredient-component-header': ProductpageIngredientComponentHeader;
      'productpage.ingredient-component-notice': ProductpageIngredientComponentNotice;
      'review.reviews': ReviewReviews;
    }
  }
}
