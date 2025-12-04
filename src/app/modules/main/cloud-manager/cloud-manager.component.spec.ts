import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CloudManagerComponent } from './cloud-manager.component';

describe('CloudManagerComponent', () => {
  let component: CloudManagerComponent;
  let fixture: ComponentFixture<CloudManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CloudManagerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CloudManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
