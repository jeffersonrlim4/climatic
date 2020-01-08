import axios from 'axios'
//api.openweathermap.org/data/2.5/weather?lat=-5.054891523584903&lon=-42.73768208968527&appid=c3f2c9d244ca5312d4268c3fdf55421d
const api = axios.create({
    baseURL: 'https://api.openweathermap.org/data/2.5/weather/'
})

export const apiKey = 'c3f2c9d244ca5312d4268c3fdf55421d'

export default api