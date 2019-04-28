import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  ImageBackground, Image, Modal, TouchableHighlight, TouchableOpacity
} from 'react-native';

var name = '';
var email = '';
var phone = '';
var carNumber = '';

class finalView extends Component{

  constructor(props)
{
    super(props);
    this.state = { 
      modalVisible: false,
      username:'',
      name:''
    };
}
loginOk = true;


componentWillMount ()
{
  fetch('https://service-app.northeurope.cloudapp.azure.com/get_data_person.php',
        {
          method: 'POST',
          headers: 
          {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(
          {
            username:/*this.state.username*/'Mussim',
                      
          })
        }).then((response) => response.json())
        .then((responseJson) => { 
          //console.warn(name);
            if (responseJson != 'viga')
            {
              name = responseJson.name;
              email = responseJson.email;
              phone = responseJson.phone;
              carNumber = responseJson.carNumber;

              loginOk = true;
            }
            else
            {
              console.warn("JAMA IKKA");
              loginOk = false;
           
            }
        })   
}


setModalVisible(visible) {
  this.setState({modalVisible: visible});
}

  render() 
  {
    return (
      <View >
          <Modal
              animationType="fade"
              transparent={true}
              swipeDirection="left"
              presentationStyle='overFullScreen'
              visible={this.state.modalVisible}
              onRequestClose={() => {
                Alert.alert('Modal has been closed.');
          }}>
          <View style={{height:'50%',width:'90%', backgroundColor:'gray',alignSelf:'center', marginTop:180}}>
              <TouchableHighlight
                onPress={() => {
                  this.setModalVisible(!this.state.modalVisible);
                }}>
                <Text style={{alignSelf:'flex-end', marginRight:5,marginTop:5, fontSize:14}}>X</Text>
              </TouchableHighlight>
              <Text style={{alignSelf:'center',color:'white', fontSize:20}}>ANDMED</Text>
              <View style={{marginTop:50}}>
                <Text style={styles.modalLine}>Kasutajanimi: {user}</Text>
                <Text style={styles.modalLine}>Ees ja perenimi: {name}</Text>
                <Text style={styles.modalLine}>E-mail:{email}</Text>
                <Text style={styles.modalLine}>Telefoni nr:{phone}</Text>
                <Text style={styles.modalLine}>Auto number:{carNumber}</Text>
              </View>
          </View>
        </Modal>


          <ImageBackground source={require('../assets/lilla.jpg')} style={{width: '100%', height: '100%'}}> 
          <StatusBar barStyle="light-content" />
          <View style={styles.container}>
              <View style={{flex:2, flexDirection: 'row', alignSelf:'flex-end', justifyContent:'flex-end',}}>
                <TouchableOpacity
                  onPress={() => {
                    this.setModalVisible(true);
                  }}>
                    <Image source={require('../assets/mati.png')} style={{height:35,width:35, top: 60,  position:'absolute',right:90, bottom:20}}></Image>
                    <Text style={{color:'white',fontSize:16, top:70,  bottom:20, marginRight:15}}>
                        {user}
                    </Text>
                </TouchableOpacity>
              </View>
            
            <View style={styles.header}>
                <Text style={styles.font}> Hooldusaeg on broneeritud</Text>
                <Text style={{color:'white', fontSize:18, marginTop:20}}>
                  Esindusse: {this.props.navigation.state.params.placeOBJ}
                </Text>
                <Text style={{color:'white', fontSize:18, marginTop:20}}>
                  Aeg: {this.props.navigation.state.params.dateOBJ.toString()}
                </Text>

              </View>
          </View>
          </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
container:{
  flex:1
},
header:{
  flex:5,
  alignItems: 'center',
  marginTop:130
},
font:{
  color:'white',
  fontSize:21,
},
button:{
  flex:1,
  justifyContent: 'center',
  alignItems: 'center',
},
modalLine:{
  marginTop:14,
  marginLeft:30,
  fontSize:16,
  color:'white'
},
btnLayout:{
  width:260,
  padding:10,
  borderColor: 'blue',
  borderWidth:1,
  backgroundColor:'blue',
  alignItems: 'center',
}
});

export default finalView;
