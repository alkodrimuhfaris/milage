import {Waktu, Tmbh, Line} from "./src/function.js";

const waktu = [];
const v = [];
const vdot = [];
const line = [];
let jarakTotal = 0;
let dtnilai = [];
let dtsatuan = [];
let dv = [];

//deklarasi iterator
let indxLine = 0;
let indxDot = 0;

//input rentang waktu awal ketika mobil melaju
dtnilai = [ 5,10 ];
dtsatuan = [ 'm', 'm' ];

//input awal dv mobil
dv = [ 0, 2 ];
vdot[indxDot] = 6; //satuan: m/s

//input waktu mobil berangkat
waktu[indxDot] = new Waktu ("10:12:21");


//input dT awal (5 menit pertama)
for (let i=0; i<=1; i++) {

    //penambahan komponen dot yang berisi keterangan waktu dan waktu yang disederhanakan dalam detik
    waktu[indxDot+1] = new Tmbh(dtnilai[indxLine], dtsatuan[indxLine]).wkt();
    indxDot++;

    //pendefinisian komponen perubahan kecepatan dan komponen kecepatan
    dv[indxLine] = dv[i]; //satuan: m/s
    vdot[indxDot]=vdot[indxDot-1]+dv[indxLine];
    v[indxLine] = vdot[indxDot];

    //penambahan komponen line yang menghubungkan tiap titik berisi komponen kecepatan, jarak, dan rentang waktu
    line[indxLine] = new Line(v[indxLine]);
    jarakTotal += line[indxLine].jarak;
    indxLine++;
}

/******kenaikan kecepatan 1m/s setiap 10 menit*****/

//input waktuAkhir ketika mobil telah sampai
let waktuAkhir = new Waktu("12:00:00");

//pendefinisian deltaT sebagai selisih waktu mobil berhenti dan waktu kecepatan mobil mulai meninggi
let deltaT = waktuAkhir.tinS - waktu[indxDot].tinS;


//konversi rentang waktu 10 menit menjadi detik, simpan dalam const delta
let delta = 10*60; //satuan: s

//pendefinisian perubahan kecepatan
let dvRise = 1;// satuan: m/s

//pendefinisian perubahan tiap waktu
let dtRise = 10;
let dtSatuanRise = 'm';

//perulangan untuk mendapatkan jarak sampai mobil berhenti pukul 12:00:00
for (let i=deltaT; i>=0; i-=delta) {
    if (i>=delta) {
        dtnilai[indxLine] = dtRise;
        dtsatuan[indxLine] = dtSatuanRise;

        //penambahan komponen dot yang berisi keterangan waktu dan nilai waktu yang dikonversi dalam detik
        waktu[indxDot+1] = new Tmbh(dtnilai[indxLine], dtsatuan[indxLine]).wkt();
        indxDot++;

        //pendefinisian komponen perubahan kecepatan dan komponen kecepatan
        dv[indxLine] = dvRise; //satuan: m/s
        vdot[indxDot]=vdot[indxDot-1]+dv[indxLine];
        v[indxLine] = vdot[indxDot];
        
        //penambahan komponen line yang menghubungkan tiap titik berisi komponen jarak, dan rentang waktu
        line[indxLine] = new Line(v[indxLine]);

        //penambahan jarak total
        jarakTotal += line[indxLine].jarak;
        indxLine++;
    }

    else {
        dtnilai[indxLine] = i;
        dtsatuan[indxLine] = 's';

        //penambahan komponen dot yang berisi keterangan waktu dan waktu yang disederhanakan dalam detik
        waktu[indxDot+1] = new Tmbh(dtnilai[indxLine], dtsatuan[indxLine]).wkt();
        indxDot++;

        //pendefinisian komponen perubahan kecepatan dan komponen kecepatan
        dv[indxLine] = dvRise; //satuan: m/s
        vdot[indxDot]=vdot[indxDot-1]+dv[indxLine];
        v[indxLine] = vdot[indxDot];

        //penambahan komponen line yang menghubungkan tiap titik berisi komponen kecepatan, jarak, dan rentang waktu
        line[indxLine] = new Line(v[indxLine]);

        //penambahan jarak total
        jarakTotal += line[indxLine].jarak;
        indxLine++;
    }
}

console.log("jarak tempuh total mobil adalah "+jarakTotal+" m, atau sejauh "+(jarakTotal/1000)+" km");

export {indxDot, indxLine, v, dv, waktu};
