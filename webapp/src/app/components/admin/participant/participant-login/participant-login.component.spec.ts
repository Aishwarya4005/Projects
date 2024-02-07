import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParticipantloginComponent } from './participant-login.component';

describe('ParticipantLoginComponent', () => {
  let component: ParticipantloginComponent;
  let fixture: ComponentFixture<ParticipantloginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ParticipantloginComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ParticipantloginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
