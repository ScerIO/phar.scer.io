import * as React from 'react'
import Grid from '@material-ui/core/Grid'

interface IProps {
  className?: string
  children: React.ReactNode
}

export default function CenteredContainer({
  children,
  className,
}: IProps) {
  return (
    <Grid
      container
      alignItems='center'
      justify='center'
      className={className}>
    {children}
  </Grid>
  )
}
