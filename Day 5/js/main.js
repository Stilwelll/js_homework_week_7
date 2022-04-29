{
    let form = document.getElementById('cityForm');
    console.log(form)

    async function handleSubmit(e){
        e.preventDefault();
        city = e.target.city.value
        console.log(city)

        let weatherData = await getWeatherData(city)
        console.log(weatherData)
        buildWeatherCard(weatherData)
        
    };
    
    async function getWeatherData(city){
        let api_key = "cde5c5eaa82d9909a55d59c6acf1bd2d";
        try{
            let res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${api_key}`)
            let data = await res.json()
            return data
        } catch(e){
            console.error(e)
        }
    };


    async function buildWeatherCard(data){
        // grabbing form
        let build_area = document.getElementById('cityDisplay')
     
        // getting data
        let name = data['name']
        let country = data['sys']['country']
        let current_weather = data['main']['temp']
        let feels_like = data['main']['feels_like']
        let daily_high = data['main']['temp_max']
        let daily_low = data['main']['temp_min']

        // creating card
        let card = document.createElement('div')
        card.className = 'card'

        // adding info
        let card_body = document.createElement('div')
        card_body.className = 'card-body'

        // adding title
        let card_title = document.createElement('h5')
        card_title.className = 'card-title pr-2'
        card_title.innerHTML = `${name} | ${country}`
        card_body.append(card_title)

        // adding weather
        let card_current_weather = document.createElement('p')
        card_current_weather.className = 'card-text'
        card_current_weather.innerHTML = `Currently: ${current_weather}\u00B0 F | Feels Like: ${feels_like}\u00B0 F`
        card_body.append(card_current_weather)

        // adding high / low text
        let card_high_low = document.createElement('p')
        card_high_low.className = 'card-text'
        card_high_low.innerHTML = `High: ${daily_high}\u00B0 F | Low: ${daily_low}\u00B0 F `
        card_body.append(card_high_low)

        // adding body, building card
        card.append(card_body)
        build_area.append(card)

    }


    form.addEventListener('submit', handleSubmit);

}