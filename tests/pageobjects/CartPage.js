class CartPage{
    constructor(page,expect,productName){
        this.page = page;
        this.expect = expect;
        this.productNameInCartPage = page.locator(
            "h3:has-text('" + productName + "')"
          );
          this.checkoutButton = page.locator("text='Checkout'");
    }
    
    async validateProductNameInCartPage(){
       //await page.waitForLoadState('networkidle');//we can use this also
         await this.page.locator("div li").last().waitFor();
         //check product name is present in cart page
         this.expect(await this.productNameInCartPage.isVisible()).toBeTruthy();
         

    }
    

    async clickOnCheckoutButton(){
        //click on checkout page
        await this.checkoutButton.click();
    }
}
module.exports={CartPage};