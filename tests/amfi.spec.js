import { test } from '@playwright/test';
import testdata from '../testdata/getNav.json'

test.describe('Tests to get the NAV from AMFI Web Application', () => {

    test('Get NAV of Mutual funds', async ({ page }) => {
        await page.goto('https://www.amfiindia.com/net-asset-value')
        //await page.locator('div[id="divfundname"]').selectOption({label: 'Axis Mutual Fund'})
        for (const data of testdata) {
            await page.locator('div[id="divfundname"] input.ui-autocomplete-input').clear()
            await page.locator('div[id="divfundname"] input.ui-autocomplete-input').fill(data.fundhouse)
            await page.locator(`//a[text() = "${data.fundhouse}"]`).click()
            await page.locator('a.get-nav').click()
            const reqRow = page.locator('div#divExcel tr').filter({ hasText: data.fundname })
            const isinGrowth = await reqRow.locator('td').nth(1).textContent()
            const isinReinvestment = await reqRow.locator('td').nth(2).textContent()
            const nav = await reqRow.locator('td').nth(3).textContent()
            const date = await reqRow.locator('td').nth(4).textContent()
            console.log('Nav : ' + nav);
            console.log('Nav Date : ' + date);
        }
        //await page.pause()
    })
});