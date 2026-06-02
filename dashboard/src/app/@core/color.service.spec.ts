import { TestBed } from '@angular/core/testing';
import { ColorService } from './color.service';

describe('ColorService', () => {
  let colorService: ColorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [ColorService],
    });

    colorService = TestBed.inject(ColorService);
  });

  describe('ColorService', () => {
    it('should return the correct index', () => {
      expect(colorService.getColorIndex('Yellow')).toBe(1);
    });

    it('should return the correct colorIndex', () => {
      expect(colorService.getHashColorIndex(undefined)).toBe(3);
      expect(colorService.getHashColorIndex('#000000')).toBe(23);
    });

    it('should return the correct color', () => {
      expect(colorService.getHashColorDark('#000000')).toBe('#bcaaa4');
    });

    it('should return the correct color', () => {
      expect(colorService.getHashColorLight('#000000')).toBe('#e7e0de');
    });

    it('should return the correct color', () => {
      expect(colorService.getColorDark(1)).toBe('#FDD835');
      expect(colorService.getColorDark('Yellow')).toBe('#FDD835');
    });

    it('should return the correct color', () => {
      expect(colorService.getColorLight(1)).toBe('#FFFBDC');
      expect(colorService.getColorLight('Yellow')).toBe('#FFFBDC');
    });
  });
});
