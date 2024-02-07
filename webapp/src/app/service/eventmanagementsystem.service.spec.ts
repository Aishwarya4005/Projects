import { TestBed } from '@angular/core/testing';

import { EventManagementSystemService } from './eventmanagementsystem.service';

describe('EventmanagementsystemService', () => {
  let service: EventManagementSystemService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EventManagementSystemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

export { EventManagementSystemService };
