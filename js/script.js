document.querySelector('#search').addEventListener('submit', async (event) => {
    event.preventDefault();

    const displayTemp = document.querySelector('#wheater')
    const cityName = document.querySelector('#cityName').value


    if (!cityName) {
        document.querySelector('#alert').innerHTML = 'Digite o nome da cidade'
    } else{
        document.querySelector('#alert').innerHTML = ''
        if (displayTemp.style.display === 'none' || displayTemp.style.display === '') {
            displayTemp.style.display = 'block'    
        }
    }

    const apiKey = 'e74e516394d6f586883b72a1f2c554a1';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(cityName)}&appid=${apiKey}&units=metric&lang=pt_br`;
    const erro = document.querySelector('#alert')

    const resp = await fetch(url)
    const dados = await resp.json()
    console.log(dados)

    if (dados.cod === 200) {
        pegarInfo({
            cidade: dados.name,
            pais: dados.sys.country,
            temperatura: dados.main.temp,
            tempMax: dados.main.temp_max,
            tempMin: dados.main.temp_min,
            descricao: dados.weather[0].description,
            img: dados.weather[0].icon,
            vento: dados.wind.speed,
            umidade: dados.main.humidity
        })
    } else {
        erro.innerHTML = 'Cidade não encontrada'
        erro.style.color = 'red'
        erro.style.textAlign = 'center'
    }


})
function pegarInfo(dados) {
    document.querySelector('#title').innerHTML = `${dados.cidade}, ${dados.pais}`
    document.querySelector('img').setAttribute('src', `http://openweathermap.org/img/wn/${dados.img}@2x.png`)
    document.querySelector('#tempValue').innerHTML = `${dados.temperatura.toFixed(1).toString().replace('.', ',')} <sup>c°</sup>`
    document.querySelector('#tempDescription').innerHTML = dados.descricao
    document.querySelector('#tempMax').innerHTML = `${dados.tempMax.toFixed(1).toString().replace('.', ',')} <sup>c°</sup>`
    document.querySelector('#tempMin').innerHTML = `${dados.tempMin.toFixed(1).toString().replace('.', ',')} <sup>c°</sup>`
    document.querySelector('#humididy').innerHTML = `${dados.umidade}%`
    document.querySelector('#wind').innerHTML = `${dados.vento.toFixed(1).toString().replace('.', ',')} km/h`

}