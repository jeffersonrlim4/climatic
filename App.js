import React, { useState, useEffect } from 'react'
import { View, Text, ActivityIndicator, StyleSheet, Keyboard } from 'react-native'
import api, { apiKey, loadWeather, loadCity } from './src/services/api'
import Geolocation from '@react-native-community/geolocation'
import Header from './src/components/Header'
import Container from './src/components/Container'
import Footer from './src/components/Footer'

export default function App(){

  const [data, setData] = useState({})
  const [loading, setLoading] = useState(true)

  const update = async () => {
      setLoading(true)
      const response = await loadWeather(data.lat, data.lon)
      setData(response)
      setLoading(false)
  }

  const searchCity = async city => {
    setLoading(true)
    const data = await loadCity(city)
    setData(data)
    setLoading(false)
    Keyboard.dismiss()

  }

  useEffect(() =>{
    Geolocation.getCurrentPosition(async response => {
      const data = await loadWeather(response.coords.latitude, response.coords.longitude)
      setData(data)
      setLoading(false)
    })
  }, [])

  if(loading === true){
    return(
      <View style={styles.containerLoading}>
        <ActivityIndicator size='large'/>
      </View>
    ) 
  }

  if(data === null){
    return(
      <View style={styles.container}>
        <View style={styles.containerError}>
          <Text style={styles.textError}>Não Foi Possível completar a solicitação</Text>
        </View>
        <Footer searchCity={searchCity}/>
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
    backgroundColor: '#222',
    justifyContent: 'center',
    alignItems: 'center'
  },
  textError: {
    fontSize: 22,
    color: '#fff',
    textAlign: 'center'
  },
  containerError: {
    flex: 4,
    justifyContent: 'center',
    alignItems: 'center'
  },
  container: {
    flex: 1,
    backgroundColor: '#222'
  }
})