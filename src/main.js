import data from '../data.json';

let state = 0;

/**
 * Get word full type
 */
export const getWordType = type => {
    switch (type) {
        case 'v':
            return 'verb';
        case 'n':
            return 'noun';
        case 'adj':
            return 'adjective';
        case 'adv':
            return 'adverb';
        default:
            return '';
    }
};

/**
 * Create a custom element
 */
export const createCustomElement = (tagname, textContent = null, classes = []) => {
    const el = document.createElement(tagname);
    if (textContent) {
        el.textContent = textContent;
    }
    if (classes.length) {
        classes.forEach(className => {
            el.classList.add(className);
        });
    }
    return el;
};

/**
 * Create answer output
 */
export const createAnswerOutput = meanings => {
    const list = createCustomElement('ol', null, ['ps-4', 'fs-5']);
    meanings.forEach(meaning => {
        const answer = createCustomElement('li');
        answer.textContent = meaning;
        list.appendChild(answer);
    });
    return list;
};

/**
 * Output question
 * @param {Array} data
 * @param {Number} index
 */
const outputWord = (data, index = 0) => {
    const infoEl = document.querySelector('.js-info');
    const answerEl = document.querySelector('.js-answer');
    const btnReset = document.querySelector('.js-reset');
    const btnStart = document.querySelector('.js-start');
    const btnShow = createCustomElement('button', 'Unveil', [
        'btn',
        'btn-success',
        'btn-lg',
        'js-show',
    ]);

    index = parseInt(index, 10);

    btnShow?.addEventListener('click', e => {
        answerEl.classList.remove('d-none');
        btnReset.classList.remove('d-none');

        const btnStart = createCustomElement('button', 'Next', [
            'btn',
            'btn-success',
            'btn-lg',
            'js-start',
        ]);
        btnStart?.addEventListener('click', e => {
            document.querySelector('.word')?.remove();
            document.querySelector('.js-answer')?.classList.add('d-none');
            state = state + 1;
            outputWord(data, state);
        });
        btnShow.replaceWith(btnStart);

        e.preventDefault();
    });
    btnStart?.replaceWith(btnShow);
    answerEl.children[0].textContent = '';
    const words = [data[data.length - (index + 1)]];

    words.forEach(word => {
        const wordEl = createCustomElement('h2', `- ${word.word} (${getWordType(word.type)})`, [
            'word',
        ]);
        infoEl.appendChild(wordEl);
        answerEl.children[0].appendChild(createAnswerOutput(word.meaning));
    });
};

/**
 * Replace initial output with question
 */
const outputQuestion = () => {
    const questionEl = document.querySelector('.js-question');
    const question = createCustomElement('h2', 'Do you know this word?', [
        'mb-5',
        'fw-normal',
        'js-question',
    ]);
    questionEl.replaceWith(question);
    outputWord(data);
};

const reset = () => {
    state = 0;
    const questionEl = document.querySelector('.js-question');
    const question = createCustomElement('h2', 'There is something new for today. Ready?', [
        'mb-5',
        'fw-normal',
        'js-question',
    ]);

    questionEl.replaceWith(question);
};

/**
 * Show words for today
 */
const btnStart = document.querySelector('.js-start');
btnStart?.addEventListener('click', e => {
    outputQuestion();
});

/**
 * Reset progress
 */
const btnReset = document.querySelector('.js-reset');
btnReset?.addEventListener('click', e => {
    document.querySelector('.word')?.remove();
    document.querySelector('.js-answer')?.classList.add('d-none');
    const btnStart = document.querySelector('.js-start');
    if (btnStart) {
        btnStart.textContent = 'Sure, I do';
    }
    const btnShow = document.querySelector('.js-show');
    if (btnShow) {
        const btnStart = createCustomElement('button', 'Next', [
            'btn',
            'btn-success',
            'btn-lg',
            'js-start',
        ]);
        btnShow.replaceWith(btnStart);
    }
    reset();
});
