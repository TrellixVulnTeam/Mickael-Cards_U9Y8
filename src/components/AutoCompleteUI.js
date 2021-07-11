import React, { useState, useEffect } from 'react';
import { AutoComplete } from 'antd';

const AutoCompleteUI = () => {

    const [categories, setCategories] = useState([])

    useEffect(() => {
        fetch('https://2eh1oighrk.execute-api.eu-west-1.amazonaws.com/dev/categories')
          .then(response => response.json())
          .then(data => { setCategories(data) });
    
        // console.log(count)
      }, []) // if you add count, only run if count changes.

      const filterOption = (inputValue, option) => {

        console.log('option ', option)
          return option.name.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
      }
      
      const Complete = () => (
        <AutoComplete
          style={{
            width: 200,
          }}
          options={categories}
          placeholder="try to type `b`"
          filterOption={filterOption}
        />
      );

      console.log('CATEGORIES  ', categories)
      
      return !categories.length 
        ?<h1>Loading</h1> 
        :<Complete />
}
export default AutoCompleteUI;