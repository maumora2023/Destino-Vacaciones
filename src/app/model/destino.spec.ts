import { Destino } from './destino'; 
describe('Destino', () => {
  it('should create', () => {
    const destino: Destino = {
      id: 1,
      name: 'Test',
      country: 'Test Country',
      image: 'test.jpg',
      cost: 100
    };

    expect(destino).toBeTruthy(); 
  });
});
