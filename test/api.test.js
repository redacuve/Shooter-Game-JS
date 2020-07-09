import {
  registerGame, getHighScores, capitalize, saveScore, sortHighScores,
} from './apiMock';

test('returns an object when we register a new game to the api', () => {
  registerGame('test-game').then((result) => expect(typeof result).toBe('object'));
});

test('data must be a string with the id of the game', () => {
  registerGame('test-game').then((result) => expect(typeof result.result).toBe('string'));
});

test('returns an object of highscores', () => {
  getHighScores().then((result) => expect(typeof result).toBe('object'));
});

test('returns an object when a score is saved', () => {
  saveScore('rey', '100').then((result) => expect(typeof result).toBe('object'));
});

test('returns an array of objects sorting by the highscore', () => {
  const data = [{ user: 'rey', score: 2130 }, { user: 'ricardo', score: 3360 }];
  expect(sortHighScores(data)).toStrictEqual([{ user: 'ricardo', score: 3360 }, { user: 'rey', score: 2130 }]);
});

test('returns string capitalized', () => {
  expect(capitalize('mystring')).toBe('Mystring');
});

test('capitalized with symbols', () => {
  expect(capitalize('mystring&')).toBe('Mystring&');
});

test('capitalize a uppercase string', () => {
  expect(capitalize('MYSTRING')).toBe('Mystring');
});

test('capitalize a random capitalized string', () => {
  expect(capitalize('MyStRiNg')).toBe('Mystring');
});

test('capitalize a camelize string', () => {
  expect(capitalize('MyString')).toBe('Mystring');
});

test('dont capitalize numbers', () => {
  expect(capitalize(98)).toBe(98);
});

test('dont capitalize arrays', () => {
  expect(capitalize([1, 2, 3])).toStrictEqual([1, 2, 3]);
});

test('capitalize even if the first characters are not alphanumeric', () => {
  expect(capitalize('$%#mystring')).toBe('$%#Mystring');
});

test('capitalize a capitalized string', () => {
  expect(capitalize('Mystring')).toBe('Mystring');
});
