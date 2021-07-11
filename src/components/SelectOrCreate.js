import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchUserCategories, createTransactionCategory, editTransactionCategory, setSelectValue} from '../actions';
import CreatableSelect from 'react-select/creatable';
import { Button, Select } from 'antd';

const { Option } = Select;

const SelectOrCreate = ({loading, 
  fetchUserCategories, 
  createTransactionCategory, 
  editTransactionCategory,
  categories,
  setSelectValue,
  value, 
  select }) => {

  

  useEffect(() => {
    fetchUserCategories()
  }, [value]) 


  let selectorOptions = categories.map( c => {
    return {
      label:c.name,
      value:c.name
    }
  })


  const onCreate = (value) => {
    console.log('create ', value)
    if (value != "") {
      console.log('create')
      createTransactionCategory(value)
    }
}
function search(nameKey, myArray){
  for (var i=0; i < myArray.length; i++) {
      if (myArray[i].value.trim() === nameKey.trim()) {
          return myArray[i];
      }
  }
}
const defaultValue = () => {
  if(select && select.transaction_details.category){
    return search(select && select.transaction_details.category, selectorOptions.length > 0 && selectorOptions)
  }
  return value
}

const onSubmitTag = (value) => {
  console.log('value value ', value)
  setSelectValue(value)
  editTransactionCategory(value.value)
}


return !categories.length 
? <h2>Loading</h2>
:

  <div>
    <CreatableSelect
            onChange={onSubmitTag}
            value={defaultValue()}
            options={selectorOptions}
            className="select"
            onCreateOption={onCreate}
            isLoading={loading}
            isDisabled={loading}
          />
  </div>

}

const mapStateToProps = (state) => {
  return {
    categories: state.categories.categories,
    loading: state.categories.loading,
    select: state.select,
    value: state.categories.value
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUserCategories: () => dispatch(fetchUserCategories()),
    createTransactionCategory: (category) => dispatch(createTransactionCategory(category)),
    editTransactionCategory: (category) => dispatch(editTransactionCategory(category)),
    setSelectValue: (value) => dispatch(setSelectValue(value))
  }
}
export default connect(mapStateToProps, mapDispatchToProps) (SelectOrCreate);