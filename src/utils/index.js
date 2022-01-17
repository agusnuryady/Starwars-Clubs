export const NumberToCurrency = (angka) => {
    let number_string = angka?.toString(),
    split = number_string.split(','),
    sisa = split[0].length % 3,
    rupiah = split[0].substr(0, sisa),
    ribuan = split[0].substr(sisa).match(/\d{3}/gi);

    // tambahkan titik jika yang di input sudah menjadi angka ribuan
    if (ribuan) {
        let separator = sisa ? '.' : '';
        rupiah += separator + ribuan.join('.');
    }

    rupiah = split[1] != undefined ? rupiah + ',' + split[1] : rupiah;
    return  'Rp' + rupiah;
};

export const DateFormatID = (strDate) => {
    const strSplitDate = String(strDate).split(' ');
    const date = new Date(strSplitDate[0]);
    const bulans = ['Januari', 'Februari', 'Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','November','Desember'];
    const tanggal = date.getDate();
    const xbulan = date.getMonth();
    const xtahun = date.getYear();
    const bulan = bulans[xbulan];
    const tahun = (xtahun < 1000)?xtahun + 1900 : xtahun;
    return tanggal + ' ' + bulan + ' ' + tahun
}