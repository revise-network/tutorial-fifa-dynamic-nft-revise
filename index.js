const express = require("express");
const app = express();
const PORT = 4000 || process.env.PORT;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.use("/v1", require("./routes"));

app.listen(PORT, () => {
  console.log(`Server is listen on : ${PORT}`);
});
