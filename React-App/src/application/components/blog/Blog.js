import React, { useEffect } from "react";
import Pagination from "@material-ui/lab/Pagination";
import PropTypes from "prop-types";
import classNames from "classnames";
import { Grid, Box, withWidth, withStyles } from "@material-ui/core";
import BlogCard from "./BlogCard";
import axios from 'axios';

const styles = (theme) => ({
  blogContentWrapper: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(4),
      marginRight: theme.spacing(4),
    },
    // maxWidth: 1280,
    width: "100%",
  },
  wrapper: {
    minHeight: "60vh",
  },
  noDecoration: {
    textDecoration: "none !important",
  },
  pagination: {
    margin: '0 auto',
    display: 'block',
    width: 'fit-content',
    paddingBottom: 10
  }
});
function Blog(props) {
  const { classes, selectBlog } = props;
  const [posts, setPost] = React.useState([]);
  const [page, setPage] =  React.useState(1);
  const [count, setCount] =  React.useState(0);
  const [pageSize, setPageSize] =  React.useState(3);

  useEffect(() => {
    selectBlog();
    fetchBlogs(page);
  }, [selectBlog]);

  const fetchBlogs = (pageNumber) => {
    //Fetch the Blogs
    axios.get(`${process.env.REACT_APP_SERVICE_BASE_URL}/blog/getAll?pageNumber=${pageNumber}&pageSize=${pageSize}`).then((response) => {
      setPost(response.data.data.blogs);
      setCount(response.data.data.paginationPages);
    });  
  }

  const handlePageChange = (event, value) => {
    fetchBlogs(value);
    setPage(value);
  };

  return (
    <Box
      // display="flex"
      // justifyContent="center"
      className={classNames(classes.wrapper, "lg-p-top")}
    >
      <div className={classes.blogContentWrapper}>
        <Grid container alignItems="center" spacing={3}>
        {posts.map((element, index) => (
              <Grid key={index} item xs={3}>
                  <Box mb={4}>
                    <BlogCard
                      src={`${process.env.PUBLIC_URL}/images/blogPost1.jpg`}
                      title={element.title}
                      snippet={element.content.slice(0, 100)}
                      date={element.date}
                      url={`/blog/${element._id}`}
                    />
                  </Box>
              </Grid>
            ))}
        </Grid>
      </div>
      <div display="flex" justifyContent="center" >
          <Pagination
            className={classes.pagination}           
            count={count}
            page={page}
            siblingCount={1}
            boundaryCount={1}
            shape="rounded"
            onChange={handlePageChange}
            variant="outlined" 
          />
      </div>     
    </Box>
  );
}

Blog.propTypes = {
  selectBlog: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  width: PropTypes.string.isRequired,
};

export default withWidth()(withStyles(styles, { withTheme: true })(Blog));
