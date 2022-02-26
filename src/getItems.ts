const playwright = require('playwright');

export async function getCSV() {
    let content = [];
    let i = 0;
    let erroredOut = false;

    while(!erroredOut) {
        try {
            await getItem(i, 'nvidia');
        } catch(e) {
            erroredOut = true;
        }
        i++;
    }

    let csv = createCSV(content);
}

export function createCSV(content) {}

export async function getItem(index, query, browserType = 'chromium') {
    
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
  
    //URL for the search result
    const returnUrl = page.url();
    let obj;

      try {
        // Click img
        await Promise.all([
          page.waitForNavigation(),
          page.locator('img.s-image').nth(index).click()
        ]);
        
        const title = await page.locator('#productTitle').textContent();
        console.log(title);
        const price = await page.locator('#corePrice_feature_div').textContent();
        console.log(price);
        obj = {
          title,
          price,
          date: Date.now()
        }
  
        //return to original search
        await page.goto(returnUrl);
        return obj
      } catch (e) {
          console.log(e);
          throw new Error('No items found in search');
      }    
}