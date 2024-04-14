require('dotenv').config();
const expres =  require("express")
const app =  expres()
const bodyParser =  require('body-parser');
const database =  require("./db/connection")
const Port =  8000





app.use(bodyParser.json());
app.listen(Port , () => {
    console.log(`server is running at port: ${Port}`);
    database

});










