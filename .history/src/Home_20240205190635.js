import React from 'react'
import Feed from './Feed'

const Home = (post) => {
  return (
    <div><Feed posts={post}/></div>
  )
}

export default Home