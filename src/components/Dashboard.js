import React, {useEffect} from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { fetchUserTransactions, openModal, selectTransaction, fetchUserCategories } from '../actions';
import { Doughnut } from 'react-chartjs-2';
import ListUI from './ListUI';
import './Analytics.css'

const Dashboard = ({fetchUserTransactions, transactions, total}) => {

  let tr_categories = transactions.map(c => c.transaction_details.category);

  let uniq_categories = [...new Set(tr_categories)];

    useEffect(() => {
        fetchUserTransactions()
      }, []) 

      let labels = uniq_categories.map( c => c)

      console.log('total ', total)

      var totals = total && Object.keys(total).map((key) => total[key]);

      console.log('totals ', totals)


    const chart_options = {
      plugins:{
        legend:{
          display: true,
          position: "right",
          fullSize: true,
          maxWidth: 250,
          labels:{
            padding: 10,
            font:{
              size:22
            }
          }
        }
      }
    }
    const data = {
        labels: labels,
        datasets: [{
          label: 'My First Dataset',
          data: totals,
          backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(255, 205, 86)',
            'rgb(103, 58, 183)',
            'rgb(118, 255, 3)'
          ],
          hoverOffset: 4
        }]
      };

      let dates = transactions.map( c => {
        return {
          date:c.transaction_details.date
        }
      })
      
    return(
        <div className='dashboard-root'>
            <div className='left'>
                <div className='user'><h1>Hey Mickael</h1></div>
                <div><p>Welcome to your wallet dashboard</p></div>

                <div>
                    <div style={{fontSize:"24px", fontWeight:"bold"}}>Your Wallet</div>
                    <div className='card'>
                        <img alt="card" src={process.env.PUBLIC_URL + '/card.png'}/> 
                    </div>
                </div>
                <div>
                <div style={{fontSize:"24px", fontWeight:"bold"}}>Recent transactions</div>
                    <ListUI/>
                </div>
            </div>
            <div className='right'>
            <div style={{fontSize:"24px", fontWeight:"bold"}}>Expenses</div>
                <div className='chart'>
                   <Doughnut options={chart_options} data={data}/>
                </div>
            </div>
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
      openModal: () => dispatch(openModal()),
  
    }
  }
  export default connect(mapStateToProps, mapDispatchToProps) (Dashboard);