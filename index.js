const fs = require("fs");
const http = require("http");
let port = 3000;

process.argv.forEach((arg) => {
  if (arg.startsWith("--port=")) {
    port = parseInt(arg.split("=")[1], 10);
  }
});

let homeContent = "";
let projectContent = "";
let registrationContent = "";

fs.readFile("home.html", (err, home) => {
  if (err) {
    throw err;
  } else {
    homeContent = home;
  }
});

fs.readFile("project.html", (err, project) => {
  if (err) {
    throw err;
  } else {
    projectContent = project;
  }
});

fs.readFile("registration.html", (err, registration) => {
  if (err) {
    throw err;
  } else {
    registrationContent = registration;
  }
});

http
  .createServer((req, res) => {
    let url = req.url;
    res.writeHead(200, { "Content-Type": "text/html" });
    switch (url) {
      case "/project":
        res.write(projectContent);
        res.end();
        break;
      case "/registration":
        res.write(registrationContent);
        res.end();
        break;
      default:
        res.write(homeContent);
        res.end();
        break;
    }
  })
  .listen(port, () => {
    console.log(`Server is running at http://localhost:${port}/`);
});