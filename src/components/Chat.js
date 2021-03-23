import React, { useContext, useRef, useState } from 'react'
import { Context } from '../index'
import {
  Avatar,
  Box,
  Button,
  Container,
  Grid,
  makeStyles,
  TextField
} from '@material-ui/core'
import SendIcon from '@material-ui/icons/Send'
import firebase from 'firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import Loader from './Loader'
import Messages from './Messages'

const useStyles = makeStyles({
  grid: {
    height: window.innerHeight - 64
  },
  viewBox: {
    height: '60vh',
    width: '100%',
    border: '1px solid #fff',
    overflowY: 'scroll'
    // transition: 'all .3s'
  },
  margin: {
    margin: '30px 10px 10px'
  },
  textField: {
    width: '100%'
  },
  white: {
    color: 'white'
  },
  notchedOutline: {
    borderColor: '#3f51b5 !important'
  },
  button: {
    margin: '-4px'
  }
})

const Chat = () => {
  const classes = useStyles()

  const { auth, firestore } = useContext(Context)
  const [user] = useAuthState(auth)
  const [value, setValue] = useState('')
  const [messages, loading] = useCollectionData(
    firestore.collection('messages').orderBy('createdAt')
  )
  const chatBox = useRef(null)

  const sendMessage = async () => {
    if (value) {
      firestore
        .collection('messages')
        .add({
          // id: ++ID,
          uid: user.uid,
          displayName: user.displayName,
          photoURL: user.photoURL,
          text: value,
          createdAt: firebase.firestore.FieldValue.serverTimestamp()
        })
        .then(() => {
          setValue('')

          chatBox.current.scrollTo({
            top: chatBox.current.scrollHeight,
            behavior: 'smooth'
          })
        })
    }
  }

  if (loading) return <Loader />

  return (
    <Container>
      <Grid
        container
        direction='column'
        justify='center'
        alignItems='center'
        className={classes.grid}>
        <Box ref={chatBox} className={classes.viewBox} bgcolor='inherit' p={5}>
          <Messages messages={messages} currentUser={user.uid} />
        </Box>
        <Box className={classes.margin} display='flex' width='100%'>
          <Grid container spacing={1} alignItems='flex-end'>
            <Grid item>
              <Avatar alt={user.displayName} src={user.photoURL} />
            </Grid>
            <Box flexGrow={1} pl={2} pr={3}>
              <TextField
                id='input-with-icon-grid'
                label='Send Message'
                rows={2}
                variant='outlined'
                value={value}
                className={classes.textField}
                InputProps={{
                  style: { color: 'white' },
                  classes: { notchedOutline: classes.notchedOutline }
                }}
                InputLabelProps={{
                  style: { color: 'white' }
                }}
                onKeyDown={e => e.key === 'Enter' && sendMessage()}
                onChange={e => setValue(e.target.value)}
              />
            </Box>
          </Grid>
          <Button
            variant='contained'
            color='primary'
            className={classes.button}
            onClick={sendMessage}>
            <SendIcon />
          </Button>
        </Box>
      </Grid>
    </Container>
  )
}

export default Chat
