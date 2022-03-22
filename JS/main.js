const options = document.querySelectorAll('.dashboard__options-op')
const cards = document.querySelector('.dashboard-cards')


function activeOptions(option){
    options.forEach(a => a.classList.remove('active'))
    option.classList.add('active')
}

function renderCards(option){
    var op = option.textContent.toLowerCase()
    cards.innerHTML = ''
    
    fetch('data.json')
    .then(function(res){
        return res.json()
    })
    .then(function(data){
        data.forEach(datainfo =>{
            switch(op){
                case 'daily':
                    renderInfo(datainfo,'daily');
                    break;
                case 'weekly':
                    renderInfo(datainfo,'weekly');
                    break;
                case 'monthly':
                    renderInfo(datainfo,'monthly');
                    break;
                default:
                    break;
            }   
        })
    })
    .catch(console.error)
}

function renderInfo(option, time){

    let title = option['title'];
    let current = option['timeframes'][time]['current'];
    let previous = option['timeframes'][time]['previous'];

    const timeMessage = {
        'daily': 'Yesterday',
        'weekly': 'Last week',
        'monthly': 'Last month'
    }

    cards.innerHTML +=`
    <div class="card ${title.toLowerCase().replace(' ','-')}">
        <div class="card__background">
            <img class="card__background-category" src="images/icon-${title.toLowerCase().replace(' ','-')}.svg" alt="">
        </div>
        <div class="card__info">
            <div class="card-category">
                <span class="category__title">${title}</span>
                <div class="category__option">
                    <svg class="category__option-icon" width="21" height="5" xmlns="http://www.w3.org/2000/svg">
                        <path
                        d="M2.5 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Zm8 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 
                        0-5Zm8 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Z"
                        fill="#BBC0FF" fill-rule="evenodd"/>
                    </svg>
                </div>
            </div>
            <div class="card-time">
                <span class="card-time-hours">${current}hrs</span>
                <p class="card-time-before">${timeMessage[time]} - ${previous}hrs</p>
            </div>
        </div>
    </div>
    `
}

cards.innerHTML = ''

options.forEach(option =>{
    option.addEventListener('click', ()=>{
        activeOptions(option)
        renderCards(option)
    })
})