// App.js
import React from 'react';
import { useQuery } from '@tannerlinsley/react-query';

const fetchPosts = async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts');
  return response.json();
};

const PostsList = () => {
  const { data: posts, isLoading, isError } = useQuery('posts', fetchPosts);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching data</div>;

  return (
    <div>
      {posts.map(post => (
        <div key={post.id}>{post.title}</div>
      ))}
    </div>
  );
};

const App = () => {
  return (
    <div>
      <h1>Posts</h1>
      <PostsList />
    </div>
  );
};

export default App;
