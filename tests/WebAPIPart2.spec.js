const {test,expect} = require('@playwright/test');
let webContext;
test.beforeAll(async ({browser})=>{
const context = await browser.newContext();
const page = await context.newPage();
  const email = "priyam9405@gmail.com";
  const pass = "Varsha@92";
  const userName = page.locator("#userEmail");
  const password = page.locator("#userPassword");
  const loginButton = page.locator("#login");

   // open the url
   await page.goto("https://rahulshettyacademy.com/client/");

   // login
   await userName.fill(email);
   await password.fill(pass);
   await loginButton.click();

   // dashboard page
   await page.waitForLoadState('networkidle');
   await context.storageState({path:'state.json'});
   webContext = await browser.newContext({storageState:'state.json'});
})


test('@API client login', async ()=>{

    const productName = "ADIDAS ORIGINAL";
    const country = " India";
    const email = "priyam9405@gmail.com";
    const pass = "Varsha@92";
const page = await webContext.newPage();
await page.goto("https://rahulshettyacademy.com/client/");

    const userName = page.locator("#userEmail");
    const password = page.locator("#userPassword");
    const loginButton = page.locator("#login");
    const allTitles = page.locator(".card-body b");
    const products = page.locator(".card-body");
    const linkToCartPage = page.locator("[routerLink='/dashboard/cart']");
    const productNameInCartPage = page.locator("h3:has-text('"+productName+"')");
    const checkoutButton = page.locator("text='Checkout'");
    const checkoutPageFields = page.locator(".field");
    const selectCountryList = page.locator("[placeholder*='Country']");
    const allCountryList = page.locator(".ta-results");
    const emailInCheckout = page.locator(".user__name [type='text']").first();
    const submitButton = page.locator(".action__submit");
    const sucessMessage = page.locator(".hero-primary");
    const orderId = page.locator(".em-spacer-1 .ng-star-inserted");
    const orderHistoryPage = page.locator("text='Orders History Page'");
    const allRowsInOrderHistory = page.locator("tbody tr");
    const orderNumberInOrderDetailsPage = page.locator(".col-text");


   

    console.log(await allTitles.allTextContents());

     // add the product to the cart
    for(let i=0;i<await allTitles.count(); ++i){
        if(await products.nth(i).locator("b").textContent() === productName){
            // code to add to cart
            await products.nth(i).locator("text='Add To Cart'").click();
            break;
        }
    }

    await linkToCartPage.click();
    //await page.waitForLoadState('networkidle');//we can use this also
    await page.locator("div li").last().waitFor();
//check product name is present in cart page
    expect(await productNameInCartPage.isVisible()).toBeTruthy();
    //click on checkout page
    await checkoutButton.click();

     //enter cvv in checkout page
for(let i=0;i<await checkoutPageFields.count();++i){
    const titletext = await checkoutPageFields.nth(i).locator(".title").textContent();
    if(titletext.includes("CVV Code")){
        await checkoutPageFields.nth(i).locator(".input").fill("345");
        break;
    }
}

 //enter Name on card in checkout page
 for(let i=0;i<await checkoutPageFields.count();++i){
    const titletext = await checkoutPageFields.nth(i).locator(".title").textContent();
    if(titletext.includes("Name on Card")){
        await checkoutPageFields.nth(i).locator(".input").fill("Priyam");
        break;
    }
}


//select country
await selectCountryList.pressSequentially("ind");
await allCountryList.first().waitFor();
const countryCount = allCountryList.locator("button");
for(let i=0;i<await countryCount.count();++i){
if(await countryCount.nth(i).textContent() === country){
    await countryCount.nth(i).click();
    break;
}
}
//check the email id in checkout page
await expect(emailInCheckout).toContainText(email);
//click on submit
await submitButton.click();
//Verify order success message
await expect(sucessMessage).toContainText(" Thankyou for the order. ");
//Print the order id
const orderNumber = await orderId.textContent();
console.log(orderNumber);
//Go to Order history page
await orderHistoryPage.click();

await allRowsInOrderHistory.first().waitFor();

//Check the order id is present in Order history page
for(let i=0;i<await allRowsInOrderHistory.count();++i){
    const rowOrderId = await allRowsInOrderHistory.nth(i).locator("th").textContent();
    console.log(rowOrderId);
if( orderNumber.includes(rowOrderId)){
    const viewButton = allRowsInOrderHistory.nth(i).locator("button").first();
    await viewButton.click();
    break;
}
    }

    //Check the order id is same in the order details page
    
    const order = await orderNumberInOrderDetailsPage.textContent();
    expect(orderNumber.includes(order)).toBeTruthy();
})