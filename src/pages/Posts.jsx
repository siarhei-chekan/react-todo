import React, { useEffect, useRef, useState } from "react";
import PostService from "../API/PostService";
import PostFIlter from "../components/PostFIlter";
// import ClassCounter from "./components/ClassCounter";
// import Counter from "./components/Counter";
import PostForm from "../components/PostForm";
import PostList from "../components/PostList";
import MyButton from "../components/UI/button/MyButton";
import Loader from "../components/UI/loader/Loader";
import MyModal from "../components/UI/modal/MyModal";
import Pagination from "../components/UI/pagination/Pagination";
import MySelect from "../components/UI/select/MySelect";
import { useFetching } from "../hooks/useFetching";
import { useObserver } from "../hooks/useObserver";
import { usePosts } from "../hooks/usePosts";

import { getPageCount } from "../utils/pages";

function Posts() {
  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState({ sort: '', query: '' });
  const [isModalVisible, setModalVisibility] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const lastElement = useRef();

  const [fetchPosts, isPostsLoading, postError] = useFetching(async (limit, page) => {
    const response = await PostService.getAll(limit, page);
    setPosts([...posts, ...response.data]);
    const totalCount = response.headers['x-total-count'];
    setTotalPages(getPageCount(totalCount, limit));
  });

  // const [title, setTitle] = useState('');
  // const [body, setBody] = useState('');
  // const bodyInputRef = useRef();
  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);

  const createPost = (newPost) => {
    setPosts([...posts, newPost]);
    setModalVisibility(false);
  };
  const removePost = (post) => {
    setPosts(posts.filter(item => item.id !== post.id));
  };

  const changePage = (page) => {
    setPage(page);
  };

  useObserver(lastElement, page < totalPages, isPostsLoading, () => setPage(page + 1));

  useEffect(() => {
    fetchPosts(limit, page);
  }, [page, limit]);

  return (
    <div className="App">
      {/* <Counter/>
      <ClassCounter/> */}
      <button onClick={fetchPosts}>Get posts</button>
      <MyButton style={{ marginTop: '30px' }} onClick={() => setModalVisibility(true)}>
        Create post
      </MyButton>
      <MyModal visible={isModalVisible} setVisibility={setModalVisibility}>
        <PostForm create={createPost} />
      </MyModal>

      <hr style={{ margin: "15px 0" }} />
      <PostFIlter
        filter={filter}
        setFilter={setFilter}
      />
      <MySelect 
        value={limit}
        onChange={value => setLimit(value)}
        defaultValue="Amount of elements on page"
        options={[
          {value: 5, name: "5"},
          {value: 10, name: "10"},
          {value: 25, name: "25"},
          {value: -1, name: "All"}
        ]}
      />
      {postError &&
        <h1>Error is happend {postError}</h1>
      }
      {/* TODO появляется надпись Posts not Found, но не должна!!! */}
      <PostList
        remove={removePost}
        posts={sortedAndSearchedPosts}
        title={"Post's list #1"}
      />
      <div ref={lastElement} style={{height: 20, background: 'red'}}></div>
      {isPostsLoading &&
        <div style={{ display: "flex", justifyContent: "center", marginTop: "50px" }}><Loader /></div>
      }
      <Pagination
        page={page}
        changePage={changePage}
        totalPages={totalPages}
      />

    </div>
  );
}

export default Posts;
