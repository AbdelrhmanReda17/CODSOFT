const  express =  require("express");
const  mongoose =  require("mongoose");
const  cors =  require("cors");
const  dotenv =  require("dotenv");

const app = express();
dotenv.config();

//Routes
const projectsRoutes = require("./routes/project.js");
const authRoutes = require("./routes/auth.js");

// Middlewares
app.use(express.json({ limit: "30mb" }));
app.use(express.urlencoded({ extended: true, limit: "30mb" }));
app.use(cors());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.use("/projects", projectsRoutes);
app.use("/auth", authRoutes);

// Mongose DB
const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () => console.log(`Server Runnging on port :  ${PORT}`))
  )
  .catch((err) => console.log(err.message));
