const { test, expect, request } = require("@playwright/test");
const{ApiUtils} = require("../utils/ApiUtils")
let response;

const loginPayload = {
  userEmail: "priyam9405@gmail.com",
  userPassword: "Varsha@92",
};
const createOrderPayload = {
  orders: [{ country: "Cuba", productOrderedId: "67a8df1ac0d3e6622a297ccb" }],
};


test.beforeAll(async () => {

  const apiContext = await request.newContext();
  const apiUtils = new ApiUtils(apiContext,loginPayload);
  response = await apiUtils.createOrder(createOrderPayload);
});


test('@API Place the order', async ({ page }) => {
  
  
 
  const orderHistoryPage = page.locator("button[routerlink*='myorders']");
  const allRowsInOrderHistory = page.locator("tbody tr");
  const orderNumberInOrderDetailsPage = page.locator(".col-text");

  // Setting up the token to bypass the login screen
  page.addInitScript((value) => {
    window.localStorage.setItem("token", value);
  }, response.token);

  // open the url
  await page.goto("https://rahulshettyacademy.com/client/");

  
  //Go to Order history page
  await orderHistoryPage.click();

  await allRowsInOrderHistory.first().waitFor();

  //Check the order id is present in Order history page
  for (let i = 0; i < (await allRowsInOrderHistory.count()); ++i) {
    const rowOrderId = await allRowsInOrderHistory
      .nth(i)
      .locator("th")
      .textContent();
    console.log(rowOrderId);
    if (response.orderNumber.includes(rowOrderId)) {
      const viewButton = allRowsInOrderHistory.nth(i).locator("button").first();
      await viewButton.click();
      break;
    }
  }

  //Check the order id is same in the order details page

  const order = await orderNumberInOrderDetailsPage.textContent();
 
  expect(response.orderNumber.includes(order)).toBeTruthy();
});
