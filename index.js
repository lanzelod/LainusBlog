let allPosts = [];

function renderPosts(posts) {
  const postsContainer = document.getElementById('posts');
  postsContainer.innerHTML = '';
  posts.forEach(post => {
    const postEl = document.createElement('div');
    postEl.className = 'post';

    postEl.innerHTML = `
      <h2><a href="post.html?id=${post.id}">${post.title}</a></h2>
      <div class="date">${post.date}</div>
      <p>${post.summary}</p>
    `;

    postsContainer.appendChild(postEl);
  });
}

fetch('posts.json')
  .then(res => res.json())
  .then(posts => {
    allPosts = posts;
    renderPosts(allPosts);
  });

document.getElementById('search').addEventListener('input', (e) => {
  const query = e.target.value.toLowerCase();
  const filtered = allPosts.filter(post =>
    post.title.toLowerCase().includes(query) ||
    post.summary.toLowerCase().includes(query) ||
    post.date.includes(query)
  );
  renderPosts(filtered);
});
