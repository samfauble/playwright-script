const playwright = require('playwright');

async function getItems() {
    await getItem(0);
    await getItem(1);
    await getItem(2);
}

export default async function getItem(index) {
    
    const browser = await playwright['chromium'].launch();
    const context = await browser.newContext();
    const page = await context.newPage();
    
    // Go to https://www.amazon.com/
    await page.goto('https://www.amazon.com/');
    
    // Click Search bar
    await page.locator('[aria-label="Search"]').click();
    
    // Fill Search bar
    await page.locator('[aria-label="Search"]').fill('nvidia');
    
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
        console.log(obj);
      } catch (e) {
          console.log(e);
          throw new Error('No items found in search');
      }    
}