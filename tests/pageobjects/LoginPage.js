class LoginPage{
    constructor(page){
        this.page = page;
        this.userName = page.locator("#userEmail");
        this.password = page.locator("#userPassword");
        this.loginButton = page.locator("#login");
    }

    async landInToLoginPage(url){
        await this.page.goto(url);

    }
    async validLogin(email,pass){
        await this.userName.fill(email);
        await this.password.fill(pass);
        await this.loginButton.click();
        
    }
}
module.exports={LoginPage};