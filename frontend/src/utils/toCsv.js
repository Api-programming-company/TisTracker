const transformToCSV = (data) => {
    console.log(data);
    const headers = Object.keys(data[0]);
    const rows = data.map(row => Object.values(row).join(',')).join('\n');

    return [headers.join(','), rows].join('\n');
}
const downloadCsv = (data,name) => {
    const csv = Array.isArray(data) && data.length ? transformToCSV(data) : data;
    console.log(csv);

    // Crear un Blob con los datos separados por comas en csv
    const blob = new Blob([csv], {type: 'text/pdf'});

    // Crear una url para el Blob
    const url = URL.createObjectURL(blob);


    // Crear un anchor para descargar
    const a = document.createElement("a")

    // Definir la url y el attributo para descargar
    a.href = url;
    a.download = `${name.trim()}.csv`

    // Lanzar la descarga
    a.click();
}

export {downloadCsv}