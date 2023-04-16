const dummy = (blogs) => {
  return 1 
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

module.exports = {
  dummy, totalLikes, favoriteBlog
}