/**
 * Old school JS app - to replace with modern approach please
 */

const infoEl = document.querySelector('.js-info');
const questionEl = document.querySelector('.js-question');
const answerEl = document.querySelector('.js-answer');
const btnStart = document.querySelector('.js-start');

/**
 * Create a custom element
 */
const createCustomElement = (tagname, textContent, classes = []) => {
    const el = document.createElement(tagname);
    el.textContent = textContent;
    if (classes.length) {
        classes.forEach(className => {
            el.classList.add(className);
        });
    }
    return el;
};

/**
 * Show words for today
 */

btnStart.addEventListener('click', e => {
    // output question

    const question = createCustomElement('h2', 'Do you know these words?', ['mb-5', 'fw-normal']);
    questionEl.replaceWith(question);

    // output word(s)

    const words = [
        {
            term: 'Lean',
            type: 'verb',
            meaning: [
                `be in or move into a sloping position`,
                `to cast one's weight to one side for support`,
                `to rely for support or inspiration`,
                `to incline in opinion, taste, or desire`,
            ],
        },
    ];

    words.forEach(word => {
        const wordEl = createCustomElement('h2', `- ${word.term} (${word.type})`);
        infoEl.appendChild(wordEl);
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

    btnShow.addEventListener('click', e => {
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
