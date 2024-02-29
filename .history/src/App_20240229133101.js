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
  const [posts, setPosts] = useState([])
  const [search, setSearch] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [postTitle, setPostTitle] = useState('');
  const [postBody, setPostBody] = useState('');
  const [editTitle, setEditTitle] = useState('');
  const [editBody, setEditBody] = useState('');
  const navigate = useNavigate();
  const {width}= useWindowSize();
  const {data, fetchError, isLoading} = useAxiosFetch('http://localhost:3500/posts');

  useEffect(() =>{
    setPosts(data);
  }, [data])

  useEffect(()=>{
    const filteredResults = posts.filter((post)=>
    ((post.body).toLowerCase()).includes(search.toLowerCase())
    || ((post.title).toLowerCase()).includes(search.toLowerCase()));

    setSearchResults(filteredResults.reverse());
  }, [posts, search])

  const handleSubmit =async (e) => {
    e.preventDefault();
    const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
    const datetime = format(new Date(), 'MMMM dd, yyyy pp');
    const newPost = { id, title: postTitle, datetime, body: postBody };
    try{
      const response = await api.post('/posts', newPost)
      const allPosts = [...posts, response.data];
      // console.log(newPost);
      // console.log(allPosts);
      setPosts (allPosts); 
      setPostTitle('');
      setPostBody('');
      navigate('/');
    }catch(err){
      if(err.response){
        //Not in the 200 response range
        console.log(err.response.data);
        console.log(err.response.status);
        console.log(err.response.header);
      } else {
        console.log(`Error: ${err.message}`);
      }
    }
  }

  const handleEdit = async (id) =>{
    const datetime = format(new Date(), 'MMMM dd, yyyy pp');
    // console.log(editBody,editTitle);
    const updatePost = { id, title: editTitle, datetime, body: editBody };
    try{
      const response = await api.put(`/posts/${id}`, updatePost)
      setPosts(posts.map(post => post.id===id ? {...response.data} : post))
      setEditTitle('');
      setEditBody('');
      navigate('/');
    } catch(err){
      console.log(`Error: ${err.message}`);
    }
  }

  const handleDelete =async (id) =>{
    // console.log(id);
    try{
      // console.log(`/posts/${id}`);
      await api.delete(`/posts/${id}`)
      const postsList= posts.filter(post => post.id !== id);
      setPosts(postsList);
      navigate('/');
    }catch(err){
      if(err.response){
        //Not in the 200 response range
        console.log(err.response.data);
        console.log(err.response.status);
        console.log(err.response.header);
      } else {
        console.log(`Error: ${err.message}`);
      }
    }
  }

  return (
    <div className="App">
      <Header title="Social Media" width={width}/>
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
    </div>
  );
}

export default App;
