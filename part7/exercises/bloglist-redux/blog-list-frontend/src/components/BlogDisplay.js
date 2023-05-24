// Renders information regarding a single blog post on its own
const BlogDisplay = ({ blog }) => {
  // Renders the blog comments
  const displayBlogComments = () => {
    if (!blog.comments) {
      return <p>No comments to display</p>;
    }

    if (blog.comments.length === 0) {
      return <p>No comments to display</p>;
    }

    return (
      <ul>
        {blog.comments.map((comment, index) => (
          <li key={index}>{comment}</li>
        ))}
      </ul>
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
