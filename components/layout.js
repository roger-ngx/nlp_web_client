import Link from 'next/link';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import { makeStyles } from '@material-ui/core/styles';
import { Twitter, NearMe, Settings, Restore, Assessment, Assignment } from '@material-ui/icons';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { isEmpty } from 'lodash';

import styles from './layout.module.css';

const drawerWidth = 60;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  // necessary for content to be below app bar
  toolbar: {
    height: 100,
    marginTop: 20,
    textAlign: 'center'
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    // padding: theme.spacing(3),
    marginLeft: drawerWidth,
    height: '100vh'
  },
}));

export default function Layout({ children }) {
  const classes = useStyles();
  const router = useRouter();

  const user = useSelector(state => state.user.value.profile);
  if(isEmpty(user)){
    router.push('/');
    return;
  }

  return (
    <div className={styles.container}>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
      >
        <div className={classes.toolbar}>
          <Link href='/home'>
            <div style={{margin: 'auto', width: 32, height: 32, borderRadius: 16, overflow: 'hidden'}}>
              <img src={user.profilePicURL} />
            </div>
          </Link>
        </div>
        <List>
          <Link href='/dashboard'>
            <ListItem button style={{height: 60}} selected>
              <ListItemIcon><NearMe /></ListItemIcon>
            </ListItem>
          </Link>

          <Link href='/dataset'>
            <ListItem button style={{height: 60}}>
              <ListItemIcon><Assignment /></ListItemIcon>
            </ListItem>
          </Link>

          <Link href='/experiment'>
            <ListItem button style={{height: 60}}>
              <ListItemIcon><Restore /></ListItemIcon>
            </ListItem>
          </Link>

          <Link href='/analytics'>
            <ListItem button style={{height: 60}}>
              <ListItemIcon><Assessment /></ListItemIcon>
            </ListItem>
          </Link>

          <Link href='/setting'>
            <ListItem button style={{height: 60}}>
              <ListItemIcon><Settings /></ListItemIcon>
            </ListItem>
          </Link>
        </List>
      </Drawer>
      
      <main  className={classes.content}>{children}</main>
      
    </div>
  )
}