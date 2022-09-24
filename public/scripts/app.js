class App {
  constructor() {
    // id diambil dari id pada input dan button carimobil.html agar saat diklik tombol caro data tersimpan ke server
    this.loadButton = document.getElementById("cari-btn");
    this.clearButton = document.getElementById("hapus-btn");
    this.filterByTanggal = document.getElementById("input-tanggal");
    this.filterByWaktu = document.getElementById("input-waktu");
    this.filterByPenumpang = document.getElementById("input-penumpang");
    this.carContainerElement = document.getElementById("cars-container");
  }

  async init() {
    await this.load();
    //Register click listener
    this.loadButton.onclick = this.run; //menjalankan aksi cari mobil
    //console.log(this.loadButton); --> mengecek apakah button-load html pada console munucl
    this.clearButton.onclick = this.clear; //menjalankan aksi hapus cari mobil
    //console.log(this.clearButton); -->mengecek apakah button- clear html pada console muncul
  }

  //menjalankan aksi filter saat mengklik tombol cari
  run = () => {
    this.clear();
    const dateValue = this.filterByTanggal.value;
    const timevalue = this.filterByWaktu.value;
    const capacityValue = this.filterByPenumpang.value;

    //membuat variabel baru menggabungkan waktu dan tanggal
    const newDateTime = new Date(`${dateValue} ${timevalue}`);
    const epochTime = newDateTime.getTime();

    //console.log(dateValue, timevalue, capacityValue, newDateTime, epochTime);
    this.load(epochTime, capacityValue);
  };

  //memproses filter yang terjadi
  async load(dateFilter, capacityFilter) {
    const cars = await Binar.listCars((item) => item.available === true && item.capacity >= capacityFilter && item.availableAt >= dateFilter);
    Car.init(cars);
    console.log("car", cars);
    Car.list.forEach((car) => {
      const node = document.createElement("div");
      node.className = "col-4";
      node.innerHTML = car.render();
      this.carContainerElement.appendChild(node);
    });
  }

  //method untuk menjalankan aksi hapus pada button
  clear = () => {
    let child = this.carContainerElement.firstElementChild;

    while (child) {
      child.remove();
      child = this.carContainerElement.firstElementChild;
    }
  };
}
