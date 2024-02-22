import express from "express";
import cors from "cors";
import { userRoutes } from "./tasks/infraestructure/taskRoutes";

const app = express();


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/api/users', userRoutes);


const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Corriendo en el puerto ${port}`);
});
