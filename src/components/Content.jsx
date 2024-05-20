import React from 'react'
import AccordionList from './Bookings/AccordionList'
import BookingsToolbar from './Bookings/BookingsToolBar'

const Content = () => {
  return (
    <div>
        <BookingsToolbar/>
        <AccordionList/>
    </div>
  )
}

export default Content