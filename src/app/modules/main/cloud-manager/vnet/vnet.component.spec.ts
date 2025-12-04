import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VnetComponent } from './vnet.component';

describe('VnetComponent', () => {
  let component: VnetComponent;
  let fixture: ComponentFixture<VnetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VnetComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VnetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
