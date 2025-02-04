import { test, expect } from '@playwright/test';

test('Create Loan and Verify in UI', async ({ page }) => {
  await page.goto('http://localhost:3000');
  
  // Navigate to Loan Management
  await page.click('text=Loan Management');
  
  // Click "Create Loan"
  await page.click('button:text("Create Loan")');

  // Fill out loan details
  await page.fill('#amount', '5000');
  await page.fill('#duration', '12');

  // Submit the loan
  await page.click('button:text("Submit")');

  // Verify the loan appears in the list
  await expect(page.locator('text=5000')).toBeVisible();
});
