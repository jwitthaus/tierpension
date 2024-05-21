import React, { Fragment } from 'react'
import BookingsToolbar from './BookingsToolBar'
import Timeline from './Timeline/Timeline'
import Capacity from './Capacity/Capacity'
import CustomerList from './CustomerList/CustomerList'
import styles from './Bookings.module.css'

const Bookings = () => {
  return (
    <Fragment>
        <BookingsToolbar/>
        <div className={styles.bookings}>
            <CustomerList/>
            <Timeline/>
        </div>
        <Capacity/>
    </Fragment>
  )
}

export default Bookings