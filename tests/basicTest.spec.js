const {test,expect} = require('@playwright/test');

test('First playwright test',async ({page})=>{
    const username = page.locator("#username");
    const password = page.locator("[type='password']");
    const signInButton = page.locator("#signInBtn");
    const errorMessage = page.locator(".alert-danger");
    const allContents = page.locator(".card-body a");

await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
console.log(await page.title());
await expect(page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy");
await username.fill("abcd");
await password.fill("learning");
await signInButton.click();
console.log(await errorMessage.textContent());
await expect(errorMessage).toContainText("Incorrect");

await username.fill("");
await username.fill("rahulshettyacademy");
await signInButton.click();

console.log(await allContents.nth(0).textContent());
console.log(await allContents.allTextContents());

})

test('UI operations',async ({page})=>{
    const username = page.locator("#username");
    const password = page.locator("[type='password']");
    const signInButton = page.locator("#signInBtn");
    const allContents = page.locator(".card-body a");
    const selectOptions =  page.locator("select.form-control");
    const radioButtons = page.locator("#usertype");
    const okayButton = page.locator("#okayBtn");
    const blinkingText = page.locator("[href*='documents-request']");
    const checkBox = page.locator("#terms");

await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
console.log(await page.title());
await expect(page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy");
await username.fill("rahulshettyacademy");
await password.fill("learning");
await selectOptions.selectOption("Consultant");

await radioButtons.nth(1).click();
await okayButton.click();
await expect(radioButtons.nth(1)).toBeChecked();
await checkBox.click();
await checkBox.uncheck();
expect(await checkBox.isChecked()).toBeFalsy();
await expect(blinkingText).toHaveAttribute('class','blinkingText');


})
test('Handling child windows',async ({browser})=>{
    const context = await browser.newContext();
    const page = await context.newPage();
    const selectOptions =  page.locator("select.form-control");

    const username = page.locator("#username");
    const password = page.locator("[type='password']");
    const blinkingText = page.locator("[href*='documents-request']");
    

await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
console.log(await page.title());
await expect(page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy");

await expect(blinkingText).toHaveAttribute('class','blinkingText');

const [newPage] = await Promise.all([
 context.waitForEvent('page'),
 blinkingText.click(),
]);
const domainLine = await newPage.locator(".red");
const domain = (await domainLine.textContent()).split("@")[1].split(" ")[0];
await username.fill(domain);
await password.fill("learning");
await selectOptions.selectOption("Consultant");



})

test('second app',async ({page}) =>{

    const email = page.locator("#userEmail");
    const password = page.locator("#userPassword");
    const loginButton = page.locator("#login");
    const allContents = page.locator(".card-body h5");
   
    await page.goto("https://rahulshettyacademy.com/client/");
    await email.fill("priyam9405@gmail.com");
    await password.fill("Varsha@92");
    await loginButton.click();
    await page.waitForLoadState('networkidle');
    console.log(await allContents.allTextContents());



})