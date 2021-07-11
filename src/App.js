import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import logo from './logo.svg';
import './App.css';
import { fetchUserTransactions } from './actions';
import Container from '@material-ui/core/Container';
import Scroll from './components/Scroll';
import ListUI from './components/ListUI';
import TableUI from './components/TableUI';
import EditableTableUI from './components/EditableTableUI';
import CardUI from './components/CardUI';
import LayoutUI from './containers/LayoutUI';


function App({fetchUserTransactions, transactions}) {

  
  
  

  useEffect(() => {
    fetchUserTransactions();
  }, []) 




 return(
    <div className="root">
      {/* <div className="header">
      <h1>TRANSACTIONS</h1>
      </div>
      <ListUI/>
      <div className="header">
      <h1>ANALYTICS</h1>
      </div>
      <CardUI title={"Total"}/> */}
      <LayoutUI/>
    </div>
 )
}

const mapStateToProps = (state) => {
  return {
    transactions: state.transactions
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUserTransactions: () => dispatch(fetchUserTransactions())
  }
}

export default connect(mapStateToProps, mapDispatchToProps) (App);
