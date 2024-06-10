// PatchTitleForm.js
import React, { useState } from 'react';
import { useMutation, queryCache } from '@tannerlinsley/react-query';

const patchPostTitle = async postData => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${postData.id}`,
    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title: postData.title }),
    }
  );
  return response.json();
};

const PatchTitleForm = ({ post }) => {
  const [title, setTitle] = useState(post.title);

  const [mutate] = useMutation(patchPostTitle, {
    onSuccess: () => {
      queryCache.refetchQueries('posts');
    },
  });

  const handleSubmit = async e => {
    e.preventDefault();
    await mutate({ ...post, title });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="Title"
      />
      <button type="submit">Update Title</button>
    </form>
  );
};

export default PatchTitleForm;
