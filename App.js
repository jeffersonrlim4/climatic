import React, { useState, useEffect } from 'react'
import { View, Text, ActivityIndicator, StyleSheet, TouchableOpacity, Image, TextInput, Keyboard } from 'react-native'
import api, { apiKey } from './src/services/api'
import Geolocation from '@react-native-community/geolocation'
import Header from './src/components/Header'
import Container from './src/components/Container'
import Footer from './src/components/Footer'

export default function App(){

  const [data, setData] = useState({})
  const [loading, setLoading] = useState(true)

  const update = () => {
    setLoading(true)
      api.get(`?lat=${data.lat}&lon=${data.lon}&appid=${apiKey}&lang=pt`)
      .then(info => {
        setData({
          lat: info.data.coord.lat,
          lon: info.data.coord.lon,
          city: info.data.name,
          country: info.data.sys.country,
          temp: info.data.main.temp - 273.15,
          weather: info.data.weather[0].main,
          weatherDescription: info.data.weather[0].description,
          icon: info.data.weather[0].icon,
          feels: info.data.main.feels_like -273.15,
          pressure: info.data.main.pressure,
          wind: info.data.wind.speed * 3.6,
          humidity: info.data.main.humidity
        })
        setLoading(false)
      })
  }

  const searchCity = city => {
    setLoading(true)
    api.get(`?q=${city}&appid=${apiKey}&lang=pt`).then(info => {
      setData({
        lat: info.data.coord.lat,
        lon: info.data.coord.lon,
        city: info.data.name,
        country: info.data.sys.country,
        temp: info.data.main.temp - 273.15,
        weather: info.data.weather[0].main,
        weatherDescription: info.data.weather[0].description,
        icon: info.data.weather[0].icon,
        feels: info.data.main.feels_like -273.15,
        pressure: info.data.main.pressure,
        wind: info.data.wind.speed * 3.6,
        humidity: info.data.main.humidity
      })
      setLoading(false)
      Keyboard.dismiss()
    })
  }

  useEffect(() =>{
    Geolocation.getCurrentPosition(response => {
      api.get(`?lat=${response.coords.latitude}&lon=${response.coords.longitude}&appid=${apiKey}&lang=pt`)
      .then(info => {
        setData({
          lat: info.data.coord.lat,
          lon: info.data.coord.lon,
          city: info.data.name,
          country: info.data.sys.country,
          temp: info.data.main.temp - 273.15,
          weather: info.data.weather[0].main,
          weatherDescription: info.data.weather[0].description,
          icon: info.data.weather[0].icon,
          feels: info.data.main.feels_like -273.15,
          pressure: info.data.main.pressure,
          wind: info.data.wind.speed * 3.6,
          humidity: info.data.main.humidity
        })
        setLoading(false)
      })
    })
  }, [])

  

  if(loading === true){
    return(
      <View style={styles.containerLoading}>
        <ActivityIndicator size='large'/>
      </View>
    ) 
  }

  return(
    <View style={styles.container}>
      <Header data={data} update={update}/>
      <Container data={data} />
      <Footer searchCity={searchCity} data={data}/>
    </View>
  )
}

const styles = StyleSheet.create({
  containerLoading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#222'
  },
  container: {
    flex: 1,
    backgroundColor: '#222'
  }
})