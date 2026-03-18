# AuraPharm - Pharmacy Staff User Guide

Welcome to AuraPharm by Blackbound! This manual covers essential daily operations safely allowing you to map prescriptions, catalog drugs, and check out customers rapidly.

## 1. Point of Sale (POS) Engine
The POS terminal is deliberately architected for extreme hardware speed using an interface completely independent of mouse interaction.

1.  **Scanning Items**: 
    AuraPharm uses hardware pooling perfectly. Simply plug in your USB or Bluetooth barcode scanner. Regardless of where you click on the page, the POS engine is constantly "listening" for a fast barcode scan. Scanning a product will automatically retrieve exactly the stock that is expiring soonest to the cart natively protecting you from shrink and waste.
2.  **Manual Checkout Search**: 
    If a barcode is damaged, hit `Alt + S` constantly. This focuses the screen purely onto the search bar. Begin typing generic names, and the Vue Engine actively polls the inventory instantly rendering product cards.
3.  **Finalizing Purchase**: 
    Once items exist inside the Cart module, press `F12` actively. This triggers the checkout transaction strictly deducting valid mapped stock batches simultaneously generating a temporary Thermal PDF receipt URL logic.

## 2. Smart Inventory
AuraPharm implements absolute precision batch-level reporting tracking items physically per actual retail branch.
- **Pharmacies & Branches**: Products globally exist generically for the Pharmacy Network.
- **Physical Tracking**: However, the branches track actual physical 'Batches' securely tracked strictly by `expiry_date`.
- **Alert Triage**: AuraPharm checks deeply via the Dashboard alerting natively at exact intervals: 90 Days (Warning), 60 Days (Critical), and 30 Days (Discard Triggered).
