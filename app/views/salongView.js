import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    DatePickerIOS,
    TouchableOpacity,
    Image,
    ScrollView,
    Picker,
    ImageBackground,
    TextInput,
    Alert, Modal,TouchableHighlight
} from 'react-native';

var dbDateArray = '';
var dbDayName = '';
var dbMonth = '';
var dbDay = '';
var dbYear = '';
var dbTimeArray = '';

var dbTimeComponent = '';
var dbHours = '';
var dbMinutes = '';
var today = new Date().toDateString();
var time= new Date();

var dbItemsCount = 0;
var dbDayName = Array();
var dbMonth = Array();
var dbDay = Array();
var dbYear = Array();

var dbHours = Array();
var dbMinutes = Array();

var dbWorkDurationHours = Array();
var dbWorkDurationMinutes = Array();

var dbPlace = Array();

var name = '';
var email = '';
var phone = '';
var carNumber = '';

export default class homeView extends Component{
constructor(props)
{
    super(props);
    this.state = { 
        modalVisible: false,
        pickerSelection:'',
        comment:'',
        workType: '',
        workDuration: '',
        username: '',
    };
    this.state = {chosenDate: new Date()};
    this.setDate = this.setDate.bind(this);
}

setModalVisible(visible) {
    this.setState({modalVisible: visible});
}

componentWillMount ()
{
    fetch('https://service-app.northeurope.cloudapp.azure.com/get_data.php').then((response) => response.json())
             .then((responseJson) => { 
                 var obj = (responseJson);
                 dbItemsCount = Object.keys(obj).length;

                 for (i = 0; i < dbItemsCount; i++)
                 {
                    dbFullDate = obj[i].date;
                    dbDateArray = dbFullDate.split(' ');
                    dbDayName[i] = dbDateArray[0];
                    dbMonth[i] = dbDateArray[1];
                    dbDay[i] = dbDateArray[2];
                    dbYear[i] = dbDateArray[3];
                    dbTimeArray = dbDateArray[4];
        
                    dbTimeComponent = dbTimeArray.split(':');
                    dbHours[i] = dbTimeComponent[0];
                    dbMinutes[i] = dbTimeComponent[1];

                    dbFullWorkDuration = obj[i].workDuration;
                    dbWorkDurationComponent = dbFullWorkDuration.split(':');
                    dbWorkDurationHours[i] = dbWorkDurationComponent[0];
                    dbWorkDurationMinutes[i] = dbWorkDurationComponent[1];

                    dbPlace[i] = obj[i].place;
                 }

             })
             .catch((error) => {
                
             });

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



setDate(newDate) 
{
    this.setState({chosenDate: newDate});
}

saveData = () =>
    {
        var invalidDatePicked = false;

        var temp = this.state.chosenDate.toString();
        selDateArray = temp.split(' ');
        var selDayName = selDateArray[0];
        var selMonth = selDateArray[1];
        var selDay = selDateArray[2];
        var selYear = selDateArray[3];
        var selTimeArray = selDateArray[4];

        var selTimeComponent = selTimeArray.split(':');
        var selHours = selTimeComponent[0];
        var selMinutes = selTimeComponent[1];

        for (i = 0; i < dbItemsCount; i++)
        {
            if(dbPlace[i] == this.state.pickerSelection)
            { 
                if ((selYear == dbYear[i]) && (selMonth == dbMonth[i]) && (selDay == dbDay[i]))
                {
                    var dbTempHours = parseInt(dbHours[i]);
                    var selTempHours = parseInt(selHours);
                    var dbTempDuration = parseInt(dbWorkDurationHours[i]);
                    if (dbMinutes[i] == 30)
                    {
                    dbTempHours = dbTempHours + 0.5;
                    }
                    if (selMinutes == 30)
                    {
                    selTempHours = selTempHours + 0.5;
                    }
                    if (dbWorkDurationMinutes[i] == 30)
                    {
                        dbTempDuration = dbTempDuration + 0.5;
                    }

                    // Check if reservation will be done before or after current dB entry
                    if (selTempHours > dbTempHours)
                    {
                        if (Math.abs(dbTempHours - selTempHours) < dbTempDuration)
                        {
                            invalidDatePicked = true;
                            console.warn("Ajakonflikt");
                            break;
                        }
                    }
                    else
                    {
                        if (Math.abs(dbTempHours - selTempHours) < 0.5) //this hardcoded 1 is duration of that requested job
                        {
                            invalidDatePicked = true;
                            console.warn("Ajakonflikt");
                            break;
                        } 
                    }
                } 
            }
        }

        if (this.state.chosenDate > time)
        {
            if ((selHours <= 16) && (selHours >= 8) && (selDayName != 'Sat') && (selDayName != 'Sun') && !invalidDatePicked)
            {   
                dbMonth[i] = dbDateArray[1];
                dbDay[i] = dbDateArray[2];
                dbYear[i] = dbDateArray[3];

                dbHours[i] = dbTimeComponent[0];
                dbMinutes[i] = dbTimeComponent[1];

                if(this.state.pickerSelection)
                {
                    comment = this.state.comment;
                    place = this.state.pickerSelection;
                    chosenDate = this.state.chosenDate.toString();
                    workType = 'Salongi puhastus';
                    workDuration = '00:30';

                    fetch('https://service-app.northeurope.cloudapp.azure.com/save_data.php',
                    {
                        method: 'POST',
                        headers: 
                        {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                        },
                       body: JSON.stringify(
                        {
                            username: validUsername,
                           
                            place:place,
                            chosenDate:chosenDate,
                            comment:comment,
                            username:validUsername,
                            workType:workType,
                            workDuration:workDuration,
                        })
                    })
                   .catch((error) =>
                    {
                        console.error(error); 
                    });

                    this.props.navigation.navigate('Final',
                    {
                        placeOBJ:this.state.pickerSelection,
                        dateOBJ:this.state.chosenDate,
                        commentOBJ:this.state.comment,
                        workTypeOBJ:this.state.workType,
                        workDurationOBJ:this.state.workDuration,
                        validUserOBJ:this.state.username,
                        validUserOBJ:this.state.validUsername

                    });
                }
            }
            else
            {
                Alert.alert(
                    'Antud aega pole võimalik broneerida',
                    '',
                    [
                        {text: 'OK', onPress: () => console.log('OK Pressed')},
                    ],
                );
            }
        }
        else
        {
            Alert.alert(
                'Valitud aeg on juba möödas',
                '',
                [
                    {text: 'OK', onPress: () => console.log('OK Pressed')},
                ],
            );
        }
    }


  render() {
    return (
        <View style={{flex: 1}}>
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
                    <Text style={{alignSelf:'flex-end', color:'white',marginRight:15,padding:10,marginTop:10, fontSize:20}}>X</Text>
              </TouchableHighlight>
              <Text style={{alignSelf:'center',color:'white', fontSize:20}}>ANDMED</Text>
              <View style={{marginTop:20}}>
              <Text style={styles.modalLine}>Kasutajanimi: {user}</Text>
                <Text style={styles.modalLine}>Ees ja perenimi: {name}</Text>
                <Text style={styles.modalLine}>E-mail:{email}</Text>
                <Text style={styles.modalLine}>Telefoni nr:{phone}</Text>
                <Text style={styles.modalLine}>Auto number:{carNumber}</Text>
              </View>
            </View>
            </Modal>
            
            <ImageBackground source={require('../assets/salong.jpeg')} style={{width: '100%', height: '100%', opacity:0.9}}>
            <View style={{flex: 0.5, }}></View>
            <View style={{flex: 1.3}}>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('WorkKind')}>
                    <Image style={{width:20, height:20, marginTop:0, marginLeft:15,resizeMode:'contain'}} source={require('../assets/arrow-left.png')} ></Image>
                </TouchableOpacity>
                <View style={{flex:2, flexDirection: 'row', alignSelf:'flex-end', justifyContent:'flex-end',}}>
                    <TouchableOpacity
                        onPress={() => {
                            this.setModalVisible(true);
                        }}>
                        <Image source={require('../assets/mati.png')} style={{height:35,width:35, top: 0, position:'absolute',right:80, bottom:20}}></Image>
                        <Text style={{color:'white',fontSize:16, top:10,  bottom:20, marginRight:15}}>
                            {user}
                        </Text>
                    </TouchableOpacity>
                 </View>
            </View>
            <View style={{flex:1}}>
                <Text style={styles.title}>SALONGI PUHASTUS</Text>
                <View style={{width:200, marginTop:10,borderBottomColor:'white', borderBottomWidth:1,alignSelf: 'center'}}></View>
            </View>
            <View style={{flex:5}}>
                    <ScrollView>
                        <View style={{width:300, justifyContent:'center', alignSelf:'center'}}>
                            <Text style={{color:'white',fontSize:18,fontWeight:'300', justifyContent:'center',  alignSelf:'center',}}>Palun vali sobiv esindus</Text>
                            <Text style={{color:'white', fontSize:17, alignSelf:'center'}}>Teie poolt valitud esindus on { this.state.pickerSelection }</Text>
                        </View>  

                        <View style={{marginTop:60, textShadowColor: 'black', backgroundColor:'gray'}}>
                            <Picker
                                selectedValue={this.state.pickerSelection}
                                itemStyle={{ color: "white", fontSize:22 }}
                                onValueChange={(itemValue) =>
                                this.setState({pickerSelection: itemValue})
                                }
                            >
                            <Picker.Item label="-"/>
                            <Picker.Item label="Tallinn" value="Tallinn" />
                            <Picker.Item label="Pärnu" value="Pärnu" />
                            <Picker.Item label="Tartu" value="Tartu"/>
                            </Picker>
                        </View>

                        <View style={{flex:1, justifyContent:'center', alignSelf:'center',}}>
                            <Image style={{width:50, marginTop:80, height:50}} source={require('../assets/downarrow.png')}/>
                        </View>

                        <View style={{width:300, justifyContent:'center',alignSelf:'center',marginTop:50,}}>
                        <Text style={{color:'white',fontSize:18,fontWeight:'300', alignSelf:'center',  textShadowColor: 'black',textShadowOffset: { width: 1, height: 4 },textShadowRadius: 5}}>
                            Palun vali sobiv kuupäev ja kellaaeg hoolduseks</Text>
                        </View>

                        <View style={{marginTop:60, backgroundColor:'gray'}}>
                            <DatePickerIOS
                                date={this.state.chosenDate}
                                onDateChange={this.setDate}
                                minuteInterval={30}
                                locale="est"
                                format="DD-MM-YYYY"
                            />
                         </View>

                        <View style={{flex:1, justifyContent:'center', alignSelf:'center',}}>
                            <Image style={{width:50, marginTop:30, height:50}} source={require('../assets/downarrow.png')}/>
                        </View>

                        <Text style={{color:'white',fontSize:18,fontWeight:'300', justifyContent:'center',marginTop:50, alignSelf:'center',  textShadowColor: 'black',
                        textShadowOffset: { width: 1, height: 4 },
                        textShadowRadius: 5}}>Lisa soovi korral kommentaar</Text>

                        <TextInput
                            style={styles.textIn}
                            onChangeText={(comment) => this.setState({comment})}
                            value={this.state.comment}
                            multiline={true}
                        />
                    </ScrollView>
                </View>
            <View style={{flex:2, opacity:1,}}>
                <TouchableOpacity 
                    style={styles.button} 
                    onPress = { this.saveData }
                >
                    <Text 
                    style={styles.font}>Broneeri</Text>
                </TouchableOpacity>
            </View>
            </ImageBackground>
        </View>
    );
  }
}

const styles = StyleSheet.create({

textIn:{
    height: 150,
    shadowColor: 'white',
    width:300,
    backgroundColor:'#f2f2f2',
    alignSelf:'center',
    color:'black',
    borderRadius:2,
    borderColor: 'white',
    borderWidth: 1,
    marginTop:20,
    fontSize:15,
},
button:{
    borderWidth: 1,
    borderColor: 'white',
    alignItems: 'center',
    padding:15,
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 100 / 2,
    marginTop:50,
    width: 90,
    height: 90,
    backgroundColor:'#A0A0A0'
},
font:{
    color:'white',
    fontSize:14,
    fontWeight: '400',
    alignSelf: 'center'
    },
title:{
    color:'white',
    fontSize:22,
    alignSelf:'center',
    fontWeight:'300',
    marginTop:5
},
modalLine:{
    marginTop:14,
    marginLeft:30,
    fontSize:16,
    color:'white'
},
backImg:{
    flex:1,
    resizeMode: 'contain',
    justifyContent: 'center',
    alignItems: 'center',
    opacity:0.9
}
});
