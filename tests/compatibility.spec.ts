import { test, expect, Page } from '@playwright/test';
import { getCSV, getItem, createCSV } from '../src/getItems';

test.beforeEach(async ({ page }) => {
});

test.describe('Browser compatibility', () => {
  test('getItem is compatible with chromium', async ({ page }) => {
    await getItem(0, 'nvidia', 'chromium');
  });

  test('getItem is compatible with firefox', async ({ page }) => {
    await getItem(0, 'nvidia', 'firefox');
  });

  test('getItem is compatible with webkit', async ({ page }) => {
    await getItem(0, 'nvidia', 'webkit');
  });
});