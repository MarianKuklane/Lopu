import React, {Component} from 'react';
import {StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ImageBackground, Modal, TouchableHighlight, 
} from 'react-native';

global.name = '';
global.email = '';
global.phone = '';
global.carNumber = '';
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
            username:global.usrName,
                      
          })
        }).then((response) => response.json())
        .then((responseJson) => { 
            if (responseJson != 'viga')
            {
              global.name = responseJson.name;
              global.email = responseJson.email;
              global.phone = responseJson.phone;
              global.carNumber = responseJson.carNumber;
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

goanotherPage(){
  this.setModalVisible(!this.state.modalVisible);
  this.props.navigation.navigate('ChangeData');
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
                  <Text style={styles.modalLine}>Kasutajanimi: {global.user}</Text>
                  <Text style={styles.modalLine}>Ees ja perenimi: {global.name}</Text>
                  <Text style={styles.modalLine}>E-mail: {global.email}</Text>
                  <Text style={styles.modalLine}>Telefoni nr: {global.phone}</Text>
                  <Text style={styles.modalLine}>Auto number: {carNumber}</Text>
                  <TouchableOpacity
                    style={styles.confirmBtn}
                    onPress={() => this.goanotherPage()}
                    >
                      <Text style={styles.titleBTN}>Muuda andmeid</Text>
                    </TouchableOpacity> 
                </View>
            </View>
         </Modal>

          <View style={styles.img}>
            <Image style={{flex:5, resizeMode:'cover',height:'100%', position:'absolute',width:400,opacity:0.6}}source={require('../assets/wall.jpg')}/>
            <View style={{flex:2, flexDirection: 'row',}}>
                <View style={{width:'85%', marginTop:60}}>
                </View>
                <View style={{width:'15%',flexDirection: 'row', marginTop:70, }}>
                    <TouchableOpacity
                        onPress={() => {
                        this.setModalVisible(true);
                        }}>
                        <Image source={require('../assets/mati.png')} style={{height:35,width:35,  bottom:20}}></Image>
                        <Text style={{color:'white',fontSize:16,  bottom:20}}>
                            {user}
                        </Text>
                    </TouchableOpacity>
                </View>
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
                <View style={styles.margin}>
                <TouchableOpacity
                  style={styles.myBtn}
                  onPress={() => this.props.navigation.navigate('History')}
                  > 
                   <Text style={styles.titleMy}>MINU TEENUSED</Text>
                </TouchableOpacity>
                </View>
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
  titleMy:{
    color:'white',
    fontWeight:'500',
    marginTop:50,
    alignSelf:'center',
    textAlign: 'center',
    fontFamily: 'HelveticaNeue-Medium'
  },
  titleBTN:{
    fontSize:15,
    color:'white',
    fontWeight:'300',
    alignSelf:'center',
    textAlign: 'center',  
    fontFamily: 'HelveticaNeue-Medium'
  },
  margin:{
    width:160,
    alignSelf:'center',
    borderBottomColor: 'white',
    borderBottomWidth:0.7,
    borderColor: 'white',
    color:'white', 
    textAlign: 'center',
  },
  confirmBtn:{
    height: 40,
    borderWidth: 0.5,
    width:150,
    margin:30,
    justifyContent: 'center',
    borderColor:'white',
    borderRadius: 20,
    marginTop:60,
    color:'white',
    alignSelf:'center'
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
