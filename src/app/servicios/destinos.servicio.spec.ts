import { TestBed } from '@angular/core/testing';

import { DestinosServicio } from './destinos.servicio';

describe('DestinosServicio', () => {
  let servicio: DestinosServicio;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    servicio = TestBed.inject(DestinosServicio);
  });

  it('should be created', () => {
    expect(servicio).toBeTruthy();
  });
});
