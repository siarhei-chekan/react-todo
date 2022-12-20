import React, { useState } from 'react';
import MyButton from './UI/button/MyButton';
import MyInput from './UI/input/MyInput';

const PostForm = ({create}) => {
  const [post, setPost] = useState({title: '', body: ''});

  const addNewPost = (e) => {
    e.preventDefault();
    const newPost = {
      ...post,
      id: Date.now(),
    };
    create(newPost);
    setPost({title: '', body: ''});
  };

  return (
    <form>
      {/* Управляемый компонент */}
      <MyInput type='text' 
              placeholder="Post's title" 
              value={post.title}
              onChange={e => setPost({...post, title: e.target.value})} />
      <MyInput type='text' 
              placeholder="Post's description" 
              value={post.body}
              onChange={e => setPost({...post, body: e.target.value})} />
      {/* Неуправляемый\неконтролируемый компонент */}
      {/* <MyInput ref={bodyInputRef}
              type='text' 
              placeholder="Post's description"/> */}
      <MyButton onClick={addNewPost}>Add post</MyButton>
    </form>
  );
};

export default PostForm;