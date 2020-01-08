import React from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'


const Header = ({data, update}) => {
    return(
        <View style={styles.container}>
            <View>
                <Text style={styles.textCity}>{data.city}/{data.country}</Text>
                <Text style={styles.textDescription}>{data.weatherDescription}</Text>
            </View>
            <TouchableOpacity style={styles.btnRefresh} onPress={update}>
                <Image source={require('../img/refresh.png')} style={styles.imgRefresh}/>
            </TouchableOpacity>
      </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'row',
      padding: 16
    },
    imgRefresh: {
        width: 45,
        height:45
    },
    btnRefresh: {
        alignItems: 'flex-end',
        flex: 1
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
  })

export default Header