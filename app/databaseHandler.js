 export const saveData = () =>
 { 
  //this.handleDatePicked();
    console.warn("TP1");
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
    var workTitle = 'Rehvitoo';

    var currentTime = new Date()

    console.warn(time);
    console.warn(selYear);
    console.warn(selMonth);
    console.warn(selDay);
    console.warn(dbYear[1]);
    console.warn(dbMonth[1]);
    console.warn(dbDay[1]);

    for (i = 0; i < dbItemsCount; i++)
    {
        if ((selYear == dbYear[i]) && (selMonth == dbMonth[i]) && (selDay == dbDay[i]))
        {
            if (Math.abs(dbHours[i] - selHours) < 2)
            {
                invalidDatePicked = true;
                console.warn("Ajakonflikt");
                break;
            }
        }
    }

    if (this.state.chosenDate > time)
    {
        if ((selHours <= 16) && (selHours >= 8) && (selDayName != 'Sat') && (selDayName != 'Sun') && !invalidDatePicked)
        {
            console.warn(dbItemsCount);
            
        
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

                this.props.navigation.navigate('Main',
                {
                    placeOBJ:this.state.pickerSelection,
                    dateOBJ:this.state.chosenDate,
                    commentOBJ:this.state.comment,
                
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