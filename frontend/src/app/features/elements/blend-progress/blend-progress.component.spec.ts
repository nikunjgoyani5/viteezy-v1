import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlendProgressComponent } from './blend-progress.component';

describe('BlendProgressComponent', () => {
  let component: BlendProgressComponent;
  let fixture: ComponentFixture<BlendProgressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlendProgressComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BlendProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
