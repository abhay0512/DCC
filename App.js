const express = require("express");
const app = express();
const port = 3004
const mysql = require("./connection").con
    
app.set("view engine", "hbs");
app.set("views", "./view")
app.use(express.static(__dirname + "/public"))


// Routing
app.get("/", (req, res) => {
    res.render("index")
});
app.get("/add", (req, res) => {
    res.render("add")

});
app.get("/search", (req, res) => {
    res.render("search")

});

app.get("/view", (req, res) => {
    let qry = "select * from test ";
    mysql.query(qry, (err, results) => {
             res.render("view", { data: results });
        });

});


app.get("/addstudent", (req, res) => {
    // fetching data from form
    const { name, srn, Rno, sem, nocourse, course1, course2, course1code,course2code } = req.query
                
                let qry2 = "insert into test values(?,?,?,?,?,?,?,?,?)";
                mysql.query(qry2, [name, srn, Rno, sem, nocourse, course1, course2, course1code,course2code], (err, results) => {
                    if (results.affectedRows > 0) {
                        res.render("add", { mesg: true })
                    }
 
     })
});


app.get("/searchstudent", (req, res) => {
    
    const { srn } = req.query;

    let qry = "select * from test where SRN=?";
    mysql.query(qry, [srn], (err, results) => {
        if (err) throw err
        else {
            if (results.length > 0) {
                res.render("search", { mesg1: true, mesg2: false })
            } else {

                res.render("search", { mesg1: false, mesg2: true })

            }

        }
    });
})




//Create Server
app.listen(port, (err) => {
    if (err)
        throw err
    else
        console.log("Server is running at port %d:", port);
});