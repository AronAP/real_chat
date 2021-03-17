import React from 'react'
import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
  makeStyles,
  Typography
} from '@material-ui/core'

const useStyles = makeStyles({
  ownerMessage: {
    backgroundColor: 'black',
    color: 'white'
  },
  userMessage: {
    backgroundColor: '#3f51b5',
    color: 'white'
  }
})

const pad = val => {
  return val < 10 ? '0' + val : val
}

const secondsToMilliseconds = timestamp => {
  let stamp = timestamp.toString()
  stamp = stamp.length < 13 ? stamp.padEnd(13, 0) : stamp
  return +stamp
}

const timestampToTime = timestamp => {
  timestamp = secondsToMilliseconds(timestamp)

  const hours = new Date(timestamp).getHours()
  const minutes = new Date(timestamp).getMinutes()

  return pad(hours) + ':' + pad(minutes)
}

const Messages = ({ messages, currentUser }) => {
  const classes = useStyles()

  return (
    <List>
      {messages.map(message => (
        <ListItem
          // key={message.id}
          alignItems='flex-start'
          className={
            message.uid === currentUser
              ? classes.ownerMessage
              : classes.userMessage
          }>
          <ListItemAvatar>
            <Avatar alt={message.displayName} src={message.photoURL} />
          </ListItemAvatar>
          <ListItemText
            primary={message.displayName}
            secondary={<Typography component='span'>{message.text}</Typography>}
            color='inherit'
          />
          <ListItemSecondaryAction>
            <Typography component='span'>
              {message?.createdAt?.seconds
                ? timestampToTime(message?.createdAt?.seconds)
                : timestampToTime(Date.now())}
            </Typography>
          </ListItemSecondaryAction>
        </ListItem>
      ))}
    </List>
  )
}

export default Messages
