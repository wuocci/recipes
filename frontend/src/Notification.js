import React, {useState} from 'react'
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';

const Notification = ({errorMessage, type, showNotification, setNotification}) => {
    const handleClose = () => {
        setNotification(!showNotification)
    }

    return (
        <div className="notification-banner">
            <Snackbar open={showNotification} onClose={handleClose} autoHideDuration={6000} anchorOrigin={{vertical: 'top', horizontal: 'center'}}>
                <Alert variant="outlined" severity={type}>
                    {errorMessage}
                </Alert>
            </Snackbar>
        </div>
    )
}

export default Notification