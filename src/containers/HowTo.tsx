import * as React from 'react'
import ReactGA from 'react-ga'
import { Theme, makeStyles } from '@material-ui/core/styles'
import { withTranslation, WithTranslation } from 'react-i18next'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Typography from '@material-ui/core/Typography'

type Props = WithTranslation

const useStyles = makeStyles((theme: Theme) => ({
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
}))

function _howToToggled(_: React.ChangeEvent<{}>, expanded: boolean) {
  if (!expanded) {
    return
  }
  ReactGA.event({
    category: 'Onboarding',
    action: 'How to open',
  });
}

function HowTo({t}: Props) {
  const classes = useStyles({})

  return (
    <ExpansionPanel className={classes.root} onChange={_howToToggled}>
      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
        <Typography variant='subtitle1'>{t('how-to-use.title')}</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <Typography dangerouslySetInnerHTML={{ __html: t('how-to-use.content') }} />
      </ExpansionPanelDetails>
    </ExpansionPanel>
  )
}

export default withTranslation()(HowTo)
