import React from 'react';
import MyInput from './UI/input/MyInput';
import MySelect from './UI/select/MySelect';

const PostFIlter = ({ filter, setFilter}) => {
  return (
    <div>
      <MyInput placeholder="Search..."
               value={filter.query}
               onChange={(e) => setFilter({ ...filter, query: e.target.value })}
      />
      <MySelect defaultValue="Sorting by" 
                options={[
                  { value: "title", name: "By title" },
                  { value: "body", name: "By description" }
                ]}
                value={filter.sort}
                onChange={selectedSort => setFilter({ ...filter, sort: selectedSort })}
      />
    </div>
  );
};

export default PostFIlter;