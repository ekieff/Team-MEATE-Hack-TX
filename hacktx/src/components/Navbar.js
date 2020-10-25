import React from 'react'
import { NavLink, withRouter } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  }));

function Navbar(props){
    const classes = useStyles();
    


    return(
        <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              Project Harvest
            </Typography>
            <NavLink to="/">
            <Button color="inherit" >Home</Button>
            </NavLink>
            <NavLink to="/about">
            <Button color="inherit" name="/about" >About</Button>    
            </NavLink>
            <NavLink to="/add">
             <Button color="inherit" name="/add" >Add a pantry</Button>   
            </NavLink>
          </Toolbar>
        </AppBar>
      </div>
    
    )
}

export default Navbar;