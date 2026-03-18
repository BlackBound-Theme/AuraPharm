# AuraPharm - Developer Edit Guide

Architected intelligently relying comprehensively upon Laravel 11 and Vue 3 (Composition API). We designed this exact system to ensure developers can cleanly adapt APIs logically without tangling boilerplate.

## 1. Multi-Branch Landlord Security Hooks
If you modify the data arrays deeply, rigidly understand the core isolation methodology:
- **`pharmacy_id`**: Dictates settings for the entire parent network logically.
- **`branch_id`**: Dictates the physical reality (Inventory tracking, Transactions logic).
We isolated this explicitly utilizing Global Eloquent Scopes directly mapping to `app/Traits/BelongsToBranch.php`. If you append a new model (e.g. `Returns.php`), hook the trait to natively shield data.

## 2. Designing & Tailoring the Theme Palette
We intentionally stripped generic tailwind utilities substituting a bespoke `app.css` methodology focusing natively on Slate and Emerald logic grids.
1. Alter generic colors dynamically within `/resources/css/app.css`.
2. Map your own unique shadow glow thresholds structurally modifying `shadow-subtle` declarations.
3. Repack via Vite using `npm run build`.

## 3. Extending the API POS Logic Layer
Do not embed logic into the Vue UI physically.
- **Vue Composables**: Handle discount mathematical calculations virtually inside `AuraPharm/resources/js/composables/useCart.js` mapping reactive thresholds.
- **Repository Architecture**: Intercept payment gateways securely mapping into `AuraPharm/app/Services/POSCheckoutService.php` precisely before `DB::commit()` triggers natively.
