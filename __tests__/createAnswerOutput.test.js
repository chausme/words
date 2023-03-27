import { createCustomElement, createAnswerOutput } from '../main';

describe('createAnswerOutput', () => {
    test('returns an ordered list element with the given meanings', () => {
        const meanings = ['a', 'b', 'c'];
        const expectedOutput = createCustomElement('ol', null, ['ps-4', 'fs-5']);
        meanings.forEach(meaning => {
            const answer = createCustomElement('li');
            answer.textContent = meaning;
            expectedOutput.appendChild(answer);
        });

        const actualOutput = createAnswerOutput(meanings);

        expect(actualOutput).toEqual(expectedOutput);
    });
});
