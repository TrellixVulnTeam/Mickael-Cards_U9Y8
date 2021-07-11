export const fetchUserTransactions = () => async (dispatch) => {
    const response = await fetch('https://tofhpead19.execute-api.eu-west-1.amazonaws.com/dev/transactions')
    const transactions = await response.json()
    console.log('FETCH TRANSACTIONS ', transactions)
    dispatch({type:'FETCH_TRANSACTIONS', payload: transactions})
}

export const fetchUserCategories = () => async (dispatch) => {
    const response = await fetch('https://tofhpead19.execute-api.eu-west-1.amazonaws.com/dev/categories')
    const categories = await response.json()
    dispatch({type:'FETCH_CATEGORIES', payload: categories})
}

export const createTransactionCategory = (category) => async (dispatch) => {
    console.log('CREATE TRANSACTION ACTION')
    dispatch({type:'CREATE_CATEGORY_LOADING_START'})
    const response = await fetch(`https://tofhpead19.execute-api.eu-west-1.amazonaws.com/dev/categories`, {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ "category": category })
                    })
    dispatch(fetchUserCategories())
    dispatch({type:'CREATE_CATEGORY_LOADING_END'})
}

export const editTransactionCategory = (category) => async (dispatch, getState) => {
    const {select} = getState()
    console.log('select ', select)
    const response = await fetch(`https://tofhpead19.execute-api.eu-west-1.amazonaws.com/dev/transactions/${select.transaction_details.uuid}`, {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body:JSON.stringify({"category":category})
      })

      dispatch(fetchUserTransactions())
      dispatch(closeModal())
      dispatch(setSelectValue(""))

}

export const setFilter = (filter) => ({type:'SET_FILTER', payload: filter})
export const setSelectValue = (value) => {
    console.log('select select')
    return {type:'SET_SELECT_VALUE', payload: value}
}
export const setTotal = (total) => ({type:'SET_TOTAL', payload: total})
export const selectTransaction = (transaction) => ({type:'SELECT_TRANSACTION', payload: transaction})
export const openModal = () =>  ({type: 'OPEN_MODAL'})

export const closeModal = () =>  ({type: 'CLOSE_MODAL'})