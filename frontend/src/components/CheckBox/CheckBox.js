import React, { useState } from "react";
import {
  Box,
  Switch,
  TextField,
  FormControlLabel,
  FormGroup,
} from "@material-ui/core";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { blue } from "@material-ui/core/colors";
import { connect } from "react-redux";

const useStyles = makeStyles({
  checkBoxBox: {
    width: "100%",
    minHeight: "7vh",
    backgroundColor: blue[100],
  },
  formGroup: {
    width: "100%",
    height: "33.3%",
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  inputs: {
    width: "75px",
  },
});

const BlueSwitch = withStyles({
  switchBase: {
    color: blue[300],
    "&$checked": {
      color: blue[500],
    },
    "&$checked + $track": {
      backgroundColor: blue[500],
    },
  },
  checked: {},
  track: {},
})(Switch);

function CheckBox({ inputs, handleInputChange, options, handleChange, order, addOrder, delOrder }) {
  const classes = useStyles();

  //   const [state, setState] = useState({
  //     checkedNegative: false,
  //     checkedCompress: false,
  //     checkedResize: false,
  //     checkedRotate: false,
  //     checkedCrop: false,
  //   });

  //   const [inputState, setInputState] = useState({
  //     resizeW: '',
  //     resizeH: '',
  //     rotateD: '',
  //     cropH: '',
  //     cropW: '',
  //     cropX: '',
  //     cropY: '',
  //   });

  //   const handleInputChange = (event) => {
  //       setInputState({ ...inputState, [event.target.name]: event.target.value});
  //   }

  //   const handleChange = (event) => {
  //     setState({ ...state, [event.target.name]: event.target.checked });
  //   };

  return (
    <Box className={classes.checkBoxBox}>
      <FormGroup row className={classes.formGroup}>
        <FormControlLabel
          control={
            <BlueSwitch
              checked={options.checkedNegative}
              onChange={(e) => {
                handleChange(e.target.name, e.target.checked);
                (e.target.checked) ? addOrder('NEGATIVE') : delOrder('NEGATIVE');
              }}
              name="checkedNegative"
            />
          }
          label="Negative"
        />
        <FormControlLabel
          control={
            <BlueSwitch
              checked={options.checkedCompress}
              onChange={(e) => {
                handleChange(e.target.name, e.target.checked);
                (e.target.checked) ? addOrder('COMPRESS') : delOrder('COMPRESS');
              }}
              name="checkedCompress"
            />
          }
          label="Compress"
        />
        <Box>
          <FormControlLabel
            control={
              <BlueSwitch
                checked={options.checkedResize}
                onChange={(e) => {
                  handleChange(e.target.name, e.target.checked);
                  (e.target.checked) ? addOrder('RESIZE') : delOrder('RESIZE');
                }}
                name="checkedResize"
              />
            }
            label="Resize"
          />
          <TextField
            name="resizeH"
            value={inputs.resizeH}
            onChange={(e) => handleInputChange(e.target.name, e.target.value)}
            id="outlined-size-small"
            className={`input-checkedResize ${classes.inputs}`}
            label="Height"
            variant="outlined"
            size="small"
            disabled={!options.checkedResize ? true : false}
          />
          <TextField
            name="resizeW"
            value={inputs.resizeW}
            onChange={(e) => handleInputChange(e.target.name, e.target.value)}
            id="outlined-size-small"
            className={`input-checkedResize ${classes.inputs}`}
            label="Width"
            variant="outlined"
            size="small"
            disabled={!options.checkedResize ? true : false}
          />
        </Box>
        <Box>
          <FormControlLabel
            control={
              <BlueSwitch
                checked={options.checkedRotate}
                onChange={(e) => {
                  handleChange(e.target.name, e.target.checked);
                  (e.target.checked) ? addOrder('ROTATE') : delOrder('ROTATE');
                }}
                name="checkedRotate"
              />
            }
            label="Rotate"
          />
          <TextField
            name="rotateD"
            value={inputs.rotateD}
            onChange={(e) => handleInputChange(e.target.name, e.target.value)}
            id="outlined-size-small"
            className={`input-checkedRotate ${classes.inputs}`}
            label="Degree"
            variant="outlined"
            size="small"
            disabled={!options.checkedRotate ? true : false}
          />
        </Box>
        <Box>
          <FormControlLabel
            control={
              <BlueSwitch
                checked={options.checkedCrop}
                onChange={(e) => {
                  handleChange(e.target.name, e.target.checked);
                  (e.target.checked) ? addOrder('CROP') : delOrder('CROP');
                }}
                name="checkedCrop"
              />
            }
            label="Crop"
          />
          <TextField
            name="cropH"
            value={inputs.cropH}
            onChange={(e) => handleInputChange(e.target.name, e.target.value)}
            id="outlined-size-small"
            className={`input-checkedCrop ${classes.inputs}`}
            label="Height"
            variant="outlined"
            size="small"
            disabled={!options.checkedCrop ? true : false}
          />
          <TextField
            name="cropW"
            value={inputs.cropW}
            onChange={(e) => handleInputChange(e.target.name, e.target.value)}
            id="outlined-size-small"
            className={`input-checkedCrop ${classes.inputs}`}
            label="Width"
            variant="outlined"
            size="small"
            disabled={!options.checkedCrop ? true : false}
          />
          <TextField
            name="cropX"
            value={inputs.cropX}
            onChange={(e) => handleInputChange(e.target.name, e.target.value)}
            id="outlined-size-small"
            className={`input-checkedCrop ${classes.inputs}`}
            label="X"
            variant="outlined"
            size="small"
            disabled={!options.checkedCrop ? true : false}
          />
          <TextField
            name="cropY"
            value={inputs.cropY}
            onChange={(e) => handleInputChange(e.target.name, e.target.value)}
            id="outlined-size-small"
            className={`input-checkedCrop ${classes.inputs}`}
            label="Y"
            variant="outlined"
            size="small"
            disabled={!options.checkedCrop ? true : false}
          />
        </Box>
      </FormGroup>
    </Box>
  );
}

const mapStateToProps = (state) => {
  return {
    inputs: state.inputs,
    options: state.options,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleInputChange: (name, value) => {
      dispatch({
        type: "HANDLE_INPUT",
        data: {
          name: name,
          value: value,
        },
      });
    },
    handleChange: (name, checked) => {
      dispatch({
        type: "HANDLE_OPTION",
        data: {
          name: name,
          checked: checked,
        },
      });
    },
    addOrder: (data) => {
      dispatch({ type: "ADD_ORDER", data: data });
    },
    delOrder: (data) => {
      dispatch({ type: "DEL_ORDER", data: data });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CheckBox);
