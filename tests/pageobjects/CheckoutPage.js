class CheckoutPage {
  constructor(page, expect) {
    this.page = page;
    this.expect = expect;
    this.checkoutPageFields = page.locator(".field");
    this.selectCountryList = page.locator("[placeholder*='Country']");
    this.allCountryList = page.locator(".ta-results");
    this.emailInCheckout = page.locator(".user__name [type='text']").first();
    this.submitButton = page.locator(".action__submit");
  }

  async enterCVVInCheckoutPage(cvvCode) {
    //enter cvv in checkout page
    for (let i = 0; i < (await this.checkoutPageFields.count()); ++i) {
      const titletext = await this.checkoutPageFields
        .nth(i)
        .locator(".title")
        .textContent();
      if (titletext.includes("CVV Code")) {
        await this.checkoutPageFields.nth(i).locator(".input").fill(cvvCode);
        break;
      }
    }
  }
  async enterNameOnCardInCheckoutPage(name) {
    //enter Name on card in checkout page
    for (let i = 0; i < (await this.checkoutPageFields.count()); ++i) {
      const titletext = await this.checkoutPageFields
        .nth(i)
        .locator(".title")
        .textContent();
      if (titletext.includes("Name on Card")) {
        await this.checkoutPageFields.nth(i).locator(".input").fill(name);
        break;
      }
    }
  }
  async selectCountry(searchCountry,country) {
    //select country
    await this.selectCountryList.pressSequentially(searchCountry);
    await this.allCountryList.first().waitFor();
    const countryCount = this.allCountryList.locator("button");
    for (let i = 0; i < (await countryCount.count()); ++i) {
      if ((await countryCount.nth(i).textContent()) === country) {
        await countryCount.nth(i).click();
        break;
      }
    }
  }
  async validateEmailInCheckoutPage(email) {
    //check the email id in checkout page
    await this.expect(this.emailInCheckout).toContainText(email);
  }
  async clickSubmit0nCheckoutPage() {
    //click on submit
    await this.submitButton.click();
  }
}
module.exports = { CheckoutPage };
