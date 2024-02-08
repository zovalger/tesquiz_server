import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import morgan from "morgan";

import SectionRoute from "./routes/Section.routes";
// import ClassRoute from "./routes/Class.routes";
// import QuizRoute from "./routes/Quiz.routes";
// import StudentRoute from "./routes/Student.routes";
// import AdminRoute from "./routes/Admin.routes";
// import UsersRoute from "./routes/UsersF.routes";
// import Report from "./routes/ReportClass.routes";
// import ClassFinishied from "./routes/ClassFinishied.routes";

// ****************************************************************************
// 										           Inicio de App
// ****************************************************************************

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("dev"));

app.get("/", (_req, res) => {
	res.send("API is running....");
});

// ****************************************************************************
// 										             Middleware api
// ****************************************************************************

app.use("/api/sections", SectionRoute);
// app.use("/api", ClassRoute);
// app.use("/api", QuizRoute);

// app.use("/api", StudentRoute);
// app.use("/api", AdminRoute);
// app.use("/api", UsersRoute);
// app.use("/api", Report);
// app.use("/api", ClassFinishied);

// ****************************************************************************
//
// ****************************************************************************

export default app;
