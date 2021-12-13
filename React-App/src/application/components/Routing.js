import React, { memo } from "react";
import PropTypes from "prop-types";
import { Switch } from "react-router-dom";
import PropsRoute from "../shared/components/PropsRoute";
import Blog from "./blog/Blog";
import BlogPost from "./blog/BlogPost";
import useLocationBlocker from "../shared/functions/useLocationBlocker";

function Routing(props) {
  const { selectBlog } = props;
  useLocationBlocker();
  return (
    <Switch>
      <PropsRoute
        exact
        path='/blog/:id'
        component={BlogPost}
      />
       <PropsRoute
        exact
        path="/blog"
        component={Blog}
        selectBlog={selectBlog}
      />
      <PropsRoute
        exact
        path="/"
        component={Blog}
        selectBlog={selectBlog}
      />
    </Switch>
  );
}

Routing.propTypes = {
  blogposts: PropTypes.arrayOf(PropTypes.object),
  selectBlog: PropTypes.func.isRequired,
};

export default memo(Routing);
