import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { closeModal } from '../actions';
import { Modal, Select } from 'antd';
import PopoverUI from './PopoverUI';
import SelectOrCreate from './SelectOrCreate';

const { Option } = Select;

const ModalUI = ({ select, modal, closeModal }) => {

  return (
    <Modal title={"Transaction details"} visible={modal} onOk={closeModal} onCancel={closeModal}>
    {select.transaction_details
      ? <div className='modal'>
        <div className='row'>     
          <div>Transaction ID: </div>
          <div>{select.transaction_details.uuid}</div>
        </div>
        <div className='row'>
          <div>Vendor: </div>
          <div>{select.transaction_details.vendor}</div>
        </div>
        <div className='row'>
          <div>Category:</div>
          <SelectOrCreate/>
        </div>
        <div className='row'>
          <div>Total:</div>
          <div>{select.transaction_details.total}</div>
        </div>
      </div>
      : <div></div>
    }
  </Modal>
  )
}

const mapStateToProps = (state) => {
  return {
    modal: state.modal.open,
    select: state.select
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    closeModal: () => dispatch(closeModal())
  }
}
export default connect(mapStateToProps, mapDispatchToProps) (ModalUI);
