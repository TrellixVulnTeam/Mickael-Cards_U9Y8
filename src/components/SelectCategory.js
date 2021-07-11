import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchUserCategories, createTransactionCategory, editTransactionCategory, setFilter } from '../actions';
import Select from 'react-select/creatable';


const SelectCategory = ({loading, 
  fetchUserCategories, 
  createTransactionCategory, 
  editTransactionCategory,
  categories,
  setFilter, 
  select }) => {

  // const [value, setValue] = useState("")

  useEffect(() => {
    fetchUserCategories()
  }, []) 


  let selectorOptions = [];
  let options = categories.map( c => {
    return {
      label:c.name,
      value:c.name
    }
  })
    selectorOptions = [{label:"All",value:'all'},  ...options];


  const onCreate = (value) => {
    console.log('create ', value)
    if (value != "") {
      console.log('create')
      createTransactionCategory(value)
    }
}


const onChange = (value) => {
  console.log('value value ', value)
  setFilter(value.value)
}


return !categories.length 
? <h2>Loading</h2>
:

  <div>
    <Select
            defaultValue={selectorOptions[0]}
            onChange={onChange}
            options={selectorOptions}
            className="select"
          />
  </div>

}

const mapStateToProps = (state) => {
  return {
    categories: state.categories.categories,
    loading: state.categories.loading,
    select: state.select
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUserCategories: () => dispatch(fetchUserCategories()),
    createTransactionCategory: (category) => dispatch(createTransactionCategory(category)),
    editTransactionCategory: (category) => dispatch(editTransactionCategory(category)),
    setFilter: (filter) => dispatch(setFilter(filter))
  }
}
export default connect(mapStateToProps, mapDispatchToProps) (SelectCategory);