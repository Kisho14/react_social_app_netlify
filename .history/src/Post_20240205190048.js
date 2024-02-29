import React from 'react'

const Post = (post) => {
  return (
    <article>
        <h2>{post.title}</h2>
        <p>{post.datetime}</p>
        <p>{
            (post.body).length <= 25 ? post.body : `${(post.body).slice(0,25)}...`
        }</p>
    </article>
  )
}

export default Post