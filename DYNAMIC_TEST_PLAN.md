# 📋 DYNAMIC_TEST_PLAN.md — SLIPPY
# Auto-generated: 2026-06-01 | Constitution v4.0

## Routes Discovered
- [ ] `/` (Landing Page)
- [ ] `/login` (Authentication)
- [ ] `/dashboard` (Main Overview)
- [ ] `/transactions` (List & Record)
- [ ] `/organization` (Settings & RBAC)
- [ ] `/pricing` (Upgrade Plans)
- [ ] `/reports` (Analysis & Budget)
- [ ] `/scan` (OCR PDF Conversion)

## Models Discovered (Prisma)
- `User`, `Account`, `Session`, `Organization`, `Branch`, `OrgMember`, `BankAccount`, `Transaction`, `Budget`

## External Services
- `SQLite` (Local DB)
- `NextAuth` (Auth Provider)
- `Sonner` (Toasts)
- `Framer Motion` (Animations)

## 5-PASS MANDATORY PROTOCOL

### [PASS 1] Visual Integrity (36 Measures)
- [ ] Spacing & Proximity (Gap ≥ 12px, Padding ≥ 16px)
- [ ] Typography (Body ≥ 14px, Label ≥ 12px)
- [ ] Color & Contrast (No hardcoded black lines, Soft Shadows only)
- [ ] Uniform Icons (Lucide only)

### [PASS 2] Interaction Integrity
- [ ] Every `<a>`, `<button>` clicked with log evidence.
- [ ] Every form input tested with valid/invalid/long data.
- [ ] Every toggle/switch verified for persistence.
- [ ] In-place editing in /organization functional with Save/Cancel.

### [PASS 3] DevTools Integrity
- [ ] Console: 0 errors, 0 warnings.
- [ ] Network: 0 failed (4xx/5xx) requests.
- [ ] Real API Data: Verify JSON payloads (no mocks).

### [PASS 4] Mobile Integrity (375px)
- [ ] No horizontal scroll.
- [ ] Sidebar → Bottom Nav conversion verified.
- [ ] Touch targets ≥ 44px.

### [PASS 5] Security Integrity
- [ ] Protected group `(dashboard)` redirect to /login if unauth.
- [ ] Server-side validation for transaction amounts and org updates.
- [ ] Data Isolation: No cross-org transaction leaks.

## Regression Watchlist
- [ ] B001: Login page member 'Chrome' error.
- [ ] B002: MobileNav icon rendering.
- [ ] B003: TopBar MessageSquare icon.
- [ ] B004: Dashboard link routing.
