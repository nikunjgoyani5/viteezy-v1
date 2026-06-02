import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class StringUtilService {
  public toLowerAndFirstToUpper(input: string): string {
    const s = input.toLowerCase();
    return s.charAt(0).toUpperCase() + s.slice(1);
  }
}
