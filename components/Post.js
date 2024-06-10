// Post.js
import React from 'react';
import { useMutation, queryCache } from '@tannerlinsley/react-query';

const deletePost = async postId => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${postId}`,
    {
      method: 'DELETE',
    }
  );
  return response.json();
};

const Post = ({ post }) => {
  const [mutate] = useMutation(deletePost, {
    onSuccess: () => {
      queryCache.refetchQueries('posts');
    },
  });

  const handleDelete = async () => {
    await mutate(post.id);
  };

  return (
    <div>
      <h2>{post.title}</h2>
      <p>{post.body}</p>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default Post;
