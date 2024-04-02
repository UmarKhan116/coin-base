const express = require("express");
const dbConnect = require("./database/index");
const {port} = require('./config/index')
const router = require('./routes/index')
const errorHandler = require('./middleware/errorHandler')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser');
const cors = require('cors')

const corsOptions = {
  credentials: true,
origin: ["http://localhost:3000"]
}

const app = express();

app.use(cookieParser());
app.use(cors(corsOptions));

app.use(bodyParser.json());

app.use(router)

dbConnect();

app.use('/storage', express.static('storage'))

app.use(errorHandler);

app.listen(port, () => {
  console.log(`listining on port ${port}`);
});
