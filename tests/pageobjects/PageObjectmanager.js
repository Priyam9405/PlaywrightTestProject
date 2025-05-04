const { LoginPage } = require("./LoginPage");
const { DashboardPage } = require("./DashboardPage");
const { CartPage } = require("./CartPage");
const { CheckoutPage } = require("./CheckoutPage");
const { OrderDetailsPage } = require("./OrderDetailsPage");
const { OrderHistoryPage } = require("./OrderHistoryPage");
const { OrderPage } = require("./OrderPage");

class PageObjectmanager{
constructor(page,expect,productName){
    this.page = page;
    this.expect = expect;
    this.productName = productName;
    this.loginPage = new LoginPage(this.page);
    this.dashboardPage = new DashboardPage(this.page);
    this.cartPage = new CartPage(this.page, this.expect, this.productName);
    this.checkoutPage = new CheckoutPage(this.page, this.expect);
    this.orderDetailsPage = new OrderDetailsPage(this.page, this.expect);
    this.orderHistoryPage = new OrderHistoryPage(this.page, this.expect);
    this.orderPage = new OrderPage(this.page, this.expect);
}

 getLoginPage(){
    return this.loginPage;
}
getDashBoardPage(){
    return this.dashboardPage;
}
getCartPage(){
    return this.cartPage;
}
getCheckoutPage(){
    return this.checkoutPage;
}
getOrderDetailsPage(){
    return this.orderDetailsPage;
}
getOrderHistoryPage(){
    return this.orderHistoryPage;
}
getOrderPage(){
    return this.orderPage;
}


}
module.exports={PageObjectmanager};