const answerEl = document.querySelector('.js-answer');
const btnShow = document.querySelector('.js-show');

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
