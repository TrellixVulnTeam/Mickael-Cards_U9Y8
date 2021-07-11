export default (state = {}, action) => {
    switch (action.type) {
      case 'SELECT_TRANSACTION':
        return action.payload;
      default:
        return state
    }
  };