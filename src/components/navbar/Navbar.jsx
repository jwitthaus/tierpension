import React, {useState} from 'react'
import styles from './Navbar.module.css'
import { AiOutlineMenu, AiOutlineClose, AiOutlineBook, AiOutlineCalendar, AiOutlineCreditCard } from 'react-icons/ai'


const Navbar = () => {
    const [nav, setNav] = useState(false)
    return (
        <header className={styles.navbar}>
            <nav>
                <ul className={nav ? [styles.menu, styles.active].join(' ') : [styles.menu]}>
                    <li>
                        <a href='/'><AiOutlineBook size={nav ? 20 : 16}/>Bookings</a>
                    </li>
                    <li>
                        <a href='/'><AiOutlineCalendar size={nav ? 20 : 16} />Calendar</a>
                    </li>
                    <li>
                        <a href='/'><AiOutlineCreditCard size={nav ? 20 : 16} /> Billing</a>
                    </li>
                </ul>
            </nav>
            <div onClick={()=> setNav(!nav)} className={styles.mobile_btn}>
                {nav ? <AiOutlineClose size={16} /> : <AiOutlineMenu size={16}/>}
                
                
            </div>
        </header>
    )
}

export default Navbar