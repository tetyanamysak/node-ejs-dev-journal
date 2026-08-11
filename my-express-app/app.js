import express from "express";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3030;

const postsFile = path.join(__dirname, "posts.json");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

function getPosts() {
  const data = fs.readFileSync(postsFile, "utf8");
  return JSON.parse(data);
}

function savePosts(posts) {
  fs.writeFileSync(postsFile, JSON.stringify(posts, null, 2));
}

app.get("/", (req, res) => {
  const posts = getPosts();

  res.render("index.ejs", {
    title: "My Express App",
    message: "Welcome to My Blog!",
    posts: posts,
  });
});

app.get("/post/:id", (req, res) => {
  const posts = getPosts();
  const requestedId = parseInt(req.params.id);

  const foundPost = posts.find((post) => post.id === requestedId);

  if (foundPost) {
    res.render("post", {
      post: foundPost,
    });
  } else {
    res.status(404).render("error/404", {
      title: "Post Not Found",
      message: "This article doesn't exist",
    });
  }
});

app.get("/post/:id/edit", (req, res) => {
  const posts = getPosts();
  const requestedId = parseInt(req.params.id);

  const foundPost = posts.find((post) => post.id === requestedId);

  if (foundPost) {
    res.render("edit-post", {
      post: foundPost,
    });
  } else {
    res.status(404).render("error/404", {
      title: "Post Not Found",
      message: "This article doesn't exist",
    });
  }
});

app.post("/post/:id/edit", (req, res) => {
  const posts = getPosts();
  const requestedId = parseInt(req.params.id);

  const postIndex = posts.findIndex(
    (post) => post.id === requestedId
  );

  if (postIndex === -1) {
    return res.status(404).render("error/404", {
      title: "Post Not Found",
      message: "This article doesn't exist",
    });
  }

  posts[postIndex].title = req.body.title;
  posts[postIndex].content = req.body.content;
  posts[postIndex].updatedAt = new Date().toISOString();

  const newExcerpt = req.body.content.substring(0, 100).trim() + "...";
  posts[postIndex].excerpt = newExcerpt;

  savePosts(posts);

  res.redirect(`/post/${requestedId}`);
});

app.use((req, res) => {
  res.status(404).render("error/404", {
    title: "404 - Not Found",
    message: "Page Missing",
  });
});

app.listen(PORT, () => {
  console.log(`✅ Success! My blog is live at http://localhost:${PORT}`);
});