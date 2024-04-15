require('dotenv').config();
const expres =  require("express")
const app =  expres()
const bodyParser =  require('body-parser');

const Port =  8000





app.use(bodyParser.json());
app.listen(Port , () => {
    console.log(`server is running at port: ${Port}`);

});










