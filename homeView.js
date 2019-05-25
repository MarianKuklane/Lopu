import React, {Component} from 'react';
import {
  StyleSheet,
  ImageBackground,
  Text,
  View,
  TouchableOpacity,
  StatusBar
} from 'react-native';


export default class homeView extends Component{
  render() {
    return (
      <View style={{flex:1 }}>
        <ImageBackground source={require('../assets/prov.jpg')} style={styles.backImg}>
          <StatusBar barStyle="light-content" />
            <View style={styles.btn}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => this.props.navigation.navigate('User')}
              >
                  <Text style={styles.font}>Broneeri hooldusaeg siit</Text>
              </TouchableOpacity>
            </View>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  backImg:{
  flex:1,
  resizeMode: 'cover',
  justifyContent: 'center',
  alignItems: 'center',
  width:'100%',
  height: '100%',
  },
  welcome: {
    fontSize: 30,
    textAlign: 'center',
    margin: 10,
    color: 'white',
  },
  btn:{
    marginTop:630
  },
  font:{
    color:'white',
    fontSize:25,
    fontWeight: '300',
  },
  button:{
    width:300,
    padding:10,
    borderBottomColor: 'white',
    borderBottomWidth:1,
    alignItems: 'center',
    borderColor: 'white',
  }
});
