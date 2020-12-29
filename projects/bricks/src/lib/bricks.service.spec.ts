import { TestBed } from '@angular/core/testing';

import { BricksService } from './bricks.service';

describe('BricksService', () => {
  let service: BricksService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BricksService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
