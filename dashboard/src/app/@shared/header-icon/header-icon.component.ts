import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { ColorService } from '@app/@core/color.service';

@Component({
  selector: 'app-header-icon',
  templateUrl: 'header-icon.component.html',
  styleUrls: ['header-icon.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderIconComponent {
  /** @summary Size in pixels, i.e. 32 */
  @Input() public size = 32;
  /** @summary The value of the field, which will be used to determine color and character if these values are empty */
  @Input() public value?: string;
  /** @summary Optional character to show in the component. If empty, the first character of value is used. */
  @Input() public character?: string;
  /** @summary Optional value which will render a square instead of a circle when true. */
  @Input() public square?: boolean;
  /** @summary Optional value to use to determine the color. If empty, color or a random color is used. */
  @Input() public color?: string;

  public constructor(private colorService: ColorService) {}

  public getIconColor(): string {
    if (this.color) {
      return this.colorService.getColorDark(this.color);
    }
    return this.colorService.getHashColorDark(this.value);
  }
  public getFontColor(): string {
    if (this.getIconCharacter() === '_') {
      return this.getIconColor();
    }
    if (this.color) {
      return this.colorService.getColorLight(this.color);
    }
    return this.colorService.getHashColorLight(this.value);
  }

  public getIconCharacter(): string {
    if (this.character) {
      return this.character;
    }
    if (this.value && this.value.length > 0) {
      return this.value[0].toUpperCase();
    }
    return '_';
  }

  public getFontSize(): string {
    return `${this.size / 2}px`;
  }

  public getSize(): string {
    return `${this.size}px`;
  }
}
