import * as React from 'react'
import { Theme } from '@material-ui/core/styles/createMuiTheme'
import { createStyles, withStyles, WithStyles } from '@material-ui/styles'
import { withTranslation, WithTranslation } from 'react-i18next'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Typography from '@material-ui/core/Typography'

type Props = WithStyles<typeof styles> & WithTranslation

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

const HowTo = ({
  classes,
  t,
}: Props) =>
  <ExpansionPanel className={classes.root}>
    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
      <Typography variant='subtitle1'>{t('how-to-use.title')}</Typography>
    </ExpansionPanelSummary>
    <ExpansionPanelDetails>
      <Typography dangerouslySetInnerHTML={{ __html: t('how-to-use.content') }} />
    </ExpansionPanelDetails>
  </ExpansionPanel>

export default withStyles(styles)(withTranslation()(HowTo))
