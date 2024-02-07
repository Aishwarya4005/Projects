import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParticipantsignupComponent } from './participant-sign-up.component';

describe('ParticipantSignUpComponent', () => {
  let component: ParticipantsignupComponent;
  let fixture: ComponentFixture<ParticipantsignupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ParticipantsignupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ParticipantsignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
