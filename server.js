const express = require("express");
const connectdb = require("./database");



connectdb();
const app = express();
app.use(express.json())
app.use("/user",require("./routes/users"))
app.use("/event",require("./routes/events"))
app.use("/admin",require("./routes/admin"));
app.use("/notifications",require("./routes/notifications"))
app.use("/contact",require("./routes/contacts"))
app.use("/chat",require("./routes/chat"))
app.use("/comment",require("./routes/comment"))

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('/*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000
app.listen(PORT, (err) => {
  if (err) console.log(err.message);
  console.log(`server is running on port ${PORT}`);
});
