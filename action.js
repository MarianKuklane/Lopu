const KASI_DATA_PICKER = 'HAND_DATA_PICKER';
const KERE_DATA_PICKER = 'KERE_DATA_PICKER';
const HOOLDUS_DATA_PICKER = 'HOOLDUS_DATA_PICKER';
const OIL_DATA_PICKER = 'OIL_DATA_PICKER';
const SALONG_DATA_PICKER = 'SALONG_DATA_PICKER';
const TIRE_DATA_PICKER = 'TIRE_DATA_PICKER';
const ADD_PLACE = 'ADD_PLACE';


// This is an action creator, it's simply specifies the action
// this is what we call to send an action
export function addPlace(data){
  return {
    type: ADD_PLACE,
    data
  }
}

export function kasiDataPicker(text) {
    console.log(text);
    return {
      type: KASI_DATA_PICKER,
      text
    };
  }
  
  export function kereDataPicker(text) {
    console.log(data);
    return {
      type: KERE_DATA_PICKER,
      text
    };
  }
  
  export function hooldusDataPicker(text) {
    console.log(data);
    return {
        type: HOOLDUS_DATA_PICKER,
        text
    };
  }
  
  export function oilDataPicker(text) {
    console.log(data);
    return {
      type: OIL_DATA_PICKER,
      text
    };
  }
  
  export function salongDataPicker(text) {
    console.log(data);
    return {
      type: SALONG_DATA_PICKER,
      text
    };
  }
  
  export function tireDataPicker(text) {
    console.log(data);
    return {
      type: TIRE_DATA_PICKER,
      text
    };
  }
