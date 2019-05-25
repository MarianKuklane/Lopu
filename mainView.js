import React, {Component} from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Alert,
  Image,
  ScrollView,
  ImageBackground
} from 'react-native';

class mainView extends Component{
  constructor(props) {
    super(props);
    this.state = { 
      name: '',
      email:'',
      phone: '',
      carNumber:'',
      mileage: '',
      VIN:'',
      carYear: '',
      place:'',
      comment:'',
      chosenDate:'',
      workType:'',
      workDuration:'',
    }
  }

controlValue = () =>
{  
  if(this.state.phone)
  {
  let reg = /^[0-9]{7,8}$/;
    if (reg.test(this.state.phone) === false) {
      Alert.alert(
        'Sisesta kontaktnumber',
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
        'Sisesta nimi',
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

  if(this.state.carNumber)
  {
    let reg = /^[0-9]{3}[a-zA-z]{3}/;
    if (reg.test(this.state.carNumber) === false) {
      Alert.alert(
        'Sisesta registeerimis number',
        '',
        [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ],
      );
      return false;
    }
  }

  if(this.state.mileage)
  {
    let reg = /^[0-9]{0,999999}$/;
    if (reg.test(this.state.mileage) === false) {
      Alert.alert(
        'Sisesta sõiduki läbisõit',
        '',
        [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ],
      );
      return false;
    }
  }

  if(this.state.VIN)
  {
    let reg = /^[A-Za-z0-9]{17}/;
    if (reg.test(this.state.VIN) === false) {
      Alert.alert(
        'Sisesta VIN kood',
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

  this.saveData();
}

  saveData = () =>
    { 
      if((this.state.name != '') & (this.state.email != '') & (this.state.phone != '') & (this.state.cardNumber != '')
      & (this.state.mileage != '') & (this.state.VIN != '') & (this.state.carYear != ''))
      {
        var currentDate = new Date;
        currentyear = currentDate.getFullYear();

        if (this.state.carYear <= currentyear)
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
                  name: this.state.name,
                  email: this.state.email,
                  phone: this.state.phone,
                  carNumber:this.state.carNumber,
                  mileage:this.state.mileage,
                  VIN:this.state.VIN,
                  carYear:this.state.carYear,
                 
                  place:place,
                  chosenDate:chosenDate,
                  comment:comment,

                  workType:workType,
                  workDuration:workDuration,
              })
          })
         .catch((error) =>
          {
              console.error(error); 
          });
          this.props.navigation.navigate('Final' , {
            nameOBJ:this.state.name,
            placeOBJ:this.state.place,
            dateOBJ:this.state.chosenDate,
            emailOBJ:this.state.email,
            commentOBJ:this.state.comment,
            workTypeOBJ:this.state.workType,
            workDurationOBJ:this.state.workDuration
          });
        }
        else
        {
          Alert.alert(
            'Auto väljalaskeaasta ei saa olla tulevikus',
            '',
            [
              {text: 'OK', onPress: () => console.log('OK Pressed')},
            ],
          );
        }
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
      Place1 = this.props.navigation.state.params.placeOBJ;
      date1 = this.props.navigation.state.params.dateOBJ;
      emailS = this.props.navigation.state.params.emailOBJ; 
    }



  render() {
    return (
      <View style={{flex:1, backgroundColor:'gray'}}>
       <ImageBackground source={require('../assets/lilla.jpg')} style={{height:'100%', width:'100%'}}> 
         <TouchableOpacity onPress={() => this.props.navigation.navigate('WorkKind')}>
            <Image style={{width:20, height:20, marginTop:50, marginLeft:15,resizeMode:'contain'}} source={require('../assets/arrow-left.png')} ></Image>
          </TouchableOpacity>
        <View style={{ flex: 3, alignItems: 'center', justifyContent: 'center',marginTop:20}}>
          <Text style={styles.title}>Sisesta järgnevad andmed</Text>
        </View>
        <ScrollView>
        <View style={styles.form}>
            <Text style={{color:'white', fontSize:22, marginBottom:30}}>fgdfg{ this.props.navigation.state.params.validUserOBJ }</Text>
            <TextInput
              style={styles.input}
              placeholder='Ees - ja perenimi:'
              placeholderTextColor='white'
              value={this.state.nimi}
              onChangeText = {(name) => this.setState({ name})}
             />
             <TextInput
              style={styles.input}
              placeholder='Email:'
              placeholderTextColor='white'
              value={this.state.email}
              onChangeText = {(email) => this.setState({email})}
             />
               <TextInput
              style={styles.input}
              placeholder='Kontaktnumber:'
              placeholderTextColor='white'
              value={this.state.phone}
              onChangeText = {(phone) => this.setState({ phone})}
             />
               <TextInput
              style={styles.input}
              placeholder='Registeerimis number:'
              placeholderTextColor='white'
              value={this.state.carNumber}
              onChangeText = {(carNumber) => this.setState({ carNumber})}
             />
               <TextInput
              style={styles.input}
              placeholder='Sõiduko läbisõit km:'
              placeholderTextColor='white'
              value={this.state.mileage}
              onChangeText = {(mileage) => this.setState({ mileage})}
             />
              <TextInput
              style={styles.input}
              placeholder='VIN-kood:'
              placeholderTextColor='white'
              value={this.state.VIN}
              onChangeText = {(VIN) => this.setState({ VIN})}
             />
              <TextInput
              style={styles.input}
              placeholder='Väljalaskeaasta'
              placeholderTextColor='white'
              value={this.state.text}
              value={this.state.carYear}
              onChangeText = {(carYear) => this.setState({ carYear})}
             />
             <Text style={styles.cookie}>Sisestatud isikuandmeid kasutatakse ja töödeltakse vaid broneeringu haldamise eesmärgil</Text>
        </View>
        </ScrollView>
 
        <View style={{}}>
          <TouchableOpacity
            style={styles.button}
            activeOpacity = { 0.8 }
            disabled = { this.state.disabled }
            onPress = { this.controlValue }
          >
            <Text style={styles.font}>EDASI</Text>
          </TouchableOpacity>
          {
            (this.state.loading)
            ?
                (<ActivityIndicator size = "large" />)
            :
                null
          }
        </View>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  form:{
    flex:13,
    marginTop:10,
  },
  title: {
    fontSize: 24,
    margin: 10,
    color:'white',
    padding:20,
  },
  button:{
    backgroundColor: '#deb887',
    alignItems: 'center',
    padding:20,
  },
  font:{
    color:'black',
    fontSize:18,
    fontWeight: '500',
  },
  cookie:{
    color:'white',
    marginTop:20,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft:30,
    fontSize:9,
    width:350
  },
  input:{
    alignItems: 'center',
    height: 40,
    borderWidth: 1,
    width:300,
    justifyContent: 'center',
    margin:30,
    borderBottomWidth: 1,
    borderColor:'gray',
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: 'transparent',
    color:'white',
    marginBottom:2
  }
});


export default mainView;
