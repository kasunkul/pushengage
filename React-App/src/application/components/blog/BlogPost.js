import React, { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';
import PropTypes from "prop-types";
import classNames from "classnames";
import { Grid, Typography, Card, Box, withStyles, TextField, Button, Avatar } from "@material-ui/core";
import BlogCard from "./BlogCard";
import ZoomImage from "../../shared/components/ZoomImage";
import smoothScrollTop from "../../shared/functions/smoothScrollTop";
import axios from 'axios';
import { useSelector, useDispatch } from "react-redux";
import { commentSlice, fetchBlogDetails } from "../../slices/BlogSlice";
import moment from 'moment';

const styles = (theme) => ({
  blogContentWrapper: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(4),
      marginRight: theme.spacing(4),
    },
    maxWidth: 1280,
    width: "100%",
  },
  wrapper: {
    minHeight: "60vh",
  },
  img: {
    width: "100%",
    height: "auto",
  },
  card: {
    boxShadow: theme.shadows[4],
    marginBottom: '30px'
  },
});

function BlogPost(props) {
  const { classes, content } = props;
  const [formValues, setFormValues] = useState({ name: '', comment: '' });
  const blogDetails = useSelector(state => state.blogDetails)
  const actions = commentSlice.actions
  const dispatch = useDispatch()
  const location = useLocation();
  const [post, setPost] = React.useState([]);
  const [activeReply, setActiveReply] = React.useState({});
  const [otherArticles, setOtherArticle] = React.useState([]);

  useEffect(() => {
    document.title = `Push Engage`;
    smoothScrollTop();
    const BlogId = location.pathname.substring(location.pathname.lastIndexOf('/') + 1);
     //Fetch the Blog Details
    axios.get(`${process.env.REACT_APP_SERVICE_BASE_URL}/blog/get/${BlogId}`).then((response) => {
      const blogPost = response.data.data.blogPost;
      const otherArticle = response.data.data.otherArticles;
      setPost(blogPost);
      setOtherArticle(otherArticle);
      document.title = `Push Engage ${blogPost.title}`;
    }); 

    dispatch(fetchBlogDetails(BlogId))
    if (blogDetails === 'idle') {}

  }, [dispatch]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const sendData = {
      root: activeReply.root,
      level1: activeReply.level1,
      level2: activeReply.level2,
      name: formValues.name,
      comment: formValues.comment
    }

    dispatch(actions.addComment(sendData))
    setFormValues({ name: '', comment: '' })
    setActiveReply({})
  };
  const handleReply = (event, root,level1,level2) => {
    event.preventDefault();
    setActiveReply({
      replyMode: true,
      root: root,
      level1:level1,
      level2:level2
    })
    window.scrollTo(0, 1000);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const displayComments = () => {
   return (!blogDetails.blogDetails) ? "" : blogDetails.blogDetails.blogPost.comments.map((e,rootIndex) => { 
     return (
      <div style={{paddingLeft: 20, paddingRight: 20,paddingTop: 20,paddingBottom: 20}}>
      <Grid container direction="column" spacing={1} style={{borderTop: "1px solid #dfdfdf"}}>
      <Grid item>
        <Grid container direction="row" spacing={1} style={{borderTop: "1px solid #dfdfdf"}}>
          <Grid item>
          <Avatar>{e.name.charAt(0).toUpperCase()}</Avatar>
          </Grid>
          <Grid item>
            <div>{e.name}</div>
            <div>{e.date}</div>
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        {e.comment}
      </Grid>
      <Grid item>
      <Button type="button"  onClick={(e)=>{handleReply(e,rootIndex,null,null)}} variant="text">Reply</Button>

      </Grid>
    </Grid>
    { e.reply ? e.reply.map( (e,levelOneIndex) => {
      
      return (
        <div style={{marginLeft: 50}}>
        <Grid container direction="column" spacing={1} style={{borderTop: "1px solid #dfdfdf"}}>
        <Grid item>
          <Grid container direction="row" spacing={1} style={{borderTop: "1px solid #dfdfdf"}}>
            <Grid item>
            <Avatar>{e.name.charAt(0).toUpperCase()}</Avatar>
            </Grid>
            <Grid item>
              <div>{e.name}</div>
              <div>{e.date}</div>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          {e.comment}
        </Grid>
        <Grid item>
      <Button type="button"  onClick={(e)=>{handleReply(e,rootIndex,levelOneIndex,null)}} variant="text">Reply</Button>
        </Grid>
      </Grid>

      { e.reply ? e.reply.map( (e,levelTwoIndex) => {
      return (
        <div style={{marginLeft: 100}}>
        <Grid container direction="column" spacing={1} style={{borderTop: "1px solid #dfdfdf"}}>
        <Grid item>
          <Grid container direction="row" spacing={1} style={{borderTop: "1px solid #dfdfdf"}}>
            <Grid item>
            <Avatar>{e.name.charAt(0).toUpperCase()}</Avatar>
            </Grid>
            <Grid item>
              <div>{e.name}</div>
              <div>{e.date}</div>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          {e.comment}
        </Grid>
        <Grid item>
      <Button type="button"  onClick={(e)=>{handleReply(e,rootIndex,levelOneIndex,levelTwoIndex)}} variant="text">Reply</Button>

        </Grid>
      </Grid>
      </div>
      )
    }       
          
          
    

    ): ''}
      </div>

      
      )
    }       
          
          
    

    ): ''}

    </div>
  
    )

  })
  }

  return (
    <Box
      className={classNames("lg-p-top", classes.wrapper)}
      display="flex"
      justifyContent="center"
    >
      <div className={classes.blogContentWrapper}>
        <Grid container spacing={5}>
          <Grid item md={9}>
            <Card className={classes.card}>
              <Box pt={3} pr={3} pl={3} pb={2}>
                <Typography variant="h4">
                  <b>{post.title}</b>
                </Typography>
                <Typography variant="body1" color="textSecondary">
                  {moment.unix(parseInt(post.date)).format('LL')}
                </Typography>
              </Box>
              <ZoomImage className={classes.img} src={`${process.env.PUBLIC_URL}/images/blogPost1.jpg`} alt="" />
              <Box p={3}>
                {content}
                <Box pt={2}>
                </Box>
                {post.content}
              </Box>
            </Card>
            <Card className={classes.card}>
              <Box pt={3} pr={3} pl={3} pb={2}>
                <Typography variant="h5">
                  <b>{ activeReply.replyMode ? 'Add a Reply': 'Add a comment'}</b>
                </Typography>
                <form onSubmit={handleSubmit}>
                  <TextField
                    margin="normal"
                    id="name-input"
                    name="name"
                    label="Name"
                    type="text"
                    variant="outlined"
                    value={formValues.name}
                    onChange={handleInputChange}
                  />
                  <TextField
                    margin="normal"
                    id="name-input"
                    name="comment"
                    label="Comment"
                    fullWidth
                    type="text"
                    variant="outlined"
                    value={formValues.comment}
                    onChange={handleInputChange}
                  />

                  <Button type="submit" variant="contained">{ activeReply.replyMode ? 'Reply': 'Comment'}</Button>
                </form>

              </Box>
            </Card>
            <Card className={classes.card}>
                  <Box>
                  {displayComments}
                  </Box>
            </Card>
          </Grid>
          <Grid item md={3}>
            <Typography variant="h6" paragraph>
              Other articles
            </Typography>
            {
            otherArticles.map((blogPost) => (
              <Box key={blogPost.id} mb={3}>
                <BlogCard
                  title={blogPost.title}
                  snippet={blogPost.content.slice(0, 100)}
                  date={blogPost.date}
                  url={`/blog/${blogPost._id}`}
                />
              </Box>
            ))
            }
          </Grid>
        </Grid>
      </div>
    </Box>
  );
}

BlogPost.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  date: PropTypes.number.isRequired,
  src: PropTypes.string.isRequired,
  content: PropTypes.node.isRequired,
  otherArticles: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default withStyles(styles, { withTheme: true })(BlogPost);
