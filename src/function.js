import {indxDot, indxLine, v, dv, waktu} from "../app.js";

let j=0; let temp = ""; 
let k=0; let d=0; let h=0; let m=0; let s=0;

//fungsi untuk menambahkan komponen dot/waktu di aplikasi
//parameter yang dibutuhkan hanya string time dengan format "hh:mm:ss"
function Waktu (time) {
    //definisi ulang variabel agar tidak tersangkut dengan variabel global
    let j=0; let temp = ""; 
    let k=0; let d=0; let h=0; let m=0; let s=0;

    //proses pengubahan string menjadi number dengan memanfaatkan equal value
    for (let i=0; i <= time.length; i++) {
        if(i===time.length||time[i]===":"){
            //variabel temp menyimpan nilai string, kemudian nilainya disebandingkan dengan variabel k yang menyimpan nilai number
            //dilakukan iterasi inkremental terhadap k
            while (k!=temp) {
                k++;
            }
            
            //ketika j=0, maka nilai hh "hh:mm:ss" akan disimpan sebagai nilai h(jam)
            if (j===0) {
                h = k;
            }

            //ketika j=1, maka nilai mm "hh:mm:ss" akan disimpan sebagai nilai m(menit)
            else if(j===1){
                m = k;
            }

            //ketika j=2, maka nilai ss "hh:mm:ss" akan disimpan sebagai nilai s(detik)
            else if(j===2){
                s = k;
            }
            j++;
            temp = "";
            k=0;
        }

        //nilai temp akan menyimpan nilai string dari satu per satu
        else{
            temp+=time[i];
        }
    }
    
    //format penulisan waktu yang disesuaikan dan disimpan dalam properti d (hari), h (jam), m (menit), dan s (detik)
    this.tinS = d*86400+h*3600+m*60+s;
    this.d=(this.tinS-(this.tinS%86400))/86400;
    this.h=(this.tinS-(this.tinS%3600))/3600 - (this.d*24);
    this.m=(this.tinS-(this.tinS%60))/60 - ((this.h*60)+(this.d*1440));
    this.s=this.tinS - ((this.m*60)+(this.h*3600)+(this.d*86400));
        
}

//fungsi Tmbh mengembalikan nilai string berupa waktu yang kemudian dipindah ke dalam fungsi Waktu
function Tmbh(nilai, satuan) {
    let h=0; let m=0; let s=0;
    if (satuan === "h") {
        h = waktu[indxDot].h + nilai;
        m = waktu[indxDot].m;
        s = waktu[indxDot].s;
    }
    else if (satuan === "m") {
        h = waktu[indxDot].h;
        m = waktu[indxDot].m + nilai;
        s = waktu[indxDot].s;
    }
    else {
        h = waktu[indxDot].h;
        m = waktu[indxDot].m;
        s = waktu[indxDot].s + nilai;
    }
    //fungsi Tmbh akan mengeluarkan nilai string time
    this.time = h+":"+m+":"+s;
    
    //fungsi wkt() akan mengembalikan nilai time menjadi nilai waktu yang telah distandarisasi
    this.wkt = function() {
        return new Waktu(this.time);
    }
}

//fungsi untuk menghitung jarak, kecepatan dan
function Line (v) {
    this.dT = waktu[indxDot].tinS - waktu[(indxDot-1)].tinS;
    this.jarak = v*this.dT;
}


export {Waktu, Tmbh, Line};