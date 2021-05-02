import { combineReducers } from "redux";

const image = (state = [], action) => {
  switch (action.type) {
    case "SET_IMG":
      return action.image;
    default:
      return state;
  }
};

const augImage = (state = '', action) => {
  switch (action.type) {
    case "SET_AUG_IMG":
      return action.image;
    default:
      return state;
  }
};

const inputs = (state = {
    resizeW: '',
    resizeH: '',
    rotateD: '',
    rotateM: 'constant',
    rotateR: false,
    cropH: '',
    cropW: '',
    cropX: '',
    cropY: '',
    img: ''
  }, action) => {
  switch (action.type) {
    case "HANDLE_INPUT":
      return { ...state, [action.data.name]: action.data.value};
    default:
      return state;
  }
};

const options = (state = {
    checkedNegative: false,
    checkedCompress: false,
    checkedResize: false,
    checkedRotate: false,
    checkedCrop: false,
  }, action) => {
  switch (action.type) {
    case "HANDLE_OPTION":
      return { ...state, [action.data.name]: action.data.checked};
    default:
      return state;
  }
};

const order = (state = [], action) => {
  switch (action.type) {
    case "HANDLE_ORDER":
      console.log(state);
      console.log(action.data);
      return action.data
    case "CLEAR_ORDER":
      console.log(state);
      return [];
    case "ADD_ORDER":
      return [...state, action.data];
    case "DEL_ORDER":
      return state.filter(item => (item === action.data) ? false : true);
    default:
      return state;
  }
}

export default combineReducers({image, inputs, options, order, augImage});
