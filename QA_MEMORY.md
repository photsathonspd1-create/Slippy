# QA_MEMORY.md — SLIPPY
# อัปเดตอัตโนมัติโดย ASH หลังทุก QA session

## 🐛 BUG HISTORY

| ID | Date | Page | Bug Description | Root Cause | Fix Applied | Regression Risk |
|----|------|------|-----------------|------------|-------------|-----------------|
| B001 | 2026-06-01 | /login | Type error: 'Chrome' not found in lucide | Import mismatch | Removed unused import | LOW |
| B002 | 2026-06-01 | MobileNav | item.icon rendering error | JSX type mismatch | Destructured Icon before use | LOW |
| B003 | 2026-06-01 | TopBar | MessageSquare not found | Missing import | Added MessageSquare import | LOW |
| B004 | 2026-06-01 | /dashboard | 'Financial Overview' link goes to / | Hardcoded '/' href | Updated href to '/dashboard' | LOW |

## 🔄 REGRESSION WATCHLIST
- [ ] B001: Login page compiles
- [ ] B002: Mobile bottom nav icons render
- [ ] B003: TopBar help menu icons render
- [ ] B004: Sidebar navigation correctly routes to /dashboard

## 📊 QA SESSION LOG

### Session: 2026-06-01 (Infiltration & Fidelity)
- Pages tested: /dashboard, /organization, /transactions, /login
- Bugs found: 4
- Bugs fixed: 4
- Regression detected: N
- Chrome MCP: ✅ 0 errors (Visual DNA Verified)
- Mobile 375px: ✅ PASS
- 36 Measures: ✅ PASS (Soft Shadows Optimized)

## ⚠️ KNOWN ISSUES (Functional Gaps)
| ID | Priority | Issue | Reason not fixed |
|----|----------|-------|------------------|
| K001 | HIGH | Dashboard uses static values | API Summation not implemented |
| K002 | HIGH | Settings do not persist to DB | Patch API not implemented |
| K003 | MED | Auth is mocked | NextAuth providers not configured |
