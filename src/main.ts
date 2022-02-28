const playwright = require('playwright');
const { isMainThread, workerData, parentPort } = require('worker_threads');
const worker = require('worker_threads').Worker;
var { pause, stringParser, toCSV, sortByPrice } = require('./helpers');

/**
 * Root function
 * Handles worker threads
 */
(async function main() {
    if(isMainThread) {
        return new Promise(async (resolve, reject) => {
            for(let i = 0; i < 3; i++) {
                await pause(3000);
                let thread = new worker(__filename, {
                    workerData: i
                });

                thread.on('message', (res: any) => resolve(res));
                thread.on('error', (e: any) => reject(e));
                thread.on('exit', (res: any) => resolve(res));
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

/**
 * Handles logic for CSV file creation
 * @param query 
 */
async function getCSV(query: string) {
    let content = [];
    let i = 0;
    let erroredOut = false;
    
    //For each item on the first page of search results
    while(!erroredOut) {
        let item;
        try {
            item = await getItem(i, query);
            
            //Exclude items without a core price
            if(item.price) {
                item.price = stringParser(item.price);
                content.push(item);
            }
        } catch(e) {
            erroredOut = true;
        }

        i++;
    }
    
    let res = sortByPrice(content);
    await toCSV(res, query); 
}

/**
 * Handles all playwright.js logic in fetching an item from amazon.com
 * @param index - used to identify the nth item in the search results
 * @param query 
 * @param browserType 
 * @returns 
 */
async function getItem(index: number, query: string, browserType = 'chromium') {
    
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
      
      const url = page.url();
      let price;

      try {
          price = await page.locator('.apexPriceToPay:visible').last().textContent({timeout: 15000});
      } catch(e) {
          price = undefined;
      }
      const date = new Date(Date.now())
                    .toLocaleString('en-US', { timeZone: 'EST' })
                    .split(',')[0];
      obj = {
        price,
        date,
        url
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