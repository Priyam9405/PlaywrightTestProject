class OrderPage{
    constructor(page,expect){
        this.page = page;
        this.expect = expect;
        this.orderNumberInOrderDetailsPage = page.locator(".col-text");
    }
    
    async validateOrder(orderNumber){
      //Check the order id is same in the order details page
      
        const order = await this.orderNumberInOrderDetailsPage.textContent();
        this.expect(orderNumber.includes(order)).toBeTruthy();
    }
    
    
}
module.exports={OrderPage};