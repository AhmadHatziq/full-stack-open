import { Link } from "react-router-dom";
import Table from "react-bootstrap/Table";

// Renders information regarding all the users and their blog post counts
const Users = ({ blogs }) => {
  // Obtain all the unique users via their username and userId
  let userSet = new Set();
  let userNameToId = {};
  for (let i = 0; i < blogs.length; i++) {
    let blog = blogs[i];
    let blogUser = blog.user.username;
    userSet.add(blogUser);
    userNameToId[blogUser] = blog.user.id;
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

  // Render the table of username - blog counts
  const renderUserBlogCounts = () => {
    return (
      <>
        <Table striped bordered hover>
          <table>
            <thead>
              <tr>
                <th>Username</th>
                <th>Blogs Created</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(userBlogCounts).map(([key, value]) => {
                // console.log(key, value);
                // key is the username, value is the number of blogs created
                let userName = key;
                let blogCounts = value;

                let userId = userNameToId[userName];
                let userUrl = `/users/${userId}`;

                return (
                  <tr key={key}>
                    <td>
                      <Link to={userUrl}>{userName}</Link>
                    </td>
                    <td>{blogCounts}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Table>
      </>
    );
  };

  return <>{renderUserBlogCounts()}</>;
};

export default Users;
