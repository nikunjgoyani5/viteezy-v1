import { OnChanges, SimpleChanges } from '@angular/core';
import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { ObjectService } from '@app/@core/object.service';

@Component({
  selector: 'app-view-property',
  templateUrl: 'view-property.component.html',
  styleUrls: ['view-property.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ViewPropertyComponent implements OnChanges {
  @Input() public showlabel: boolean;
  @Input() public label?: string;
  @Input() public value?: any;
  @Input() public type: string = 'string';
  @Input() public style?: { [property: string]: string };

  public stringValue: string;
  public widthStyle: string = '100%';

  public constructor(private objectService: ObjectService) {}

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.value) {
      this.loadValue();
    }
  }

  private loadValue(): void {
    this.stringValue = this.objectService.getValueByType(
      this.value,
      this.type || typeof this.value
    );
    this.widthStyle = this.showlabel !== false ? '47%' : '100%';
    if (this.style) {
      this.style.width = this.widthStyle;
    } else {
      this.style = { ['width']: this.widthStyle };
    }
  }
}
