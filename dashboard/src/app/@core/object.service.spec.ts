import { TestBed } from '@angular/core/testing';
import { ObjectService } from './object.service';

describe('ObjectService', () => {
  let objectService: ObjectService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [ObjectService],
    });

    objectService = TestBed.inject(ObjectService);
  });

  it('should return undefined for getValueByType', () => {
    expect(objectService.getValueByType(null, undefined)).toBe(undefined);
  });

  it('should return the correct value for boolean', () => {
    expect(objectService.getValueByType(true, 'boolean')).toBe('Yes');
    expect(objectService.getValueByType(false, 'boolean')).toBe('No');
  });

  it('should return the correct value for date', () => {
    expect(objectService.getValueByType('2021-01-01', 'date')).toBe(
      'Fri, 1 Jan, 01:00'
    );
  });

  it('should return the correct value', () => {
    expect(objectService.getValueByType('test', 'string')).toBe('test');
    expect(objectService.getValueByType(1, 'number')).toBe('1');
    expect(objectService.getValueByType(1, 'integer')).toBe('1');
    expect(objectService.getValueByType(1, 'double')).toBe('1');
    expect(objectService.getValueByType('test', 'dropdown')).toBe('test');
    expect(objectService.getValueByType('test', 'textarea')).toBe('test');
  });

  it('should filter the array correctly', () => {
    const objectList = [
      { name: 'test1', value: 1 },
      { name: 'test2', value: 2 },
    ];

    expect(objectService.filterByValue(objectList, 'test1').length).toBe(1);
  });
});
