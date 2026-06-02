import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrustpilotComponent } from './trustpilot.component';

describe('TrustpilotComponent', () => {
  let component: TrustpilotComponent;
  let fixture: ComponentFixture<TrustpilotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrustpilotComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TrustpilotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
