const express = require("express");
const path = require("path");

const app = express();

const port = process.env.PORT || 3000;
let posts = [];
let postId = 0;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, "public")));

// middleware to parse URL -encoded body data ( from HTML forms )
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("home", { posts });
});

app.get("/blog", (req, res) => {
  res.render("blog");
});

app.post("/blog", (req, res) => {
  const title = req.body["title"];
  const blog_content = req.body["blog-content"];
  postId++;

  posts.unshift({
    id: postId,
    title: title,
    content: blog_content,
  });

  res.render("home", { posts });
});

app.get("/edit-post/:id", (req, res) => {
  const id = Number(req.params.id);

  const post = posts.find((post) => post.id === id);
  console.log(post);
  res.render("edit", { post });
  res.status(200);
});

app.post("/update-post/:id", (req, res) => {
  const id = Number(req.params.id);

  const title = req.body.title;
  const blog_content = req.body["blog-content"];

  const post = posts.find((post) => post.id === id);

  post.title = title;
  post.content = blog_content;

  res.render("home", { posts });
});

app.post("/delete-post/:id", (req, res) => {
  const id = Number(req.params.id);

  posts = posts.filter((post) => post.id !== id);

  res.render("home", { posts });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
