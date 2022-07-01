const cardContainer = document.querySelector('.content')
const searchInput = document.querySelector('.search')
const searchBtn = document.querySelector('.search-btn')

const startMsg = document.querySelector('.our-card')

async function getData(query=''){
    const resp = await fetch(`http://universities.hipolabs.com/search?country=${query}`)
    const data = await resp.json()
    if(query ==='') data.length = 100
    printCards(data)
    return data 
}

function printCards(data){
    cardContainer.innerHTML=''
    startMsg.classList.add('hidden')
    let count = 0
    let countryName = ''
    countryName =data[0].country
    for(item of data){
        count++
        const html=`
                <div class="col-sm-3">
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">${count})  ${item.name}</h5>
                    <p class="card-text">Country:${item.country}, Code:${item.alpha_two_code}, domain:${item.domains[0]}</p>
                    <a href="${item.web_pages[0]}" class="btn btn-primary">To University site</a>
                </div>
            </div>
        </div>
        `
        cardContainer.innerHTML+=html
    }
    let getHtml  = cardContainer.innerHTML
    cardContainer.innerHTML=`<h3>We have found ${count} universities in ${countryName}</h3>` +getHtml
}


searchBtn.addEventListener('click',(e)=>{
    e.preventDefault()
    addSpinner()
    getData(searchInput.value)
})

function addSpinner(){
    cardContainer.innerHTML=`        
    <div class="spinner-border text-primary spin" role="status">
        <span class="visually-hidden">Loading...</span>
    </div>`
}