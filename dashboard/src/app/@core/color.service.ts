import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ColorService {
  private colorNames = [
    'Cyan',
    'Yellow',
    'Brown',
    'Purple',
    'Grey',
    'Green',
    'Orange',
    'Pink',
    'Red',
    'Blue',
    'Lime',
    'DeepPurple',
    'Indigo',
    'LightBlue',
    'Teal',
    'LightGreen',
    'DeepOrange',
    'MoonYellow',
    'Silver',
    'DarkGrey',
    'PeranoIndigo',
    'PurpleRain',
    'TurquoiseBlue',
    'MartiniBrown',
    'GrassGreen',
  ];
  private colorDark = [
    '#4DB6AC',
    '#FDD835',
    '#A1887F',
    '#BA68C8',
    '#90A4AE',
    '#57BB8A',
    '#FF8A65',
    '#F06292',
    '#E06055',
    '#5E97F6',
    '#D4E157',
    '#9575cd',
    '#7986cb',
    '#4fc3f7',
    '#4dd0e1',
    '#9ccc65',
    '#ffa726',
    '#f6bf26',
    '#c2c2c2',
    '#a3a3a3',
    '#afb6e0',
    '#b39ddb',
    '#80deea',
    '#bcaaa4',
    '#aed581',
  ];
  private colorLight = [
    '#B3DFDB',
    '#FFFBDC',
    '#D8CECA',
    '#DCB5E3',
    '#C8D2D7',
    '#B4DFCB',
    '#FFCBBB',
    '#F8B7CD',
    '#F3C8C4',
    '#B8D0FA',
    '#F8FAE5',
    '#d1c4e9',
    '#c5cae9',
    '#c2eafd',
    '#c9f1f6',
    '#dcedc8',
    '#ffe0b2',
    '#fce8b2',
    '#f1f1f1',
    '#e1e1e1',
    '#e8eaf6',
    '#ede7f6',
    '#e9f9fb',
    '#e7e0de',
    '#dcedc8',
  ];

  /** @summary Get the index of a color by its name */
  public getColorIndex(colorName: string): number {
    return this.colorNames.indexOf(colorName);
  }

  /** @summary Get the index of a color by calculating the hash of a value.
   * This way the same strings can get the same color.
   */
  public getHashColorIndex(value: string): number {
    let valueHash = 0;

    if (!value || value.length === 0) {
      return 3;
    } else {
      for (let i = 0; i < value.length; i++) {
        valueHash += value.toUpperCase().charCodeAt(i);
      }
    }

    const colorIndex = valueHash % this.colorNames.length;
    return colorIndex;
  }

  /** Get the hex color-string of the light color by calculating the hash of a value.
   * This way the same strings can get the same color.
   */
  public getHashColorDark(value: string): string {
    return this.colorDark[this.getHashColorIndex(value)];
  }

  /** Get the hex color-string of the light color by calculating the hash of a value.
   * This way the same strings can get the same color.
   */
  public getHashColorLight(value: string): string {
    return this.colorLight[this.getHashColorIndex(value)];
  }

  /** Get the hex color-string of the dark color by its name or its index. E.g. DeepPurlple */
  public getColorDark(color: string | number): string {
    if (typeof color === 'string') {
      return this.colorDark[this.getColorIndex(color)];
    }
    return this.colorDark[color];
  }
  /** Get the hex color-string of the light color by its name or its index. E.g. DeepPurlple */
  public getColorLight(color: string | number): string {
    if (typeof color === 'string') {
      return this.colorLight[this.getColorIndex(color)];
    }
    return this.colorLight[color];
  }
}
