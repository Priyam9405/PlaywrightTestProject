class DashboardPage{
    constructor(page){
        this.page = page;
        this.allTitles = page.locator(".card-body b");
        this.products = page.locator(".card-body");
        this.linkToCartPage = page.locator("[routerLink='/dashboard/cart']");
    }
    
    async printAllTitles(){
       // await this.page.waitForLoadState("networkidle");
        await this.products.first().waitFor({ state: 'visible' });
        const titles = await this.allTitles.allTextContents();
        console.log(titles);

    }
    async addProductToCart(productName){
        //await this.page.waitForLoadState("networkidle");
        await this.products.first().waitFor({ state: 'visible' });

        for (let i = 0; i < (await this.products.count()); ++i) {
            if ((await this.products.nth(i).locator("b").textContent()) === productName) {
              // code to add to cart
              await this.products.nth(i).locator("text='Add To Cart'").click();
              break;
            }
          }
    }

    async clickOnCartPage(){
        await this.linkToCartPage.click();
    }
}
module.exports={DashboardPage};