const db= require("./db");
const express= require("express");
const postController=require("./controllers/postsController");

const app=express();
app.use(express.json());

app.get("/posts",postController.getposts);
app.get("/posts/:id", postController.getpostsbyId);
app.get("/post/:id", postController.getpost);
app.post("/post", postController.createpost);
app.put("/post/:id", postController.updatepost);
app.delete("/post/:id", postController.deletepost);


app.listen(3000, () =>
   console.log("App is Listening on Port 3000"));