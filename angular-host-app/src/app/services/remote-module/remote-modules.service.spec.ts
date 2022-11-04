import { TestBed } from '@angular/core/testing';

import { RemoteModulesService } from './remote-modules.service';

describe('RemoteModulesService', () => {
  let service: RemoteModulesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RemoteModulesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
