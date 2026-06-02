import { Component, Input, QueryList, ViewChildren } from '@angular/core';
import { StrapiService } from 'src/app/core/services/strapi.service';

@Component({
  selector: 'reviews',
  templateUrl: './reviews.component.html',
  styleUrl: './reviews.component.scss'
})
export class ReviewsComponent {
  @Input('slidesToShow') slidesToShow = 3;
  @ViewChildren('slides') slides: QueryList<any> ;
  public slideIndex = 1;
  public reviews: any[];

  constructor(strapiService: StrapiService) {
    strapiService.getReviews().subscribe(response => {
      const reviewCounter = response.data[0].attributes.reviews.length;
      if (this.slidesToShow == 1 && reviewCounter > 1) {
        this.reviews = response.data[0].attributes.reviews.slice(reviewCounter-1, reviewCounter);
      } else {
        this.reviews = response.data[0].attributes.reviews.slice(0, this.slidesToShow);
      }
    });
  }

  ngAfterViewInit() {
    this.slides.changes.subscribe(t => {
      this.ngForRendered();
    })
  }

  ngForRendered() {
    this.currentSlide(1);
  }

  public showSlides = (index) => {
    let i;
    let slides = Array.from(document.getElementsByClassName("slides") as HTMLCollectionOf<HTMLElement>);
    let carouselDots = Array.from(document.getElementsByClassName("carousel-dot") as HTMLCollectionOf<HTMLElement>);
    if (index > slides.length) { this.slideIndex = 1 }
    if (index < 1) { this.slideIndex = slides.length }
    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }
    for (i = 0; i < carouselDots.length; i++) {
      carouselDots[i].className = carouselDots[i].className.replace(" active", "");
    }
    slides[this.slideIndex - 1].style.display = "block";
    if (carouselDots.length > 0) {
      carouselDots[this.slideIndex - 1].className += " active";
    }
  }

  public currentSlide(slideIndex) {
    this.showSlides(this.slideIndex = slideIndex);
  }
}
