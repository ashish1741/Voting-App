require('dotenv').config();
const expres =  require("express")
const database =  require("./db/connection")
const app =  expres()
const bodyParser =  require('body-parser');
const UserRouter = require('./routes/UserRoute');

const Port =  8000





app.use(bodyParser.json());
app.use("/api",UserRouter)
app.listen(Port , () => {
    console.log(`server is running at port: ${Port}`);
    database

});










