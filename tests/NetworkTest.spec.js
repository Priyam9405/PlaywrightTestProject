const { test, expect, request } = require("@playwright/test");
const { ApiUtils } = require("../utils/ApiUtils");
let response;
let fakePayload = JSON.stringify({ message: "No Product in Cart" });
const loginPayload = {
  userEmail: "priyam9405@gmail.com",
  userPassword: "Varsha@92",
};
const createOrderPayload = {
  orders: [{ country: "Cuba", productOrderedId: "67a8df1ac0d3e6622a297ccb" }],
};

test.beforeAll(async () => {
  const apiContext = await request.newContext();
  const apiUtils = new ApiUtils(apiContext, loginPayload);
  response = await apiUtils.createOrder(createOrderPayload);
});

test("@Web Intercepting response call", async ({ page }) => {
  const orderHistoryPage = page.locator("button[routerlink*='myorders']");
  const allRowsInOrderHistory = page.locator("tbody tr");
  const orderNumberInOrderDetailsPage = page.locator(".col-text");

  // Setting up the token to bypass the login screen
  page.addInitScript((value) => {
    window.localStorage.setItem("token", value);
  }, response.token);

  // open the url
  await page.goto("https://rahulshettyacademy.com/client/");

  page.route(
    "https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*",
    async (route) => {
      const response = await page.request.fetch(route.request());
      let body = fakePayload;
      route.fulfill({
        response,
        body,
      });
    }
  );

  //Go to Order history page
  await orderHistoryPage.click();
  await page.waitForResponse(
    "https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*"
  );
});

test("@Web Intercepting request call", async ({ page }) => {
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
  
  await page.route(
    "https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*",
    route=>route.continue({
      url:'https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=6815dbd9fc76541aad4c18776'
    })
  );
  await page.locator("button:has-text('View')").nth(0).click();
  
});

test("Aborting network calls", async ({ page }) => {
  const orderHistoryPage = page.locator("button[routerlink*='myorders']");
  const allRowsInOrderHistory = page.locator("tbody tr");
  const orderNumberInOrderDetailsPage = page.locator(".col-text");
  page.route('**/*.{jpeg,png,jpg}',route=>route.abort());

  // Setting up the token to bypass the login screen
  page.addInitScript((value) => {
    window.localStorage.setItem("token", value);
  }, response.token);

  // open the url
  await page.goto("https://rahulshettyacademy.com/client/");
await page.pause();
  //Go to Order history page
  await orderHistoryPage.click();
  
  await page.route(
    "https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*",
    route=>route.continue({
      url:'https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=6815dbd9fc76541aad4c18776'
    })
  );
  await page.locator("button:has-text('View')").nth(0).click();
  
});

