import * as React from 'react'
import { Theme } from '@material-ui/core/styles/createMuiTheme'
import createStyles from '@material-ui/core/styles/createStyles'
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles'
import { withI18n, WithI18n } from 'react-i18next'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Typography from '@material-ui/core/Typography'

type Props = WithStyles<typeof styles> & WithI18n

const styles = (theme: Theme) => createStyles({
  root: {
    width: '90vw',
    transition: 'all .3s ease-in',
    [theme.breakpoints.up('md')]: {
      width: '400px',
    },
    [theme.breakpoints.up('lg')]: {
      width: '600px',
    },
  },
})

function HowTo({
  classes,
  t,
}: Props) {
  return (
    <ExpansionPanel className={classes.root}>
      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
        <Typography variant='subtitle1'>{t('how-to-use.title')}</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <Typography dangerouslySetInnerHTML={{ __html: t('how-to-use.content') }} />
      </ExpansionPanelDetails>
    </ExpansionPanel>
  )
}

export default withStyles(styles)(withI18n()(HowTo))
