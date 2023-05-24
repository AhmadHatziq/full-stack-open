import { useState } from "react";
import { addBlogComment } from "../reducers/blogReducer";
import { useDispatch } from "react-redux";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";

// Renders information regarding a single blog post on its own
const BlogDisplay = ({ blog }) => {
  const dispatch = useDispatch();
  const [comment, setComment] = useState("");
  const onChange = (event) => {
    setComment(event.target.value);
  };
  const submitComment = (event) => {
    event.preventDefault();
    comment.replace(/\s/g, "").length === 0
      ? alert("Please enter a valid comment")
      : dispatch(addBlogComment({ newComment: comment, blog: blog }));
    setComment("");
  };

  // Renders the blog comments
  const displayBlogComments = () => {
    if (!blog.comments) {
      return <p>No comments to display</p>;
    }

    if (blog.comments.length === 0) {
      return <p>No comments to display</p>;
    }

    return (
      <ListGroup>
        {blog.comments.map((comment, index) => (
          <ListGroup.Item key={index}>{comment}</ListGroup.Item>
        ))}
      </ListGroup>
    );
  };

  const displayBlog = () => {
    if (blog) {
      return (
        <>
          <h1>Title: {blog.title}</h1>
          <h3>Author: {blog.author}</h3>
          <h3>Url: {blog.url}</h3>
          <h3>Likes: {blog.likes}</h3>
          <h3>Posted by user: {blog.user.username}</h3>

          <h3>Comments: </h3>
          <form onSubmit={submitComment}>
            <input type="text" onChange={onChange} value={comment}></input>
            <Button variant="primary">Submit comment</Button>
          </form>
          {displayBlogComments()}
        </>
      );
    } else {
      return <h3>Unable to load blog</h3>;
    }
  };

  return <>{displayBlog()}</>;
};

export default BlogDisplay;
