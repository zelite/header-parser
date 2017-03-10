var express = require("express");
var helmet = require("helmet");
var path = require("path");

var app = express();
app.use(helmet());

app.enable('trust proxy');

app.get("/", function(request, response){
  response.sendFile(path.join(__dirname, "public", "index.html"));
});

function getOSInfoFromHeaders(headers){
    var userAgent = headers["user-agent"];
    var os = userAgent.slice(userAgent.indexOf("(")+1, userAgent.indexOf(")"));
    return os;
}

app.get("/whoami", function(request, response){
    var ip = request.ip;
    var language = request.acceptsLanguages()[0];
    var software = getOSInfoFromHeaders(request.headers);
    var responseObject = {
        ip: ip,
        language: language,
        software: software
    };
    response.send(responseObject);
});



app.listen(process.env.PORT);