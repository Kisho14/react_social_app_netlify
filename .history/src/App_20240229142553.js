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
        <Nav search={search} setSearch={setSearch}/>
        <Routes>
          <Route path='/' element={
          <Home 
            posts={searchResults}
            fetchError={fetchError}
            isLoading={isLoading}/>} />
          <Route path='post' > 
            <Route index element={<NewPost 
              setEditBody={setEditBody}
              setEditTitle={setEditTitle}
              handleEdit={handleEdit}
              postTitle={postTitle}
              setPostTitle={setPostTitle}
              postBody={postBody}
              setPostBody={setPostBody}
              handleSubmit={handleSubmit}
            />} />
            <Route path=':id' element={<PostPage 
              posts={posts} 
              handleDelete={handleDelete}/>} 
            />
          </Route>
          <Route path='/edit/:id' element={<EditPost 
              posts={posts}
              handleEdit={handleEdit}
              editBody={editBody}
              setEditBody={setEditBody}
              editTitle={editTitle}
              setEditTitle={setEditTitle}
            />} />
          <Route path='about' element={<About />} />
          <Route path='*' element={<Missing />} />
        </Routes>
        <Footer />
      </DataProvider>
    </div>
  );
}

export default App;
