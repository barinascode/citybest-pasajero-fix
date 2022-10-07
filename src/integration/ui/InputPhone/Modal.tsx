import React, { useState } from "react";
import { Modal, StyleSheet, View } from "react-native";


interface PropTypes {
    isVisible : boolean;
    onCloseRequest: ()=>void
    children: JSX.Element;
}


const CountrySelectorModal = (props:PropTypes) => {
  const {onCloseRequest} = props

    return (
      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={props.isVisible}
          onRequestClose={()=>{
            if(typeof onCloseRequest != "undefined")
              onCloseRequest()
          }}
        >
          <View style={styles.centeredView2}>
            <View style={styles.modalView}>

                {props.children}

            </View>
          </View>
        </Modal>
      </View>
    );
  };
  
  
  const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",

    },
    centeredView2: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
    },
    modalView: {
        flex : 1,
        width : '100%',
        margin: 0,
        backgroundColor: "white",
        padding: 10,
      
       
        elevation: 10,
    }
    
  });
  
  export default CountrySelectorModal;