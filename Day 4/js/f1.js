let form = document.getElementById('grabme')

async function handleSubmit(e) {
    e.preventDefault();
    let year = e.target.year.value
    let season = e.target.season.value
    let data_responses = await responses(year, season)
    console.log(data_responses)
    e.target.year.value = '';
    e.target.season.value = '';
}


async function responses(years, season) {
    try {
        let res = await fetch(`http://ergast.com/api/f1/${years}/${season}/driverStandings.json`)
        let data = await res.json()
        return data
    } catch (e) {
        console.error(e)
    }
}


