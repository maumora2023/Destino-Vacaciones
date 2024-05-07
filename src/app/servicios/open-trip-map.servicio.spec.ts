import { TestBed } from '@angular/core/testing';

import { OpenTripMapServicio } from './open-trip-map.servicio';

describe('OpenTripMapServicio', () => {
  let servicio: OpenTripMapServicio;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    servicio = TestBed.inject(OpenTripMapServicio);
  });

  it('should be created', () => {
    expect(servicio).toBeTruthy();
  });
});
