import React from 'react';
import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ImagesPreview from './components/ImagesPreview/ImagesPreview';
import CheckBox from './components/CheckBox/CheckBox';
import AugOrder from './components/AugOrder/AugOrder';
import { grey, blue } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
  container: {
    width: '95%',
    padding: '0 2.5%',
    [theme.breakpoints.down('md')]: {
      width: '100%',
    padding: '0',
    },
    backgroundColor: blue[100],
    overflowY: 'auto',
    overflowX: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    color: grey[900]
  }
}));

function App() {
  const classes = useStyles();

  return (
      <Box className={classes.container}>
        <ImagesPreview/>
        <CheckBox/>
        <AugOrder/>
      </Box>
  );
}

export default App;