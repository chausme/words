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
 * Output word and answer using global data JSON
 * @param {Number} index
 */
const outputWord = (index = 0) => {
    const infoEl = document.querySelector('.js-info');
    const answerEl = document.querySelector('.js-answer');

    answerEl.children[0].textContent = '';
    const words = [data[data.length - (parseInt(index, 10) + 1)]];

    words.forEach(word => {
        const wordEl = createCustomElement('h2', `- ${word.word} (${getWordType(word.type)})`, [
            'word',
        ]);
        infoEl.appendChild(wordEl);
        answerEl.children[0].appendChild(createAnswerOutput(word.meaning));
    });
};

/**
 * Create and output button: Show
 */
const outputBtnShow = btnNext => {
    const answerEl = document.querySelector('.js-answer');
    const btnShow = createCustomElement('button', 'Unveil', [
        'btn',
        'btn-success',
        'btn-lg',
        'js-show',
    ]);
    btnShow?.addEventListener('click', e => {
        answerEl.classList.remove('d-none');
        btnShow?.replaceWith(btnNext);
        e.preventDefault();
    });
    btnNext?.replaceWith(btnShow);
    return btnShow;
};

/**
 * Create button: Next
 */
const createBtnNext = () => {
    const btnNext = createCustomElement('button', 'Next', [
        'btn',
        'btn-success',
        'btn-lg',
        'js-next',
    ]);
    btnNext?.addEventListener('click', () => {
        document.querySelector('.word')?.remove();
        document.querySelector('.js-answer')?.classList.add('d-none');
        state += 1;
        outputBtnShow(btnNext);
        outputWord(state);
    });
    return btnNext;
};

/**
 * Create button: Show
 */
const createBtnShow = () => {
    const answerEl = document.querySelector('.js-answer');
    const btnShow = createCustomElement('button', 'Unveil', [
        'btn',
        'btn-success',
        'btn-lg',
        'js-show',
    ]);
    const btnNext = createBtnNext();
    btnShow?.addEventListener('click', e => {
        answerEl.classList.remove('d-none');
        btnShow?.replaceWith(btnNext);
        e.preventDefault();
    });
    return btnShow;
};

/**
 * Show first word
 */
const start = () => {
    const questionEl = document.querySelector('.js-question');
    const question = createCustomElement('h2', 'Do you know this word?', [
        'mb-5',
        'fw-normal',
        'js-question',
    ]);
    questionEl.replaceWith(question);

    const btnStart = document.querySelector('.js-start');
    const btnShow = createBtnShow();
    btnStart?.replaceWith(btnShow);

    const btnReset = document.querySelector('.js-reset');
    btnReset?.classList.remove('d-none');

    outputWord();
};

/**
 * Create button: Start
 */
const createBtnStart = () => {
    const btnStart = createCustomElement('button', 'Sure, I do', [
        'btn',
        'btn-success',
        'btn-lg',
        'js-start',
    ]);
    btnStart?.addEventListener('click', () => {
        start();
    });
    return btnStart;
};

/**
 * Show first word - add listener to button
 */
const btnStart = document.querySelector('.js-start');
btnStart?.addEventListener('click', () => {
    start();
});

/**
 * Reset output and state
 */
const reset = () => {
    state = 0;

    const questionEl = document.querySelector('.js-question');
    const question = createCustomElement('h2', 'There is something new for today. Ready?', [
        'fw-normal',
        'js-question',
    ]);
    questionEl.replaceWith(question);

    const btnReset = document.querySelector('.js-reset');
    btnReset.classList.add('d-none');

    document.querySelector('.word')?.remove();
    document.querySelector('.js-answer')?.classList.add('d-none');

    const btnNext = document.querySelector('.js-next');
    const btnShow = document.querySelector('.js-show');
    const btnStartNew = createBtnStart();

    if (btnNext) {
        btnNext.replaceWith(btnStartNew);
    }

    if (btnShow) {
        btnShow.replaceWith(btnStartNew);
    }
};

/**
 * Reset output and state - add listener to button
 */
const btnReset = document.querySelector('.js-reset');
btnReset?.addEventListener('click', () => {
    reset();
});
