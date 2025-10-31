import express from "express"

const app = express()
const port = 3000

const posts = [
  {
    title: "My First Blog Post",
    text: "This is my first post! Excited to start sharing my thoughts here."
  },
  {
    title: "A Day in College",
    text: "Had an amazing day at St. Joseph! Attended a hackathon and learned so much about web accessibility."
  },
  {
    title: "Weekend Vibes",
    text: "Spent my weekend coding a new project and playing with my cat Sara 😸."
  },
  {
    title: "Learning Express and EJS",
    text: "EJS templates make it so easy to connect front-end forms with backend routes using Express!"
  }
];

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended:
   true }));
app.use(express.static("public"));

app.get('/',(req,res)=>{
  res.render("index");
})

app.get('/compose',(req,res)=>{
  res.render("compose.ejs");
})
app.get('/posts',(req,res)=>{
  res.render("posts.ejs",{
    posts:posts
  });
})

app.get('/posts/:index',(req,res)=>{
  const ind = req.params.index;
  const post = posts[ind];
  res.render("read.ejs",{post:post});
})

app.post('/submit', (req, res) => {
  const post = {
    title : req.body['title'],
    content : req.body['text']
  }
  console.log(post.title, post.content);
  posts.push(post);
  res.redirect("/posts");
});

app.listen(port,()=>{
  console.log(`Running on ${port}`);
})