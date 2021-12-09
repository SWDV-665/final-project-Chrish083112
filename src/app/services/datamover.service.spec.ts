import { TestBed } from '@angular/core/testing';

import { DatamoverService } from './datamover.service';

describe('DatamoverService', () => {
  let service: DatamoverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DatamoverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
