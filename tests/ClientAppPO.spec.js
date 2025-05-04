const { test, expect } = require("@playwright/test");
const { PageObjectmanager } = require("./pageobjects/PageObjectmanager");
const dataset = JSON.parse(JSON.stringify(require("../utils/ClientAppPOTestData")));

for(const data of dataset){
test(`@Web Client E2E flow for ${data.productName}`, async ({ page }) => {
  const url = "https://rahulshettyacademy.com/client/";
  const productName = "ADIDAS ORIGINAL";
  const country = " India";
  const searchCountry = "ind";
  const email = "priyam9405@gmail.com";
  const pass = "Varsha@92";
  const cvvCode = "675";
  const nameOnCard = "Priyam";

  const poManager = new PageObjectmanager(page,expect,data.productName);


  // open the url
  await poManager.getLoginPage().landInToLoginPage(data.url);
  // login
  await poManager.getLoginPage().validLogin(data.email, data.pass);

  // dashboard page
  await poManager.getDashBoardPage().printAllTitles();

  // add the product to the cart
  await poManager.getDashBoardPage().addProductToCart(data.productName);
  // Click on the cart
  await poManager.getDashBoardPage().clickOnCartPage();

  //check product name is present in cart page
  await poManager.getCartPage().validateProductNameInCartPage();

  //click on checkout page
  await poManager.getCartPage().clickOnCheckoutButton();

  //enter cvv in checkout page
  await poManager.getCheckoutPage().enterCVVInCheckoutPage(data.cvvCode);
  //enter Name on card in checkout page
  await poManager.getCheckoutPage().enterNameOnCardInCheckoutPage(data.nameOnCard);
  //select country
  await poManager.getCheckoutPage().selectCountry(data.searchCountry,data.country);
  //check the email id in checkout page
  await poManager.getCheckoutPage().validateEmailInCheckoutPage(data.email);
  //click on submit
  await poManager.getCheckoutPage().clickSubmit0nCheckoutPage();
  //Verify order success message
  const orderNumber = await poManager.getOrderDetailsPage().validateSuccessMessage();
  //Go to Order history page
  await poManager.getOrderDetailsPage().goToOrderHistoryPage();

  //Check the order id is present in Order history page and click on view

  await poManager.getOrderHistoryPage().validateOrderIdAndView(orderNumber);

  //Check the order id is same in the order details page
  await poManager.getOrderPage().validateOrder(orderNumber);

});
}