

// Receives a list of blogs, returns the author with the most blogs and the corresponding count. 
// Returned: {author: "Robert C. Martin", blogs: 3}
const mostBlogs = (blogs) => {

  // Iterate through and increment based on author counts. 
  authorCounts = {}
  blogs.forEach(blog => {
    currentAuthor = blog.author 
    
    // If the currentAuthor is not inside, create a new entry and intialize to 1. 
    // Else, increment the counter. 
    if (!Object.keys(authorCounts).includes(currentAuthor)){
      authorCounts[currentAuthor] = 1
    } else {
      authorCounts[currentAuthor] = authorCounts[currentAuthor] + 1
    }

  })

  // Iterate over authorCounts and get the highest number. 
  let highestAuthor = null 
  for (const author in authorCounts) {
    if (highestAuthor === null || authorCounts[author] > highestAuthor.blogs) {
      highestAuthor = {author: author, blogs:  authorCounts[author]}
    }
  }

  return highestAuthor 
}

// Receives a list of blogs as a parameter, returns the total sum of likes. 
const totalLikes = (blogs) => {
  const sumLikes = blogs.reduce((accumulator, blog) => {
    return accumulator + blog.likes
  }, 0)
  return sumLikes
}

// Receives a list of blogs and returns the blog with the most likes. 
// If there are ties, return only one of the top blogs. 
const favoriteBlog = (blogs) => {

  const initialAccumulator = blogs[0] 

  const highestLikedBlog = blogs.reduce((accumulator, currentBlog) => {
    if (currentBlog.likes > accumulator.likes) return currentBlog 
    else return accumulator 
  }, initialAccumulator)

  return highestLikedBlog

}

// Dummy function which always returns 1. 
const dummy = (blogs) => {
  return 1 
}

module.exports = {
  dummy, totalLikes, favoriteBlog, mostBlogs 
}