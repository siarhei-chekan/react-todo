import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PostService from '../API/PostService';
import Loader from '../components/UI/loader/Loader';
import { useFetching } from '../hooks/useFetching';

const PostIdPage = () => {
  const params = useParams();
  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);

  const [fetchPostById, isLoading, error] = useFetching(async (id) => {
    const response = await PostService.getById(id);
    setPost(response.data);
  });
  const [fetchComments, isComLoading, comError] = useFetching(async (id) => {
    const response = await PostService.getPostCommentById(id);
    setComments(response.data);
  });

  useEffect(() => {
    fetchPostById(params.id);
    fetchComments(params.id);
  }, []);

  return (
    <div>
      <h1>You are on Post Id Page; ID = {params.id}</h1>
      {
        isLoading 
          ? <Loader />
          : <div>{post.id} -- {post.title}</div>
      }
      <h2>Comments:</h2>
      {
        isComLoading
          ? <Loader />
          : <div>
            {comments.map(comment => 
              <div style={{marginTop: 15}}>
                <h5>{comment.email}</h5>
                <p>{comment.body}</p>
              </div>
            )}
          </div>
      }
    </div>
  );
};

export default PostIdPage;