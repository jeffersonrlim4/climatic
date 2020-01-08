import React, { useState, useEffect } from 'react'
import { View, Text, ActivityIndicator, StyleSheet, TouchableOpacity, Image, TextInput, Keyboard } from 'react-native'
import api, { apiKey } from './src/services/api'
import axios from 'axios'
import Geolocation from '@react-native-community/geolocation'

export default function App(){

  const [data, setData] = useState({})
  const [loading, setLoading] = useState(true)
  const [city, setCity] = useState()

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
          icon: info.data.weather[0].icon
        })
        setLoading(false)
      })
  }

  const searchCity = () => {
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
        icon: info.data.weather[0].icon
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
          icon: info.data.weather[0].icon
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
      <View style={styles.header}>
        <View>
          <Text style={styles.textCity}>{data.city}/{data.country}</Text>
          <Text style={styles.textDescription}>{data.weatherDescription}</Text>
        </View>
      </View>
      <View style={styles.body}>
        <View style={styles.tempArea}>
          <Image source={{uri: `http://openweathermap.org/img/wn/${data.icon}@2x.png`}} style={styles.img}/>
          <Text style={styles.textTemp}>{data.temp.toFixed(0)}°</Text>
        </View>
        <View style={styles.btnArea}>
          <TouchableOpacity style={styles.btn} onPress={update}>
            <Text style={styles.btnText}>Atualizar</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.inputArea}>
        <TextInput style={styles.input} placeholder='Pesquisar Cidade' onChangeText={(city) => setCity(city)}/>
        <TouchableOpacity style={styles.btnInput} onPress={searchCity}>
          <Text style={styles.txtInput}>Buscar</Text>
        </TouchableOpacity>
      </View>
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
  },
  header: {
    flex: 1,
    flexDirection: 'row'
  },
  body: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center'
  },
  btnArea: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  btn: {
    width: 200,
    height: 40,
    backgroundColor: '#3498db',
    borderRadius: 10,
    justifyContent: 'center'
  },
  btnText: {
    textAlign: 'center',
    fontSize: 18,
    color: '#ffffff'
  },
  textDescription: {
    fontSize: 20,
    textAlign: 'left',
    textTransform: 'capitalize',
    color: '#ffffff'
  },
  textCity: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'left',
    color: '#ffffff'
  },
  textTemp: {
    fontSize: 80,
    textAlign: 'center',
    textTransform: 'capitalize',
    color: '#ffffff'
  },
  img: {
    width: 100,
    height: 100,
  },
  tempArea: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 25
  },
  input: {
    fontSize: 16,
    backgroundColor: '#FFF',
    width: 300,
    height: 50,
    color: '#000',
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    paddingLeft: 10
  },
  inputArea: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    flex: 1,
    justifyContent: 'center'
  },
  txtInput: {
    textAlign: 'center',
    color: '#fff',
    paddingLeft: 5,
    paddingRight: 5
  },
  btnInput: {
    backgroundColor: '#3498db',
    height: 50,
    justifyContent: 'center',
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10
  }
})