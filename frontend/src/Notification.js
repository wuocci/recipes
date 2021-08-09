import React from 'react'
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';

const Notification = ({errorMessage, type, showError}) => {
    const handleClose = () => {
        showError.current = false
    }

    return (
        <div className="notification-banner">
            <Snackbar open={showError.current} onClose={handleClose} autoHideDuration={600} anchorOrigin={{vertical: 'top', horizontal: 'center'}}>
                <Alert variant="outlined" severity={type}>
                    {errorMessage}
                </Alert>
            </Snackbar>
        </div>
    )
}

export default Notification