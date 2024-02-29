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
import { Route, Routes, useNavigate } from 'react-router-dom';
import api  from "./api/post.js";
import EditPost from './EditPost.js';
import useWindowSize from './hooks/useWindowSize.js';
import useAxiosFetch from './hooks/useAxiosFetch.js';
import { DataProvider } from './context/DataContext.js';

function App() {

  return (
    <div className="App">
      <DataProvider>
        <Header title="Social Media"/>
        <Nav />
        <Routes>
          <Route path='/' element={
          <Home />} />
          <Route path='post' > 
            <Route index element={<NewPost />} />
            <Route path=':id' element={<PostPage />} />
          </Route>
          <Route path='/edit/:id' element={<EditPost />} />
          <Route path='about' element={<About />} />
          <Route path='*' element={<Missing />} />
        </Routes>
        <Footer />
      </DataProvider>
    </div>
  );
}

export default App;
