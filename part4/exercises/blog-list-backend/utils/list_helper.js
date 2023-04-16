
// Receives a list of blogs, returns the author with the most cumulative likes. 
// Returns: {author: "XXX", likes: 17}
const mostLikes = (blogs) => {

  // Iterate and accumulate likes for each author 
  authorLikes = {}
  blogs.forEach(blog => {
    currentAuthor = blog.author 
    currentLikes = blog.likes 

    // Accumulate likes for each author 
    if (Object.keys(authorLikes).includes(currentAuthor)) {
      authorLikes[currentAuthor] += currentLikes
    } else {
      authorLikes[currentAuthor] = currentLikes
    }
  })

  // Find the author with the highest cumulative likes. 
  let highestLikes = null 
  for (const author in authorLikes) {
    if (highestLikes === null || authorLikes[author] > highestLikes.likes) {
      highestLikes = {author: author, likes:  authorLikes[author]}
    }
  }

  return highestLikes 

}

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
  dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes
}