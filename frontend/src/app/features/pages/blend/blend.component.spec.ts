import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlendComponent } from './blend.component';

describe('BlendComponent', () => {
  let component: BlendComponent;
  let fixture: ComponentFixture<BlendComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlendComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BlendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
