const csvWriterCreator = require('csv-writer').createObjectCsvWriter;

type Item = {
    price: number,
    url: string,
    date: string
}

function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

function sortContent(content: Array<Item>) {
    content.sort((a, b) => { return a.price - b.price });
    return content.length <= 3 ? content : content.slice(0, 3); 
}

function parseString(str: string) {
    const priceStr = str.split('$')[1];
    const string = priceStr.includes(',') ? priceStr.split(',').join('') : priceStr;
    const priceFloat = parseFloat(string); 
    return priceFloat;
}

async function createCSV(content: Array<any>, query: string) {
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
    toCSV: createCSV,
    sortByPrice: sortContent
}