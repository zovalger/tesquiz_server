import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";


import StudentRoute from './routes/Student.routes'
import AdminRoute from './routes/Admin.routes';
import UsersRoute from './routes/UsersF.routes';
import ClassRoute from './routes/Class.routes';



// ****************************************************************************
// 										           Inicio de App
// ****************************************************************************

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());



app.get("/", (_req, res) => {
	res.send("API is running....");
});



// ****************************************************************************
// 										             Middleware api
// ****************************************************************************

app.use("/api", StudentRoute);
app.use("/api", AdminRoute);
app.use("/api", UsersRoute);
app.use("/api", ClassRoute);

// ****************************************************************************
// 										          
// ****************************************************************************


export default app;
