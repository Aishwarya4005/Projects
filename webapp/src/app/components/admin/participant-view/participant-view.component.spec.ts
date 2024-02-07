import { ComponentFixture, TestBed } from '@angular/core/testing';

import { participantViewComponent } from './participant-view.component';

describe('ParticipantViewComponent', () => {
  let component: participantViewComponent;
  let fixture: ComponentFixture<participantViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [participantViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(participantViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
