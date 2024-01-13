function formatTimestamp(timestamp: string) {
    const date = new Date(timestamp);

    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    const formattedDay = day < 10 ? `0${day}` : day;
    const formattedMonth = month < 10 ? `0${month}` : month;

    const formattedDate = `${formattedDay}/${formattedMonth}/${year}`;

    return formattedDate;
}

function formatRupiah(amount: string) {
    const numericAmount = parseFloat(amount);

    if (isNaN(numericAmount)) {
        console.error('Invalid numeric value');
        return '';
    }

    const formattedAmount = numericAmount.toLocaleString('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });

    return formattedAmount;
}

function formatDate(tanggalString: string) {
    const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];

    const options: any = { weekday: 'long', day: 'numeric', month: 'numeric', year: 'numeric' };
    const tanggal = new Date(tanggalString);

    const hari = days[tanggal.getDay()];
    const tanggalFormat = tanggal.toLocaleDateString('id-ID', options);

    const [tanggalPart, bulanPart, tahunPart] = tanggalFormat.split('/');
    const formattedTanggal = `${tanggalPart}-${bulanPart.padStart(2, '0')}-${tahunPart}`;

    return formattedTanggal;
}

function generateRandomString(length: number) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let randomString = '';

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        randomString += characters.charAt(randomIndex);
    }

    return randomString;
}

function formatYearToDay(timestamp: string) {
    // Ubah string timestamp ke objek Date
    const tanggal = new Date(timestamp);

    // Ambil tahun, bulan, dan tanggal dari objek Date
    const tahun = tanggal.getFullYear();
    const bulan = (tanggal.getMonth() + 1).toString().padStart(2, '0'); // Tambah '0' di depan jika bulan kurang dari 10
    const tanggalStr = tanggal.getDate().toString().padStart(2, '0'); // Tambah '0' di depan jika tanggal kurang dari 10

    // Bentuk kembali string dengan format yang diinginkan
    const tanggalHasil = `${tahun}-${bulan}-${tanggalStr}`;

    return tanggalHasil;
}

function convertPercentage(angka: string): string {
    // Ubah string angka ke bentuk desimal
    const nilaiDesimal: number = parseFloat(angka);

    // Pastikan nilaiDesimal adalah angka
    if (isNaN(nilaiDesimal)) {
        return 'Format input tidak valid';
    }

    // Ubah nilaiDesimal menjadi persentase tanpa angka desimal
    const nilaiPersentase: number = parseInt(nilaiDesimal.toString());

    // Bentuk kembali string dengan format persentase
    const hasil: string = `${nilaiPersentase}%`;

    return hasil;
}

export { formatTimestamp, formatRupiah, formatDate, generateRandomString, formatYearToDay, convertPercentage };
