import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";

const Notification = ({ message, type, showNotification, setNotification }) => {
  const handleClose = () => {
    setNotification(!showNotification);
  };

  return (
    <div className="notification-banner">
      <Snackbar
        open={showNotification}
        onClose={handleClose}
        autoHideDuration={6000}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert variant="outlined" severity={type}>
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
};
/** CODE FOR ADDING THE NOTIFICATION
 *  return (
        <Notification
          showNotification={showNotification}
          setNotification={setNotification}
          message="Recipe successfully deleted!"
          type="success"
        />
      );
 */

export default Notification;
