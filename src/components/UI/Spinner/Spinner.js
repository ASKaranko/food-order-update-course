import React from 'react';
import classes from './Spinner.module.css';
import totoro from '../../../assets/totoro.gif';

const spinner = (props) => (
		<div className={classes.loader}>
			<img src={totoro} alt="spinner"/>
		</div>
);

export default spinner;