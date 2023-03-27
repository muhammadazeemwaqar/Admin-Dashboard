import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default function TxtContainer({name}) {
  return (
    <View style={styles.container}>
      <Text style={styles.text1}>{name}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        width:wp("100%"),
        height:hp("3%"),
        // backgroundColor:"yellow",
        marginTop:hp("0.5%")
    },text1:{
        marginLeft:hp("2.8%"),
        fontWeight:"bold"
    }
})