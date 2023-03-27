import { StyleSheet, Text, View,TextInput } from 'react-native'
import React from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default function TxtInput({name,onChangeText,value}) {
  return (
    <View style={styles.container}>

        <TextInput style={styles.input} value={value} onChangeText={onChangeText} placeholder={name}/>
      
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        width:wp("100%"),
        height:hp("7%"),
        // backgroundColor:"green",
        justifyContent:"center",
        alignItems:"center"
    },input:{
        width:"90%",
        height:"100%",
        backgroundColor:"#D3D3D3",
        borderRadius:hp("1%"),
        padding:10
    }
})