import axios from 'axios'
//api.openweathermap.org/data/2.5/weather?lat=-5.054891523584903&lon=-42.73768208968527&appid=c3f2c9d244ca5312d4268c3fdf55421d
const api = axios.create({
    baseURL: 'https://api.openweathermap.org/data/2.5/weather/'
})

export const apiKey = 'c3f2c9d244ca5312d4268c3fdf55421d'

export const loadWeather = async (lat, lon) =>{
    try{
        const response =  await api.get(`?lat=${lat}&lon=${lon}&appid=${apiKey}&lang=pt`)
        return {
            lat: response.data.coord.lat,
            lon: response.data.coord.lon,
            city: response.data.name,
            country: response.data.sys.country,
            temp: response.data.main.temp - 273.15,
            weather: response.data.weather[0].main,
            weatherDescription: response.data.weather[0].description,
            icon: response.data.weather[0].icon,
            feels: response.data.main.feels_like -273.15,
            pressure: response.data.main.pressure,
            wind: response.data.wind.speed * 3.6,
            humidity: response.data.main.humidity
        }
    }catch{
        return null
    }
}


export const loadCity = async (city) =>{
    try{
        const response = await api.get(`?q=${city}&appid=${apiKey}&lang=pt`)
        return {
            lat: response.data.coord.lat,
            lon: response.data.coord.lon,
            city: response.data.name,
            country: response.data.sys.country,
            temp: response.data.main.temp - 273.15,
            weather: response.data.weather[0].main,
            weatherDescription: response.data.weather[0].description,
            icon: response.data.weather[0].icon,
            feels: response.data.main.feels_like -273.15,
            pressure: response.data.main.pressure,
            wind: response.data.wind.speed * 3.6,
            humidity: response.data.main.humidity
        } 
    }catch{
        return null
    }
    
}

export default api