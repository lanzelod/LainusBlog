function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

fetch('posts.json')
  .then(res => res.json())
  .then(posts => {
    const postId = getQueryParam('id');
    const post = posts.find(p => p.id === postId);

    const container = document.getElementById('post-content');
    if (!post) {
      container.innerHTML = '<p>Post not found.</p>';
      return;
    }

    container.innerHTML = `
      <h1>${post.title}</h1>
      <div class="date">${post.date}</div>
      <p>${post.content}</p>
    `;
  });
