import { TestBed } from '@angular/core/testing';

import { NotasFirebaseService } from './notas-firebase.service';

describe('NotasFirebaseService', () => {
  let service: NotasFirebaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotasFirebaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
