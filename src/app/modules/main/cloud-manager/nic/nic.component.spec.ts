import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NicComponent } from './nic.component';

describe('NicComponent', () => {
  let component: NicComponent;
  let fixture: ComponentFixture<NicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NicComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
