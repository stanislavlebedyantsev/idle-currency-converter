import {INIT_CHARTS_DATA, SELECT_CHART} from '@actions/chartsActionCreators'
const initState = {
  rates: [],
  selectedCurrency: []
}

const chartsReducer = (state = initState, action) => {
  let copyState = state
  switch(action.type){
    case INIT_CHARTS_DATA:{
      return {...state, rates: [...action.payload], }
    }
    case SELECT_CHART:{
      return {...copyState, selectedCurrency: [...copyState.selectedCurrency, action.payload]}
    }
    default:
      return copyState;
  }
}

export default chartsReducer;