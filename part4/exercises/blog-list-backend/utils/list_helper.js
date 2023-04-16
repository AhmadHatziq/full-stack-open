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


module.exports = {
  dummy, totalLikes 
}