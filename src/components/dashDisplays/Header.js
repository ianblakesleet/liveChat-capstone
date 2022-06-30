import React from 'react'
import styles from './Header.module.css'
import Navbar from './Navbar'
import logo from '../../logo.png'

const Header = () => {
	return (
		<header>
			<div className={styles.logo}>
				<img src={logo} alt="" />
			</div>
			<Navbar />
		</header>
	)
}

export default Header
