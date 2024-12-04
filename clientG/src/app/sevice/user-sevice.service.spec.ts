import { TestBed } from '@angular/core/testing';

import { UserSeviceService } from './user-sevice.service';

describe('UserSeviceService', () => {
  let service: UserSeviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserSeviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
