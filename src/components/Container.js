import React from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'

const Container = ({data}) =>{
    return(
        <View style={styles.container}>
            <View style={styles.tempArea}>
                <Image source={{uri: `http://openweathermap.org/img/wn/${data.icon}@2x.png`}} style={styles.img}/>
                <Text style={styles.textTemp}>{data.temp.toFixed(0)}°</Text>
            </View>
            <Text style={styles.textFeels}>Sensação Térmica: {data.feels.toFixed(0)}°</Text>
      </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textFeels:{
        color: '#fff',
        marginBottom: 40,
        fontSize: 20
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
    }
  })

export default Container