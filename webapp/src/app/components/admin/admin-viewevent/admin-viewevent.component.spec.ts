import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminVieweventComponent } from './admin-viewevent.component';

describe('AdminViewmenuComponent', () => {
  let component: AdminVieweventComponent;
  let fixture: ComponentFixture<AdminVieweventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminVieweventComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminVieweventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
