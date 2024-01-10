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

    // Mendapatkan format tanggal dd-mm-yyyy
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

export { formatTimestamp, formatRupiah, formatDate, generateRandomString };
