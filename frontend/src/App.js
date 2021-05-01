import React, {useEffect} from 'react';
import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ImagesPreview from './components/ImagesPreview/ImagesPreview';
import CheckBox from './components/CheckBox/CheckBox';
import AugOrder from './components/AugOrder/AugOrder';
import { grey } from '@material-ui/core/colors';

const useStyles = makeStyles({
  container: {
    width: '100vw',
    height: '100vh',
    backgroundColor: 'white',
    overflowY: 'auto',
    overflowX: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    color: grey[900]
  }
});

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