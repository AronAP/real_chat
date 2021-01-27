import React, { useContext } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { makeStyles } from '@material-ui/core/styles'
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton
} from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import { NavLink } from 'react-router-dom'
import { LOGIN_ROUTE } from '../utils/consts'
import { Context } from '../index'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  button: {
    color: '#fff'
  },
  title: {
    flexGrow: 1
  }
}))

const Navbar = () => {
  const classes = useStyles()

  const { auth } = useContext(Context)
  const [user] = useAuthState(auth)

  return (
    <div className={classes.root}>
      <AppBar position='static'>
        <Toolbar>
          <IconButton
            edge='start'
            className={classes.menuButton}
            color='inherit'
            aria-label='menu'>
            <MenuIcon />
          </IconButton>
          <Typography variant='h6' className={classes.title}>
            Real-Time Chat
          </Typography>

          {user ? (
            <Button onClick={() => auth.signOut()} color='inherit'>
              Logout
            </Button>
          ) : (
            <NavLink to={LOGIN_ROUTE}>
              <Button className={classes.button} color='inherit'>Login</Button>
            </NavLink>
          )}
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default Navbar
