let allPosts = [];
let activeTag = null;

fetch("posts.json")
  .then((res) => res.json())
  .then((data) => {
    allPosts = data;
    renderTags(data);
    renderPosts(data);
  });

function renderTags(posts) {
  const tagSet = new Set();
  posts.forEach((post) => {
    post.tags?.forEach((tag) => tagSet.add(tag));
  });

  const tagList = document.getElementById("tag-list");
  tagSet.forEach((tag) => {
    const button = document.createElement("button");
    button.textContent = `#${tag}`;
    button.addEventListener("click", () => {
      if (activeTag === tag) {
        activeTag = null;
        button.classList.remove("active");
        renderPosts(allPosts);
      } else {
        activeTag = tag;
        document.querySelectorAll(".tags button").forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");
        renderPosts(allPosts.filter((p) => p.tags?.includes(tag)));
      }
    });
    tagList.appendChild(button);
  });
}

function renderPosts(posts) {
  const container = document.getElementById("posts");
  container.innerHTML = "";
  posts.forEach((post) => {
    const div = document.createElement("div");
    div.className = "post";
    div.innerHTML = `
      <h2><a href="post.html?id=${post.id}">${post.title}</a></h2>
      <div class="date">${post.date}</div>
      <p>${post.content.slice(0, 150)}...</p>
    `;
    container.appendChild(div);
  });
}
