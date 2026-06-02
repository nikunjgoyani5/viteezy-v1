import { Injectable } from '@angular/core';
import { Sort } from '@angular/material/sort';

@Injectable({ providedIn: 'root' })
export class ObjectService {
  public sortFn(item1: object, item2: object, sort: Sort): number {
    let a = item1[sort.active];
    let b = item2[sort.active];
    if (!a) {
      return sort.direction === 'desc' ? -1 : 1;
    }
    if (!b) {
      return sort.direction === 'desc' ? 1 : -1;
    }

    if (typeof a === 'number' && typeof b === 'number') {
      return sort.direction === 'desc' ? b - a : a - b;
    }

    // Date
    if (a instanceof Date && b instanceof Date) {
      return sort.direction === 'desc'
        ? b.getTime() - a.getTime()
        : a.getTime() - b.getTime();
    }

    // String
    if (typeof a === 'string' && typeof b === 'string') {
      a = a ? a.toUpperCase() : '';
      b = b ? b.toUpperCase() : '';
      if (a > b) {
        return sort.direction === 'desc' ? -1 : 1;
      }
      if (a < b) {
        return sort.direction === 'desc' ? 1 : -1;
      }
    }
    return 0;
  }

  public getValueByType(value: any, type: string): string | undefined {
    if (value === null || value === undefined) {
      return undefined;
    }
    switch (type) {
      case 'string':
      case 'dropdown':
      case 'textarea':
        return value as string;
      case 'price':
        return value.toLocaleString('nl-NL', {style: 'currency', currency: 'EUR'})
      case 'number':
      case 'integer':
      case 'double':
        return Number(value).toString();
      case 'boolean':
        return value ? 'true' : 'false';
      case 'date':
        return this.buildDateTime(value).toLocaleString('nl-NL', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
      case 'datetime':
        return this.buildDateTime(value).toLocaleString('nl-NL', { weekday: 'long', day: 'numeric', month: 'long', hour: '2-digit', minute:'2-digit', year: 'numeric' });
      default:
        throw Error('type not implemented: ' + type);
    }
  }

  private buildDateTime = (providedDate: Array<number>) => {
    if (providedDate.length < 6) {
      providedDate.push(0);
    }
    // Month counting starting with 0
    return new Date(providedDate[0], providedDate[1] - 1, providedDate[2], providedDate[3], providedDate[4], providedDate[5]);
  }

  public filterByValue(array: Array<object>, filter: string): Array<object> {
    return array.filter((object) =>
      Object.keys(object).some((prop) =>
        String(object[prop]).toLowerCase().includes(filter.toLowerCase())
      )
    );
  }
}
