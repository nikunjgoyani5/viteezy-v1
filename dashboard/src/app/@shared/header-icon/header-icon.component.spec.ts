import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderIconComponent } from './header-icon.component';

describe('HeaderIconComponent', () => {
  let component: HeaderIconComponent;
  let fixture: ComponentFixture<HeaderIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [],
      declarations: [HeaderIconComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    component.size = 10;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return the fontsize', () => {
    expect(component.getFontSize()).toBe('5px');
  });

  it('should return the size in pixels', () => {
    expect(component.getSize()).toBe('10px');
  });

  it('should return the IconCharacter', () => {
    expect(component.getIconCharacter()).toBe('_');

    component.character = 'test';
    expect(component.getIconCharacter()).toBe('test');

    component.character = undefined;
    component.value = 'test';
    expect(component.getIconCharacter()).toBe('T');
  });

  it('should return the correct FontColor', () => {
    expect(component.getFontColor()).toBe('#BA68C8');

    component.color = 'Yellow';
    expect(component.getFontColor()).toBe('#FDD835');

    component.color = undefined;
    component.value = '#000000';
    expect(component.getFontColor()).toBe('#e7e0de');
  });

  it('should return the correct IconColor', () => {
    expect(component.getIconColor()).toBe('#BA68C8');

    component.color = 'Yellow';
    expect(component.getIconColor()).toBe('#FDD835');
  });
});
