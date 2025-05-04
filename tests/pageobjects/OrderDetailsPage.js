class OrderDetailsPage{
    constructor(page,expect){
        this.page = page;
        this.expect = expect;
        this.sucessMessage = page.locator(".hero-primary");
        this.orderId = page.locator(".em-spacer-1 .ng-star-inserted");
        this.orderHistoryPage = page.locator("text='Orders History Page'");
    }
    
    async validateSuccessMessage(){
      //Verify order success message
        await this.expect(this.sucessMessage).toContainText(" Thankyou for the order. ");
        //Print the order id
        const orderNumber = await this.orderId.textContent();
        console.log(orderNumber);
           return orderNumber; 
    }
    async goToOrderHistoryPage(){
    //Go to Order history page
    await this.orderHistoryPage.click();
}
    
}
module.exports={OrderDetailsPage};