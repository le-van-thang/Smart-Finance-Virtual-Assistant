# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tests\flow_chinh.spec.ts >> Kiểm thử Luồng Chính - Nova Finance >> Kiểm tra trang chủ và điều hướng Đăng nhập
- Location: tests\flow_chinh.spec.ts:8:3

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByRole('button', { name: /Đăng nhập/i }).first()
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for getByRole('button', { name: /Đăng nhập/i }).first()

```

```yaml
- text: N Nova.Finance
- navigation:
  - link "Tính năng":
    - /url: "#features"
  - link "Giải pháp":
    - /url: "#about"
  - link "Công nghệ":
    - /url: "#collection"
  - link "Hỏi đáp":
    - /url: "#faq"
  - link "Liên hệ":
    - /url: "#contact"
- button
- button
- link "Vào Ứng Dụng":
  - /url: /login
- heading "VƯƠN XA HƠN VỚI ( HỆ ) TÀI CHÍNH AI" [level=1]
- text: Trợ lý ảo
- button
- button
- button
- heading "XIN CHÀO! TÔI LÀ ORBIS" [level=2]
- text: Nova AI
- paragraph: Định hình lại cách bạn quản lý tài chính trong không gian số. Nova Finance là người bạn đồng hành AI tối thượng, giúp bạn kiểm soát dòng tiền chính xác đến từng xu.
- paragraph: Theo dõi tài sản đa chuỗi. Phân tích dữ liệu thời gian thực bởi mạng thần kinh nhân tạo. Vượt xa giới hạn tưởng tượng.
- paragraph: Theo dõi tài sản đa chuỗi. Phân tích dữ liệu thời gian thực bởi mạng thần kinh nhân tạo. Vượt xa giới hạn tưởng tượng.
- paragraph: Bảo mật tuyệt đối. Mã hóa cấp quân đội cho tài sản của bạn. Hãy tin tưởng vào thuật toán và định nghĩa chương mới.
- paragraph: Bảo mật tuyệt đối. Mã hóa cấp quân đội cho tài sản của bạn. Hãy tin tưởng vào thuật toán và định nghĩa chương mới.
- heading "CÔNG NGHỆ CỦA Tương lai AI" [level=3]
- button "XEM TẤT CẢ TÍNH NĂNG"
- paragraph: DỰ BÁO AI
- paragraph: "ĐỘ CHÍNH XÁC: 8.7/10"
- button
- paragraph: NGÂN SÁCH THÔNG MINH
- paragraph: "ĐỘ CHÍNH XÁC: 9.0/10"
- button
- paragraph: PHÂN TÍCH THỊ TRƯỜNG
- paragraph: "ĐỘ CHÍNH XÁC: 8.2/10"
- button
- text: Khởi động ngay
- heading "GIA NHẬP. KHÁM PHÁ BÍ MẬT. ĐỊNH NGHĨA TƯƠNG LAI. ĐÓN ĐẦU TÍN HIỆU." [level=4]
- link "BẮT ĐẦU NGAY":
  - /url: /register
- button
- button
- button
- contentinfo:
  - text: N Nova Finance
  - paragraph: © 2026 Nova Finance AI. Bản quyền thuộc về hệ sinh thái tài chính số.
  - link "Bảo mật":
    - /url: "#"
  - link "Điều khoản":
    - /url: "#"
- button
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | // Cấu hình URL trang web của bạn
  4  | const APP_URL = 'http://localhost:5173';
  5  | 
  6  | test.describe('Kiểm thử Luồng Chính - Nova Finance', () => {
  7  | 
  8  |   test('Kiểm tra trang chủ và điều hướng Đăng nhập', async ({ page }) => {
  9  |     // 1. Đi tới trang web
  10 |     await page.goto(APP_URL);
  11 | 
  12 |     // 2. Kiểm tra xem tiêu đề có chứa "Nova" không
  13 |     await expect(page).toHaveTitle(/Nova/i);
  14 | 
  15 |     // 3. Kiểm tra xem nút Đăng nhập có tồn tại không
  16 |     const loginBtn = page.getByRole('button', { name: /Đăng nhập/i }).first();
> 17 |     await expect(loginBtn).toBeVisible();
     |                            ^ Error: expect(locator).toBeVisible() failed
  18 |     
  19 |     console.log('✅ Bước 1: Trang chủ tải thành công.');
  20 |   });
  21 | 
  22 |   test('Thử nghiệm Đăng nhập sai (Kiểm tra validation)', async ({ page }) => {
  23 |     await page.goto(`${APP_URL}/login`);
  24 | 
  25 |     // 1. Nhập email sai định dạng
  26 |     await page.fill('input[type="email"]', 'email_sai_dinh_dang');
  27 |     await page.fill('input[type="password"]', '123456');
  28 |     await page.click('button[type="submit"]');
  29 | 
  30 |     // 2. Kiểm tra xem có hiện thông báo lỗi không (tùy vào UI của bạn)
  31 |     // Giả sử có thông báo email không hợp lệ
  32 |     const errorMsg = page.locator('text=Email không hợp lệ');
  33 |     if (await errorMsg.isVisible()) {
  34 |       console.log('✅ Bước 2: Hệ thống đã chặn email sai định dạng thành công.');
  35 |     }
  36 |   });
  37 | 
  38 |   test('Kiểm tra giao diện Chi tiêu (Dành cho User đã login)', async ({ page }) => {
  39 |     // Lưu ý: Bài test này giả định bạn đã có token hoặc đã login
  40 |     // Chúng ta sẽ kiểm tra xem các thành phần UI có hiển thị đủ không
  41 |     await page.goto(`${APP_URL}/app/expense`);
  42 |     
  43 |     const balanceCard = page.locator('text=Tổng hiển thị');
  44 |     await expect(balanceCard).toBeDefined();
  45 |     
  46 |     console.log('✅ Bước 3: Giao diện chi tiêu hiển thị ổn định.');
  47 |   });
  48 | 
  49 | });
  50 | 
```