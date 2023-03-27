import { getWordType } from '../main';

test('getWordType returns the correct word type', () => {
    expect(getWordType('v')).toBe('verb');
    expect(getWordType('n')).toBe('noun');
    expect(getWordType('adj')).toBe('adjective');
    expect(getWordType('adv')).toBe('adverb');
});

test('getWordType returns an empty string for invalid type', () => {
    expect(getWordType('')).toBe('');
    expect(getWordType('invalid')).toBe('');
});
