import React from 'react'
import { Container, Grid, makeStyles } from '@material-ui/core'
import LoaderImg from '../assets/loader.svg'

const useStyles = makeStyles({
  grid: {
    height: window.innerHeight - 64
  }
})

const Loader = () => {
  const classes = useStyles()

  return (
    <Container>
      <Grid
        container
        direction='column'
        justify='center'
        alignItems='center'
        className={classes.grid}>
        <img src={LoaderImg} alt='' />
      </Grid>
    </Container>
  )
}

export default Loader
