import Header from './Header.js';
import Footer from './Footer.js';
import Nav from './Nav.js';
import Home from './Home.js';
import Missing from './Missing.js';
import NewPost from './NewPost.js';
import PostPage from './PostPage.js';
import About from './About.js';
import { useState } from 'react';

function App() {
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: "My First Post",
      datetime: "July 01, 2021 11:17:36 AM",
      body: "Made a video about Tesla Q1 results"
    },
    {
      id: 2,
      title: "My 2nd Post",
      datetime: "July 01, 2021 11:17:36 AM",
      body: "I attended a DeFi blockchain event"
    },
    {
      id: 3,
      title: "My 3rd Post",
      datetime: "July 01, 2021 11:17:36 AM",
      body: "Web3 global summit next week"
    },
    {
      id: 4,
      title: "My Forth Post",
      datetime: "July 01, 2021 11:17:36 AM",
      body: "ETH will outperform BTC"
    }
  ])
  const [search, setSearch] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [postTitle, setPostTitle] = useState('');
  const [postBody, setPostBody] = useState('');

  const handleSubmit = (e) => {
  e.preventDefault();
  const id = posts.length ? posts [posts.length - 1].
  id + 1: 1;
  const datetime = format(new Date(), 'MMMM dd, yyyy pp');
  const newPost = { id, title: postTitle, datetime,
  body: postBody };
  const allPosts = [...posts, newPost];
  setPosts (allPosts);
  setPostTitle('');
  setPostBody('');
  navigate('/');
  }

  return (
    <div className="App">
      <Header title="Social Media"/>
      <Nav search={search} setSearch={setSearch}/>
      <Home posts={posts}/>
      <NewPost 
        postTitle={postTitle}
        setPostTitle={setPostTitle}
        postBody={postBody}
        setPostBody={setPostBody}
        handleSubmit={handleSubmit}
      />
      <PostPage />
      <About />
      <Missing />
      <Footer />
    </div>
  );
}

export default App;
