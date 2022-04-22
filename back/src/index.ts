import express from "express";
import cors from "cors";
import helmet from "helmet";
import routes from "./routes/index";

const app = express();
const corsOptions = {
  origin: "http://localhost:3000",
};
const PORT = process.env.PORT || 4000;
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());

async function main() {
  app.get("/", (_, res) => {
    res.json({ message: "Welcome to bezkoder application." });
  });

  app.use("/", routes);

  app.listen(PORT, () => {
    console.log(`Server is up and running on port ${PORT}.`);
  });
}

main().catch((e) => {
  throw e;
});
