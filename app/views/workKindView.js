import React, {Component} from 'react';
import {StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ImageBackground, Modal, TouchableHighlight, 
} from 'react-native';

var name = '';
var email = '';
var phone = '';
var carNumber = '';

export default class homeView extends Component{
  constructor(props) {
    super(props);
    this.state = { 
      username:'',
      modalVisible: false,
    };
}

componentWillMount (){
  user = this.props.navigation.state.params.validUserOBJ;
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

  render() { 
    return (
        <View style={{flex:1}}>
          <Modal
              animationType="fade"
              transparent={true}
              swipeDirection="left"
              visible={this.state.modalVisible}
              >
          <View style={{height:'50%',width:'90%', backgroundColor:'gray',alignSelf:'center', marginTop:180}}>
              <TouchableHighlight
                onPress={() => {
                  this.setModalVisible(!this.state.modalVisible);
                }}>
                <Text style={{alignSelf:'flex-end', marginRight:15,marginTop:5,fontWeight:'bold',color:'white', fontSize:18}}>X</Text>
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

          <View style={styles.img}>
            <Image style={{flex:5, resizeMode:'cover',height:'100%', position:'absolute',width:400,opacity:0.6}}source={require('../assets/wall.jpg')}/>
            <View style={{flex:2, flexDirection: 'row', alignSelf:'flex-end', justifyContent:'flex-end',}}>
              <TouchableOpacity
                onPress={() => {
                  this.setModalVisible(true);
                }}>
                  <Image source={require('../assets/mati.png')} style={{height:35,width:35, top: 60, position:'absolute',right:80, bottom:20}}></Image>
                  <Text style={{color:'white', fontSize:16, top:70, bottom:20, marginRight:15}}>
                      {user}
                  </Text>
               </TouchableOpacity>
            </View>
          </View>

          <View style={{flex:1, backgroundColor:'#a9a9a9'}}>
            <Text style={{ color:'white', textShadowOffset: {width: -1, height: 1},textShadowRadius: 10, alignSelf:'center',marginTop:17, fontSize:19}}>VALI TEENUS</Text>
          </View>

          <View style={{flex:8}}>
            <ImageBackground source={require('../assets/lilla.jpg')} style={styles.backImg}> 
             
            
             <View style={{flex: 1,flexDirection: 'row'}}>
                <View style={{width:'34%'}}>
                    <TouchableOpacity
                      onPress={() => this.props.navigation.navigate('Hooldus')}
                      >
                        <Image style={{width:50, height:70, marginTop:60, alignSelf:'center',resizeMode:'contain'}} source={require('../assets/hooldus.png')} ></Image>
                        <Text style={styles.title}>Korraline hooldus</Text>
                      </TouchableOpacity>
                  </View>
                  <View style={{width:'32%'}}>
                    <TouchableOpacity
                      onPress={() => this.props.navigation.navigate('Kere')}
                      >
                        <Image style={{width:70, height:70, marginTop:60,alignSelf:'center', resizeMode:'contain'}} source={require('../assets/keretood.png')} ></Image>
                        <Text style={styles.title}>Kere poleerimine</Text>
                    </TouchableOpacity> 
                  </View>
                  <View style={{width:'32%'}}>
                    <TouchableOpacity
                      onPress={() => this.props.navigation.navigate('Tire')}
                      >
                        <Image style={{width:50, height:70, marginTop:60,alignSelf:'center',resizeMode:'contain'}} source={require('../assets/rehv.png')} ></Image>
                        <Text style={styles.title}>Rehvide vahetus</Text>
                      </TouchableOpacity>
                  </View>
                </View>
                <View style={{flex: 1,flexDirection: 'row', }}>
                <View style={{width:'32%', marginTop:10}}>
                    <TouchableOpacity
                      onPress={() => this.props.navigation.navigate('Oil')}
                    >
                      <Image style={{width:50, height:70, marginTop:40,alignSelf:'center',resizeMode:'contain'}} source={require('../assets/oli2.png')} ></Image>
                      <Text style={styles.title}>Õlivahetus</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={{width:'32%', marginTop:10}}>
                    <TouchableOpacity
                      onPress={() => this.props.navigation.navigate('Salong')}
                      >
                        <Image style={{width:50, height:70, marginTop:40, alignSelf:'center',resizeMode:'contain'}} source={require('../assets/pesu3.png')} ></Image>
                        <Text style={styles.title}>Salongi puhastus</Text>
                      </TouchableOpacity>
                  </View>
                  <View style={{width:'32%',marginTop:10}}>
                    <TouchableOpacity
                      onPress={() => this.props.navigation.navigate('Käsi')}
                      >
                        <Image style={{width:70, height:70, marginTop:40,alignSelf:'center',resizeMode:'contain'}} source={require('../assets/pess.png')} ></Image>
                        <Text style={styles.title}>Käsipesu</Text>
                    </TouchableOpacity>
                  </View>
              </View>
              <View style={{flex: 1,flexDirection: 'row'}}>
               
              </View>
             </ImageBackground> 
          </View>
        </View>
    );
  }
}


const styles = StyleSheet.create({
  title:{
    fontSize:15,
    color:'white',
    fontWeight:'300',
    marginTop:10,
    alignSelf:'center',
    textAlign: 'center',
    fontFamily: 'HelveticaNeue-Medium'
  },
  modalLine:{
    marginTop:14,
    marginLeft:30,
    fontSize:16,
    color:'white'
  },
  backImg:{
    flex:1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {
    flex:5,
    backgroundColor:'black',
    resizeMode:'contain'
  },
  button:{
    backgroundColor: '#f2f2f2',
    alignItems: 'center',
    padding:15,
    width:'80%',
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius:5,
    marginTop:10
  },
});
