// AddPostForm.js
import React, { useState } from 'react';
import { useMutation, queryCache } from '@tannerlinsley/react-query';

const createPost = async postData => {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(postData),
  });
  return response.json();
};

const AddPostForm = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const [mutate] = useMutation(createPost, {
    onSuccess: () => {
      queryCache.refetchQueries('posts');
    },
  });

  const handleSubmit = async e => {
    e.preventDefault();
    await mutate({ title, body });
    setTitle('');
    setBody('');
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
      <button type="submit">Add Post</button>
    </form>
  );
};

export default AddPostForm;
