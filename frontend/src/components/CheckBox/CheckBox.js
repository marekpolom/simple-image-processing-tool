import React, { useState } from "react";
import {
  Box,
  Switch,
  TextField,
  FormControlLabel,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  FormGroup,
  Checkbox,
  Grid,
} from "@material-ui/core";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { blue } from "@material-ui/core/colors";
import { connect } from "react-redux";
import { findByLabelText } from "@testing-library/dom";

const useStyles = makeStyles((theme) => ({
  checkBoxBox: {
    width: "100%",
    minHeight: "20vh",
  },
  formGroup: {
    width: "100%",
    minHeight: "20vh",
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  inputs: {
    boxShadow: '0px 0px 2px gray',
    width: '90%',
    margin: '2px 7px',
    borderRadius: 4,
    backgroundColor: 'white',
  },
  formControl: {
    boxShadow: '0px 0px 2px gray',
    width: '90%',
    margin: '2px 7px',
    borderRadius: 4,
    backgroundColor: 'white',
  },
  formControlLabels: {
    padding: "2vh 1vw",
    display: 'flex',
    height: '100%',
    justifyContent: 'center'
  },
  gridInputItem: {
    display: 'flex',
    justifyContent: 'center'
  }
}));

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

const BlueCheckbox = withStyles({
  root: {
    color: blue[300],
    "&$checked": {
      color: blue[500],
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);

function CheckBox({
  inputs,
  handleInputChange,
  options,
  handleChange,
  order,
  addOrder,
  delOrder,
}) {
  const classes = useStyles();

  return (
    <Box className={classes.checkBoxBox}>
      <FormGroup row className={classes.formGroup}>
        <Grid container>
          <Grid item lg={4} sm={6} xs={12} className={classes.formControlLabels}>
            <FormControlLabel
              control={
                <BlueSwitch
                  checked={options.checkedNegative}
                  onChange={(e) => {
                    handleChange(e.target.name, e.target.checked);
                    e.target.checked
                      ? addOrder("NEGATIVE")
                      : delOrder("NEGATIVE");
                  }}
                  name="checkedNegative"
                />
              }
              label="Negative"
            />
          </Grid>
          <Grid lg={4} sm={6} xs={12} item className={classes.formControlLabels}>
            <FormControlLabel
              control={
                <BlueSwitch
                  checked={options.checkedCompress}
                  onChange={(e) => {
                    handleChange(e.target.name, e.target.checked);
                    e.target.checked
                      ? addOrder("COMPRESS")
                      : delOrder("COMPRESS");
                  }}
                  name="checkedCompress"
                />
              }
              label="Compress"
            />
          </Grid>
          <Grid lg={4} md={6} xs={12} item container className={classes.formControlLabels}>
            <Grid item xs={12} sm={4} className={classes.gridInputItem}>
            <FormControlLabel
              control={
                <BlueSwitch
                  checked={options.checkedResize}
                  onChange={(e) => {
                    handleChange(e.target.name, e.target.checked);
                    e.target.checked ? addOrder("RESIZE") : delOrder("RESIZE");
                  }}
                  name="checkedResize"
                />
              }
              label="Resize"
            /></Grid>
            <Grid item xs={6} sm={4} className={classes.gridInputItem}>
            <TextField
              name="resizeH"
              value={inputs.resizeH}
              onChange={(e) => {
                if (!isNaN(e.target.value) || e.target.value === "") {
                  handleInputChange(e.target.name, e.target.value);
                }
              }}
              id="outlined-size-small"
              className={`input-checkedResize ${classes.inputs}`}
              label="Height"
              variant="outlined"
              size="small"
              disabled={!options.checkedResize ? true : false}
            /></Grid>
            <Grid item xs={6} sm={4} className={classes.gridInputItem}>
            <TextField
              name="resizeW"
              value={inputs.resizeW}
              onChange={(e) => {
                if (!isNaN(e.target.value) || e.target.value === "") {
                  handleInputChange(e.target.name, e.target.value);
                }
              }}
              id="outlined-size-small"
              className={`input-checkedResize ${classes.inputs}`}
              label="Width"
              variant="outlined"
              size="small"
              disabled={!options.checkedResize ? true : false}
            /></Grid>
          </Grid>
          <Grid lg={6} md={6} xs={12} item container className={classes.formControlLabels}>
            <Grid item xs={12} sm={4} md={3} className={classes.gridInputItem}>
            <FormControlLabel
              control={
                <BlueSwitch
                  checked={options.checkedRotate}
                  onChange={(e) => {
                    handleChange(e.target.name, e.target.checked);
                    e.target.checked ? addOrder("ROTATE") : delOrder("ROTATE");
                  }}
                  name="checkedRotate"
                />
              }
              label="Rotate"
            /></Grid>
            <Grid item xs={6} sm={2} md={3}  className={classes.gridInputItem}>
            <TextField
              name="rotateD"
              value={inputs.rotateD}
              onChange={(e) => {
                if (!isNaN(e.target.value) || e.target.value === "") {
                  handleInputChange(e.target.name, e.target.value);
                }
              }}
              id="outlined-size-small"
              className={`input-checkedRotate ${classes.inputs}`}
              label="Degree"
              variant="outlined"
              size="small"
              disabled={!options.checkedRotate ? true : false}
            />
            </Grid>
            <Grid item xs={6} sm={4} md={3} className={classes.gridInputItem}>
            <FormControl
              variant="outlined"
              className={classes.formControl}
              size="small"
            >
              <InputLabel id="demo-simple-select-outlined-label">
                Mode
              </InputLabel>
              <Select
                name="rotateM"
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={inputs.rotateM}
                className={`input-checkedRotate`}
                onChange={(e) => {
                  handleInputChange(e.target.name, e.target.value);
                }}
                label="Age"
                disabled={!options.checkedRotate ? true : false}
              >
                <MenuItem value="constant">Constant</MenuItem>
                <MenuItem value="edge">Edge</MenuItem>
                <MenuItem value="symmetric">Symmetric</MenuItem>
                <MenuItem value="reflect">Reflect</MenuItem>
                <MenuItem value="wrap">Wrap</MenuItem>
              </Select>
            </FormControl>
            </Grid>
            <Grid item xs={12} sm={2} md={3} className={classes.gridInputItem} style={{margin: '-1px'}}>
            <FormControlLabel
              control={
                <BlueCheckbox
                  checked={inputs.rotateR}
                  onChange={(e) =>
                    handleInputChange(e.target.name, e.target.checked)
                  }
                  name="rotateR"
                  color={blue[500]}
                  disabled={!options.checkedRotate ? true : false}
                />
              }
              label="Resize"
            />
            </Grid>
          </Grid>
          <Grid lg={6} xs={12} item container className={classes.formControlLabels}>
            <Grid item xs={12} sm={4} className={classes.gridInputItem}>
            <FormControlLabel
              control={
                <BlueSwitch
                  checked={options.checkedCrop}
                  onChange={(e) => {
                    handleChange(e.target.name, e.target.checked);
                    e.target.checked ? addOrder("CROP") : delOrder("CROP");
                  }}
                  name="checkedCrop"
                />
              }
              label="Crop"
            />
            </Grid>
            <Grid item xs={6} sm={2} className={classes.gridInputItem}>
            <TextField
              name="cropH"
              value={inputs.cropH}
              onChange={(e) => {
                if (!isNaN(e.target.value) || e.target.value === "") {
                  handleInputChange(e.target.name, e.target.value);
                }
              }}
              id="outlined-size-small"
              className={`input-checkedCrop ${classes.inputs}`}
              label="Height"
              variant="outlined"
              size="small"
              disabled={!options.checkedCrop ? true : false}
            />
            </Grid>
            <Grid item xs={6} sm={2} className={classes.gridInputItem}>
            <TextField
              name="cropW"
              value={inputs.cropW}
              onChange={(e) => {
                if (!isNaN(e.target.value) || e.target.value === "") {
                  handleInputChange(e.target.name, e.target.value);
                }
              }}
              id="outlined-size-small"
              className={`input-checkedCrop ${classes.inputs}`}
              label="Width"
              variant="outlined"
              size="small"
              disabled={!options.checkedCrop ? true : false}
            />
            </Grid>
            <Grid item xs={6} sm={2} className={classes.gridInputItem}>
            <TextField
              name="cropX"
              value={inputs.cropX}
              onChange={(e) => {
                if (!isNaN(e.target.value) || e.target.value === "") {
                  handleInputChange(e.target.name, e.target.value);
                }
              }}
              id="outlined-size-small"
              className={`input-checkedCrop ${classes.inputs}`}
              label="X"
              variant="outlined"
              size="small"
              disabled={!options.checkedCrop ? true : false}
            />
            </Grid>
            <Grid item xs={6} sm={2} className={classes.gridInputItem}>
            <TextField
              name="cropY"
              value={inputs.cropY}
              onChange={(e) => {
                if (!isNaN(e.target.value) || e.target.value === "") {
                  handleInputChange(e.target.name, e.target.value);
                }
              }}
              id="outlined-size-small"
              className={`input-checkedCrop ${classes.inputs}`}
              label="Y"
              variant="outlined"
              size="small"
              disabled={!options.checkedCrop ? true : false}
            />
            </Grid>
          </Grid>
        </Grid>
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
