import React, { useState, useCallback, Fragment } from "react";
import PropTypes from "prop-types";
import {
  TextField,
  Button,
  withStyles,
} from "@material-ui/core";
import moment from 'moment';
import FormDialog from "../../shared/components/FormDialog";
import ButtonCircularProgress from "../../shared/components/ButtonCircularProgress";
import axios from 'axios';

const styles = (theme) => ({
  link: {
    transition: theme.transitions.create(["background-color"], {
      duration: theme.transitions.duration.complex,
      easing: theme.transitions.easing.easeInOut,
    }),
    cursor: "pointer",
    color: theme.palette.primary.main,
    "&:enabled:hover": {
      color: theme.palette.primary.dark,
    },
    "&:enabled:focus": {
      color: theme.palette.primary.dark,
    },
  },
});

function RegisterDialog(props) {
  const postData = Object.freeze({
    title: "",
    date: "",
    content: ""
  });
  const { setStatus, onClose} = props;
  const [isLoading, setIsLoading] = useState(false);
  const [formData, updateFormData] = React.useState(postData);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    updateFormData({
      ...formData,
      [name]: value,
    });
  };
  const register = useCallback((formData) => {

    axios.post(`${process.env.REACT_APP_SERVICE_BASE_URL}/blog/create`, {
      content: formData.content,
      date: moment(formData.date).unix(),
      title: formData.title
    })
    .then(function (response) {
      alert("Your Blog has been successfully Posted");
      setTimeout(() => {
        window.location.pathname = `/blog/${response.data.data._id}`
      }, 1000)
    })


    setStatus(null);
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, [
    setIsLoading,
    setStatus,
  ]);


  return (
    <FormDialog
      loading={isLoading}
      onClose={onClose}
      open
      headline="New Post"
      onFormSubmit={(e) => {
        e.preventDefault();
        register(formData);
      }}
      hideBackdrop
      hasCloseIcon
      content={
        <Fragment>
          
          <TextField
            variant="outlined"
            margin="normal"
            name="title"
            value={formData.title}
            required
            fullWidth
            label="Title"
            autoFocus
            autoComplete="off"
            onChange={handleInputChange}
          />

          <TextField
            variant="outlined"
            fullWidth
            name="date"
            label="Date"
            type="date"
            sx={{ width: 220 }}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={handleInputChange}
          />

          <TextField
            label="Content"
            margin="normal"
            name="content"
            required
            fullWidth
            multiline
            maxRows={25}
            onChange={handleInputChange}
            variant="outlined"
          />
          
        </Fragment>
      }
      actions={
        <Button
          type="submit"
          fullWidth
          variant="contained"
          size="large"
          color="secondary"
          disabled={isLoading}
        >
          Create
          {isLoading && <ButtonCircularProgress />}
        </Button>
      }
    />
  );
}

RegisterDialog.propTypes = {
  theme: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  openTermsDialog: PropTypes.func.isRequired,
  status: PropTypes.string,
  setStatus: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(RegisterDialog);
