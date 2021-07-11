import React, { useContext, useState, useEffect, useRef } from 'react';
import moment from 'moment'
import { connect } from 'react-redux';
import { Table, Input, Button, Popconfirm, Form, Modal } from 'antd';
import { fetchUserTransactions, openModal, selectTransaction, fetchUserCategories, setTotal } from '../actions';
import ModalUI from './ModalUI';
import EditableForm from './EditableForm';


const TableUI = ({fetchUserTransactions, transactions, openModal, selectTransaction, fetchUserCategories, categories, setTotal, total}) => {

  const calcul = () => {
    let total = {} ;
    uniq_categories.forEach((category) => {
      let calcul = 0;
      const filtered = transactions.filter(transaction =>{
        console.log('transactions ', transactions)
        console.log('transaction tr tr ', transaction.transaction_details.category)
        return transaction.transaction_details.category.includes(category.trim());
      })
      filtered.forEach(tr => {
        calcul += tr.transaction_details.total
      })
      total[category] = calcul
      console.log('total ', calcul)

    })
    return total
    
  }
  useEffect(() => {
    fetchUserTransactions()
    fetchUserCategories()
    setTotal(calcul())

  }, []) 

  let options = categories.map( c => {
    return {
      text:c.name,
      value:c.name
    }
  })

  const onRowClick = record => {
    console.log('SELECT')
    selectTransaction(record)
    openModal()
  }

  let tr_categories = transactions.map(c => c.transaction_details.category);

  let uniq_categories = [...new Set(tr_categories)];
 


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

  const columns = [
    {
      key:"0",
      title: 'Vendor',
      dataIndex: ['transaction_details', 'vendor'],
      render: text => <h2>{text}</h2>
    },
    {
      key:"1",
      title: 'Category',
      dataIndex: ['transaction_details', 'category'],
      filters: options,
      onFilter: (value, record) => record.transaction_details.category.trim().indexOf(value.trim()) === 0,
      render: text => <h2>{text}</h2>
    },
    {
      key:"2",
      title: 'Total',
      dataIndex: ['transaction_details', 'total'],
      render: text => <h2>{text} ₪</h2>
      
    },
    {
      key:"3",
      title: 'Date',
      dataIndex: ['transaction_details', 'date'],
      sorter: (a, b) => new Date(a.transaction_details.date) - new Date(b.transaction_details.date),
      render: text => <h2>{moment(text).calendar()}</h2>
      
    },
  ];

  

 
  
  return (
    <div>
      <ModalUI/>
      <Table 
      onRow={(record, rowIndex) => {
    return {
      onClick: event => onRowClick(record), // click row
      onDoubleClick: event => {}, // double click row
      onContextMenu: event => {}, // right button click row
      onMouseEnter: event => {}, // mouse enter row
      onMouseLeave: event => {}, // mouse leave row
    };
  }}
      columns={columns}  
      dataSource={transactions} 
      pagination={false} 
      scroll={{ y: 900 }} 
     
      />
    </div>
  )

}


const mapStateToProps = (state) => {
  return {
    transactions: state.transactions.transactions,
    categories: state.categories.categories,
    filter: state.transactions.filter,
    total: state.transactions.total
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUserTransactions: () => dispatch(fetchUserTransactions()),
    fetchUserCategories: () => dispatch(fetchUserCategories()),
    selectTransaction: (transaction) => dispatch(selectTransaction(transaction)),
    setTotal: (total) => dispatch(setTotal(total)),
    openModal: () => dispatch(openModal()),

  }
}
export default connect(mapStateToProps, mapDispatchToProps) (TableUI);