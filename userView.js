import React, {Component} from 'react';
import {
    StyleSheet,
    Image,
    Text,
    View,
    TouchableOpacity,
    Alert, 
    ImageBackground,ScrollView,
    KeyboardAvoidingView,Platform
} from 'react-native';
import { TextField } from 'react-native-material-textfield';


global.usrName = '';

export default class homeView extends Component{
constructor(props) {
    super(props);
    this.state = { 
        username:'',
        password:''
    };
}

loginOk = true;
validUsername = ''; //maybe should be removed
validPassword = ''; // maybe should be removed

logIn = () => {
    if(this.state.username!= '' && this.state.password != '')
    {
        fetch('https://service-app.northeurope.cloudapp.azure.com/validate_login.php',
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
                password:this.state.password
            })
        }).then((response) => response.json())
        .then((responseJson) => { 
            if (responseJson == 'login ok')
            {
                loginOk = true;
                validUsername = this.state.username;
                validPassword = this.state.password;

                global.usrName = validUsername;

                this.props.navigation.navigate('WorkKind', {
                validUserOBJ:this.state.username });
            }
            else
            {
                Alert.alert(
                    'Kasutajanimi ja/või parool on vale',
                    '',
                    [
                        {text: 'OK', onPress: () => console.log('OK Pressed')},
                    ],
                    );
                loginOk = false;
                validUsername = '';
                validPassword = '';
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
      <View style={{flex:1 }}>
      <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : null}
            style={{ flex: 1 }}
        > 
        <View style={styles.img}>
            <Image style={{flex:5, resizeMode:'cover', height:'100%', width:400, opacity:0.6}} source={require('../assets/wall.jpg')}/>
        </View>
        <View style={{flex:6}}>
            <ImageBackground source={require('../assets/lilla.jpg')} style={{width: '100%', height: '100%'}}>
            <ScrollView>
                <View style={{flex:1, alignSelf:'center', alignItems: 'center',  marginTop:40}}>
                    <TextField
                        textColor='white'
                        returnKeyType='done'
                        containerStyle={{ width: 300, alignSelf:'center' }}
                        label='Kasutajanimi'
                        baseColor='white'
                        autoCorrect={false}
                        value={this.state.username}
                        onChangeText = {(username) => this.setState({ username})}
                    />
            
                    <TextField
                        containerStyle={{ width: 300,alignSelf:'center' }}
                        label='Parool'
                        textColor='white'
                        returnKeyType='done'
                        baseColor='white'
                        secureTextEntry={true}
                        returnKeyType='go'
                        autoCorrect={false}
                        value={this.state.password}
                        onChangeText = {(password) => this.setState({password})}
                    />

                    <TouchableOpacity
                        style={styles.button}
                        onPress = { this.logIn }
                    >
                        <Text style={styles.font}>Logi sisse</Text>
                    </TouchableOpacity>
        
                    <View style={{flexDirection: 'row'}}>
                        <TouchableOpacity
                            onPress={() => this.props.navigation.navigate('Register')}
                        >
                        <Text style={{fontSize:14, color:'white'}}>Pole kasutajat?  </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.button2}
                            onPress={() => this.props.navigation.navigate('Register')}
                        >
                        <Text style={{color:'white',fontWeight:'600', fontSize:14}}>Registeeru</Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity
                            style={styles.button3}
                            onPress={() => this.props.navigation.navigate('Forgot')}
                    >
                        <Text style={{color:'white',fontSize:14}}>Unustasid salasõna</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
            </ImageBackground>
        </View>
      </KeyboardAvoidingView>
    </View>
    );
  }
}

const styles = StyleSheet.create({
  img:{
    flex:5,
    backgroundColor:'black',
    resizeMode:'contain'
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
  },
  button2:{
    alignItems: 'center',
    width:80,
    justifyContent: 'center',
  },
  button3:{
    alignItems: 'center',
    width:150,
    justifyContent: 'center',
    marginTop:10,
  },
  input2:{
    alignItems: 'center',
    height: 40,
    borderWidth: 1,
    width:300,
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderColor:'white',
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: 'transparent',
    color:'white',
    marginTop:20
  },
  input:{
    alignItems: 'center',
    height: 40,
    borderWidth: 1,
    width:300,
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderColor:'white',
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: 'transparent',
    color:'white',
  }
});
