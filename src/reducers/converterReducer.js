import {
  GET_DATA,
  UPLOAD_DATA_TO_CACHE,
  UPDATE_INPUTED_DATA,
  ADD_SELECT_VALUE,
} from "@constants/actions";

const initState = {
  availableCurrs: new Set(),
  inputedValues: [],
  error: '',
};

const converterReducer = (state = initState, action) => {
  let copyState = { ...state };
  switch (action.type) {
    case GET_DATA: {
      copyState = { ...copyState, rate: { ...action.payload } };
      if (!localStorage.length) {
        copyState.inputedValues.push({
          currency: copyState.rate.base,
          value: 1,
        });
        copyState.inputedValues.push({
          currency: "USD",
          value: copyState.inputedValues[0].value * copyState.rate.rates["USD"],
        });
      } else {
        copyState.inputedValues = JSON.parse(
          localStorage.getItem("inputedValues")
        );
      }
      for (let key in copyState.rate.rates) {
        if (!copyState.inputedValues.find((el) => el.currency === key)) {
          copyState.availableCurrs.add(key);
        }
      }
      copyState.allCurrs = new Set(Object.keys(copyState.rate.rates))
      console.log(copyState);
      return copyState;
    }
    case ADD_SELECT_VALUE: {
      const { base, rates } = copyState.rate;
      copyState.availableCurrs.delete(action.payload);
      copyState.inputedValues.push({
        currency: action.payload,
        value: copyState.inputedValues.reduce((acc, el) => {
          if (el.currency === base) {
            acc = Math.ceil(el.value * rates[action.payload] * 100) / 100;
          }
          return acc;
        }, 0),
      });
      return copyState;
    }
    case UPLOAD_DATA_TO_CACHE: {
      return copyState;
    }
    case UPDATE_INPUTED_DATA: {
      const { currency, value } = action.payload;
      const { rates, base } = copyState.rate;
      copyState.inputedValues = copyState.inputedValues.reduce((acc, el) => {
        if (el.currency === currency) {
          el = action.payload;
        } else if (el.currency !== currency && currency !== base) {
          el.value =
            Math.ceil(
              (value / rates[currency]) * (rates[el.currency] || 1) * 100
            ) / 100;
        } else if (el.currency !== currency && currency === base) {
          el.value = Math.ceil(value * rates[el.currency] * 100) / 100;
        }

        acc.push(el);
        return acc;
      }, []);

      return copyState;
    }
    default:
      return state;
  }
};

export default converterReducer;
