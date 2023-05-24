// Renders information regarding a single blog post on its own
const BlogDisplay = ({ blog }) => {
  const displayBlog = () => {
    if (blog) {
      return (
        <>
          <h1>Title: {blog.title}</h1>
          <h3>Author: {blog.author}</h3>
          <h3>Url: {blog.url}</h3>
          <h3>Likes: {blog.likes}</h3>
          <h3>Posted by user: {blog.user.username}</h3>
        </>
      );
    } else {
      return <h3>Unable to load blog</h3>;
    }
  };

  return <>{displayBlog()}</>;
};

export default BlogDisplay;
