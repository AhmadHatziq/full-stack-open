// Renders information regarding a single user and their blog post titles
const User = ({ userIdMatch, blogs, matchingUser }) => {
  const userId = userIdMatch.params.userId;

  // Obtain all blogs belonging to the specified user
  const blogsPosted = blogs.filter((blog) => blog.user.id === userId);

  // Get the username of the userId
  // Note that this fails if the userId is not associated with any blog
  let userName = null;
  for (let i = 0; i < blogs.length; i++) {
    let blogUserName = blogs[i].user.username;
    let blogUserId = blogs[i].user.id;
    if (blogUserId === userId) {
      userName = blogUserName;
    }
  }

  // If matchingUser is valid, use it. Else, fallback to userName. Else, fallback to userId
  let displayName = null;
  if (matchingUser) {
    displayName = matchingUser.username;
  } else if (userName) {
    displayName = userName;
  } else {
    displayName = userId;
  }

  return (
    <>
      <h1>{displayName}</h1>
      <h2>Blogs Added: </h2>
      {blogsPosted && blogsPosted.length > 0 ? (
        <ul>
          {blogsPosted.map((blog) => {
            return <li key={blog.id}>{blog.title}</li>;
          })}
        </ul>
      ) : (
        <p>No blogs were made by this user</p>
      )}
    </>
  );
};

export default User;
