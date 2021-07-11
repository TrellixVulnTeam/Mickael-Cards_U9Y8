const initialState = {
    categories: [],
    loading: false,
    value:""
  }

export default (state = initialState, action) => {
    switch (action.type) {
      case 'FETCH_CATEGORIES':
        return {...state, categories: action.payload};
      case 'CREATE_CATEGORY_LOADING_START':
        return {...state, loading: true};
      case 'CREATE_CATEGORY_LOADING_END':
        return {...state, loading: false};
      case 'SET_SELECT_VALUE':
        return {...state, value: action.payload};
      default:
        return state;
    }
  };