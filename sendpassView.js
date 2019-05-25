import React, {Component} from 'react';
import {
  StyleSheet,
  Alert,
  Text,
  View,
  TouchableOpacity,
  Image,Button,
  ImageBackground,ScrollView,
  KeyboardAvoidingView,Platform
} from 'react-native';
import { TextField } from 'react-native-material-textfield';


global.newPass = '';

export default class homeView extends Component{
constructor(props) {
  super(props);
  this.state = { 
      password:'',
      answer:'',
      question:'',
      status:false
  };
}


ShowHide = () =>
{
  if(this.state.status == false)
  {
    this.setState({status: true})
  }
  else
  {
    this.setState({status: true})
  }
}

confirm = () =>
{
  if (global.secretAnswer == this.state.answer)
  {
    this.ShowHide();
  }
  else
  {
    Alert.alert(
      'Vale vastus',
      '',
      [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ],
    );
  }
}



updatePassword = () =>
    { 
      if(this.state.password != '')
      {
        fetch('https://service-app.northeurope.cloudapp.azure.com/resetPass.php',
          {
              method: 'POST',
              headers: 
              {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
              },
             body: JSON.stringify(
              {
                password:this.state.password,
                username:global.usrName,
              })
             
          }).then((response) => response.json())
          .then((responseJson) => { 
              if (responseJson != 'Password update failed')
              {
                Alert.alert(
                  'Parooli uuendamine õnnestus',
                  '',
                  [
                    {text: 'OK', onPress: () => console.log('OK Pressed')},
                  ],
                );
                  this.props.navigation.navigate('User');
              }
              else
              {
                Alert.alert(
                  'Parooli uuendamine nurjus',
                  '',
                  [
                    {text: 'OK', onPress: () => console.log('OK Pressed')},
                  ],
                );
                this.props.navigation.navigate('User');
              }
          })
         .catch((error) =>
          {
            console.error(error); 
          });   
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
                <Text style={{color:'white',alignSelf:'center', marginTop:120,fontSize:20}}>{global.secretQuestion}</Text>

                <TextField
                        textColor='white'
                        returnKeyType='done'
                        containerStyle={{ width: 300,alignSelf:'center' }}
                        label='Sisesta vastus'
                        baseColor='white'
                        autoCorrect={false}
                        value={this.state.answer}
                        onChangeText={ (answer) => this.setState({ answer }) }
                      />

                <Button title="Kinnita" onPress={() => this.confirm()} />

{
  this.state.status ? <TextField
                        textColor='white'
                        returnKeyType='done'
                        containerStyle={{ width: 300,alignSelf:'center' }}
                        label='Sisesta uus parool'
                        baseColor='white'
                        autoCorrect={false}
                        value={this.state.password}
                        onChangeText={ (password) => this.setState({ password}) }
                      /> : null
                    }
 {
  this.state.status ? <Button title="Kinnitan" style={{marginTop:30}} onPress={() =>this.updatePassword()} />: null
}


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
    marginTop:60
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
    marginTop:70 
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
