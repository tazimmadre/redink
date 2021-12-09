const db= require("./db");
const express= require("express");
const app=express();
app.use(express.json());

// const router= express.Router();
app.get("/posts", (req, res) => {
  db.execute("SELECT * from blogs")
    .then(([rows, fieldData]) => {
      console.log(rows);
      res.status(200).send({ message: "Success", data: rows });
    })
    .catch((e) => console.log(e));
});
app.get("/posts/:id", (req, res) => {
  const id = req.params.id;
    db.execute("SELECT * from blogs WHERE blogs.author_id=?", [id])
      .then(([rows, fieldData]) => {
        console.log(rows);
        res.status(200).send({ message: "Success", data: rows });
      })
      .catch((e) => console.log(e));
});
app.get("/post/:id", (req, res) => {
  const id=req.params.id;
    db.execute("SELECT * from blogs WHERE blogs.id=?",[id])
    .then(([rows, fieldData]) => {
      console.log(rows);
      res.status(200).send({ message: "Success", data: rows });
    })
    .catch((e) => console.log(e));
});
app.post("/post", (req, res) => {
    const { title, description,author_id } = req.body;

  db.execute('INSERT INTO blogs (title,description,author_id) VALUES (?,?,?)',[title,description,author_id])
    .then(([rows, fieldData]) => {
      console.log(rows);
      res.status(201).send({ message: "Success", data: rows });
    })
    .catch((e) => console.log(e));
});

app.put("/post/:id", (req, res) => {
  const id=req.params.id;
  const {title,description}=req.body;
  db.execute(
    'UPDATE blogs SET title=?,description=? WHERE id=?',[title,description,id]
  )
    .then(([rows, fieldData]) => {
      console.log(rows);
      res.status(201).send({ message: "Success", data: rows });
    })
    .catch((e) => console.log(e));
});
app.delete("/post/:id", (req, res) => {
  const id = req.params.id;
  db.execute("DELETE from blogs WHERE id=?", [id])
    .then(() => {
      res.status(200).send({ message: "Success" });
    })
    .catch((e) => console.log(e));
});
app.listen(3000,()=>console.log("App is Listening on Port 3000"));