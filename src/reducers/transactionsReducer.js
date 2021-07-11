const initialState = {
  transactions: [],
  total: {},
  filter: ""
}
export default (state = initialState, action) => {
    switch (action.type) {
      case 'FETCH_TRANSACTIONS':
        return {...state, transactions: action.payload};
      case 'SET_FILTER':
        return {...state, filter: action.payload};
      case 'SET_TOTAL':
        return {...state, total: action.payload};
      default:
        return state;
    }
  };