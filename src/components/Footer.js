import React, { useState } from 'react'
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native'

const Footer = ({data, searchCity}) => {

    const [city, setCity] = useState()

    return(
        <View style={styles.container}>
            <View style={styles.inputArea}>
                <TextInput style={styles.input} placeholder='Pesquisar Cidade' onChangeText={(city) => setCity(city)}/>
                <TouchableOpacity style={styles.btnInput} onPress={() => searchCity(city)}>
                    <Text style={styles.txtInput}>Buscar</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.areaInfo}>
                <Text style={styles.textInfo}>Pressão Atmosférica: {data.pressure} hPa</Text>
                <Text style={styles.textInfo}>Umidade do Ar: {data.humidity}%</Text>
                <Text style={styles.textInfo}>Velocidade do Vento: {data.wind.toFixed(2)} km/h</Text>
            </View>
      </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 2,
        backgroundColor: '#fff',
        borderTopRightRadius: 40,
        borderTopLeftRadius: 40
    },
    inputArea: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-start',
        marginTop: 30
    },
    areaInfo: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    },
    textInfo: {
        fontSize: 20,
        fontWeight: 'bold',
        margin: 5
    },
    input: {
      fontSize: 16,
      backgroundColor: '#FFF',
      width: 300,
      height: 50,
      color: '#000',
      borderTopLeftRadius: 10,
      borderBottomLeftRadius: 10,
      paddingLeft: 10,
      elevation: 3
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
      borderBottomRightRadius: 10,
      elevation: 4
    }
  })

export default Footer