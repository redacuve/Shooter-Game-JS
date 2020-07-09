import { getIndexEngineSound, getScorePoints } from '../src/scenes/helpers/sceneMainHelper';

test('should return the correct engine sound', () => {
  expect(getIndexEngineSound('sprPlayerP47')).toBe(1);
});

test('should return index 0 if the engine sound can\'t be found', () => {
  expect(getIndexEngineSound('prueba')).toBe(0);
});

test('should return 0 if something diferent to string is send', () => {
  expect(getIndexEngineSound(0)).toBe(0);
});

test('should recibe the correct score for a enemy', () => {
  const data = { texture: { key: 'sprEneSm' } };
  expect(getScorePoints(data)).toBe(50);
});

test('should return 0 if the enemy is not a plane', () => {
  const data = { texture: { key: 'sprExplosion' } };
  expect(getScorePoints(data)).toBe(0);
});