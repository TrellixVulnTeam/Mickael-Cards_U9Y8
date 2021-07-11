import React, { useState, useEffect } from 'react';
import { Popover, Button } from 'antd';
import SelectUI from './SelectOrCreate';
import CardUI from './CardUI';

const PopoverUI = ({children ,reload, selected, reloadModal}) => {

  const [categories, setCategories] = useState([])
  const [newCategory, setNewCategory] = useState(null)
  const [visible, setVisible] = useState(false)


  useEffect(() => {
    fetch('https://2eh1oighrk.execute-api.eu-west-1.amazonaws.com/dev/categories')
      .then(response => response.json())
      .then(data => { setCategories(data) });

    // console.log(count)
  }, []) // if you add count, only run if count changes.

  const onSubmitTag = (value) => {
    fetch(`https://2eh1oighrk.execute-api.eu-west-1.amazonaws.com/dev/transactions/${selected.transaction_details.uuid}`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body:JSON.stringify({"category":value})
    })
    .then(response => response.json())
    .then(data => { 
      reload() 
      // closeModal()
      setVisible(false)
      reloadModal(value);
      
    });
  }

  const onSelect = (value) => {
      console.log('value ', value)
      onSubmitTag(value)
  }

    const text = <span>Title</span>;
    const content = (
    <div>
       <CardUI title={"Edit Category"} onSelect={(v) => onSelect(v)} >
           
       </CardUI>
    </div>
    );

    const buttonWidth = 70;

    return(
        <Popover visible={visible} placement="right" content={content} trigger="click">
            <a onClick={() => setVisible(true)}>{children}</a>
        </Popover>
        
    );
}

export default PopoverUI