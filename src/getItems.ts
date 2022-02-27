const playwright = require('playwright');
const csvWriterCreator = require('csv-writer').createObjectCsvWriter;
var { isMainThread, workerData, parentPort } = require('worker_threads');
const worker = require('worker_threads').Worker;


function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

(async function main() {
    if(isMainThread) {
        return new Promise(async (resolve, reject) => {
            for(let i = 0; i < 3; i++) {
                await sleep(3000);
               let thread = new worker(__filename, {
                   workerData: i
               });

            thread.on('message', (res) => resolve(res));
            thread.on('error', (e) => reject(e));
            thread.on('exit', (res) => resolve(res));
            }
        });
    } else {
        console.log(workerData)
        switch(workerData) {
            case 0:
                await getCSV('nvidia 3060');
                parentPort.postMessage('Complete');
                break;
            case 1:
                await getCSV('nvidia 3070');
                parentPort.postMessage('Complete');
                break;
            case 2:
                await getCSV('nvidia 3080')
                parentPort.postMessage('Complete');
                break;
            default: 
                console.log('Errored out')
                throw new Error();
        }
    }
})();

function parseString(str) {
    const priceStr = str.split('$')[1];
    const string = priceStr.includes(',') ? priceStr.split(',').join('') : priceStr;
    const priceFloat = parseFloat(string); 
    return priceFloat;
}

async function getCSV(query) {
    let content = [];
    let i = 0;
    let erroredOut = false;
    
    while(!erroredOut) {
        let item;
        try {
            item = await getItem(i, query);
            
            if(item.price) {
                item.title = item.title.split(':')[1];
                item.price = parseString(item.price);
                content.push(item);
            }
        } catch(e) {
            erroredOut = true;
        }

        i++;
    }
    
    i = 0;
    content.sort((a, b) => { return a.price - b.price });
    let res = content.length <= 3 ? content : content.slice(0, 3); 
    await createCSV(res, query); 
}

async function createCSV(content, query) {
    const csvWriter = csvWriterCreator({
        path: `../outputCsv/${query}_search.csv`,
        header: [
            {id: 'title', title: 'TITLE'},
            {id: 'price', title: 'PRICE'},
            {id: 'date', title: 'DATE'}
        ]
    });

    await csvWriter.writeRecords(content);
    console.log('CSV document has been written to folder outputCsv');
}

async function getItem(index, query, browserType = 'chromium') {
    
    const browser = await playwright[browserType].launch();
    const context = await browser.newContext();
    const page = await context.newPage();
    let obj;
    
    // Go to https://www.amazon.com/
    await page.goto('https://www.amazon.com/');
    
    // Click Search bar
    await page.locator('[aria-label="Search"]').click();
    
    // Fill Search bar
    await page.locator('[aria-label="Search"]').fill(query);
    
    // Press Enter
    await Promise.all([
      page.waitForNavigation(),
      page.locator('[aria-label="Search"]').press('Enter')
    ]);
  
    

    try {
      // Click img
      await Promise.all([
        page.waitForNavigation(),
        page.locator('img.s-image').nth(index).click()
      ]);
      
      const title = await page.locator('title').textContent();
      
      let price;
      try {
          price = await page.locator('.apexPriceToPay:visible').last().textContent({timeout: 15000});
      } catch(e) {
          price = undefined;
      }
      const date = new Date(Date.now())
                    .toLocaleString('en-GB', { timeZone: 'UTC' })
                    .split(',')[0];
      obj = {
        title,
        price,
        date 
      };

      //return to original search
      await browser.close();
      return obj;
    } catch (e) {
        console.log(e);
        await browser.close();
        throw new Error('No items found in search');
    }    
}

module.exports = {
    createCSV,
    getItem
}