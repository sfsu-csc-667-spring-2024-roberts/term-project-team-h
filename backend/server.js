import express from 'express'
import path from 'path'
import {projectRoot} from './utility/pathUtils.js'
import httpErrors from 'http-errors';
import rootroutes from './routes/root.js'
import {requestTime} from "./middleware/request-time.js"
import createHttpError from 'http-errors';

const app = express();
const PORT = process.env.PORT || 3000

app.set('views', path.join(projectRoot, 'backend', 'views'));
app.set("view engine", "ejs");

app.use(requestTime) //show how to create middleware

app.use(express.static(path.join(projectRoot, "backend", "public")))


//all routeroutes endpoints are relative to "/"
//can change to "/users" ... etc. 
app.use("/", rootroutes)

app.use((req, res, next) => { //for troubleshooting
    console.log(`Unhandled request path: ${req.path}`);
    next(createHttpError(404));
  });

app.use((request, response, next) => {
    next(createHttpError(404))
})

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`)
})