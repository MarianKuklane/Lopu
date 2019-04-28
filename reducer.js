import { 
    KASI_DATA_PICKER,
    KERE_DATA_PICKER,
    HOOLDUS_DATA_PICKER,
    OIL_DATA_PICKER,
    SALONG_DATA_PICKER,
    TIRE_DATA_PICKER,
    ADD_PLACE
 } 
from './action';


const initialState = {
    place:[],
};


// This is a reducer which listens to action and modifies the state
const reducer = (state = initialState, action) => {
    switch (action.type) {
    case ADD_PLACE: {
        console.log([...state.place, action.data]);
        return {
            place: [...state.place, action.data],
        };
    }
    /*  case KASI_DATA_PICKER: {
        return {
            place: [...state.place, action.text],
        };
      }
      case KERE_DATA_PICKER:
        return {
            place: [...state.place, action.text]
        };
      case HOOLDUS_DATA_PICKER:
        return {
            place: [...state.place, action.text]
        };
      case OIL_DATA_PICKER:
        return {
            place: [...state.place, action.text]
        };
      case SALONG_DATA_PICKER:
        return {
            place: [...state.place, action.text]
        };
      case TIRE_DATA_PICKER:
        return {
            place: [...state.place, action.text]
        };*/
      default:
        return state;
    }
};
  
  export default reducer;