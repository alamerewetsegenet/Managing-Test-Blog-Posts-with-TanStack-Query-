// EditPostForm.js
import React, { useState } from 'react';
import { useMutation, queryCache } from '@tannerlinsley/react-query';

const updatePost = async postData => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${postData.id}`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postData),
    }
  );
  return response.json();
};

const EditPostForm = ({ post }) => {
  const [title, setTitle] = useState(post.title);
  const [body, setBody] = useState(post.body);

  const [mutate] = useMutation(updatePost, {
    onSuccess: () => {
      queryCache.refetchQueries('posts');
    },
  });

  const handleSubmit = async e => {
    e.preventDefault();
    await mutate({ ...post, title, body });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="Title"
      />
      <textarea
        value={body}
        onChange={e => setBody(e.target.value)}
        placeholder="Body"
      />
      <button type="submit">Update Post</button>
    </form>
  );
};

export default EditPostForm;
