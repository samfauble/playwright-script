const csvWriterCreator = require('csv-writer').createObjectCsvWriter;

function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

function parseString(str) {
    const priceStr = str.split('$')[1];
    const string = priceStr.includes(',') ? priceStr.split(',').join('') : priceStr;
    const priceFloat = parseFloat(string); 
    return priceFloat;
}

async function createCSV(content, query) {
    const csvWriter = csvWriterCreator({
        path: `../outputCsv/${query}_search.csv`,
        header: [
            {id: 'price', title: 'PRICE'},
            {id: 'date', title: 'DATE'},
            {id: 'url', title: 'URL'}
        ]
    });

    await csvWriter.writeRecords(content);
    console.log('CSV document has been written to folder outputCsv');
}

module.exports = {
    pause: sleep,
    stringParser: parseString,
    toCSV: createCSV
}