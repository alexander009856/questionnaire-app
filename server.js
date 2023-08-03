const express = require('express');
const app = express();

app.use(express.json())
app.get('/questions', (req, res) => {
    res.status(200).send({
        questionOne:{
            name:"What is the capital of Bulgaria?",
            answer:'Sofia'
        }
    })
});



app.listen(8080, () => console.log('Server is running on port 8080...'))