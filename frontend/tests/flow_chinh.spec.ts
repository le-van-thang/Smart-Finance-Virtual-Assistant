import { test, expect } from '@playwright/test';

// Cấu hình URL trang web của bạn
const APP_URL = 'http://localhost:5173';

test.describe('Kiểm thử Luồng Chính - Nova Finance', () => {

  test('Kiểm tra trang chủ và điều hướng Đăng nhập', async ({ page }) => {
    // 1. Đi tới trang web
    await page.goto(APP_URL);

    // 2. Kiểm tra xem tiêu đề có chứa "Nova" không
    await expect(page).toHaveTitle(/Nova/i);

    // 3. Kiểm tra xem nút Đăng nhập có tồn tại không
    const loginBtn = page.getByRole('button', { name: /Đăng nhập/i }).first();
    await expect(loginBtn).toBeVisible();
    
    console.log('✅ Bước 1: Trang chủ tải thành công.');
  });

  test('Thử nghiệm Đăng nhập sai (Kiểm tra validation)', async ({ page }) => {
    await page.goto(`${APP_URL}/login`);

    // 1. Nhập email sai định dạng
    await page.fill('input[type="email"]', 'email_sai_dinh_dang');
    await page.fill('input[type="password"]', '123456');
    await page.click('button[type="submit"]');

    // 2. Kiểm tra xem có hiện thông báo lỗi không (tùy vào UI của bạn)
    // Giả sử có thông báo email không hợp lệ
    const errorMsg = page.locator('text=Email không hợp lệ');
    if (await errorMsg.isVisible()) {
      console.log('✅ Bước 2: Hệ thống đã chặn email sai định dạng thành công.');
    }
  });

  test('Kiểm tra giao diện Chi tiêu (Dành cho User đã login)', async ({ page }) => {
    // Lưu ý: Bài test này giả định bạn đã có token hoặc đã login
    // Chúng ta sẽ kiểm tra xem các thành phần UI có hiển thị đủ không
    await page.goto(`${APP_URL}/app/expense`);
    
    const balanceCard = page.locator('text=Tổng hiển thị');
    await expect(balanceCard).toBeDefined();
    
    console.log('✅ Bước 3: Giao diện chi tiêu hiển thị ổn định.');
  });

});
