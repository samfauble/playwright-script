const playwright = require('playwright');
const csvWriterCreator = require('csv-writer').createObjectCsvWriter;

(async function getCSV() {
    let content = [];
    let i = 11;
    let erroredOut = false;
    let query = `nvidia 10`;
    /*
    while(!erroredOut) {
        let item;
        try {
            item = await getItem(i, 'nvidia');
        } catch(e) {
            erroredOut = true;

        }

        if(item.price) content.push(item);
        i++;
    }
*/

    let item;
    item = await getItem(i, 'nvidia 10');
    if(item.price) content.push(item);
    console.log(content);

    return createCSV(content, query);
})()

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
    console.log('CSV document is written');
}

async function getItem(index, query, browserType = 'chromium') {
    
    const browser = await playwright[browserType].launch();
    const context = await browser.newContext();
    const page = await context.newPage();
    
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
  
    let obj;

      try {
        // Click img
        await Promise.all([
          page.waitForNavigation(),
          page.locator('img.s-image').nth(index).click()
        ]);
        
        const title = await page.locator('title').textContent();
        console.log(title);
        
        let price;
        
        try {
            price = await page.locator('.apexPriceToPay:visible').last().textContent({timeout: 15000});
        } catch(e) {
            price = undefined;
        }

        console.log(price);
        obj = {
          title,
          price,
          date: Date.now()
        }
  
        //return to original search
        await browser.close()
        return obj
      } catch (e) {
          console.log(e);
          await browser.close()
          throw new Error('No items found in search');
      }    
}

module.exports = {
    createCSV,
    getItem
}