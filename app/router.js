import {
    createStackNavigator,
    createAppContainer
} from 'react-navigation';
import homeView from './views/homeView';
import mainView from './views/mainView';
import workKindView from './views/workKindView';
import oilView from './views/oilView';
import kereView from './views/kereView';
import tireView from './views/tireView';
import hooldusView from './views/hooldusView';
import salongView from './views/salongView';
import käsiView from './views/käsiView';
import finalView from './views/finalView';
import userView from './views/userView';
import registerView from './views/registerView';


const AppNavigator = createStackNavigator({
  Home: {
    screen: homeView,
  },
  Main: {
    screen: mainView
  },
  Register:{
    screen: registerView
  },
  User:{
    screen: userView
  },
  WorkKind:{
    screen: workKindView
  },
  Oil:{
    screen: oilView
  },
  Kere:{
    screen: kereView
  },
  Käsi:{
    screen: käsiView
  },
  Tire:{
    screen:tireView
  },
  Hooldus:{
    screen:hooldusView
  },
  Salong:{
    screen: salongView
  },
  Final:{
    screen: finalView
  }
},
  {
    headerMode: 'none',
  },
);


const App = createAppContainer(AppNavigator);
export default App;