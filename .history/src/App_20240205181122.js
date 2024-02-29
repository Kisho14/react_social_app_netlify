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
  const [search, setSearch] = useState('')

  return (
    <div className="App">
      <Header title="Social Media"/>
      <Nav />
      <Home />
      <NewPost />
      <PostPage />
      <About />
      <Missing />
      <Footer />
    </div>
  );
}

export default App;
