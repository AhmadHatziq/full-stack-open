const Users = ({ blogs }) => {
  // Obtain all the unique users
  let userSet = new Set();
  for (let i = 0; i < blogs.length; i++) {
    let blog = blogs[i];
    let blogUser = blog.user.username;
    userSet.add(blogUser);
  }

  // Convert the Set to an Array
  const userList = Array.from(userSet);

  // Initialize the counts for each user to 0
  let userBlogCounts = {};
  for (let i = 0; i < userList.length; i++) {
    userBlogCounts[userList[i]] = 0;
  }

  // Iterate through blogs again and increment the counts
  for (let i = 0; i < blogs.length; i++) {
    let blog = blogs[i];
    let blogUser = blog.user.username;
    userBlogCounts[blogUser] = userBlogCounts[blogUser] + 1;
  }

  /*
  Object.entries(userBlogCounts).map(([key, value]) => {
    console.log(key, value);
  });
  */

  // Render the table of username - blog counts
  const renderUserBlogCounts = () => {
    return (
      <>
        <table>
          <thead>
            <tr>
              <th>Username</th>
              <th>Blogs Created</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(userBlogCounts).map(([key, value]) => {
              console.log(key, value);
              return (
                <tr key={key}>
                  <td>{key}</td>
                  <td>{value}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </>
    );
  };

  return <>{renderUserBlogCounts()}</>;
};

export default Users;
