var express = require('express');
var http = require('http');
var path = require('path');
var nodemailer = require('nodemailer');
// const confirmationMessage = localStorage.getItem('confirmationMessage');
// const confirmationMessage = window.sharedData.confirmationMessage;
// console.log(confirmationMessage);


var app = express();
var server = http.Server(app);
var port = 80;

app.set("port", port);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the current directory
app.use(express.static(__dirname));

// Routing
app.get("/", function (req, response) {
    response.sendFile(path.join(__dirname, "index.html"));
});

// Sending mail
app.post("/send_email", function (req, response) {
    var name = req.body.name;
    var from = 'itsshowtimesite@gmail.com';
    var to = req.body.to;
    var subject = 'Movie Ticket Confirmed';
    var message = `Hello ${name} your tickets have been successfully booked`;

    console.log('From:', from);
    console.log('To:', to);
    console.log('Subject:', subject);
    console.log('Message:', message);

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'itsshowtimesite@gmail.com',
            pass: 'dlykdoilvzcsknwy'
        }
    });

    var mailOptions = {
        from: from,
        to: to,
        subject: subject,
        text: message
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log("Email Sent: " + info.response);
        }
        // response.redirect("/");
    });
});

// Initialize Web Server
server.listen(port, function () {
    console.log("Starting Server on port: " + port);
});
