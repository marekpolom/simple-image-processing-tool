import React from 'react';
import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import { connect } from "react-redux";
import { blue, grey } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
    mainBox: {
        width: '100%',
        height: "15vh",
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        [theme.breakpoints.down('xs')]: {
            height: '50vh',
        },
    },
    orderBox: {
        height: '8vh',
        width: '80%',
        backgroundColor: 'white',
        borderRadius: '8px',
        display: 'flex',
        flexDirection: 'row',
        boxShadow: '0px 0px 5px gray',
        [theme.breakpoints.down('sm')]: {
            width: '95%'
        },
        [theme.breakpoints.down('xs')]: {
            height: '40vh',
            flexDirection: 'column',
            width: '70%'
        },
    },
    orderElement: {
        backgroundColor: blue[400],
        borderRadius: '8px',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: '0.5%',
        padding: '0 1%',
        fontSize: '20px',
        flexGrow: '1',
        boxShadow: '0px 0px 3px gray',
        [theme.breakpoints.down('sm')]: {
            fontSize: '15px',
        },
        [theme.breakpoints.down('xs')]: {
            width: '95%',
            fontWeight: 600,
            padding: '0 2%',
            flexDirection: 'row',
            fontSize: '18px',
            textAlign: 'center',
        },
    },
    noOrderElement: {
        borderRadius: '8px',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        margin: '0.4%',
        padding: '0 1%',
        fontSize: '20px',
        color: grey[400],
        width: '98%',
        fontWeight: 700,
        cursor: 'default',
        [theme.breakpoints.down('xs')]: {
            height: '100%',
            fontWeight: 600,
            width: '90%',
            flexDirection: 'column',
            fontSize: '18px',
            textAlign: 'center',
            padding: '0 5%',
        },
    },
    arrowIcon: {
        fontSize: '30px',
        [theme.breakpoints.down('sm')]: {
            fontSize: '20px',
        },
        [theme.breakpoints.down('xs')]: {
            fontSize: '30px',
            transform: 'rotate(90deg)'
        },
    }
  }));


function AugOrder({order, handleOrder, clearOrder}) {
  const classes = useStyles();

  return (
    <Box className={classes.mainBox}>
        <Box className={classes.orderBox}>
            {(order.length > 0) ? order.map((item, index) => {
                return(
                    <Box key={index} className={classes.orderElement}>
                        <NavigateBeforeIcon className={classes.arrowIcon} style={{cursor: `${(index === 0) ? 'not-allowed' : 'pointer'}`}} onClick={() => {
                            let orderCp = order.map((item) => item);
                            if(index > 0){
                                clearOrder();
                                const x = orderCp[index-1];
                                orderCp[index-1] = item;
                                orderCp[index] = x;
                                handleOrder(orderCp);
                            }
                        }}/>
                        {item}
                        <NavigateNextIcon className={classes.arrowIcon} style={{cursor: `${(index === order.length-1) ? 'not-allowed' : 'pointer'}`}} onClick={() => {
                            let orderCp = order.map((item) => item);
                            if(index < orderCp.length-1){
                                clearOrder();
                                const x = orderCp[index+1];
                                orderCp[index+1] = item;
                                orderCp[index] = x;
                                handleOrder(orderCp);
                            }
                        }}/>
                    </Box>
                );
            }) : <Box className={classes.noOrderElement}>CHANGE ORDER OF AUGMENTATION</Box>}
        </Box>
    </Box>
  );
}

const mapStateToProps = (state) => {
    return {
        order: state.order
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        handleOrder: (data) => {
            dispatch({ type: "HANDLE_ORDER", data: data });
        },
        clearOrder: () => {
            dispatch({ type: "CLEAR_ORDER"});
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AugOrder);