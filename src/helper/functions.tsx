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

export { formatTimestamp, formatRupiah };
