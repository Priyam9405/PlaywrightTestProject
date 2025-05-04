const { test, expect } = require("@playwright/test");

test("client login", async ({ page }) => {
  const productName = "ADIDAS ORIGINAL";
  const country = " India";
  const email = "priyam9405@gmail.com";
  const pass = "Varsha@92";
  const userName = page.getByPlaceholder("email@example.com");
  const password = page.getByPlaceholder("enter your passsword");
  const loginButton = page.getByRole("button", { name: "Login" });
  const products = page.locator(".card-body");
  const linkToCartPage = page
    .getByRole("listitem")
    .getByRole("button", { name: "Cart" });
  const productNameInCartPage = page.getByText(productName);
  const checkoutButton = page.getByRole("button", { name: "Checkout" });
  const checkoutPageFields = page.locator(".field");
  const selectCountryList = page.getByPlaceholder("Select Country");
  const allCountryList = page.getByRole("button", { name: country }).nth(1);
  const submitButton = page.getByText("PLACE ORDER");
  const sucessMessage = page.getByText("Thankyou for the order.");

  // open the url
  await page.goto("https://rahulshettyacademy.com/client/");

  // login
  await userName.fill(email);
  await password.fill(pass);
  await loginButton.click();

  // dashboard page
  await page.waitForLoadState("networkidle");
  // add the product to the cart
  
  await products
    .filter({ hasText: productName })
    .getByRole("button", { name: "Add To Cart" })
    .click();
  //click on cart
  await linkToCartPage.click();
  //await page.waitForLoadState('networkidle');//we can use this also
  await page.locator("div li").last().waitFor();
  //check product name is present in cart page
  expect(productNameInCartPage).toBeVisible();
  //click on checkout page
  await checkoutButton.click();

  //enter cvv in checkout page
  await checkoutPageFields
    .filter({ hasText: "CVV Code" })
    .getByRole("textbox")
    .fill("345");

  //enter Name on card in checkout page
  await checkoutPageFields
    .filter({ hasText: "Name on Card" })
    .getByRole("textbox")
    .fill("Priyam");

  //select country
  await selectCountryList.pressSequentially("ind");
  await allCountryList.click();

  //click on submit
  await submitButton.click();
  //Verify order success message
  await expect(sucessMessage).toBeVisible();
});
