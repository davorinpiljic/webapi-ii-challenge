

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  card: {
    minWidth: 275,
    maxWidth: 360,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function PostList(props) {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  return (
      <div>
        {props.posts.map(post => {
            return(
              <div>

                <Card className={classes.card}>
                <CardContent>
                    <Typography variant="h5" component="h2">
                    {post.title}
                    </Typography>
                    <Typography className={classes.pos} color="textSecondary">
                    {post.created_at}
                    </Typography>
                    <Typography variant="body2" component="p">
                    {post.contents}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small">Learn More</Button>
                </CardActions>
                </Card>
                <br></br>
                </div>
            )
        })}          
      </div>
    
  );
}