const http = require("http");
const fs = require("fs");

const port = 8000;

function onRequest(req, res) {
  switch (req.url) {
    case "/":
      res.writeHead(200);
      req.url = "index.html";
      break;
    case "/cars":
      res.writeHead(200);
      req.url = "cariMobil.html"; // mengambil page dari cariMobil.html
      break;
  }

  //mengambil file path yang ada di public
  let path = "public/" + req.url;
  fs.readFile(path, (err, data) => {
    res.writeHead(200);
    res.end(data);
  });
}
const server = http.createServer(onRequest);

server.listen(port, "localhost", () => {
  console.log("Server Sudah Berjalan , Silahkan dibuka ");
});
