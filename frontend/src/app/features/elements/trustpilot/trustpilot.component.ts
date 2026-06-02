import { Component, Input } from '@angular/core';
import { StrapiService } from 'src/app/core/services/strapi.service';

@Component({
  selector: 'trustpilot',
  templateUrl: './trustpilot.component.html',
  styleUrl: './trustpilot.component.scss'
})
export class TrustpilotComponent {
  @Input('isSingleLine') isSingleLine = false;
  @Input('isBottom') isBottom = false;
  @Input('isCenter') isCenter = false;

  public reviews: any;

  constructor(private strapiService: StrapiService) {

    this.strapiService.getReviews().subscribe(response => {
      this.reviews = response.data[0].attributes;
    })
  }

}
