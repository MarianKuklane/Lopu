import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ImageBackground,ScrollView,
    FlatList
} from 'react-native';


export default class homeView extends Component{
constructor(props) {
    super(props);
    this.state = { 
        date:'',
        username:'',
        workType:[],   
    }
}

 componentDidMount ()
    {  
      fetch('https://service-app.northeurope.cloudapp.azure.com/history_data.php',
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
      
                this.setState({isLoading: false,
                              dataSource: responseJson});
              }
            )      
    }


  render() {
    return (
       <ImageBackground source={require('../assets/lilla.jpg')} style={{width: '100%', height: '100%'}}>       
          <View style={{flex:6}}>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('WorkKind')}>
            <Image style={{width:23, height:23, marginTop:50, marginLeft:15,resizeMode:'contain'}} source={require('../assets/arrow-left.png')} ></Image>
          </TouchableOpacity>
          <ScrollView>
            <View style={styles.form}>
            <Text style={{color:'white', fontSize:24, alignSelf:'center',marginTop:50, marginBottom:50 }}>Minu teenused</Text>
        
            <FlatList
              data={this.state.dataSource}
              renderItem={({ item }) =>
              <View style={styles.separator}>
                  <Text
                    style={{
                      color: 'white',
                      fontSize: 14,
                      padding: 8
                    }}
                  >
                    Töö:{item.workType}
                  </Text>
                  <Text
                    style={{
                      color: 'white',
                      fontSize: 14,
                      padding: 8
                    }}
                  >
                    Aeg:{item.date.slice(0,25)}
                  </Text>
                  
                </View>
                 
          }
        />

        <Text style={{color:'white', fontSize:25}}></Text>
              </View>
            </ScrollView>
          </View>
       
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
  separator: {
    flex: 1,
    borderBottomColor: 'white',
    borderBottomWidth: StyleSheet.hairlineWidth
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
