const input = document.querySelector(".country-input");
const list = document.querySelector(".countries");
const countries = [];

window.onload = () => {
    input.focus()
}

fetch('https://api.covid19api.com/summary')
    .then(blob => blob.json())
    .then(data => countries.push(...data.Countries))


function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function findCountries(countries, country) {
    return countries.filter(e => {
        const exp = new RegExp(country, 'gi')
        return e.Country.match(exp)
    })
}

function displayCountries() {
    
    list.innerHTML = "";
    if (!this.value) {
        return;
    }

    const results = findCountries(countries, this.value);
    if (results.length == 0) list.innerHTML += '<li>No matches</li>'
    const exp = new RegExp(this.value, 'gi');
    results.forEach(result => {
        const countryName = result.Country.replace(exp, `<span class="hl">${this.value}</span>`)
        list.innerHTML += 
        
        `<li>
            <div class="country-hl">
                <span class="country">${countryName}</span><span class="total">${numberWithCommas(result.TotalConfirmed)}</span>
            </div>
            <div class="stats-hidden">
                <span class="label">Total cases confirmed: </span><span class="value">${numberWithCommas(result.TotalConfirmed)}</span>
                <span class="label">Total deaths confirmed: </span><span class="value">${numberWithCommas(result.TotalDeaths)}</span>
                <span class="label">Total recoveries confirmed: </span><span class="value">${numberWithCommas(result.TotalRecovered)}</span>

                <span class="label">New cases confirmed: </span><span class="value">${numberWithCommas(result.NewConfirmed)}</span>
                <span class="label">New deaths confirmed: </span><span class="value">${numberWithCommas(result.NewDeaths)}</span>
                <span class="label">New recoveries confirmed: </span><span class="value">${numberWithCommas(result.NewRecovered)}</span>
            </div>
        </li>`

        Array.from(list.children).forEach(li => li.addEventListener('click', displayStats))

    })
}


function displayStats() {
    const stats = this.querySelector(".stats-hidden");
    stats.classList.toggle("stats-visible")
    

}

input.addEventListener('keyup', displayCountries)






