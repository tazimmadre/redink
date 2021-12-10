const db= require("./db");
const express= require("express");
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const app=express();
app.use(express.json());

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
    .then(() => {
      db.execute("SELECT * FROM authors WHERE authors.id!=?", [author_id])
        .then(([rows]) => {
          console.log(rows);
          rows.map(x=>{
          const msg = {
            to: `${x.email}`, // Change to your recipient
            from: "tazimmadre5041@gmail.com", // Change to your verified sender
            subject: "New Post is HERE",
            text: "CHeckout the new Post",
            html: `<strong>CHeckout the new Post ${x.username}</strong>`,
          };
          sgMail
            .send(msg)
            .then(() => {
              console.log("Email sent");
            })
            .catch((error) => {
              console.error(error);
            });
          })
        })
        .catch((e) => console.log(e));
      res.status(201).send({ message: "Success" });
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