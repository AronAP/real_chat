import React, { useContext } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { makeStyles } from '@material-ui/core/styles'
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
} from '@material-ui/core'
import { NavLink } from 'react-router-dom'
import { LOGIN_ROUTE } from '../utils/consts'
import { Context } from '../index'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
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
          <Typography variant='h6' className={classes.title}>
            Real-Time Chat
          </Typography>

          {user ? (
            <Button onClick={() => auth.signOut()} color='inherit'>
              Logout
            </Button>
          ) : (
            <NavLink to={LOGIN_ROUTE}>
              <Button className={classes.button} color='inherit'>
                Login
              </Button>
            </NavLink>
          )}
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default Navbar
