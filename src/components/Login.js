import React, { useContext } from 'react'
import { Context } from '../index'
import {
  Box,
  Button,
  Container,
  Grid,
  makeStyles,
  Typography
} from '@material-ui/core'
import firebase from 'firebase'

const useStyles = makeStyles({
  grid: {
    height: window.innerHeight - 64
  },
  title: {
    textAlign: 'center',
    textTransform: 'uppercase',
    marginBottom: 20
  }
})

const Login = () => {
  const classes = useStyles()

  const { auth } = useContext(Context)

  const login = async () => {
    const provider = new firebase.auth.GoogleAuthProvider()
    const {user} = await auth.signInWithPopup(provider)
    console.log(user)
  }

  return (
    <Container>
      <Grid
        container
        direction='column'
        justify='center'
        alignItems='center'
        className={classes.grid}>
        <Box bgcolor='text.secondary' p={5}>
          <Typography variant='h5' className={classes.title}>
            Start chatting
          </Typography>
          <Button onClick={login} variant='contained' color='text.secondary'>
            Login with Your Google Account
          </Button>
        </Box>
      </Grid>
    </Container>
  )
}

export default Login
