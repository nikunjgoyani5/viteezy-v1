import { Component, Input } from '@angular/core';

@Component({
  selector: 'blend-progress',
  templateUrl: './blend-progress.component.html',
  styleUrl: './blend-progress.component.scss'
})
export class BlendProgressComponent {
  @Input('blendStep') blendStep: any;

  blendCategories: { title: string; blendStep: number; }[];

  constructor() {
    this.blendCategories = [
      { title: "Je blend", blendStep: 1 },
      { title: "Overzicht", blendStep: 2 },
      { title: "Gegevens", blendStep: 3 }
    ];
  }

}
