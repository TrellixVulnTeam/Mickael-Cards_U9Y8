import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchUserTransactions, openModal, selectTransaction, setTotal, setSelectValue } from '../actions';
import { List, message, Avatar, Spin, Modal, Select, Button } from 'antd';
import CreatableSelect from 'react-select/creatable';
import InfiniteScroll from 'react-infinite-scroller';
import EditableForm from './EditableForm';
import PopoverUI from './PopoverUI';
import ModalUI from './ModalUI';
import _ from 'lodash';
import './list.css'
import { ContactsOutlined } from '@material-ui/icons';

const { Option } = Select;

const fakeDataUrl = 'https://randomuser.me/api/?results=5&inc=name,gender,email,nat&noinfo';

const ListUI = ({ fetchUserTransactions, transactions, selectTransaction,  openModal, filter, setTotal, setSelectValue, data }) => {


  const [selectedItem, setSelectedItem] = useState(null);
  const [value, setValue] = useState(selectedItem && selectedItem.transaction_details.category)



  useEffect(() => {
    fetchUserTransactions()
  }, []) 

  console.log('filter ', filter)

  const filteredTransactions = _.slice(transactions, 0, 7);

  console.log('slice ', filteredTransactions)

  // const calcul = () => {
  //   if(value === 'all'){
  //     let calcul = 0;
  //     transactions.forEach(tr => {
  //     calcul += tr.transaction_details.total
  //     })
  //     console.log('ALL ALL ALL', calcul);
  //     setTotal(Number(calcul).toFixed(1));
  //   }
  //   else{
  //     let calcul = 0;
  //     filteredTransactions.forEach(tr => {
  //       calcul += tr.transaction_details.total
  //     })
  //     setTotal(Number(calcul).toFixed(1));
  //     console.log('TOTAL ', calcul)
  //   }
  // }

  // calcul()


  const onTransactionClick = (item) => {
    console.log('SELECT')
    selectTransaction(item)
    openModal()
  }

  return !transactions.length ?
    <div>Loading</div> 
    : (
    <div className="demo-infinite-container">
      <InfiniteScroll
        initialLoad={false}
        pageStart={0}
        useWindow={false}
        loadMore={() => console.log('load more')}
      >
        <ModalUI/>
        <List
          dataSource={filteredTransactions.slice(2)}
          renderItem={item => (
            <div data-tag="test">
              <List.Item data={item} key={item.transaction_details.id}>
                <List.Item.Meta
                  title={<a><h2 style={{ fontWeight:"bold"}}>{item.transaction_details.vendor}</h2></a>}/>
               
  
                <h2 style={{fontWeight:"bold"}}>{item.transaction_details.total} ₪</h2>


              </List.Item>
            </div>
          )}
        >
        </List>
      </InfiniteScroll>
    </div>
  );

}
const mapStateToProps = (state) => {
  return {
    transactions: state.transactions.transactions,
    filter: state.transactions.filter,
    total: state.transactions.total
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUserTransactions: () => dispatch(fetchUserTransactions()),
    selectTransaction: (transaction) => dispatch(selectTransaction(transaction)),
    openModal: () => dispatch(openModal()),
    setTotal: (total) => dispatch(setTotal(total)),
    setSelectValue: (value) => dispatch(setSelectValue(value))
  }
}
export default connect(mapStateToProps, mapDispatchToProps) (ListUI);
