const playwright = require('playwright');
const csvWriterCreator = require('csv-writer').createObjectCsvWriter;

(async function getCSV() {
    let content = [];
    let i = 15;
    let erroredOut = false;
    let query = `nvidia`;
    

    while(!erroredOut) {
        let item;
        try {
            item = await getItem(i, query);
            if(item.price) {
                const priceStr = item.price.split('$')[1];
                const string = priceStr.includes(',') ? priceStr.split(',').join('') : priceStr;
                const priceFloat = parseFloat(string); 
                item.price = priceFloat;
                console.log(item)
                content.push(item);
            }
        } catch(e) {
            erroredOut = true;
        }

        i++;
    }


    content.sort((a, b) => { return a.price - b.price });
    let res = content.length <= 3 ? content : content.slice(0, 3); 

    console.log(res);
    return await createCSV(res, query);
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
        
        let price;
        try {
            price = await page.locator('.apexPriceToPay:visible').last().textContent({timeout: 15000});
        } catch(e) {
            price = undefined;
        }

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