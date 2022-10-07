import React from 'react'
import { StyleSheet, Text, View } from "react-native"
import { MaterialIcons } from '@expo/vector-icons'; 

interface PropTypes {
    message:string
}

const TextError = (props:PropTypes)=>{
    const {message} = props
    return <View style={styles.errorContainer}>
        <View style={{ flex : 1.5}}></View>
        <View style={{flex:9, display:'flex',flexDirection : 'row'}}>
            {/* <MaterialIcons name="dangerous" size={16} color="#ce0a0a" /> */}
            <Text style={styles.requiredText}>
                {message}
            </Text> 
        </View>
    </View>
}

export default TextError

const styles = StyleSheet.create({
   errorContainer : {
    display:'flex',
    flex: 1,
    flexDirection:'row',
    justifyContent: 'flex-start',
    marginTop : 8   ,
   },
    requiredText : {
        color : '#ce0a0a',
        fontSize : 11.7,
        marginLeft : 5
    },

})