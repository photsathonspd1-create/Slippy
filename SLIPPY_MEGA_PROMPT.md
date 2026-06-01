# 🚀 SLIPPY — MEGA PROMPT (ONE-SHOT COMPLETE IMPLEMENTATION)
> Copy ทั้งหมดนี้ไปใส่ใน Windsurf ได้เลย — ครอบคลุมทุก Phase + features ใหม่ + responsive test ทุกขนาด

---

## 📋 CONTEXT (อ่านก่อนทำงาน)

Project: **Slippy** — AI-powered receipt/slip scanner & expense tracker
Stack: Next.js 14 (App Router), TypeScript, Prisma/SQLite, Tailwind CSS, Framer Motion, NextAuth
GitHub: https://github.com/photsathonspd1-create/Slippy
Current State: UI/UX 100% done, Logic 0–60% done

**⚠️ หมายเหตุ AGENTS.md:** Next.js version นี้มี breaking changes — อ่าน `node_modules/next/dist/docs/` ก่อนเขียน code ทุกครั้ง และระวัง deprecation notices

---

## 🎯 MISSION: IMPLEMENT EVERYTHING IN ONE PASS

ทำทุกอย่างต่อไปนี้ในลำดับ Phase 1 → 8 โดยไม่ถามกลับ ถ้า ambiguous ให้ตัดสินใจเองแบบที่ดีที่สุดแล้วทำต่อ

---

## PHASE 1 — FIX KNOWN BUGS + REGRESSION CHECK

ก่อนทำอะไรทั้งหมด ตรวจและ fix bugs จาก QA_MEMORY.md:

```
B001: /login — 'Chrome' not found in lucide (remove unused import)
B002: MobileNav — item.icon JSX type mismatch (destructure Icon before use)
B003: TopBar — MessageSquare missing import (add import)
B004: /dashboard — 'Financial Overview' link href='/' → href='/dashboard'
K001: Dashboard static values (จะ fix ใน Phase 3)
K002: Settings ไม่ persist (จะ fix ใน Phase 2)
K003: Auth mocked (จะ fix ใน Phase 5)
```

หลัง fix แต่ละ bug ให้ append ผลลัพธ์ลง QA_MEMORY.md ด้วย

---

## PHASE 2 — PERSISTENCE & ORGANIZATION API

### 2A: สร้าง `app/api/organizations/route.ts`

```typescript
// ต้องมี:
// GET  /api/organizations — return org by session userId
// POST /api/organizations — create org
// PATCH /api/organizations — update org fields (name, taxId, address, phone, bankAccounts)
// DELETE /api/organizations/:id — soft delete

// BankAccounts เป็น JSON field ใน Prisma หรือ relation ก็ได้
// ต้อง validate input ด้วย zod
// return { success: true, data: org } หรือ { success: false, error: string }
```

### 2B: สร้าง `hooks/useOrganization.ts`

```typescript
// Custom hook ที่:
// - fetch GET /api/organizations ตอน mount
// - expose: org, isLoading, isSaving, updateOrg(patch), addBankAccount(), removeBankAccount()
// - optimistic update (update state ก่อน แล้ว revalidate)
// - error toast เมื่อ save ไม่สำเร็จ
```

### 2C: Connect `/organization` page กับ hook

- `EditableRow` component ต้อง auto-save เมื่อ blur (debounce 800ms)
- Bank accounts เพิ่ม/ลบได้ แล้ว persist จริง
- แสดง "Saving..." indicator ขณะ PATCH
- แสดง "Saved ✓" toast 2 วินาทีหลัง success

---

## PHASE 3 — LIVE DASHBOARD

### 3A: สร้าง `app/api/dashboard/summary/route.ts`

```typescript
// GET /api/dashboard/summary?period=this_month|last_month|this_year|custom&from=&to=
// Return:
{
  totalExpenses: number,
  receiptCount: number,
  budgetUsed: number,        // % of monthly budget
  avgPerDay: number,
  topCategories: { name: string, amount: number, count: number }[],
  dailySeries: { date: string, amount: number }[],   // สำหรับ chart
  monthlyComparison: { month: string, amount: number }[],
  recentTransactions: Transaction[],
  savingsRate: number,       // (budget - expenses) / budget * 100
}
```

### 3B: สร้าง `hooks/useDashboard.ts`

```typescript
// - fetch summary API
// - expose period selector state
// - auto-refresh ทุก 30 วินาที
// - cache ด้วย SWR หรือ React Query (ติดตั้งถ้ายังไม่มี)
```

### 3C: Replace hardcoded values ใน dashboard

- Summary cards ทุกใบ → real data
- Charts → real dailySeries + monthlyComparison
- Recent transactions list → real 5 รายการล่าสุด
- Period selector (This Month / Last Month / This Year) → กรองได้จริง
- Budget progress bar → real budgetUsed %

---

## PHASE 4 — TRANSACTIONS CRUD COMPLETE

### 4A: สร้าง `app/api/transactions/route.ts`

```typescript
// GET    /api/transactions?page=1&limit=20&category=&dateFrom=&dateTo=&search=&sortBy=date&sortOrder=desc
// POST   /api/transactions — create (รับ body + receiptImage base64 optional)
// PATCH  /api/transactions/:id — update
// DELETE /api/transactions/:id — soft delete (deletedAt timestamp)

// Pagination: return { data, total, page, totalPages }
// Full-text search บน description + vendorName
```

### 4B: สร้าง `hooks/useTransactions.ts`

```typescript
// - infinite scroll หรือ pagination
// - filter state (category, date range, search)
// - expose: transactions, isLoading, addTransaction(), updateTransaction(), deleteTransaction(), filters, setFilters
// - optimistic delete (ลบ UI ก่อน)
```

### 4C: Complete `/transactions` page

- List view + Card view toggle (เก็บ preference ใน localStorage)
- Search bar (debounce 300ms)
- Filter dropdown: Category, Date Range, Amount Range
- Sort: Date / Amount / Vendor
- Inline edit (click row → edit mode)
- Delete confirmation modal
- Bulk select + bulk delete
- Pagination หรือ infinite scroll
- Export selected → CSV (สร้าง `lib/export.ts`)
- Empty state illustration เมื่อไม่มี data

### 4D: สร้าง `lib/export.ts`

```typescript
// exportToCSV(transactions: Transaction[], filename: string): void
// exportToExcel(transactions: Transaction[], filename: string): void  — ใช้ xlsx library
// formatCurrency(amount: number, currency: 'THB' | 'USD'): string
// formatDate(date: Date, locale: 'th' | 'en'): string
```

---

## PHASE 5 — AI SCANNER (CORE FEATURE)

### 5A: สร้าง `lib/ai-scanner.ts`

```typescript
// ใช้ Claude claude-sonnet-4-20250514 Vision API (หรือ Gemini Vision เป็น fallback)
// 
// export async function scanReceipt(imageBase64: string): Promise<ScanResult>
//
// ScanResult = {
//   vendorName: string | null,
//   date: string | null,        // ISO format
//   total: number | null,
//   subtotal: number | null,
//   tax: number | null,
//   currency: 'THB' | 'USD' | string,
//   items: { name: string, qty: number, price: number }[],
//   category: ExpenseCategory,  // auto-detected
//   paymentMethod: string | null,
//   receiptNumber: string | null,
//   confidence: number,         // 0-1
//   rawText: string,
// }
//
// Prompt สำหรับ Vision LLM:
// "You are a receipt scanner. Extract ALL fields from this Thai/English receipt image.
//  Return ONLY valid JSON with these exact fields: {...}
//  For category, choose from: FOOD, TRANSPORT, UTILITIES, SHOPPING, MEDICAL, ENTERTAINMENT, OTHER
//  If a field cannot be determined, use null.
//  Currency default is THB unless clearly stated otherwise."
//
// Error handling: ถ้า parse JSON ไม่ได้ → retry 1 ครั้ง → throw ScanError

// สร้าง API key config ใน .env.local:
// ANTHROPIC_API_KEY=your_key_here
// หรือ GOOGLE_AI_API_KEY=your_key_here (Gemini fallback)
```

### 5B: สร้าง `app/api/scan/route.ts`

```typescript
// POST /api/scan
// Body: { image: string (base64), mimeType: 'image/jpeg' | 'image/png' | 'image/webp' }
// Response: ScanResult
// Rate limit: 10 scans/minute per user (ใช้ in-memory Map หรือ upstash redis ถ้ามี)
// Max image size: 5MB (validate ก่อน forward ไป AI)
// ต้องมี auth check (session required)
```

### 5C: Complete `/scan` page

- Drag & drop zone (รับ jpg/png/webp/heic → convert heic เป็น jpg)
- Camera capture (mobile: ใช้ `input type=file capture=environment`)
- Image preview + crop/rotate controls (ใช้ react-image-crop หรือ canvas)
- "Scan Receipt" button → loading state (animated scanner line effect)
- Results panel:
  - แสดง extracted fields แบบ editable
  - Confidence badge (สี: green ≥0.8, yellow 0.5-0.8, red <0.5)
  - Items breakdown table (editable quantity + price)
  - Category selector (auto-selected แต่แก้ได้)
- "Save Transaction" button → เรียก POST /api/transactions
- "Scan Another" button → reset state
- History: แสดง 5 scans ล่าสุด ด้านล่าง

---

## PHASE 6 — AUTHENTICATION (PRODUCTION READY)

### 6A: Configure NextAuth ใน `app/api/auth/[...nextauth]/route.ts`

```typescript
// Providers:
// 1. Google OAuth (GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET)
// 2. Email Magic Link (ส่ง email ด้วย Resend หรือ Nodemailer)
// 3. Credentials (email + password + bcrypt) — สำหรับ development/testing

// Session strategy: jwt
// Callbacks: เพิ่ม user.id ใน session
// Prisma adapter ถ้ายังไม่มี → ติดตั้ง @auth/prisma-adapter

// .env.local ที่ต้องการ:
// NEXTAUTH_SECRET=generate_with_openssl
// NEXTAUTH_URL=http://localhost:3000
// GOOGLE_CLIENT_ID=
// GOOGLE_CLIENT_SECRET=
// EMAIL_FROM=noreply @slippy.app
// EMAIL_SERVER=smtp://...
```

### 6B: สร้าง `middleware.ts`

```typescript
// Protected routes: /dashboard, /transactions, /scan, /reports, /organization
// Public routes: /login, /register, /api/auth
// Redirect unauthenticated → /login?callbackUrl=...
// Redirect authenticated (visiting /login) → /dashboard
```

### 6C: Update Login/Register pages

- Login: Google OAuth button + Email/Password form
- Register: Name + Email + Password + Confirm Password
- Validation: zod schema
- Loading states บน buttons
- Error messages แบบ inline (ไม่ใช่ alert)
- "Forgot Password" → email reset flow

---

## PHASE 7 — REPORTS & EXPORT

### 7A: สร้าง `app/api/reports/route.ts`

```typescript
// GET /api/reports?type=summary|detailed|category&format=json|csv|excel&from=&to=

// Summary report: totals by category + month
// Detailed report: all transactions ใน range
// Category report: spending breakdown + trends

// CSV: ใช้ papaparse หรือ manual CSV build
// Excel: ใช้ xlsx (SheetJS) — multiple sheets
```

### 7B: Complete `/reports` page

- Date range picker (This Month / Last 3M / Last 6M / This Year / Custom)
- 4 chart types:
  - Bar chart: Monthly spending trend (recharts)
  - Pie/Donut: Spending by category
  - Line chart: Daily spending vs budget
  - Area chart: Cumulative spending
- Table: Top 10 vendors by spend
- Export buttons: PDF (ใช้ @react-pdf/renderer หรือ html2canvas+jsPDF), Excel, CSV
- Print-friendly layout (` @archive_temp\nucha_media_after_delete.png print`)

---

## PHASE 8 — UX POLISH + RESPONSIVE TESTING

### 8A: Global UX improvements

**Toast Notification System:**
สร้าง `components/ui/Toast.tsx` และ `hooks/useToast.ts`
- Types: success (green), error (red), warning (yellow), info (blue)
- Position: top-right
- Auto-dismiss 3 วินาที
- Max 3 toasts พร้อมกัน
- Slide-in animation

**Loading States:**
- Skeleton loaders สำหรับทุก data fetching component
- สร้าง `components/ui/Skeleton.tsx` — ทำ variants: line, card, table-row
- Page transition loading (route change indicator ที่ top ของหน้า)

**Error States:**
- Empty state components: `components/ui/EmptyState.tsx`
- Error boundary: `components/ErrorBoundary.tsx`
- API error handler global (intercept 401 → logout, 429 → rate limit toast)

**Dark Mode:**
- เพิ่ม ThemeProvider ถ้ายังไม่มี
- Toggle button ใน TopBar
- เก็บ preference ใน localStorage + system preference detection
- ทุก component ต้องรองรับ dark: variants

### 8B: RESPONSIVE TESTING — ทดสอบทุก breakpoint

ทำ responsive ให้ครบทุก breakpoint ต่อไปนี้:

```
Mobile S:  320px  (iPhone SE gen1, Galaxy S5)
Mobile M:  375px  (iPhone SE gen3, iPhone 12 mini)
Mobile L:  414px  (iPhone 11 Pro Max, Pixel 5)
Mobile XL: 430px  (iPhone 14 Plus, iPhone 15 Pro Max)
Tablet P:  768px  (iPad Mini portrait)
Tablet L:  1024px (iPad Air landscape, iPad Pro portrait)
Laptop:    1280px (MacBook Air 13")
Desktop:   1440px (MacBook Pro 14", standard monitor)
Wide:      1920px (27" iMac, external monitors)
UltraWide: 2560px (32" 4K)
```

**สำหรับแต่ละ page (/dashboard, /transactions, /scan, /reports, /organization, /login):**

Mobile (320-430px):
- [ ] Bottom navigation แสดงครบ 5 items, icon + label ชัด
- [ ] Top bar มีแค่ logo + hamburger/profile
- [ ] Cards stack เป็น single column
- [ ] Tables → card view หรือ horizontal scroll (ไม่ตัด content)
- [ ] Modals เป็น bottom sheet (slide up จากล่าง)
- [ ] FAB button (scan) floating bottom-right
- [ ] Form inputs ขนาด 44px min touch target
- [ ] Charts ใช้ responsive width (100% - padding)
- [ ] ไม่มี horizontal overflow

Tablet (768-1024px):
- [ ] Sidebar collapsible (icon-only mode ที่ 768px)
- [ ] Cards เป็น 2-3 columns
- [ ] Scan page: 2-column layout (upload left, results right)
- [ ] Dashboard: 2x2 grid summary cards

Desktop (1280px+):
- [ ] Sidebar expanded แสดง labels
- [ ] Dashboard: 4 summary cards ใน row เดียว
- [ ] Transactions: full table ที่เห็นทุก column
- [ ] Reports: charts side-by-side

Wide (1440px+):
- [ ] Max content width 1440px, centered
- [ ] Larger charts, more data visible

**Fix list ที่ต้องทำ:**
```
- Sidebar: เพิ่ม md:hidden สำหรับ bottom nav บน mobile
- Dashboard grid: grid-cols-1 sm:grid-cols-2 lg:grid-cols-4
- Modals: sm:max-w-md sm:rounded-2xl บน desktop, full screen on mobile
- Tables: hidden columns บน mobile (เหลือ vendor, amount, date)
- Charts: aspect-ratio: 16/9 บน desktop, 4/3 บน mobile
- Scan zone: full height-screen บน mobile
- Typography scale: ลด heading ขนาดลงบน mobile
```

### 8C: Performance optimizations

```typescript
// Image optimization:
// - ทุกรูปภาพใช้ next/image
// - สลิปที่ upload → resize เป็น max 1200px ก่อน scan (ประหยัด API cost)
// - Blur placeholder สำหรับ product images

// Code splitting:
// - Dynamic import สำหรับ recharts, react-pdf, xlsx
// import dynamic from 'next/dynamic'
// const Chart = dynamic(() => import('./Chart'), { ssr: false })

// Bundle analysis:
// เพิ่ม script ใน package.json: "analyze": "ANALYZE=true next build"

// Caching:
// - GET /api/dashboard/summary → cache 30 วินาที (headers)
// - GET /api/transactions → no-cache (real-time)
```

### 8D: Accessibility (a11y)

```
- ทุก icon-only button ต้องมี aria-label
- Form inputs ต้องมี htmlFor + id
- Modal ต้องมี role="dialog" aria-modal="true" aria-labelledby
- Focus trap ใน modal
- Keyboard navigation: Tab, Enter, Escape ทำงานได้
- Color contrast ratio ≥ 4.5:1 (WCAG AA)
- Screen reader: semantic HTML (nav, main, section, article)
```

---

## PHASE 9 — NEW FEATURES (ไม่มีใน original plan)

### 9A: Budget Management

สร้าง `app/(dashboard)/budget/page.tsx`:
- Set monthly budget per category
- Visual budget vs actual bars
- Alert เมื่อใช้ถึง 80% (toast notification)
- Budget history chart (3 months back)
- Carry-over option (เหลือ budget ข้ามเดือน)
- สร้าง Prisma model: `Budget { id, userId, category, amount, month, year }`
- API: `app/api/budget/route.ts` (CRUD)

### 9B: Receipt Storage & Gallery

- เก็บรูปสลิปใน `/public/receipts/[userId]/` หรือ base64 ใน DB
- สร้าง `app/(dashboard)/receipts/page.tsx` — gallery view ของสลิปทั้งหมด
- Click → modal แสดงรูปเต็ม + extracted data ด้านข้าง
- Filter by month/category
- Download original image

### 9C: Multi-Currency Support

- เพิ่ม `currency` field ใน Transaction model
- สร้าง `lib/currency.ts`:
  ```typescript
  // fetchExchangeRate(from: string, to: string): Promise<number>
  // convertAmount(amount: number, from: string, to: string): Promise<number>
  // formatCurrency(amount: number, currency: string, locale: string): string
  // ใช้ ExchangeRate-API (free tier) หรือ hardcode THB/USD/EUR
  ```
- Dashboard แสดงได้ทั้ง THB และ USD (toggle)

### 9D: Recurring Expenses

- เพิ่ม `isRecurring`, `recurringInterval` (daily/weekly/monthly) ใน Transaction
- Auto-create transaction ตาม schedule (ใช้ cron-style: check ตอน page load)
- แสดง recurring badge ใน transaction list
- Upcoming recurring: แสดงใน dashboard "Due this week"

### 9E: Smart Category Auto-Detection

สร้าง `lib/category-detector.ts`:
```typescript
// detectCategory(vendorName: string, description: string): ExpenseCategory
// ใช้ keyword mapping + ML-lite pattern:
const CATEGORY_RULES = {
  FOOD: ['ร้านอาหาร', 'restaurant', 'food', 'cafe', 'coffee', 'ก๋วยเตี๋ยว', 'ข้าว', 'mcdonalds', 'kfc', ...],
  TRANSPORT: ['grab', 'bolt', 'แท็กซี่', 'น้ำมัน', 'ปตท', 'บขส', 'bts', 'mrt', ...],
  UTILITIES: ['การไฟฟ้า', 'ประปา', 'ทรู', 'ais', 'dtac', 'internet', ...],
  SHOPPING: ['lazada', 'shopee', 'central', 'robinson', 'lotus', 'bigc', ...],
  MEDICAL: ['โรงพยาบาล', 'ร้านยา', 'hospital', 'pharmacy', 'clinic', ...],
  ENTERTAINMENT: ['netflix', 'spotify', 'youtube', 'cinema', 'โรงหนัง', ...],
}
// ถ้าไม่ match → ส่งไป AI categorize (batch เพื่อประหยัด cost)
```

### 9F: Notification & Reminders

สร้าง `app/api/notifications/route.ts`:
- Budget alert เมื่อใช้ ≥ 80%
- Weekly summary digest (email)
- Recurring expense reminder 1 วันก่อน due
- In-app notification center (bell icon ใน TopBar, badge count)

สร้าง `components/NotificationCenter.tsx`:
- Dropdown panel แสดง 10 notifications ล่าสุด
- Mark as read / Mark all read
- Types: budget_alert, scan_complete, recurring_due, weekly_summary

---

## PHASE 10 — TESTING SUITE

### 10A: สร้าง test files

```
__tests__/
  api/
    organizations.test.ts    — CRUD + validation
    transactions.test.ts     — CRUD + pagination + search
    scan.test.ts             — mock AI response, error handling
    dashboard.test.ts        — aggregation logic
  lib/
    ai-scanner.test.ts       — mock fetch, parse JSON, retry logic
    export.test.ts           — CSV/Excel output
    currency.test.ts         — conversion math
    category-detector.test.ts — keyword matching
  components/
    TransactionList.test.tsx — render, filter, sort
    ScanPage.test.tsx        — upload, scan, save flow
```

ใช้ Jest + @testing-library/react

```json
// เพิ่มใน package.json:
"scripts": {
  "test": "jest",
  "test:watch": "jest --watch",
  "test:coverage": "jest --coverage"
}
```

### 10B: DYNAMIC_TEST_PLAN.md update

อัป DYNAMIC_TEST_PLAN.md ให้ครอบคลุม test cases ทั้งหมดที่เพิ่ม

---

## 📁 FILE STRUCTURE หลังทำเสร็จ

```
src/
├── app/
│   ├── (auth)/
│   │   ├── login/page.tsx
│   │   └── register/page.tsx
│   ├── (dashboard)/
│   │   ├── layout.tsx
│   │   ├── dashboard/page.tsx
│   │   ├── transactions/page.tsx
│   │   ├── scan/page.tsx
│   │   ├── reports/page.tsx
│   │   ├── budget/page.tsx        ← NEW
│   │   ├── receipts/page.tsx      ← NEW
│   │   └── organization/page.tsx
│   └── api/
│       ├── auth/[...nextauth]/route.ts
│       ├── organizations/route.ts
│       ├── transactions/
│       │   ├── route.ts
│       │   └── [id]/route.ts
│       ├── scan/route.ts
│       ├── dashboard/summary/route.ts
│       ├── reports/route.ts
│       ├── budget/route.ts        ← NEW
│       └── notifications/route.ts ← NEW
├── components/
│   ├── ui/
│   │   ├── Toast.tsx              ← NEW
│   │   ├── Skeleton.tsx           ← NEW
│   │   ├── EmptyState.tsx         ← NEW
│   │   └── ... (existing)
│   ├── NotificationCenter.tsx     ← NEW
│   └── ... (existing)
├── hooks/
│   ├── useOrganization.ts         ← NEW
│   ├── useDashboard.ts            ← NEW
│   ├── useTransactions.ts         ← NEW
│   └── useToast.ts                ← NEW
└── lib/
    ├── ai-scanner.ts              ← NEW
    ├── category-detector.ts       ← NEW
    ├── currency.ts                ← NEW
    ├── export.ts                  ← NEW
    └── ... (existing)
```

---

## 🔧 .env.local TEMPLATE

สร้างไฟล์ `.env.local.example` ใน root:

```env
# Database
DATABASE_URL="file:./dev.db"

# NextAuth
NEXTAUTH_SECRET="generate-with: openssl rand -base64 32"
NEXTAUTH_URL="http://localhost:3000"

# OAuth - Google
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""

# AI - Vision (เลือกอย่างน้อย 1)
ANTHROPIC_API_KEY=""          # Claude Vision (recommended)
GOOGLE_AI_API_KEY=""          # Gemini Vision (fallback)

# Email (เลือก 1)
RESEND_API_KEY=""              # Resend (recommended, free 3000/mo)
EMAIL_SERVER=""                # SMTP fallback: smtp://user:pass @host:port
EMAIL_FROM="noreply @slippy.app"

# Exchange Rate (optional)
EXCHANGE_RATE_API_KEY=""       # exchangerate-api.com free tier
```

---

## 📦 PACKAGES ที่ต้องติดตั้ง

```bash
npm install \
  @auth/prisma-adapter \
  @tanstack/react-query \
  bcryptjs @types/bcryptjs \
  zod \
  xlsx \
  papaparse @types/papaparse \
  recharts \
  react-image-crop \
  html2canvas \
  jspdf \
  @types/jspdf \
  resend \
  swr \
  date-fns \
  react-hot-toast \
  @radix-ui/react-dialog \
  @radix-ui/react-dropdown-menu \
  @radix-ui/react-select \
  @radix-ui/react-tabs \
  jest @testing-library/react @testing-library/jest-dom jest-environment-jsdom \
  --save
```

---

## ✅ DEFINITION OF DONE

หลังทำเสร็จทุก Phase แล้ว ให้ verify ว่า:

### Functional
- [ ] Login ด้วย Google OAuth ได้จริง
- [ ] Scan สลิปได้จริง (ใช้รูป test: ใบเสร็จ 7-11 หรือ Grab)
- [ ] Transaction CRUD ครบ (Create/Read/Update/Delete)
- [ ] Dashboard แสดง real data จาก DB
- [ ] Organization settings save ลง DB จริง
- [ ] Export CSV/Excel ทำงานได้
- [ ] Budget alert แสดงเมื่อใช้ถึง 80%

### Responsive
- [ ] 320px — ไม่มี overflow, bottom nav ใช้ได้
- [ ] 375px — มาตรฐาน iPhone, ทุกอย่างชัด
- [ ] 768px — sidebar collapse, 2-col cards
- [ ] 1280px — full desktop layout
- [ ] 1920px — centered content, ไม่ stretch เกิน

### Performance
- [ ] Lighthouse score ≥ 90 (Performance, Accessibility)
- [ ] First Contentful Paint ≤ 2s
- [ ] No layout shift บน mobile

### Code Quality
- [ ] TypeScript zero errors (`tsc --noEmit`)
- [ ] ESLint zero warnings
- [ ] ไม่มี console.log เหลืออยู่ใน production code

---

## 🚦 START ORDER

```
Phase 1 → 2 → 3 → 4 → 5 → 6 → 7 → 8 → 9 → 10
```

ไม่ต้องถาม — ทำต่อเนื่องจนจบ Phase 10 แล้ว report ว่าทำอะไรได้บ้าง อะไรที่ต้อง configure manually (เช่น API keys)

---

*Prompt version: 1.0 | Generated: 2026-06-01 | Scope: Slippy Full Implementation*