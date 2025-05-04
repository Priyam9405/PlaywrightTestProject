const ExcelJs = require("exceljs");
const { test,expect} = require("@playwright/test");

async function readExcel(worksheet, searchedText) {
  const response = { row: -1, col: -1 };
  worksheet.eachRow((row, rowNumber) => {
    row.eachCell((cell, colNumber) => {
      if (cell.value === searchedText) {
        response.row = rowNumber;
        response.col = colNumber;
      }
    });
  });
  return response;
}
async function writeFile(filePath, searchedText, change, updatedValue) {
  const workbook = new ExcelJs.Workbook();
  await workbook.xlsx.readFile(filePath);
  const worksheet = workbook.getWorksheet("Sheet1");
  const output = await readExcel(worksheet, searchedText);

  const cell = worksheet
    .getRow(output.row + (change.rowChange || 0))
    .getCell(output.col + (change.colChange || 0));

  cell.value = updatedValue;
  await workbook.xlsx.writeFile(filePath);
}

//writeFile("/Users/priya/Downloads/download.xlsx","Apple",{rowChange:0,colChange:2},350);

test("@Web Upload-download excel validation", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/upload-download-test/");
  const downloadPromise = page.waitForEvent("download");
  await page.locator("button:has-text('Download')").click();
  const download = await downloadPromise;
  const downloadPath = "/Users/priya/Downloads/download.xlsx";
  await download.saveAs(downloadPath);
  writeFile(
    "/Users/priya/Downloads/download.xlsx",
    "Apple",
    { rowChange: 0, colChange: 2 },
    350
  );

  await page.locator('#fileinput').click();
  await page.locator('#fileinput').setInputFiles("/Users/priya/Downloads/download.xlsx");
  await expect(page.getByText(350)).toBeVisible();
 
});
