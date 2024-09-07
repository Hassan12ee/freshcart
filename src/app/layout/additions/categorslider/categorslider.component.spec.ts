import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategorsliderComponent } from './categorslider.component';

describe('CategorsliderComponent', () => {
  let component: CategorsliderComponent;
  let fixture: ComponentFixture<CategorsliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategorsliderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CategorsliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
