import React from 'react';
import classes from './Input.module.css';

// Чтобы использовать ref в кастомном компоненте Input,
// мы должно передать в нативный input данный ref через
// forwardRef
const Input = React.forwardRef((props, ref) => {
	return (
			<div className={classes.input}>
				<label htmlFor={props.input.id}>{props.label}</label>
					<input ref={ref} {...props.input}/>
			</div>
	);
});

export default Input;