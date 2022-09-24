const http = require("http");
const fs = require("fs");
const port = 8000;

function onRequest(req, res) {
  switch (req.url) {
    case "/": //saat membuka localhost:8000 , maka akan munucl halaman landing page dari index.html
      res.writeHead(200);
      req.url = "index.html";
      break;
    case "/cars": //saat membuka localhost:8000/cars , maka akan muncul halaman page cariMobil.html
      res.writeHead(200);
      req.url = "cariMobil.html";
      break;
  }

  let path = "public/" + req.url; //mengambil data yang ada di public untuk menngirimkan images dll
  fs.readFile(path, (err, data) => {
    res.writeHead(200);
    res.end(data);
  });
}
const server = http.createServer(onRequest);

server.listen(port, "localhost", () => {
  console.log("Server Sudah Berjalan, silahkan buka localhost:8000");
});
