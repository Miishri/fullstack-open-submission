const dummy = (blogs) => {
    return 1;
}

const totalLikes = (blogs) => {
    const total = (sum, blogLikes) => {
        return sum + blogLikes.likes
    }

    return blogs.length === 0
        ? 0
        : blogs.reduce(total, 0)
}

const highestLikes = (blogs) => {
    const findHighestLikes = (past, current) => {
        return past.likes > current.likes
        ? past : current
    }

    return blogs.reduce(findHighestLikes)
}

const mostBlogs = (blogs) => {

}

module.exports = {
    dummy,
    totalLikes,
    highestLikes
}