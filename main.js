import data from './data.json';

/**
 * Old school JS app - to replace with modern approach please
 */

const infoEl = document.querySelector('.js-info');
const questionEl = document.querySelector('.js-question');
const answerEl = document.querySelector('.js-answer');
const btnStart = document.querySelector('.js-start');

/**
 * Get word full type
 */
const getWordType = type => {
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
 * Show words for today
 */

btnStart?.addEventListener('click', e => {
    // output question

    const question = createCustomElement('h2', 'Do you know this word?', ['mb-5', 'fw-normal']);
    questionEl.replaceWith(question);

    // output word, a single one only is supported at the moment

    const words = [data[data.length - 1]];

    words.forEach(word => {
        const wordEl = createCustomElement('h2', `- ${word.word} (${getWordType(word.type)})`);
        infoEl.appendChild(wordEl);
        // create answer output
        answerEl.children[0].appendChild(createAnswerOutput(word.meaning));
    });

    // output @show button

    const btnShow = createCustomElement('button', 'Unveil', [
        'btn',
        'btn-success',
        'btn-lg',
        'js-show',
    ]);
    btnStart.replaceWith(btnShow);

    // add answer output trigger

    btnShow?.addEventListener('click', e => {
        if (!answerEl?.dataset?.state || answerEl?.dataset?.state === 'hidden') {
            answerEl.classList.remove('d-none');
            btnShow.textContent = 'Stash';
            answerEl.dataset.state = 'visible';
        } else {
            answerEl.classList.add('d-none');
            btnShow.textContent = 'Unveil';
            answerEl.dataset.state = 'hidden';
        }
        e.preventDefault();
    });
});
