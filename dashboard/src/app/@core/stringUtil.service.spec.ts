import { TestBed } from '@angular/core/testing';
import { StringUtilService } from './stringUtil.service';

describe('StringUtilService', () => {
  let stringUtilService: StringUtilService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [StringUtilService],
    });

    stringUtilService = TestBed.inject(StringUtilService);
  });

  describe('StringUtilService', () => {
    it('should return the correct value for toLowerAndFirstToUpper', () => {
      expect(
        stringUtilService.toLowerAndFirstToUpper('stringUtilService')
      ).toBe('Stringutilservice');
    });
  });
});
