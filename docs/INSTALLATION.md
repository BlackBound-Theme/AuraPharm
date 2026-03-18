# AuraPharm - 5-Minute Setup Guide

Welcome! Follow these simple steps strictly to cleanly map the multi-tenant architecture immediately.

## Server Prerequisite Architecture
- PHP 8.2 or newer
- MySQL 8.0+ or PostgreSQL 14+
- Composer
- Node.js & NPM (for bundling and scaling frontend assets)

## Bootstrapping Steps
1.  **Deploy Files**: Unzip and upload the source logic to your web server natively inside the `/var/www/html` logic tree.
2.  **Environment Calibration**: 
    Duplicate `.env.example` manually allocating `.env`. Attach exact DB hooks inside cleanly:
    ```
    DB_DATABASE=aurapharm
    DB_USERNAME=root
    DB_PASSWORD=your_password
    ```
3.  **Compile Core Dependencies**:
    Execute natively via terminal: `composer install --no-dev --optimize-autoloader`.
    Secondly load node bindings: `npm install`.
4.  **Database Seeding**:
    Trigger strictly: `php artisan migrate:fresh --seed`.
    *Critically Note: This seamlessly scaffolds your SuperAdmin landlord engine, the pharmacy configurations, and testing batches automatically.*
5.  **Build Vue 3 Engine**:
    Execute explicitly: `npm run build`.
6.  **Done!** Realign your server root pointers immediately to the `/public` directory.
