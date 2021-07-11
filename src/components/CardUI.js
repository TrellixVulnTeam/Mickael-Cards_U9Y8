import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Card } from 'antd';
import { Button, Select, } from 'antd';
import CreatableSelect from 'react-select/creatable';
import SelectCategory from './SelectCategory';
import './card.css'


const CardUI = ({children, title, total }) => {




  const extra = () => {
    return (
      <div className="row">
        <SelectCategory />
      </div>
    )
    


  }
  return (
    <>
      <Card title={title} extra={extra()} style={{ width: 500 }}>
         <h1>{total}  ₪</h1>
      </Card>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    total: state.transactions.total
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
 
  }
}
export default connect(mapStateToProps, mapDispatchToProps) (CardUI);