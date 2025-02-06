const express = require("express");
const app = express();

require('dotenv').config();
const port = process.env.PORT || 4000;

const bodyParser = require("body-parser");
const cors = require("cors");

const postRoute = require("./routes/post.route");
const commentRoute = require("./routes/comment.route");
const userRoute = require("./routes/user.route");


app.use(cors());
app.use(express.json());

// match GET localhost:4000/
app.get("/", (req, res)=>{
  res.send("Sawasdee");
});


app.use("/posts", postRoute);
// Mount comment routes under /posts/:postId/comments
// app.use('/posts/:postId/comments', commentRoute); 
app.use('/comments', commentRoute); 
app.use('/users', userRoute);

app.listen(port, () => {
  console.log("App started at port: " + port);
});
