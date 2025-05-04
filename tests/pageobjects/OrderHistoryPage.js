class OrderHistoryPage{
    constructor(page,expect){
        this.page = page;
        this.expect = expect;
        this.allRowsInOrderHistory = page.locator("tbody tr");

    }
    
    async validateOrderIdAndView(orderNumber){
        await  this.allRowsInOrderHistory.first().waitFor();

        //Check the order id is present in Order history page
        for (let i = 0; i < (await  this.allRowsInOrderHistory.count()); ++i) {
          const rowOrderId = await  this.allRowsInOrderHistory
            .nth(i)
            .locator("th")
            .textContent();
          console.log(rowOrderId);
          if (orderNumber.includes(rowOrderId)) {
            const viewButton = this.allRowsInOrderHistory.nth(i).locator("button").first();
            await viewButton.click();
            break;
          }
        }
      
            
    }
    }
module.exports={OrderHistoryPage};