import Header from './Header.js';
import Footer from './Footer.js';
import Nav from './Nav.js';
import Home from './Home.js';
import Missing from './Missing.js';
import NewPost from './NewPost.js';
import PostPage from './PostPage.js';
import About from './About.js';
import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { Route, Routes } from 'react-router-dom';

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

  useEffect(()=>{
    const filteredResults = posts.filter((post)=>
    ((post.body).toLowerCase()).includes(search.toLowerCase())
    || ((post.title).toLowerCase()).includes(search.toLowerCase()));

    setSearchResults(filteredResults.reverse());
  }, [posts, search])

  const handleSubmit = (e) => {
    e.preventDefault();
    const id = posts.length ? posts[posts.length - 1].id + 1: 1;
    const datetime = format(new Date(), 'MMMM dd, yyyy pp');
    const newPost = { id, title: postTitle, datetime, body: postBody };
    const allPosts = [...posts, newPost];
    setPosts (allPosts); 
    setPostTitle('');
    setPostBody('');
    // navigate('/');
  }

  return (
    <div className="App">
      <Header title="Social Media"/>
      <Nav search={search} setSearch={setSearch}/>
      <Routes>
        <Route path='/' element={<Home posts={searchResults}/>} />
        <Route path='post' element={<NewPost 
          postTitle={postTitle}
          setPostTitle={setPostTitle}
          postBody={postBody}
          setPostBody={setPostBody}
          handleSubmit={handleSubmit}
        />} />
        <Route path='about' element={<About />} />
        <Route path='*' element={<Missing />} />
        <Route path='postpage' element={<PostPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
