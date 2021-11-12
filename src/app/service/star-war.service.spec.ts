import { TestBed } from '@angular/core/testing';

import { StarWarService } from './star-war.service';

describe('StarWarService', () => {
  let service: StarWarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StarWarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
