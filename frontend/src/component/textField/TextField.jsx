import React from 'react'
import styles from './textField.module.css'

function TextField(props) {
  return (
    
         <div className={styles.textInputWrapper}>
      <input {...props} />
      {props.error && (
        <p className={styles.errorMessage}>{props.errormessage}</p>
      )}
    </div>
  )
}

export default TextField