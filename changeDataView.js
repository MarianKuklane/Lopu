import React, {Component} from 'react';
import {
  StyleSheet,
  Alert,
  Text,
  View,
  TouchableOpacity,
  Image,
  ImageBackground,ScrollView,
  KeyboardAvoidingView,Platform
} from 'react-native';
import { TextField } from 'react-native-material-textfield';



export default class homeView extends Component{
constructor(props) {
    super(props);
    this.state = { 
        username:'',
        password:'',
        name:'',
        phone:'',
        email:'',
        carNumber:'',
        carYear:'',
        secretAnswer:'',
        secretQuestion:'',
    };
}

controlValue = () =>
{  
  
  if(this.state.username)
  {
    let reg= /^[A-Za-z0-9]{4,10}/;
    if(reg.test(this.state.username) === false)
    {
     
      Alert.alert(
        'Sisesta kasutajanimi, mis on maksimaalselt 10 numbri- ja tähemärki',
        '',
        [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ],
      );
      return false;
    } 
  }

  if(this.state.password)
  {
    let reg= /^[A-Za-z0-9]{4,10}/;
    if(reg.test(this.state.password) === false)
    {
      Alert.alert(
        'Sisesta parool, mis on maksimaalselt 10 numbri- ja tähemärki',
        '',
        [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ],
      );
      return false;
    } 
  }

  if(this.state.name)
  {
    let reg= /^[a-zA-Z ]{7,50}$/;
    if(reg.test(this.state.name) === false)
    {
      Alert.alert(
        'Sisesta ees ja perenimi',
        '',
        [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ],
      );
      return false;
    } 
  }
 
  if(this.state.email)
  {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
    if(reg.test(this.state.email) === false)
    {
      Alert.alert(
        'Sisesta e-mail õigesti',
        '',
        [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ],
      );
      return false;
    } 
  }

  if(this.state.phone)
  {
  let reg = /^[0-9]{7,8}$/;
    if (reg.test(this.state.phone) === false) {
      Alert.alert(
        'Sisesta korrektne kontaktnumber',
        '',
        [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ],
      );
      return false;
    }
  }


  if(this.state.carNumber)
  {
    let reg = /^[0-9]{3}[a-zA-z]{3}/;
    if (reg.test(this.state.carNumber) === false) {
      Alert.alert(
        'Sisesta auto registeerimis number : 123ABC',
        '',
        [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ],
      );
      return false;
    }
  }

  if(this.state.carYear)
  {
    let reg = /^[2]{1}[0-9]{3}/;
    if (reg.test(this.state.carYear) === false) {
      Alert.alert(
        'Sisesta auto aasta',
        '',
        [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ],
      );
      return false;
    }
  }

  this.change();
}

 change = () =>
    { 
      
        fetch('https://service-app.northeurope.cloudapp.azure.com/changeData.php',
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
                name: this.state.name,
                email: this.state.email,
                phone: this.state.phone,
                carNumber: this.state.carNumber
            })
        }).then((response) => response.json())
        .then((responseJson) => { 
            if (responseJson != 'Data update failed')
            {
                if (this.state.name != '')
                {
                    global.name = this.state.name;
                }
                if (this.state.email != '')
                {
                    global.email = this.state.email;
                }
                if (this.state.phone != '')
                {
                    global.phone = this.state.phone;
                }
                if(this.state.carNumber != '')
                {
                    global.carNumber = this.state.carNumber;
                }
              Alert.alert(
                'Andmete uuendamine õnnestus',
                '',
                [
                  {text: 'OK', onPress: () => console.log('OK Pressed')},
                ],
              );
                this.props.navigation.navigate('WorkKind');
            }
            else
            {
              Alert.alert(
                'Andmete uuendamine nurjus',
                '',
                [
                  {text: 'OK', onPress: () => console.log('OK Pressed')},
                ],
              );
              this.props.navigation.navigate('WorkKind');
            }
        })
       .catch((error) =>
        {
          console.error(error); 
        });   
    } 


  render() {
    return (
       <ImageBackground source={require('../assets/lilla.jpg')} style={{width: '100%', height: '100%'}}>       
            <KeyboardAvoidingView
              behavior={Platform.OS === "ios" ? "padding" : null}
              style={{ flex: 1 }}
              keyboardVerticalOffset={40}
            >
          <View style={{flex:6}}>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('WorkKind')}>
            <Image style={{width:23, height:23, marginTop:50, marginLeft:15,resizeMode:'contain'}} source={require('../assets/arrow-left.png')} ></Image>
          </TouchableOpacity>
          <ScrollView>
            <View style={styles.form}>
            <Text style={{color:'white', fontSize:24, alignSelf:'center',marginTop:50, marginBottom:30 }}>Profiili muutmine</Text>
        
                <TextField
                  containerStyle={{ width: 300,alignSelf:'center' }}
                  textColor='white'
                  baseColor='white'
                  returnKeyType='done'
                  autoCorrect={false}
                  label={global.name}
                  keyboardType={'email-address'}
                  value={this.state.name}
                  onChangeText = {(name) => this.setState({ name})}
                />
                <TextField
                  containerStyle={{ width: 300, alignSelf:'center' }}
                  textColor='white'
                  baseColor='white'
                  label={global.email}
                  returnKeyType='done'
                  autoCorrect={false}
                  value={this.state.email}
                  onChangeText = {(email) => this.setState({email})}
                />
                <TextField
                  containerStyle={{ width: 300,alignSelf:'center' }}
                  textColor='white'
                  autoCorrect={false}
                  baseColor='white'
                  keyboardType="number-pad"
                  label={global.phone}
                  returnKeyType='done'
                  value={this.state.phone}
                  onChangeText = {(phone) => this.setState({ phone})}
                />
                 <TextField
                  containerStyle={{ width: 300,alignSelf:'center' }}
                  textColor='white'
                  autoCorrect={false}
                  baseColor='white'
                  label={global.carNumber}
                  returnKeyType='done'
                  value={this.state.carNumber}
                  onChangeText = {(carNumber) => this.setState({ carNumber})}
                />
        
              </View>
      
              <View style={{flex:2}}>
                  <TouchableOpacity
                      style={styles.button}
                      onPress = { this.controlValue }
                  >
                      <Text style={styles.font}>Kinnita</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </KeyboardAvoidingView>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  form:{
    flex:6,
  },
  font:{
    color:'white',
    fontSize:25,
    fontWeight: '300',
  },
  button:{
    alignItems: 'center',
    height: 40,
    borderWidth: 0.5,
    width:300,
    justifyContent: 'center',
    margin:30,
    borderColor:'white',
    borderRadius: 20,
    color:'white',   
    marginTop:20 
  },
  input:{
    alignItems: 'center',
    height: 40,
    borderWidth: 1,
    width:300,
    justifyContent: 'center',
    margin:30,
    borderBottomWidth: 1,
    borderColor:'white',
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: 'transparent',
    color:'white',
    marginBottom:2
  }
});
