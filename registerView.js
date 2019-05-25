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
        nameError:'vigane nimi'
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
        'Sisesta kasutajanimi, mis on minimaalselt 4 ja maksimaalselt 10 numbri- ja tähemärki',
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
        'Sisesta parool, mis on minimaalselt 4 ja maksimaalselt 10 numbri- ja tähemärki',
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
        'Sisesta ees ja perenimi, peab olema minimaalselt 7 tähemärki',
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

  this.signUp();
}

  signUp = () =>
    { 
      if((this.state.name != '') & (this.state.email != '') & (this.state.phone != '') & (this.state.cardNumber != '')
      & (this.state.carYear != ''))
      {
        fetch('https://service-app.northeurope.cloudapp.azure.com/index.php',
          {
              method: 'POST',
              headers: 
              {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
              },
             body: JSON.stringify(
              {
                username:this.state.username,
                password:this.state.password,
                name: this.state.name,
                email: this.state.email,
                phone: this.state.phone,
                carNumber:this.state.carNumber,
                carYear:this.state.carYear,
                secretQuestion:this.state.secretQuestion,
                secretAnswer:this.state.secretAnswer
              })
          })
         .catch((error) =>
          {
            console.error(error); 
          });
          Alert.alert(
            'Registeerumine õnnestus',
            '',
            [
              {text: 'OK', onPress: () => console.log('OK Pressed')},
            ],
          );
          this.props.navigation.navigate('User' , {
            
          });
        }
      else{
        Alert.alert(
          'Täida kõik väljad',
          '',
          [
            {text: 'OK', onPress: () => console.log('OK Pressed')},
          ],
        );
      }
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
          <TouchableOpacity onPress={() => this.props.navigation.navigate('User')}>
            <Image style={{width:23, height:23, marginTop:50, marginLeft:15,resizeMode:'contain'}} source={require('../assets/arrow-left.png')} ></Image>
          </TouchableOpacity>
          <ScrollView>
            <View style={styles.form}>
        
                <TextField
                    textColor='white'
                    returnKeyType='done'
                    containerStyle={{ width: 300,alignSelf:'center' }}
                    label='Kasutajanimi'
                    baseColor='white'
                    autoCorrect={false}
                    value={this.state.username}
                    onChangeText={ (username) => this.setState({ username }) }
                />
                <TextField
                  containerStyle={{ width: 300,alignSelf:'center' }}
                  label='Parool'
                  textColor='white'
                  secureTextEntry={true}
                  returnKeyType='done'
                  baseColor='white'
                  autoCorrect={false}
                  value={this.state.password}
                  onChangeText = {(password) => this.setState({password})}
                />
                <TextField
                  containerStyle={{ width: 300,alignSelf:'center' }}
                  textColor='white'
                  baseColor='white'
                  returnKeyType='done'
                  autoCorrect={false}
                  label='Ees - ja perenimi:'
                  keyboardType={'email-address'}
                  value={this.state.nimi}
                  onChangeText = {(name) => this.setState({ name})}
                />
                
                <TextField
                  containerStyle={{ width: 300, alignSelf:'center' }}
                  textColor='white'
                  baseColor='white'
                  label='E-mail'
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
                  label='Kontaktnumber'
                  returnKeyType='done'
                  value={this.state.phone}
                  onChangeText = {(phone) => this.setState({ phone})}
                />
                <TextField
                  containerStyle={{ width: 300,alignSelf:'center' }}
                  textColor='white'
                  autoCorrect={false}
                  baseColor='white'
                  returnKeyType='done'
                  label='Auto registreerimisnumber: 123ABC'
                  value={this.state.carNumber}
                  onChangeText = {(carNumber) => this.setState({ carNumber})}
                />
                <TextField
                  containerStyle={{ width: 300,alignSelf:'center' }}
                  textColor='white'
                  baseColor='white'
                  keyboardType="number-pad"
                  returnKeyType='done'
                  autoCorrect={false}
                  label='Väljalaskeaasta'
                  value={this.state.carYear}
                  onChangeText = {(carYear) => this.setState({ carYear})}
                />
                <TextField
                  containerStyle={{ width: 300,alignSelf:'center' }}
                  textColor='white'
                  baseColor='white'
                  returnKeyType='done'
                  autoCorrect={false}
                  label='Määra küsimus parooli unustamise korral'
                  value={this.state.secretQuestion}
                  onChangeText = {(secretQuestion) => this.setState({ secretQuestion})}
                />
                <TextField
                  containerStyle={{ width: 300,alignSelf:'center' }}
                  textColor='white'
                  baseColor='white'
                  returnKeyType='done'
                  autoCorrect={false}
                  label='Vastus'
                  value={this.state.secretAnswer}
                  onChangeText = {(secretAnswer) => this.setState({secretAnswer})}
                />
              </View>
      
              <View style={{flex:2}}>
                  <TouchableOpacity
                      style={styles.button}
                      onPress = { this.controlValue }
                  >
                      <Text style={styles.font}>Registeeru kasutajaks</Text>
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
