import * as React from 'react'
import Grid from '@material-ui/core/Grid'

interface Props {
  className?: string
  children: React.ReactNode
}

export default function CenteredContainer({
  children,
  className,
}: Props) {
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
