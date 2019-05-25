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

global.secretQuestion = '';
global.secretAnswer = '';

export default class homeView extends Component{
constructor(props) {
    super(props);
    this.state = { 
      username:'',
    };
}

doAction = () =>
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
  global.usrName = this.state.username; 
  this.getData();
}

  getData = () =>
    { 
      if(this.state.username != '')
      {
        fetch('https://service-app.northeurope.cloudapp.azure.com/user_control.php',
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
            if (responseJson != 'no user exists')
            {
              global.secretQuestion = responseJson.secretQuestion;
              global.secretAnswer = responseJson.secretAnswer;

              this.props.navigation.navigate('SendPass');
            }
            else
            {
              loginOk = false;
              validUsername = '';
            }
        })
        
        .catch((error) => {
            Alert.alert(
              'Serveriga ei saadud ühendust',
              '',
              [
                  {text: 'OK', onPress: () => console.log('OK Pressed')},
              ],
              );
            console.error(error);
        });
        }
        else{
            Alert.alert(
              'Sisesta väljad',
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
                
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => this.doAction()}
                 >
                  <Text style={styles.font}>Saada</Text>
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
    marginTop:230
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
    width:150,
    alignSelf:'center',
    justifyContent: 'center',
    margin:30,
    borderColor:'white',
    borderRadius: 20,
    color:'white',   
    marginTop:40 
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
