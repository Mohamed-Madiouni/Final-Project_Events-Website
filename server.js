const express = require("express");
const connectdb = require("./database");
const multer  = require('multer');
const upload = multer({ dest: 'uploads/' });

connectdb();
const app = express();
app.use(express.json())
app.use("/user",require("./routes/users"))
app.use("/event",require("./routes/events"))
app.use("/admin",require("./routes/admin"));

const PORT = process.env.PORT || 5000
app.listen(PORT, (err) => {
  if (err) console.log(err.message);
  console.log(`server is running on port ${PORT}`);
});
