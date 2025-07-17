import React, { useState, useEffect, useMemo } from 'react';
import { Search, Download, Heart, X, MessageSquare, Gift, Send, Wallet, ChevronDown, Menu } from 'lucide-react';

// Placeholder for your details. Update this.
const YOUR_WHATSAPP_NUMBER = "919075469856"; // Replace with your WhatsApp number

const initialTemplatesData = [
    // =================================================================
    // ======================= INVITATIONS CATEGORY ======================
    // =================================================================
    { id: 1, name: 'Classic Invitation Template', price: '99', previewImages: ['https://i.ibb.co/F9QzwqV/ID1.jpg'], downloadFormats: { PSD: 'https://drive.google.com/file/d/1a8VNOPrTqV-vRekfjhrKvL2SgR2COjG0/view?usp=sharing', JPG: 'https://drive.google.com/file/d/1JXz_Pmn5Zx0euBbM0rVB052JD-LMjjE5/view?usp=sharing' }, category: 'Invitations', likes: 252, tags: ['classic', 'floral', 'elegant invitation', 'wedding card'] },
    { id: 2, name: 'Classic Invitation Template', price: '99', previewImages: ['https://i.ibb.co/hJTsSBxX/ID2.jpg'], downloadFormats: { PSD: 'https://drive.google.com/file/d/1ysLv_Up-d-jv8t9soRMZqJ-bh-yps8bX/view?usp=sharing', JPG: 'https://drive.google.com/file/d/1AmUoEiHsYKhnxarGlZ4iRrPG4XdMNJBt/view?usp=sharing' }, category: 'Invitations', likes: 481 },
    { id: 3, name: 'Classic Invitation Template', price: '99', previewImages: ['https://i.ibb.co/6JPTNYtx/ID3.jpg'], downloadFormats: { PSD: 'https://drive.google.com/file/d/1TGOccFkayTgzvvZZ5A7TNK_1ZFl3cFtl/view?usp=sharing', JPG: 'https://drive.google.com/file/d/14FGucMO0lOqSAxp9M4U9T2UCgmeOAw_R/view?usp=sharing' }, category: 'Invitations', likes: 481 },
    { id: 4, name: 'Classic Invitation Template', price: '99', previewImages: ['https://i.ibb.co/VczfNDGL/ID4.jpg'], downloadFormats: { PSD: 'https://drive.google.com/file/d/17xxGUfyT8nzw6nEirOTHYXuYYR_gOkPU/view?usp=sharing', JPG: 'https://drive.google.com/file/d/1QYuxf6KzrDok7OplAckJQrBB1DauV9Cf/view?usp=sharing' }, category: 'Invitations', likes: 481 },
    { id: 5, name: 'Classic Invitation Template', price: '99', previewImages: ['https://i.ibb.co/B563HMXN/ID5.jpg'], downloadFormats: { PSD: 'https://drive.google.com/file/d/1FloCAxC6yS2oDqmxG6bMdW54XkawulBj/view?usp=sharing', JPG: 'https://drive.google.com/file/d/1PMNoWGuMi8V0xpOW1tMP8C6xtZS_4F88/view?usp=sharing' }, category: 'Invitations', likes: 481 },
    { id: 6, name: 'Classic Invitation Template', price: '99', previewImages: ['https://i.ibb.co/G447FtB1/ID6.jpg'], downloadFormats: { PSD: 'https://drive.google.com/file/d/17kkYdULTchx7GnSJ2QfIf5rKbfKguLcl/view?usp=sharing', JPG: 'https://drive.google.com/file/d/16kualdL7QjmYuFm99Ets7csoUoiktemf/view?usp=sharing' }, category: 'Invitations', likes: 481 },
    { id: 7, name: 'Classic Invitation Template', price: '99', previewImages: ['https://i.ibb.co/3YNZXmTr/ID7.jpg'], downloadFormats: { PSD: 'https://drive.google.com/file/d/1CXR71t0f85BfGP-mAlZ9Eqk8CBTbMj9j/view?usp=sharing', JPG: 'https://drive.google.com/file/d/11dfkvdFUxLH2CQwTcVNDyR6b8sUT69SP/view?usp=sharing' }, category: 'Invitations', likes: 481 },
    { id: 8, name: 'Classic Invitation Template', price: '99', previewImages: ['https://i.ibb.co/V03n9pYQ/ID8.jpg'], downloadFormats: { PSD: 'https://drive.google.com/file/d/1oknQgcFKigEl7YVPw6hB-tXbvUJcQjPi/view?usp=sharing', JPG: 'https://drive.google.com/file/d/17EM79qr8dlEB5oKNeE3ZRq9c2iMJiwM5/view?usp=sharing' }, category: 'Invitations', likes: 481 },
    { id: 9, name: 'Classic Invitation Template', price: '99', previewImages: ['https://i.ibb.co/ZR8Pxdbk/ID9.jpg'], downloadFormats: { PSD: 'https://drive.google.com/file/d/1GbELy1c757dWn4xLCujO09Vr4QVzthdc/view?usp=sharing', JPG: 'https://drive.google.com/file/d/1J-LEncEzpuUF0R_eAMWQpkbXfZYGda18/view?usp=sharing' }, category: 'Invitations', likes: 481 },
    { id: 10, name: 'Classic Invitation Template', price: '99', previewImages: ['https://i.ibb.co/k2RbFYk4/ID10.jpg'], downloadFormats: { PSD: 'https://drive.google.com/file/d/1Xf-rZCuaJu2eCtmb5TeugXdLOTSy7btw/view?usp=sharing', JPG: 'https://drive.google.com/file/d/1tUPT8NIQcMRuQyxRLRQxpZg2hXYdCKeb/view?usp=sharing' }, category: 'Invitations', likes: 481 },
    { id: 11, name: 'Classic Invitation Template', price: '99', previewImages: ['https://i.ibb.co/ZRdvRzqB/ID11.jpg'], downloadFormats: { PSD: 'https://drive.google.com/file/d/1-gvnEP6ocCT1MXToLqgjz6dABL_jPfyo/view?usp=sharing', JPG: 'https://drive.google.com/file/d/1bNfFhI1uo_wiWC4--K6A7FCB_GI4uIi2/view?usp=sharing' }, category: 'Invitations', likes: 481 },
    { id: 12, name: 'Classic Invitation Template', price: '99', previewImages: ['https://i.ibb.co/60F9jVdL/ID12.jpg'], downloadFormats: { PSD: '#', JPG: '#' }, category: 'Invitations', likes: 481 },
    { id: 13, name: 'Classic Invitation Template', price: '99', previewImages: ['https://i.ibb.co/kstYjXJs/ID13.jpg'], downloadFormats: { PSD: '#', JPG: '#' }, category: 'Invitations', likes: 481 },
    { id: 14, name: 'Classic Invitation Template', price: '99', previewImages: ['https://i.ibb.co/pBz5MbNv/ID14.jpg'], downloadFormats: { PSD: '#', JPG: '#' }, category: 'Invitations', likes: 481 },
    { id: 15, name: 'Classic Invitation Template', price: '99', previewImages: ['https://i.ibb.co/pCnRf6L/ID15.jpg'], downloadFormats: { PSD: '#', JPG: '#' }, category: 'Invitations', likes: 481 },
    { id: 16, name: 'Classic Invitation Template', price: '99', previewImages: ['https://i.ibb.co/KzXTDBjS/ID16.jpg'], downloadFormats: { PSD: '#', JPG: '#' }, category: 'Invitations', likes: 481 },
    { id: 17, name: 'Classic Invitation Template', price: '99', previewImages: ['https://i.ibb.co/8kK1rhw/ID17.jpg'], downloadFormats: { PSD: '#', JPG: '#' }, category: 'Invitations', likes: 481 },
    { id: 18, name: 'Classic Invitation Template', price: '99', previewImages: ['https://i.ibb.co/FbwMTqGP/ID18.jpg'], downloadFormats: { PSD: '#', JPG: '#' }, category: 'Invitations', likes: 481 },
    { id: 19, name: 'Classic Invitation Template', price: '99', previewImages: ['https://i.ibb.co/Kj5zkkn1/ID19.jpg'], downloadFormats: { PSD: '#', JPG: '#' }, category: 'Invitations', likes: 481 },
    { id: 20, name: 'Classic Invitation Template', price: '99', previewImages: ['https://i.ibb.co/hxKBYNSM/ID20.jpg'], downloadFormats: { PSD: '#', JPG: '#' }, category: 'Invitations', likes: 481 },
    { id: 21, name: 'Classic Invitation Template', price: '99', previewImages: ['https://i.ibb.co/LynG8D2/ID21.jpg'], downloadFormats: { PSD: '#', JPG: '#' }, category: 'Invitations', likes: 481 },
    { id: 22, name: 'Classic Invitation Template', price: '99', previewImages: ['https://i.ibb.co/Pvpcr1dD/ID22.jpg'], downloadFormats: { PSD: '#', JPG: '#' }, category: 'Invitations', likes: 481 },
    { id: 23, name: 'Classic Invitation Template', price: '99', previewImages: ['https://i.ibb.co/jPNjFg0p/ID23.jpg'], downloadFormats: { PSD: '#', JPG: '#' }, category: 'Invitations', likes: 481 },
    { id: 24, name: 'Classic Invitation Template', price: '99', previewImages: ['https://i.ibb.co/Q3R2gt8h/ID24.jpg'], downloadFormats: { PSD: '#', JPG: '#' }, category: 'Invitations', likes: 481 },
    { id: 25, name: 'Classic Invitation Template', price: '99', previewImages: ['https://i.ibb.co/5gdMhk3m/ID25.jpg'], downloadFormats: { PSD: '#', JPG: '#' }, category: 'Invitations', likes: 481 },
    { id: 26, name: 'Classic Invitation Template', price: '99', previewImages: ['https://i.ibb.co/XfsXfGp7/ID26.jpg'], downloadFormats: { PSD: '#', JPG: '#' }, category: 'Invitations', likes: 481 },
    { id: 27, name: 'Classic Invitation Template', price: '99', previewImages: ['https://i.ibb.co/gbY71mP8/ID27.jpg'], downloadFormats: { PSD: '#', JPG: '#' }, category: 'Invitations', likes: 481 },
    { id: 28, name: 'Classic Invitation Template', price: '99', previewImages: ['https://i.ibb.co/fz4gZKbj/ID28.jpg'], downloadFormats: { PSD: '#', JPG: '#' }, category: 'Invitations', likes: 481 },
    { id: 29, name: 'Classic Invitation Template', price: '99', previewImages: ['https://i.ibb.co/sd2Vz9Lk/ID29.jpg'], downloadFormats: { PSD: '#', JPG: '#' }, category: 'Invitations', likes: 481 },
    { id: 30, name: 'Classic Invitation Template', price: '99', previewImages: ['https://i.ibb.co/svCtLd04/ID30.jpg'], downloadFormats: { PSD: '#', JPG: '#' }, category: 'Invitations', likes: 481 },
    { id: 31, name: 'Classic Invitation Template', price: '99', previewImages: ['https://i.ibb.co/BV2m4qh1/ID31.jpg'], downloadFormats: { PSD: '#', JPG: '#' }, category: 'Invitations', likes: 481 },
    { id: 32, name: 'Classic Invitation Template', price: '99', previewImages: ['https://i.ibb.co/ZpVwxQk9/ID32.jpg'], downloadFormats: { PSD: '#', JPG: '#' }, category: 'Invitations', likes: 481 },
    { id: 33, name: 'Classic Invitation Template', price: '99', previewImages: ['https://i.ibb.co/GfNm1hQS/ID33.jpg'], downloadFormats: { PSD: '#', JPG: '#' }, category: 'Invitations', likes: 481 },
    { id: 34, name: 'Classic Invitation Template', price: '99', previewImages: ['https://i.ibb.co/WvyZZ26G/ID34.jpg'], downloadFormats: { PSD: '#', JPG: '#' }, category: 'Invitations', likes: 481 },
    { id: 35, name: 'Classic Invitation Template', price: '99', previewImages: ['https://i.ibb.co/mVv5xr35/ID35.jpg'], downloadFormats: { PSD: '#', JPG: '#' }, category: 'Invitations', likes: 481 },
    { id: 36, name: 'Classic Invitation Template', price: '99', previewImages: ['https://i.ibb.co/yHvC7tp/ID36.jpg'], downloadFormats: { PSD: '#', JPG: '#' }, category: 'Invitations', likes: 481 },
    { id: 37, name: 'Classic Invitation Template', price: '99', previewImages: ['https://i.ibb.co/N2Z2hJ1Y/ID37.jpg'], downloadFormats: { PSD: '#', JPG: '#' }, category: 'Invitations', likes: 481 },
    { id: 38, name: 'Classic Invitation Template', price: '99', previewImages: ['https://i.ibb.co/KJxkCtw/ID38.jpg'], downloadFormats: { PSD: '#', JPG: '#' }, category: 'Invitations', likes: 481 },
    { id: 39, name: 'Classic Invitation Template', price: '99', previewImages: ['https://i.ibb.co/dwBkSDwt/ID39.jpg'], downloadFormats: { PSD: '#', JPG: '#' }, category: 'Invitations', likes: 481 },
    { id: 40, name: 'Classic Invitation Template', price: '99', previewImages: ['https://i.ibb.co/BHCYvBsg/ID40.jpg'], downloadFormats: { PSD: '#', JPG: '#' }, category: 'Invitations', likes: 481 },
    { id: 41, name: 'Classic Invitation Template', price: '99', previewImages: ['https://i.ibb.co/zTmx39jK/ID41.jpg'], downloadFormats: { PSD: '#', JPG: '#' }, category: 'Invitations', likes: 481 },
    { id: 42, name: 'Classic Invitation Template', price: '99', previewImages: ['https://i.ibb.co/DHM8NzLX/ID42.jpg'], downloadFormats: { PSD: '#', JPG: '#' }, category: 'Invitations', likes: 481 },
    { id: 43, name: 'Classic Invitation Template', price: '99', previewImages: ['https://i.ibb.co/JF7tTMLr/ID43.jpg'], downloadFormats: { PSD: '#', JPG: '#' }, category: 'Invitations', likes: 481 },
    { id: 44, name: 'Classic Invitation Template', price: '99', previewImages: ['https://i.ibb.co/FbPW4wdd/ID44.jpg'], downloadFormats: { PSD: '#', JPG: '#' }, category: 'Invitations', likes: 481 },
    { id: 45, name: 'Classic Invitation Template', price: '99', previewImages: ['https://i.ibb.co/0RK25yyy/ID45.jpg'], downloadFormats: { PSD: '#', JPG: '#' }, category: 'Invitations', likes: 481 },
    { id: 46, name: 'Classic Invitation Template', price: '99', previewImages: ['https://i.ibb.co/zTTM91Tf/ID46.jpg'], downloadFormats: { PSD: '#', JPG: '#' }, category: 'Invitations', likes: 481 },
    { id: 47, name: 'Classic Invitation Template', price: '99', previewImages: ['https://i.ibb.co/KcNNJKp3/ID47.jpg'], downloadFormats: { PSD: '#', JPG: '#' }, category: 'Invitations', likes: 481 },
    { id: 48, name: 'Classic Invitation Template', price: '99', previewImages: ['https://i.ibb.co/Hfp7KhBv/ID48.jpg'], downloadFormats: { PSD: '#', JPG: '#' }, category: 'Invitations', likes: 481 },
    { id: 49, name: 'Classic Invitation Template', price: '99', previewImages: ['https://i.ibb.co/zh4JYtTj/ID49.jpg'], downloadFormats: { PSD: '#', JPG: '#' }, category: 'Invitations', likes: 481 },
    { id: 50, name: 'Classic Invitation Template', price: '99', previewImages: ['https://i.ibb.co/hJ1ZFRxg/ID50.jpg'], downloadFormats: { PSD: '#', JPG: '#' }, category: 'Invitations', likes: 481 },
    { id: 51, name: 'Classic Invitation Template', price: '99', previewImages: ['https://i.ibb.co/ymsVfRMm/ID51.jpg'], downloadFormats: { PSD: '#', JPG: '#' }, category: 'Invitations', likes: 481 },
    { id: 52, name: 'Classic Invitation Template', price: '99', previewImages: ['https://i.ibb.co/CpSjZ0SH/ID52.jpg'], downloadFormats: { PSD: '#', JPG: '#' }, category: 'Invitations', likes: 481 },
    { id: 53, name: 'Classic Invitation Template', price: '99', previewImages: ['https://i.ibb.co/NdtD2C2K/ID53.jpg'], downloadFormats: { PSD: '#', JPG: '#' }, category: 'Invitations', likes: 481 },
    { id: 54, name: 'Classic Invitation Template', price: '99', previewImages: ['https://i.ibb.co/Ld2dnF6q/ID54.jpg'], downloadFormats: { PSD: '#', JPG: '#' }, category: 'Invitations', likes: 481 },
    { id: 55, name: 'Classic Invitation Template', price: '99', previewImages: ['https://i.ibb.co/pBVQ5RRs/ID55.jpg'], downloadFormats: { PSD: '#', JPG: '#' }, category: 'Invitations', likes: 481 },
    { id: 56, name: 'Classic Invitation Template', price: '99', previewImages: ['https://i.ibb.co/ZzLsRML1/ID56.jpg'], downloadFormats: { PSD: '#', JPG: '#' }, category: 'Invitations', likes: 481 },
    { id: 57, name: 'Classic Invitation Template', price: '99', previewImages: ['https://i.ibb.co/PJJ5KXR/ID57.jpg'], downloadFormats: { PSD: '#', JPG: '#' }, category: 'Invitations', likes: 481 },
    { id: 58, name: 'Classic Invitation Template', price: '99', previewImages: ['https://i.ibb.co/qY1w8M9F/ID58.jpg'], downloadFormats: { PSD: '#', JPG: '#' }, category: 'Invitations', likes: 481 },
    { id: 59, name: 'Classic Invitation Template', price: '99', previewImages: ['https://i.ibb.co/931hBx9x/ID59.jpg'], downloadFormats: { PSD: '#', JPG: '#' }, category: 'Invitations', likes: 481 },
    { id: 60, name: 'Classic Invitation Template', price: '99', previewImages: ['https://i.ibb.co/s90vP4Cz/ID60.jpg'], downloadFormats: { PSD: '#', JPG: '#' }, category: 'Invitations', likes: 481 },
    { id: 61, name: 'Classic Invitation Template', price: '99', previewImages: ['https://i.ibb.co/QjpVJJYx/ID61.jpg'], downloadFormats: { PSD: '#', JPG: '#' }, category: 'Invitations', likes: 481 },
    { id: 62, name: 'Classic Invitation Template', price: '99', previewImages: ['https://i.ibb.co/KpD6L2xv/ID62.jpg'], downloadFormats: { PSD: '#', JPG: '#' }, category: 'Invitations', likes: 481 },
    { id: 63, name: 'Classic Invitation Template', price: '99', previewImages: ['https://i.ibb.co/7NLMbxq0/ID63.jpg'], downloadFormats: { PSD: '#', JPG: '#' }, category: 'Invitations', likes: 481 },
    { id: 64, name: 'Classic Invitation Template', price: '99', previewImages: ['https://i.ibb.co/zWKKks32/ID64.jpg'], downloadFormats: { PSD: '#', JPG: '#' }, category: 'Invitations', likes: 481 },
    { id: 65, name: 'Classic Invitation Template', price: '99', previewImages: ['https://i.ibb.co/DH6fyCmQ/ID65.jpg'], downloadFormats: { PSD: '#', JPG: '#' }, category: 'Invitations', likes: 481 },
    { id: 66, name: 'Classic Invitation Template', price: '99', previewImages: ['https://i.ibb.co/vvxnKyFp/ID66.jpg'], downloadFormats: { PSD: '#', JPG: '#' }, category: 'Invitations', likes: 481 },
    { id: 67, name: 'Classic Invitation Template', price: '99', previewImages: ['https://i.ibb.co/XRMsCKw/ID67.jpg'], downloadFormats: { PSD: '#', JPG: '#' }, category: 'Invitations', likes: 481 },
    { id: 68, name: 'Classic Invitation Template', price: '99', previewImages: ['https://i.ibb.co/LXRCgBbZ/ID68.jpg'], downloadFormats: { PSD: '#', JPG: '#' }, category: 'Invitations', likes: 481 },
    { id: 69, name: 'Classic Invitation Template', price: '99', previewImages: ['https://i.ibb.co/HL16rp12/ID69.jpg'], downloadFormats: { PSD: '#', JPG: '#' }, category: 'Invitations', likes: 481 },
    { id: 70, name: 'Classic Invitation Template', price: '99', previewImages: ['https://i.ibb.co/NdbGRnqX/ID70.jpg'], downloadFormats: { PSD: '#', JPG: '#' }, category: 'Invitations', likes: 481 },
    { id: 71, name: 'Classic Invitation Template', price: '99', previewImages: ['https://i.ibb.co/fYqwDHVD/ID71.jpg'], downloadFormats: { PSD: '#', JPG: '#' }, category: 'Invitations', likes: 481 },
    { id: 72, name: 'Classic Invitation Template', price: '99', previewImages: ['https://i.ibb.co/WpNbB0hc/ID72.jpg'], downloadFormats: { PSD: '#', JPG: '#' }, category: 'Invitations', likes: 481 },
    { id: 73, name: 'Classic Invitation Template', price: '99', previewImages: ['https://i.ibb.co/mVszk0d3/ID73.jpg'], downloadFormats: { PSD: '#', JPG: '#' }, category: 'Invitations', likes: 481 },
    { id: 74, name: 'Classic Invitation Template', price: '99', previewImages: ['https://i.ibb.co/6RTzZGS8/ID74.jpg'], downloadFormats: { PSD: '#', JPG: '#' }, category: 'Invitations', likes: 481 },
    { id: 75, name: 'Classic Invitation Template', price: '99', previewImages: ['https://i.ibb.co/39vBZLwC/ID75.jpg'], downloadFormats: { PSD: '#', JPG: '#' }, category: 'Invitations', likes: 481 },
    { id: 76, name: 'Classic Invitation Template', price: '99', previewImages: ['https://i.ibb.co/ZpMR5HGh/ID76.jpg'], downloadFormats: { PSD: '#', JPG: '#' }, category: 'Invitations', likes: 481 },
    { id: 77, name: 'Classic Invitation Template', price: '99', previewImages: ['https://i.ibb.co/dwY5H87G/ID77.jpg'], downloadFormats: { PSD: '#', JPG: '#' }, category: 'Invitations', likes: 481 },
    { id: 78, name: 'Classic Invitation Template', price: '99', previewImages: ['https://i.ibb.co/Mx6MnBDy/ID78.jpg'], downloadFormats: { PSD: '#', JPG: '#' }, category: 'Invitations', likes: 481 },
    { id: 79, name: 'Classic Invitation Template', price: '99', previewImages: ['https://i.ibb.co/gbTqCK9q/ID79.jpg'], downloadFormats: { PSD: '#', JPG: '#' }, category: 'Invitations', likes: 481 },
    { id: 80, name: 'Classic Invitation Template', price: '99', previewImages: ['https://i.ibb.co/0RbWF1Lf/ID80.jpg'], downloadFormats: { PSD: '#', JPG: '#' }, category: 'Invitations', likes: 481 },
    { id: 81, name: 'Classic Invitation Template', price: '99', previewImages: ['https://i.ibb.co/gLR2bCgT/ID81.jpg'], downloadFormats: { PSD: '#', JPG: '#' }, category: 'Invitations', likes: 481 },
    { id: 82, name: 'Classic Invitation Template', price: '99', previewImages: ['https://i.ibb.co/LDz2bYNQ/ID82.jpg'], downloadFormats: { PSD: '#', JPG: '#' }, category: 'Invitations', likes: 481 },
    { id: 83, name: 'Classic Invitation Template', price: '99', previewImages: ['https://i.ibb.co/7d7L3B8Q/ID83.jpg'], downloadFormats: { PSD: '#', JPG: '#' }, category: 'Invitations', likes: 481 },
    { id: 84, name: 'Classic Invitation Template', price: '99', previewImages: ['https://i.ibb.co/60CHbDNp/ID84.jpg'], downloadFormats: { PSD: '#', JPG: '#' }, category: 'Invitations', likes: 481 },
    { id: 85, name: 'Classic Invitation Template', price: '99', previewImages: ['https://i.ibb.co/FbcQjW8G/ID85.jpg'], downloadFormats: { PSD: '#', JPG: '#' }, category: 'Invitations', likes: 481 },
    { id: 86, name: 'Classic Invitation Template', price: '99', previewImages: ['https://i.ibb.co/XZGf9qH1/ID86.jpg'], downloadFormats: { PSD: '#', JPG: '#' }, category: 'Invitations', likes: 481 },
    { id: 87, name: 'Classic Invitation Template', price: '99', previewImages: ['https://i.ibb.co/x8wjhrfP/ID87.jpg'], downloadFormats: { PSD: '#', JPG: '#' }, category: 'Invitations', likes: 481 },
    { id: 88, name: 'Classic Invitation Template', price: '99', previewImages: ['https://i.ibb.co/rRbYmg8k/ID88.jpg'], downloadFormats: { PSD: '#', JPG: '#' }, category: 'Invitations', likes: 481 },
    { id: 89, name: 'Classic Invitation Template', price: '99', previewImages: ['https://i.ibb.co/zThgYLjK/ID89.jpg'], downloadFormats: { PSD: '#', JPG: '#' }, category: 'Invitations', likes: 481 },
    { id: 90, name: 'Classic Invitation Template', price: '99', previewImages: ['https://i.ibb.co/RGR1zPP4/ID90.jpg'], downloadFormats: { PSD: '#', JPG: '#' }, category: 'Invitations', likes: 483 },
    { id: 91, name: 'Classic Invitation Template', price: '99', previewImages: ['https://i.ibb.co/q3Vb5njN/ID91.jpg'], downloadFormats: { PSD: '#', JPG: '#' }, category: 'Invitations', likes: 481 },
    { id: 92, name: 'Classic Invitation Template', price: '99', previewImages: ['https://i.ibb.co/prnt5VZW/ID92.jpg'], downloadFormats: { PSD: '#', JPG: '#' }, category: 'Invitations', likes: 481 },
    { id: 93, name: 'Classic Invitation Template', price: '99', previewImages: ['https://i.ibb.co/XrrVZzSV/ID93.jpg'], downloadFormats: { PSD: '#', JPG: '#' }, category: 'Invitations', likes: 500 },
    { id: 94, name: 'Classic Invitation Template', price: '99', previewImages: ['https://i.ibb.co/6JJxPcvW/ID94.jpg'], downloadFormats: { PSD: '#', JPG: '#' }, category: 'Invitations', likes: 481 },
    { id: 95, name: 'Classic Invitation Template', price: '99', previewImages: ['https://i.ibb.co/5hk82j6k/ID95.jpg'], downloadFormats: { PSD: '#', JPG: '#' }, category: 'Invitations', likes: 481 },
    { id: 96, name: 'Classic Invitation Template', price: '99', previewImages: ['https://i.ibb.co/8g2zL4hb/ID96.jpg'], downloadFormats: { PSD: '#', JPG: '#' }, category: 'Invitations', likes: 481 },
    { id: 97, name: 'Classic Invitation Template', price: '99', previewImages: ['https://i.ibb.co/vxyySY1X/ID97.jpg'], downloadFormats: { PSD: '#', JPG: '#' }, category: 'Invitations', likes: 481 },
    { id: 98, name: 'Classic Invitation Template', price: '99', previewImages: ['https://i.ibb.co/VWCL460N/ID98.jpg'], downloadFormats: { PSD: '#', JPG: '#' }, category: 'Invitations', likes: 481 },
    { id: 99, name: 'Classic Invitation Template', price: '99', previewImages: ['https://i.ibb.co/fVFMC4GT/ID99.jpg'], downloadFormats: { PSD: '#', JPG: '#' }, category: 'Invitations', likes: 481 },
    { id: 100, name: 'Classic Invitation Template', price: '99', previewImages: ['https://i.ibb.co/pq8ywQ7/ID100.jpg'], downloadFormats: { PSD: '#', JPG: '#' }, category: 'Invitations', likes: 481 },
    { id: 101, name: 'Hindi Wedding Invitation Template', price: '99', previewImages: ['https://i.ibb.co/mF5Gbd5R/ID101.jpg'], downloadFormats: { PSD: '#', JPG: '#' }, category: 'Invitations', likes: 156, tags: ['hindi wedding invitation, hindi wedding invitation template, hindi, hindi invitation card'] },
    { id: 102, name: 'Hindi Wedding Invitation Template', price: '99', previewImages: ['https://i.ibb.co/7dxPWLMV/ID102.jpg'], downloadFormats: { PSD: '#', JPG: '#' }, category: 'Invitations', likes: 99, tags: ['hindi wedding invitation, hindi wedding invitation template, hindi, hindi invitation card'] },
    { id: 103, name: 'Hindi Wedding Invitation Template', price: '99', previewImages: ['https://i.ibb.co/5g3snTT0/ID103.jpg'], downloadFormats: { PSD: '#', JPG: '#' }, category: 'Invitations', likes: 27, tags: ['hindi wedding invitation, hindi wedding invitation template, hindi, hindi invitation card'] },
    { id: 104, name: 'Hindi Wedding Invitation Template', price: '99', previewImages: ['https://i.ibb.co/r27QDn4M/ID104.jpg'], downloadFormats: { PSD: '#', JPG: '#' }, category: 'Invitations', likes: 17, tags: ['hindi wedding invitation, hindi wedding invitation template, hindi, hindi invitation card'] },
    { id: 105, name: 'Hindi Wedding Invitation Template', price: '99', previewImages: ['https://i.ibb.co/rKRFKFvd/ID105.jpg'], downloadFormats: { PSD: '#', JPG: '#' }, category: 'Invitations', likes: 82, tags: ['hindi wedding invitation, hindi wedding invitation template, hindi, hindi invitation card'] },
    { id: 106, name: 'Hindi Wedding Invitation Template', price: '99', previewImages: ['https://i.ibb.co/hRSsmBxK/ID106.jpg'], downloadFormats: { PSD: '#', JPG: '#' }, category: 'Invitations', likes: 4, tags: ['hindi wedding invitation, hindi wedding invitation template, hindi, hindi invitation card'] },
    { id: 107, name: 'Hindi Wedding Invitation Template', price: '99', previewImages: ['https://i.ibb.co/NgBgg4Hb/ID107.jpg'], downloadFormats: { PSD: '#', JPG: '#' }, category: 'Invitations', likes: 56, tags: ['hindi wedding invitation, hindi wedding invitation template, hindi, hindi invitation card'] },
    { id: 108, name: 'Hindi Wedding Invitation Template', price: '99', previewImages: ['https://i.ibb.co/BvQGz7y/ID108.jpg'], downloadFormats: { PSD: '#', JPG: '#' }, category: 'Invitations', likes: 471, tags: ['hindi wedding invitation, hindi wedding invitation template, hindi, hindi invitation card'] },
    { id: 109, name: 'Hindi Wedding Invitation Template', price: '99', previewImages: ['https://i.ibb.co/YFQffCNP/ID109.jpg'], downloadFormats: { PSD: '#', JPG: '#' }, category: 'Invitations', likes: 94, tags: ['hindi wedding invitation, hindi wedding invitation template, hindi, hindi invitation card'] },
    { id: 110, name: 'Hindi Wedding Invitation Template', price: '99', previewImages: ['https://i.ibb.co/5gw9167n/ID110.jpg'], downloadFormats: { PSD: '#', JPG: '#' }, category: 'Invitations', likes: 38, tags: ['hindi wedding invitation, hindi wedding invitation template, hindi, hindi invitation card'] },

    // =================================================================
    // ======================= SAVE THE DATE ======================
    // =================================================================

    { id: 1001, name: 'Wedding Save-the-Date Card Template', price: '99', previewImages: ['https://i.ibb.co/7hk4587/ID1001.jpg'], downloadFormats: { EPS: '#', PNG: '#' }, category: 'Save-the-Date', likes: 198 },
    { id: 1002, name: 'Wedding Save-the-Date Card Template', price: '99', previewImages: ['https://i.ibb.co/1fjQCLvb/ID1002.jpg'], downloadFormats: { PNG: '#', JPG: '#' }, category: 'Save-the-Date', likes: 234 },
    { id: 1003, name: 'Wedding Save-the-Date Card Template', price: '99', previewImages: ['https://i.ibb.co/Z6ZnLrh3/ID1003.jpg'], downloadFormats: { PNG: '#', JPG: '#' }, category: 'Save-the-Date', likes: 213 },
    { id: 1004, name: 'Wedding Save-the-Date Card Template', price: '99', previewImages: ['https://i.ibb.co/LzjFqf58/ID1004.jpg'], downloadFormats: { PNG: '#', JPG: '#' }, category: 'Save-the-Date', likes: 134 },
    { id: 1005, name: 'Wedding Save-the-Date Card Template', price: '99', previewImages: ['https://i.ibb.co/RkSS8whh/ID1005.jpg'], downloadFormats: { PNG: '#', JPG: '#' }, category: 'Save-the-Date', likes: 166 },
    { id: 1006, name: 'Wedding Save-the-Date Card Template', price: '99', previewImages: ['https://i.ibb.co/20DzKwcc/ID1006.jpg'], downloadFormats: { PNG: '#', JPG: '#' }, category: 'Save-the-Date', likes: 157 },
    { id: 1007, name: 'Wedding Save-the-Date Card Template', price: '99', previewImages: ['https://i.ibb.co/Z6zbB1fw/ID1007.jpg'], downloadFormats: { PNG: '#', JPG: '#' }, category: 'Save-the-Date', likes: 196 },
    { id: 1008, name: 'Wedding Save-the-Date Card Template', price: '99', previewImages: ['https://i.ibb.co/Cstgj4r9/ID1008.jpg'], downloadFormats: { PNG: '#', JPG: '#' }, category: 'Save-the-Date', likes: 466 },
    { id: 1009, name: 'Wedding Save-the-Date Card Template', price: '99', previewImages: ['https://i.ibb.co/N6T5Gx2T/ID1009.jpg'], downloadFormats: { PNG: '#', JPG: '#' }, category: 'Save-the-Date', likes: 145 },
    { id: 1010, name: 'Wedding Save-the-Date Card Template', price: '99', previewImages: ['https://i.ibb.co/JF3ffjtS/ID1010.jpg'], downloadFormats: { PNG: '#', JPG: '#' }, category: 'Save-the-Date', likes: 158 },
    { id: 1011, name: 'Wedding Save-the-Date Card Template', price: '99', previewImages: ['https://i.ibb.co/spdnL3zC/ID1011.jpg'], downloadFormats: { PNG: '#', JPG: '#' }, category: 'Save-the-Date', likes: 139 },
    { id: 1012, name: 'Wedding Save-the-Date Card Template', price: '99', previewImages: ['https://i.ibb.co/GQQRwWXp/ID1012.jpg'], downloadFormats: { PNG: '#', JPG: '#' }, category: 'Save-the-Date', likes: 284 },
    { id: 1013, name: 'Wedding Save-the-Date Card Template', price: '99', previewImages: ['https://i.ibb.co/60MjXS4L/ID1013.jpg'], downloadFormats: { PNG: '#', JPG: '#' }, category: 'Save-the-Date', likes: 164 },
    { id: 1014, name: 'Wedding Save-the-Date Card Template', price: '99', previewImages: ['https://i.ibb.co/8g3WLPkq/ID1014.jpg'], downloadFormats: { PNG: '#', JPG: '#' }, category: 'Save-the-Date', likes: 274 },
    { id: 1015, name: 'Wedding Save-the-Date Card Template', price: '99', previewImages: ['https://i.ibb.co/bMvmG60W/ID1015.jpg'], downloadFormats: { PNG: '#', JPG: '#' }, category: 'Save-the-Date', likes: 178 },
    { id: 1016, name: 'Wedding Save-the-Date Card Template', price: '99', previewImages: ['https://i.ibb.co/XkKKwthr/ID1016.jpg'], downloadFormats: { PNG: '#', JPG: '#' }, category: 'Save-the-Date', likes: 193 },
    { id: 1017, name: 'Wedding Save-the-Date Card Template', price: '99', previewImages: ['https://i.ibb.co/v4rCdzmt/ID1017.jpg'], downloadFormats: { PNG: '#', JPG: '#' }, category: 'Save-the-Date', likes: 127 },
    { id: 1018, name: 'Wedding Save-the-Date Card Template', price: '99', previewImages: ['https://i.ibb.co/jvFsh72F/ID1018.jpg'], downloadFormats: { PNG: '#', JPG: '#' }, category: 'Save-the-Date', likes: 165 },
    { id: 1019, name: 'Wedding Save-the-Date Card Template', price: '99', previewImages: ['https://i.ibb.co/S7ydnz2M/ID1019.jpg'], downloadFormats: { PNG: '#', JPG: '#' }, category: 'Save-the-Date', likes: 125 },
    { id: 1020, name: 'Wedding Save-the-Date Card Template', price: '99', previewImages: ['https://i.ibb.co/hJ26gwsw/ID1020.jpg'], downloadFormats: { PNG: '#', JPG: '#' }, category: 'Save-the-Date', likes: 345 },
    { id: 1021, name: 'Wedding Save-the-Date Card Template', price: '99', previewImages: ['https://i.ibb.co/pjB1J09k/ID1021.jpg'], downloadFormats: { PNG: '#', JPG: '#' }, category: 'Save-the-Date', likes: 345 },
    { id: 1022, name: 'Wedding Save-the-Date Card Template', price: '99', previewImages: ['https://i.ibb.co/pBmQdNsb/ID1022.jpg'], downloadFormats: { PNG: '#', JPG: '#' }, category: 'Save-the-Date', likes: 345 },
    { id: 1023, name: 'Wedding Save-the-Date Card Template', price: '99', previewImages: ['https://i.ibb.co/99FM94kx/ID1023.jpg'], downloadFormats: { PNG: '#', JPG: '#' }, category: 'Save-the-Date', likes: 345 },
    { id: 1024, name: 'Wedding Save-the-Date Card Template', price: '99', previewImages: ['https://i.ibb.co/n881Kgjg/ID1024.jpg'], downloadFormats: { PNG: '#', JPG: '#' }, category: 'Save-the-Date', likes: 345 },
    { id: 1025, name: 'Wedding Save-the-Date Card Template', price: '99', previewImages: ['https://i.ibb.co/ZRRWJyYW/ID1025.jpg'], downloadFormats: { PNG: '#', JPG: '#' }, category: 'Save-the-Date', likes: 345 },

    // =================================================================
    // ======================= CLIPARTS ======================
    // =================================================================
    
    { id: 2001, name: 'Wedding couple vector Clipart', previewImages: ['https://i.ibb.co/G3B3gbN7/wedding-couple-Illutraction-1.jpg'], downloadFormats: { PNG: 'https://drive.google.com/file/d/1F3KaJ3DM_ujUI3GvV9D1pP60eu-K05RX/view?usp=sharing', EPS: 'https://drive.google.com/file/d/1zQ6WgAF1TiJJSj_hUeRXAsKLO8K9LtPy/view?usp=sharing', JPG: 'https://drive.google.com/file/d/1BbAezaAna-BnWhKbS4rfm2EYMY54jPkl/view?usp=sharing' }, category: 'Clipart', likes: 88 },
    { id: 2002, name: 'Wedding couple vector Clipart', previewImages: ['https://i.ibb.co/SXCcGWH8/wedding-couple-Illutraction-2.jpg'], downloadFormats: { PNG: 'https://drive.google.com/file/d/17Ye3NKyku0EEbG_0Ytkb9WQW60FfY0m0/view?usp=sharing', EPS: 'https://drive.google.com/file/d/1Aw3-u9zAW2gp-LQATC4PT9n7m151ucDU/view?usp=sharing', JPG: 'https://drive.google.com/file/d/1QMKznT7OPIOmX6y2FLE8gyu29UrGUcCr/view?usp=sharing' }, category: 'Clipart', likes: 123 },
    { id: 2003, name: 'Wedding couple vector Clipart', previewImages: ['https://i.ibb.co/fdqmYLz4/wedding-couple-Illutraction-3.jpg'], downloadFormats: { PNG: 'https://drive.google.com/file/d/19jH3-VlERrLez3p2fDjI47icGUl_r5AH/view?usp=sharing', EPS: 'https://drive.google.com/file/d/1o9Vkcf0eRia2ZBKjj2W9lvsB5jgARdra/view?usp=sharing', JPG: 'https://drive.google.com/file/d/13DOC_xRcwwm9i4dipAKPqFggfOPVtCf4/view?usp=sharing' }, category: 'Clipart', likes: 210 },
    { id: 2004, name: 'Wedding couple vector Clipart', previewImages: ['https://i.ibb.co/397g1RbM/wedding-couple-Illutraction-4.jpg'], downloadFormats: { PNG: 'https://drive.google.com/file/d/186Pu9G4r_R30Vx8aiwgbwOX1yetp1oEk/view?usp=sharing', EPS: 'https://drive.google.com/file/d/1IuQCYoK3VB-rj5wcsVqI2v2bAH0-brVn/view?usp=sharing', JPG: 'https://drive.google.com/file/d/1C48QboOGfA2Duim2CVjycTQuzs6UcRDq/view?usp=sharing' }, category: 'Clipart', likes: 210 },
    { id: 2005, name: 'Wedding couple vector Clipart', previewImages: ['https://i.ibb.co/cXY1nRqM/wedding-couple-Illutraction-5.jpg'], downloadFormats: { PNG: 'https://drive.google.com/file/d/1XwlDXNMgehZH84alkvZpHFO68WvBX8Y6/view?usp=sharing', EPS: 'https://drive.google.com/file/d/1MTWVMZDaEK1dFz8-oebmiIlZXW6-FiwV/view?usp=sharing', JPG: 'https://drive.google.com/file/d/1tWuLrMlvOeaO8z2zdZJY8udnovZAKyN3/view?usp=sharing' }, category: 'Clipart', likes: 210 },
    { id: 2006, name: 'Wedding couple vector Clipart', previewImages: ['https://i.ibb.co/NdKmLKxy/wedding-couple-Illutraction-6.jpg'], downloadFormats: { PNG: 'https://drive.google.com/file/d/1xb6h7DIii7W8GFZz_Uuh4-cXWud_-Fmw/view?usp=sharing', EPS: 'https://drive.google.com/file/d/1g3iu6YvUIng8W3OXPR0e29wsRKvmmLwA/view?usp=sharing', JPG: 'https://drive.google.com/file/d/1RCxJGNGF7T7vpFRSY-0D_LXxTVfPuu8G/view?usp=sharing' }, category: 'Clipart', likes: 210 },
    { id: 2007, name: 'Wedding couple vector Clipart', previewImages: ['https://i.ibb.co/nNm8ysZH/wedding-couple-Illutraction-7.jpg'], downloadFormats: { PNG: '#', JPG: '#' }, category: 'Clipart', likes: 210 },
    { id: 2008, name: 'Wedding couple vector Clipart', previewImages: ['https://i.ibb.co/pvFCJPWx/wedding-couple-Illutraction-8.jpg'], downloadFormats: { PNG: '#', JPG: '#' }, category: 'Clipart', likes: 210 },
    { id: 2009, name: 'Wedding couple vector Clipart', previewImages: ['https://i.ibb.co/nZGDg92/wedding-couple-Illutraction-9.jpg'], downloadFormats: { PNG: '#', JPG: '#' }, category: 'Clipart', likes: 210 },
    { id: 2010, name: 'Wedding couple vector Clipart', previewImages: ['https://i.ibb.co/wFJPfK4S/wedding-couple-Illutraction-10.jpg'], downloadFormats: { PNG: '#', JPG: '#' }, category: 'Clipart', likes: 210 },
    { id: 2011, name: 'Wedding couple vector Clipart', previewImages: ['https://i.ibb.co/6JBZM62w/wedding-couple-Illutraction-11.jpg'], downloadFormats: { PNG: '#', JPG: '#' }, category: 'Clipart', likes: 210 },
    { id: 2012, name: 'Wedding couple vector Clipart', previewImages: ['https://i.ibb.co/HTPHdsfy/wedding-couple-Illutraction-12.jpg'], downloadFormats: { PNG: '#', JPG: '#' }, category: 'Clipart', likes: 210 },
    { id: 2013, name: 'Wedding couple vector Clipart', previewImages: ['https://i.ibb.co/gMYL5nV0/wedding-couple-Illutraction-13.jpg'], downloadFormats: { PNG: '#', JPG: '#' }, category: 'Clipart', likes: 210 },
    { id: 2014, name: 'Wedding couple vector Clipart', previewImages: ['https://i.ibb.co/b5Wf8Ln4/wedding-couple-Illutraction-14.jpg'], downloadFormats: { PNG: '#', JPG: '#' }, category: 'Clipart', likes: 210 },
    { id: 2015, name: 'Wedding couple vector Clipart', previewImages: ['https://i.ibb.co/7NNjsYGZ/wedding-couple-Illutraction-15.jpg'], downloadFormats: { PNG: '#', JPG: '#' }, category: 'Clipart', likes: 210 },
    { id: 2016, name: 'Wedding couple vector Clipart', previewImages: ['https://i.ibb.co/4gDfJjZm/wedding-couple-Illutraction-16.jpg'], downloadFormats: { PNG: '#', JPG: '#' }, category: 'Clipart', likes: 210 },
    { id: 2017, name: 'Wedding couple vector Clipart', previewImages: ['https://i.ibb.co/twc8GM88/wedding-couple-Illutraction-17.jpg'], downloadFormats: { PNG: '#', JPG: '#' }, category: 'Clipart', likes: 210 },
    { id: 2018, name: 'Wedding couple vector Clipart', previewImages: ['https://i.ibb.co/jPNzC0Tj/wedding-couple-Illutraction-18.jpg'], downloadFormats: { PNG: '#', JPG: '#' }, category: 'Clipart', likes: 210 },
    { id: 2019, name: 'Wedding couple vector Clipart', previewImages: ['https://i.ibb.co/yFYrHVmK/wedding-couple-Illutraction-19.jpg'], downloadFormats: { PNG: '#', JPG: '#' }, category: 'Clipart', likes: 210 },
    { id: 2020, name: 'Wedding couple vector Clipart', previewImages: ['https://i.ibb.co/PGCf56Z2/wedding-couple-Illutraction-20.jpg'], downloadFormats: { PNG: '#', JPG: '#' }, category: 'Clipart', likes: 210 },
    { id: 2021, name: 'Wedding couple vector Clipart', previewImages: ['https://i.ibb.co/bRswPPqX/wedding-couple-Illutraction-21.jpg'], downloadFormats: { PNG: '#', JPG: '#' }, category: 'Clipart', likes: 210 },
    { id: 2022, name: 'Wedding couple vector Clipart', previewImages: ['https://i.ibb.co/DPpmk5K6/wedding-couple-Illutraction-22.jpg'], downloadFormats: { PNG: '#', JPG: '#' }, category: 'Clipart', likes: 210 },
    { id: 2023, name: 'Wedding couple vector Clipart', previewImages: ['https://i.ibb.co/CpsmN4nf/wedding-couple-Illutraction-23.jpg'], downloadFormats: { PNG: '#', JPG: '#' }, category: 'Clipart', likes: 210 },
    { id: 2024, name: 'Wedding couple vector Clipart', previewImages: ['https://i.ibb.co/qLNY7TdM/wedding-couple-Illutraction-24.jpg'], downloadFormats: { PNG: '#', JPG: '#' }, category: 'Clipart', likes: 210 },
    { id: 2025, name: 'Wedding couple vector Clipart', previewImages: ['https://i.ibb.co/fVW4mTpz/wedding-couple-Illutraction-25.jpg'], downloadFormats: { PNG: '#', JPG: '#' }, category: 'Clipart', likes: 210 },
    { id: 2026, name: 'Wedding couple vector Clipart', previewImages: ['https://i.ibb.co/KxzfnJFg/wedding-couple-Illutraction-26.jpg'], downloadFormats: { PNG: '#', JPG: '#' }, category: 'Clipart', likes: 210 },
    { id: 2027, name: 'Wedding couple vector Clipart', previewImages: ['https://i.ibb.co/N2r5mCDy/wedding-couple-Illutraction-27.jpg'], downloadFormats: { PNG: '#', JPG: '#' }, category: 'Clipart', likes: 210 },
    { id: 2028, name: 'Wedding couple vector Clipart', previewImages: ['https://i.ibb.co/1cpZCcX/wedding-couple-Illutraction-28.jpg'], downloadFormats: { PNG: '#', JPG: '#' }, category: 'Clipart', likes: 210 },
    { id: 2029, name: 'Wedding couple vector Clipart', previewImages: ['https://i.ibb.co/zh2Z5Frs/wedding-couple-Illutraction-29.jpg'], downloadFormats: { PNG: '#', JPG: '#' }, category: 'Clipart', likes: 210 },
    { id: 2030, name: 'Wedding couple vector Clipart', previewImages: ['https://i.ibb.co/xtxsJDjp/wedding-couple-Illutraction-30.jpg'], downloadFormats: { PNG: '#', JPG: '#' }, category: 'Clipart', likes: 210 },
    { id: 2031, name: 'Wedding couple vector Clipart', previewImages: ['https://i.ibb.co/QvPjc4gf/wedding-couple-Illutraction-31.jpg'], downloadFormats: { PNG: '#', JPG: '#' }, category: 'Clipart', likes: 210 },
    { id: 2032, name: 'Wedding couple vector Clipart', previewImages: ['https://i.ibb.co/8DK1skrX/wedding-couple-Illutraction-32.jpg'], downloadFormats: { PNG: '#', JPG: '#' }, category: 'Clipart', likes: 210 },
    { id: 2033, name: 'Wedding couple vector Clipart', previewImages: ['https://i.ibb.co/KjVdSFpp/wedding-couple-Illutraction-33.jpg'], downloadFormats: { PNG: '#', JPG: '#' }, category: 'Clipart', likes: 210 },
    { id: 2034, name: 'Wedding couple vector Clipart', previewImages: ['https://i.ibb.co/k2X3tdj2/wedding-couple-Illutraction-34.jpg'], downloadFormats: { PNG: '#', JPG: '#' }, category: 'Clipart', likes: 210 },
    { id: 2035, name: 'Wedding couple vector Clipart', previewImages: ['https://i.ibb.co/xtszjpKn/wedding-couple-Illutraction-35.jpg'], downloadFormats: { PNG: '#', JPG: '#' }, category: 'Clipart', likes: 210 },
    { id: 2036, name: 'Wedding couple vector Clipart', previewImages: ['https://i.ibb.co/VY5WfytF/wedding-couple-Illutraction-36.jpg'], downloadFormats: { PNG: '#', JPG: '#' }, category: 'Clipart', likes: 210 },
    { id: 2037, name: 'Wedding couple vector Clipart', previewImages: ['https://i.ibb.co/BHp5nnYk/wedding-couple-Illutraction-37.jpg'], downloadFormats: { PNG: '#', JPG: '#' }, category: 'Clipart', likes: 210 },
    { id: 2038, name: 'Wedding couple vector Clipart', previewImages: ['https://i.ibb.co/20jGRHKQ/wedding-couple-Illutraction-38.jpg'], downloadFormats: { PNG: '#', JPG: '#' }, category: 'Clipart', likes: 210 },
    { id: 2039, name: 'Wedding couple vector Clipart', previewImages: ['https://i.ibb.co/k2K364MM/wedding-couple-Illutraction-39.jpg'], downloadFormats: { PNG: '#', JPG: '#' }, category: 'Clipart', likes: 210 },
    { id: 2040, name: 'Wedding couple vector Clipart', previewImages: ['https://i.ibb.co/sMsQqPk/wedding-couple-Illutraction-40.jpg'], downloadFormats: { PNG: '#', JPG: '#' }, category: 'Clipart', likes: 210 },
    { id: 2041, name: 'Wedding couple vector Clipart', previewImages: ['https://i.ibb.co/pjTpwLdj/wedding-couple-Illutraction-41.jpg'], downloadFormats: { PNG: '#', JPG: '#' }, category: 'Clipart', likes: 210 },
    { id: 2042, name: 'Wedding couple vector Clipart', previewImages: ['https://i.ibb.co/tPxVyK0J/wedding-couple-Illutraction-42.jpg'], downloadFormats: { PNG: '#', JPG: '#' }, category: 'Clipart', likes: 210 },
    { id: 2043, name: 'Wedding couple vector Clipart', previewImages: ['https://i.ibb.co/WW366863/wedding-couple-Illutraction-43.jpg'], downloadFormats: { PNG: '#', JPG: '#' }, category: 'Clipart', likes: 210 },
    { id: 2044, name: 'Wedding couple vector Clipart', previewImages: ['https://i.ibb.co/Lhns68ST/wedding-couple-Illutraction-44.jpg'], downloadFormats: { PNG: '#', JPG: '#' }, category: 'Clipart', likes: 210 },
    { id: 2045, name: 'Wedding couple vector Clipart', previewImages: ['https://i.ibb.co/2Y6vbb8y/wedding-couple-Illutraction-45.jpg'], downloadFormats: { PNG: '#', JPG: '#' }, category: 'Clipart', likes: 210 },
    { id: 2046, name: 'Wedding couple vector Clipart', previewImages: ['https://i.ibb.co/k61KPybP/wedding-couple-Illutraction-46.jpg'], downloadFormats: { PNG: '#', JPG: '#' }, category: 'Clipart', likes: 210 },
    { id: 2047, name: 'Wedding couple vector Clipart', previewImages: ['https://i.ibb.co/Z6q9ZHx0/wedding-couple-Illutraction-47.jpg'], downloadFormats: { PNG: '#', JPG: '#' }, category: 'Clipart', likes: 210 },
    { id: 2048, name: 'Wedding couple vector Clipart', previewImages: ['https://i.ibb.co/5gVgnJBg/wedding-couple-Illutraction-48.jpg'], downloadFormats: { PNG: '#', JPG: '#' }, category: 'Clipart', likes: 210 },
    { id: 2049, name: 'Wedding couple vector Clipart', previewImages: ['https://i.ibb.co/SX1H3hD0/wedding-couple-Illutraction-49.jpg'], downloadFormats: { PNG: '#', JPG: '#' }, category: 'Clipart', likes: 210 },
    { id: 2050, name: 'Wedding couple vector Clipart', previewImages: ['https://i.ibb.co/mC3ymHgp/wedding-couple-Illutraction-50.jpg'], downloadFormats: { PNG: '#', JPG: '#' }, category: 'Clipart', likes: 210 },
    { id: 2051, name: 'Wedding couple vector Clipart', previewImages: ['https://i.ibb.co/MxjFhxgF/wedding-couple-Illutraction-51.jpg'], downloadFormats: { PNG: '#', JPG: '#' }, category: 'Clipart', likes: 210 },
    { id: 2052, name: 'Wedding couple vector Clipart', previewImages: ['https://i.ibb.co/LdWX4cRb/wedding-couple-Illutraction-52.jpg'], downloadFormats: { PNG: '#', JPG: '#' }, category: 'Clipart', likes: 210 },
    { id: 2053, name: 'Wedding couple vector Clipart', previewImages: ['https://i.ibb.co/KpCdLKz4/wedding-couple-Illutraction-53.jpg'], downloadFormats: { PNG: '#', JPG: '#' }, category: 'Clipart', likes: 210 },
    { id: 2054, name: 'Wedding couple vector Clipart', previewImages: ['https://i.ibb.co/fYGrHgSf/wedding-couple-Illutraction-54.jpg'], downloadFormats: { PNG: '#', JPG: '#' }, category: 'Clipart', likes: 210 },
    { id: 2055, name: 'Wedding couple vector Clipart', previewImages: ['https://i.ibb.co/RTQkK5rs/wedding-couple-Illutraction-55.jpg'], downloadFormats: { PNG: '#', JPG: '#' }, category: 'Clipart', likes: 210 },
    { id: 2056, name: 'Wedding couple vector Clipart', previewImages: ['https://i.ibb.co/9HkswmWb/wedding-couple-Illutraction-56.jpg'], downloadFormats: { PNG: '#', JPG: '#' }, category: 'Clipart', likes: 210 },
    { id: 2057, name: 'Wedding couple vector Clipart', previewImages: ['https://i.ibb.co/d0RKvdjX/wedding-couple-Illutraction-57.jpg'], downloadFormats: { PNG: '#', JPG: '#' }, category: 'Clipart', likes: 210 },
    { id: 2058, name: 'Wedding couple vector Clipart', previewImages: ['https://i.ibb.co/mCgD80s8/wedding-couple-Illutraction-58.jpg'], downloadFormats: { PNG: '#', JPG: '#' }, category: 'Clipart', likes: 210 },
    { id: 2059, name: 'Wedding couple vector Clipart', previewImages: ['https://i.ibb.co/N2N4w37N/wedding-couple-Illutraction-59.jpg'], downloadFormats: { PNG: '#', JPG: '#' }, category: 'Clipart', likes: 210 },
    { id: 2060, name: 'Wedding couple vector Clipart', previewImages: ['https://i.ibb.co/pBMmpf7Q/wedding-couple-Illutraction-60.jpg'], downloadFormats: { PNG: '#', JPG: '#' }, category: 'Clipart', likes: 210 },
    { id: 2061, name: 'Wedding couple vector Clipart', previewImages: ['https://i.ibb.co/99129Wfv/wedding-couple-Illutraction-61.jpg'], downloadFormats: { PNG: '#', JPG: '#' }, category: 'Clipart', likes: 210 },
    { id: 2062, name: 'Wedding couple vector Clipart', previewImages: ['https://i.ibb.co/gb7QZYYp/wedding-couple-Illutraction-62.jpg'], downloadFormats: { PNG: '#', JPG: '#' }, category: 'Clipart', likes: 210 },
    { id: 2063, name: 'Wedding couple vector Clipart', previewImages: ['https://i.ibb.co/pv8B1B1y/wedding-couple-Illutraction-63.jpg'], downloadFormats: { PNG: '#', JPG: '#' }, category: 'Clipart', likes: 210 },
    { id: 2064, name: 'Wedding couple vector Clipart', previewImages: ['https://i.ibb.co/LzyFh2GH/wedding-couple-Illutraction-64.jpg'], downloadFormats: { PNG: '#', JPG: '#' }, category: 'Clipart', likes: 210 },
    { id: 2065, name: 'Wedding couple vector Clipart', previewImages: ['https://i.ibb.co/B90s5Hm/wedding-couple-Illutraction-65.jpg'], downloadFormats: { PNG: '#', JPG: '#' }, category: 'Clipart', likes: 210 },
    { id: 2066, name: 'Wedding couple vector Clipart', previewImages: ['https://i.ibb.co/DH0vrpzV/wedding-couple-Illutraction-66.jpg'], downloadFormats: { PNG: '#', JPG: '#' }, category: 'Clipart', likes: 210 },
    { id: 2067, name: 'Wedding couple vector Clipart', previewImages: ['https://i.ibb.co/XkLsYfvV/wedding-couple-Illutraction-67.jpg'], downloadFormats: { PNG: '#', JPG: '#' }, category: 'Clipart', likes: 210 },
    { id: 2068, name: 'Wedding couple vector Clipart', previewImages: ['https://i.ibb.co/SX8B0chQ/wedding-couple-Illutraction-68.jpg'], downloadFormats: { PNG: '#', JPG: '#' }, category: 'Clipart', likes: 210 },
    { id: 2069, name: 'Wedding couple vector Clipart', previewImages: ['https://i.ibb.co/ycjhr1sv/wedding-couple-Illutraction-69.jpg'], downloadFormats: { PNG: '#', JPG: '#' }, category: 'Clipart', likes: 210 },
    { id: 2070, name: 'Wedding couple vector Clipart', previewImages: ['https://i.ibb.co/5WhX0g1w/wedding-couple-Illutraction-70.jpg'], downloadFormats: { PNG: '#', JPG: '#' }, category: 'Clipart', likes: 210 },
    { id: 2071, name: 'Wedding couple vector Clipart', previewImages: ['https://i.ibb.co/SSLp1BP/wedding-couple-Illutraction-71.jpg'], downloadFormats: { PNG: '#', JPG: '#' }, category: 'Clipart', likes: 210 },
    { id: 2072, name: 'Wedding couple vector Clipart', previewImages: ['https://i.ibb.co/Lz0bQ1gS/wedding-couple-Illutraction-72.jpg'], downloadFormats: { PNG: '#', JPG: '#' }, category: 'Clipart', likes: 210 },
    { id: 2073, name: 'Wedding couple vector Clipart', previewImages: ['https://i.ibb.co/pjS1n0yM/wedding-couple-Illutraction-73.jpg'], downloadFormats: { PNG: '#', JPG: '#' }, category: 'Clipart', likes: 210 },
    { id: 2074, name: 'Wedding couple vector Clipart', previewImages: ['https://i.ibb.co/fdGFSXqN/wedding-couple-Illutraction-74.jpg'], downloadFormats: { PNG: '#', JPG: '#' }, category: 'Clipart', likes: 210 },
    { id: 2075, name: 'Wedding couple vector Clipart', previewImages: ['https://i.ibb.co/Y4bgYKvn/wedding-couple-Illutraction-75.jpg'], downloadFormats: { PNG: '#', JPG: '#' }, category: 'Clipart', likes: 210 },
    { id: 2076, name: 'Wedding couple vector Clipart', previewImages: ['https://i.ibb.co/nMbWMjvL/wedding-couple-Illutraction-76.jpg'], downloadFormats: { PNG: '#', JPG: '#' }, category: 'Clipart', likes: 210 },
    { id: 2077, name: 'Wedding couple vector Clipart', previewImages: ['https://i.ibb.co/fVFBx3Zj/wedding-couple-Illutraction-77.jpg'], downloadFormats: { PNG: '#', JPG: '#' }, category: 'Clipart', likes: 210 },
    { id: 2078, name: 'Wedding couple vector Clipart', previewImages: ['https://i.ibb.co/TB62HqL6/wedding-couple-Illutraction-78.jpg'], downloadFormats: { PNG: '#', JPG: '#' }, category: 'Clipart', likes: 210 },
    { id: 2079, name: 'Wedding couple vector Clipart', previewImages: ['https://i.ibb.co/PsTMQ1bP/wedding-couple-Illutraction-79.jpg'], downloadFormats: { PNG: '#', JPG: '#' }, category: 'Clipart', likes: 210 },
    { id: 2080, name: 'Wedding couple vector Clipart', previewImages: ['https://i.ibb.co/9mMsTR8g/wedding-couple-Illutraction-80.jpg'], downloadFormats: { PNG: '#', JPG: '#' }, category: 'Clipart', likes: 210 },
    { id: 2081, name: 'Wedding couple vector Clipart', previewImages: ['https://i.ibb.co/yF0FzZDT/wedding-couple-Illutraction-81.jpg'], downloadFormats: { PNG: '#', JPG: '#' }, category: 'Clipart', likes: 210 },
    { id: 2082, name: 'Wedding couple vector Clipart', previewImages: ['https://i.ibb.co/KcSTPGtb/wedding-couple-Illutraction-82.jpg'], downloadFormats: { PNG: '#', JPG: '#' }, category: 'Clipart', likes: 210 },
    { id: 2083, name: 'Wedding couple vector Clipart', previewImages: ['https://i.ibb.co/1GNBXJCN/wedding-couple-Illutraction-83.jpg'], downloadFormats: { PNG: '#', JPG: '#' }, category: 'Clipart', likes: 210 },
    { id: 2084, name: 'Wedding couple vector Clipart', previewImages: ['https://i.ibb.co/Xf2zrPgz/wedding-couple-Illutraction-84.jpg'], downloadFormats: { PNG: '#', JPG: '#' }, category: 'Clipart', likes: 210 },
    { id: 2085, name: 'Wedding couple vector Clipart', previewImages: ['https://i.ibb.co/mrwY360b/wedding-couple-Illutraction-85.jpg'], downloadFormats: { PNG: '#', JPG: '#' }, category: 'Clipart', likes: 210 },
    { id: 2086, name: 'Wedding couple vector Clipart', previewImages: ['https://i.ibb.co/hFvcQ7Cq/wedding-couple-Illutraction-86.jpg'], downloadFormats: { PNG: '#', JPG: '#' }, category: 'Clipart', likes: 210 },
    { id: 2087, name: 'Wedding couple vector Clipart', previewImages: ['https://i.ibb.co/8gmgXRDq/wedding-couple-Illutraction-87.jpg'], downloadFormats: { PNG: '#', JPG: '#' }, category: 'Clipart', likes: 210 },
    { id: 2088, name: 'Wedding couple vector Clipart', previewImages: ['https://i.ibb.co/YFvzswx2/wedding-couple-Illutraction-88.jpg'], downloadFormats: { PNG: '#', JPG: '#' }, category: 'Clipart', likes: 210 },
    { id: 2089, name: 'Wedding couple vector Clipart', previewImages: ['https://i.ibb.co/k6sFpKRx/wedding-couple-Illutraction-89.jpg'], downloadFormats: { PNG: '#', JPG: '#' }, category: 'Clipart', likes: 210 },
    { id: 2090, name: 'Wedding couple vector Clipart', previewImages: ['https://i.ibb.co/KjcQfM7f/wedding-couple-Illutraction-90.jpg'], downloadFormats: { PNG: '#', JPG: '#' }, category: 'Clipart', likes: 210 },
    { id: 2091, name: 'Wedding couple vector Clipart', previewImages: ['https://i.ibb.co/JFQHqWRN/wedding-couple-Illutraction-91.jpg'], downloadFormats: { PNG: '#', JPG: '#' }, category: 'Clipart', likes: 210 },
    { id: 2092, name: 'Wedding couple vector Clipart', previewImages: ['https://i.ibb.co/8gdXtRFm/wedding-couple-Illutraction-92.jpg'], downloadFormats: { PNG: '#', JPG: '#' }, category: 'Clipart', likes: 210 },
    { id: 2093, name: 'Wedding couple vector Clipart', previewImages: ['https://i.ibb.co/gbVfkSHn/wedding-couple-Illutraction-93.jpg'], downloadFormats: { PNG: '#', JPG: '#' }, category: 'Clipart', likes: 210 },
    { id: 2094, name: 'Wedding couple vector Clipart', previewImages: ['https://i.ibb.co/N67DmzyH/wedding-couple-Illutraction-94.jpg'], downloadFormats: { PNG: '#', JPG: '#' }, category: 'Clipart', likes: 210 },
    { id: 2095, name: 'Wedding couple vector Clipart', previewImages: ['https://i.ibb.co/ZpXb39hw/wedding-couple-Illutraction-95.jpg'], downloadFormats: { PNG: '#', JPG: '#' }, category: 'Clipart', likes: 210 },
    { id: 2096, name: 'Wedding couple vector Clipart',  previewImages: ['https://i.ibb.co/9HTLbMFL/wedding-couple-Illutraction-96.jpg'], downloadFormats: { PNG: '#', JPG: '#' }, category: 'Clipart', likes: 210 },
    { id: 2097, name: 'Wedding couple vector Clipart', previewImages: ['https://i.ibb.co/Z6N1fzhy/wedding-couple-Illutraction-97.jpg'], downloadFormats: { PNG: '#', JPG: '#' }, category: 'Clipart', likes: 210 },
    { id: 2098, name: 'Wedding couple vector Clipart', previewImages: ['https://i.ibb.co/7NdFkgzz/wedding-couple-Illutraction-98.jpg'], downloadFormats: { PNG: '#', JPG: '#' }, category: 'Clipart', likes: 210 },
    { id: 2099, name: 'Wedding couple vector Clipart', previewImages: ['https://i.ibb.co/zWmgKFfH/wedding-couple-Illutraction-99.jpg'], downloadFormats: { PNG: '#', JPG: '#' }, category: 'Clipart', likes: 210 },
    { id: 2100, name: 'Wedding couple vector Clipart', previewImages: ['https://i.ibb.co/8gxbYg3n/wedding-couple-Illutraction-100.jpg'], downloadFormats: { PNG: '#', JPG: '#' }, category: 'Clipart', likes: 210 }
];

const Header = ({ onNavigate }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLinkClick = (page) => {
    onNavigate(page);
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-white/80 backdrop-blur-sm shadow-sm sticky top-0 z-40">
      <div className="container mx-auto px-6 py-3 flex justify-between items-center">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => handleLinkClick('Home')}>
          <img src="https://i.ibb.co/nspq7KJ3/graphifly.png" alt="Logo" className="h-12 object-contain"/>
          <span className="text-xl font-bold text-violet-700">Graphifly</span>
        </div>

        <nav className="hidden md:flex items-center space-x-8">
          <a href="#home" onClick={(e) => { e.preventDefault(); handleLinkClick('Home'); }} className="text-gray-600 hover:text-violet-700 transition-colors">Home</a>
          <a href="#templates" onClick={(e) => { e.preventDefault(); handleLinkClick('Templates'); }} className="text-gray-600 hover:text-violet-700 transition-colors">Templates</a>
          <a href="#howitworks" onClick={(e) => { e.preventDefault(); handleLinkClick('HowItWorks'); }} className="text-gray-600 hover:text-violet-700 transition-colors">How It Works</a>
          <a href="#faq" onClick={(e) => { e.preventDefault(); handleLinkClick('FAQ'); }} className="text-gray-600 hover:text-violet-700 transition-colors">FAQ</a>
        </nav>

        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-lg flex flex-col items-center p-4">
          <a href="#home" onClick={(e) => { e.preventDefault(); handleLinkClick('Home'); }} className="py-3 text-lg w-full text-center hover:bg-violet-50 rounded-md">Home</a>
          <a href="#templates" onClick={(e) => { e.preventDefault(); handleLinkClick('Templates'); }} className="py-3 text-lg w-full text-center hover:bg-violet-50 rounded-md">Templates</a>
          <a href="#howitworks" onClick={(e) => { e.preventDefault(); handleLinkClick('HowItWorks'); }} className="py-3 text-lg w-full text-center hover:bg-violet-50 rounded-md">How It Works</a>
          <a href="#faq" onClick={(e) => { e.preventDefault(); handleLinkClick('FAQ'); }} className="py-3 text-lg w-full text-center hover:bg-violet-50 rounded-md">FAQ</a>
          <a href="#about" onClick={(e) => { e.preventDefault(); handleLinkClick('About'); }} className="py-3 text-lg w-full text-center hover:bg-violet-50 rounded-md">About Us</a>
          <a href="#contact" onClick={(e) => { e.preventDefault(); handleLinkClick('Contact'); }} className="py-3 text-lg w-full text-center hover:bg-violet-50 rounded-md">Contact Us</a>
        </div>
      )}
    </header>
  );
};

function TemplateCard({ template, onOpenModal, onLike }) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden group relative transform transition-transform duration-300 hover:-translate-y-2">
      <div onClick={() => onOpenModal(template)} className={`${(template.category === 'Invitations' || template.category === 'Save-the-Date') ? 'aspect-[4/6]' : 'aspect-square'} cursor-pointer`}>
        <img
          src={template.previewImages[0]}
          alt={`${template.name} Preview`}
          className="w-full h-full object-cover"
          onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/400x400/cccccc/333333?text=Image+Not+Found`; }}
        />
      </div>
      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 transition-all duration-300 flex flex-col justify-end p-4 pointer-events-none">
        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-4 group-hover:translate-y-0 flex justify-between items-center">
          <h3 className="text-white text-lg font-bold">{template.name}</h3>
        </div>
      </div>
      <button
        onClick={(e) => { e.stopPropagation(); onLike(template.id); }}
        className="absolute top-3 right-3 bg-white/20 backdrop-blur-sm text-white p-2 rounded-full hover:bg-white/30 transition-colors flex items-center gap-1.5 pointer-events-auto opacity-0 group-hover:opacity-100"
      >
        <Heart size={20} />
        <span className="text-sm font-semibold">{template.likes}</span>
      </button>
    </div>
  );
}

function Modal({ isOpen, onClose, template }) {
    const [modalView, setModalView] = useState('main');

    useEffect(() => {
        if (isOpen) {
          setModalView('main');
        }
    }, [isOpen]);

    if (!isOpen || !template) return null;

    const renderMainView = () => {
        const isCustomizable = template.category === 'Invitations' || template.category === 'Save-the-Date';
        const whatsappMessage = `Hi, I want to customise template ID: ${template.id} - ${template.name}. Please provide payment details.`;
        const encodedMessage = encodeURIComponent(whatsappMessage);
        const whatsappLink = `https://wa.me/${YOUR_WHATSAPP_NUMBER}?text=${encodedMessage}`;

        return (
            <>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">{template.name}</h3>
                 {isCustomizable ? (
                    <div className="space-y-4">
                        <div className="text-center p-4 bg-violet-50 rounded-lg">
                            <h4 className="font-bold text-lg text-violet-800">Customization Price: ₹{template.price}</h4>
                            <ol className="text-left mt-4 space-y-2 text-gray-600 list-decimal list-inside">
                                <li>Click the WhatsApp button below.</li>
                                <li>Send the pre-filled message with your details.</li>
                                <li>Make the payment on the UPI ID I provide on WhatsApp.</li>
                                <li>You will receive your design within 60 minutes!</li>
                            </ol>
                        </div>
                         <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="w-full flex items-center justify-center gap-3 bg-green-500 text-white font-bold py-3 px-6 rounded-lg hover:bg-green-600 transition-all duration-300">
                            <MessageSquare size={20}/> Chat on WhatsApp to Customise
                        </a>
                        <button onClick={() => setModalView('download')} className="w-full flex items-center justify-center gap-3 bg-gray-200 text-gray-700 font-bold py-3 px-6 rounded-lg hover:bg-gray-300 transition-all duration-300">
                            <Download size={20}/> Download Open Files
                        </button>
                    </div>
                ) : (
                    <div className="space-y-4">
                         <button onClick={() => setModalView('download')} className="w-full flex items-center justify-center gap-3 bg-violet-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-violet-700 transition-all duration-300">
                            <Download size={20}/> Download Open Files
                        </button>
                    </div>
                )}
            </>
        );
    };

    const renderDownloadView = () => (
       <div>
          <button onClick={() => setModalView('main')} className="text-sm text-violet-600 mb-3">&larr; Back</button>
          <h3 className="text-xl font-bold text-gray-800 mb-4">Download Open Files - {template.name}</h3>
          <div className="flex flex-col gap-3">
              {Object.entries(template.downloadFormats).map(([format, link]) => (
                   link && (
                      <a key={format} href={link} target="_blank" rel="noopener noreferrer" onClick={onClose} className="block w-full text-center bg-violet-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-violet-700 transition-all duration-300">
                          Download .{format}
                      </a>
                  )
              ))}
          </div>
      </div>
    );

    const renderContent = () => {
      switch (modalView) {
          case 'download': return renderDownloadView();
          default: return renderMainView();
      }
    };

    return (
      <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={onClose}>
        <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 relative" onClick={(e) => e.stopPropagation()}>
          <button onClick={onClose} className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 transition-colors">
            <X size={24} />
          </button>
          {renderContent()}
        </div>
      </div>
    );
}

const HomePage = ({ templates, onOpenModal, onLike, onNavigate }) => {
    const topTemplates = useMemo(() => 
        [...templates].sort((a, b) => b.likes - a.likes).slice(0, 3), 
        [templates]
    );

    return (
        <>
            <div className="relative text-center py-16 md:py-24 bg-violet-50 overflow-hidden">
                <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(to_bottom,white,transparent)]"></div>
                <div className="container mx-auto px-6 relative z-10">
                    <h1 className="text-4xl md:text-6xl font-extrabold text-gray-800 mb-4">Your Vision, Our Templates</h1>
                    <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                        ₹99 me apni shadi ka unique invitation design banao – bas template select karo, details bhejo, aur 60 minutes me design pao.
                    </p>
                     <button onClick={() => onNavigate('Templates')} className="bg-violet-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-violet-700 transition-all text-lg">
                        Explore All Templates
                    </button>
                </div>
            </div>
            <div className="container mx-auto px-6 py-12">
                <h2 className="text-3xl font-bold text-center mb-8">Top Liked Templates</h2>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {topTemplates.map(template => (
                        <TemplateCard key={template.id} template={template} onOpenModal={onOpenModal} onLike={onLike} />
                    ))}
                </div>
                    <div className="text-center mt-12">
     <button onClick={() => onNavigate('Templates')} className="bg-violet-600 text-white px-8 py-4 rounded-full font-semibold hover:bg-violet-700 transition-all text-lg">
        Explore All Templates
    </button>
</div>
                    {/* How It Works Section for Home Page */}
<div className="mt-24">
    <h2 className="text-3xl font-bold text-center mb-10">How It Works in 4 Simple Steps</h2>
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 max-w-4xl mx-auto">
        <div className="text-center">
            <div className="flex justify-center items-center h-16 w-16 mx-auto bg-violet-100 text-violet-500 rounded-full mb-3">
                <Search size={32} />
            </div>
            <h3 className="font-semibold">1. Choose Template</h3>
        </div>
        <div className="text-center">
            <div className="flex justify-center items-center h-16 w-16 mx-auto bg-violet-100 text-violet-500 rounded-full mb-3">
                <Send size={32} />
            </div>
            <h3 className="font-semibold">2. Send Details</h3>
        </div>
        <div className="text-center">
            <div className="flex justify-center items-center h-16 w-16 mx-auto bg-violet-100 text-violet-500 rounded-full mb-3">
                <Wallet size={32} />
            </div>
            <h3 className="font-semibold">3. Make Payment</h3>
        </div>
        <div className="text-center">
            <div className="flex justify-center items-center h-16 w-16 mx-auto bg-violet-100 text-violet-500 rounded-full mb-3">
                <Gift size={32} />
            </div>
            <h3 className="font-semibold">4. Get Your Design</h3>
        </div>
    </div>
</div>
            </div>
        </>
    );
};

const TemplatesPage = ({ templates, onOpenModal, onLike }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');

    const filteredTemplates = useMemo(() => {
        return templates.filter((template) => {
          const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                      (template.tags && template.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())));
          const matchesCategory = selectedCategory === 'All' || template.category === selectedCategory;
          return matchesSearch && matchesCategory;
        });
    }, [searchTerm, selectedCategory, templates]);

    const categories = useMemo(() => ['All', ...new Set(initialTemplatesData.map(t => t.category))], []);

    return (
        <div className="container mx-auto px-6 py-12">
            <div className="relative max-w-2xl mx-auto mb-10">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={24} />
                <input
                  type="text"
                  placeholder="Search for invitations, cards, menus..."
                  className="w-full pl-12 pr-4 py-4 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-violet-400 text-lg shadow-sm"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <div className="flex flex-wrap justify-center gap-3 mb-10">
            {categories.map((category) => (
                <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-5 py-2 rounded-full font-semibold text-base transition-all duration-300 shadow-sm ${selectedCategory === category ? 'bg-violet-600 text-white ring-2 ring-offset-2 ring-violet-600' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
                >
                {category}
                </button>
            ))}
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {filteredTemplates.length > 0 ? (
                filteredTemplates.map((template) => (
                <TemplateCard key={template.id} template={template} onOpenModal={onOpenModal} onLike={onLike} />
                ))
            ) : (
                <div className="col-span-full text-center text-xl text-gray-500 py-10">
                No templates found. Try a different search or category.
                </div>
            )}
            </div>
        </div>
    );
};

const HowItWorksPage = () => {
    const steps = [
        { icon: <Search size={40} className="text-violet-500" />, title: "1. Choose Template", description: "Browse our collection and select the perfect design for your occasion." },
        { icon: <Send size={40} className="text-violet-500" />, title: "2. Send Details", description: "Click on 'Chat on WhatsApp' and send us your details like names, date, venue, etc." },
        { icon: <Wallet size={40} className="text-violet-500" />, title: "3. Make Payment", description: "We will provide you with our UPI ID on WhatsApp for you to complete the payment." },
        { icon: <Gift size={40} className="text-violet-500" />, title: "4. Get Your Design", description: "Within 60 minutes, you will receive your beautifully customized design on WhatsApp!" }
    ];

    return (
        <div className="container mx-auto px-6 py-12 max-w-4xl">
            <h1 className="text-4xl font-bold mb-12 text-center text-violet-700">How It Works</h1>
            <div className="grid md:grid-cols-4 gap-8">
                {steps.map((step, index) => (
                    <div key={index} className="text-center p-6 bg-white rounded-xl shadow-md">
                        <div className="flex justify-center items-center h-20 w-20 mx-auto bg-violet-100 rounded-full mb-4">
                            {step.icon}
                        </div>
                        <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                        <p className="text-gray-600">{step.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

const FAQPage = () => {
    const faqs = [
        { q: "How much time does it take to get the design?", a: "You will receive your customized design on WhatsApp within 60 minutes after you provide your details and complete the payment." },
        { q: "In which format will I receive the files?", a: "You will receive a high-quality JPG or PNG file, perfect for sharing on social media or for printing." },
        { q: "How do I make the payment?", a: "After you send us your details on WhatsApp, we will provide our UPI ID for payment. You can pay using any UPI app like Google Pay, PhonePe, or Paytm." },
        { q: "Can I ask for changes after receiving the design?", a: "Yes, one round of minor revisions (like correcting a spelling mistake) is included in the price. Major design changes will be extra." }
    ];

    const [openFAQ, setOpenFAQ] = useState(null);

    return (
        <div className="container mx-auto px-6 py-12 max-w-4xl">
            <h1 className="text-4xl font-bold mb-12 text-center text-violet-700">Frequently Asked Questions</h1>
            <div className="space-y-4">
                {faqs.map((faq, index) => (
                    <div key={index} className="border rounded-lg overflow-hidden">
                        <button onClick={() => setOpenFAQ(openFAQ === index ? null : index)} className="w-full flex justify-between items-center p-4 bg-white hover:bg-gray-50 text-left">
                            <span className="font-semibold text-lg">{faq.q}</span>
                            <ChevronDown className={`transform transition-transform ${openFAQ === index ? 'rotate-180' : ''}`} />
                        </button>
                        {openFAQ === index && (
                            <div className="p-4 bg-gray-50 text-gray-700">
                                {faq.a}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

const AboutUsPage = () => ( <div className="container mx-auto px-6 py-12 max-w-4xl"> <h1 className="text-4xl font-bold mb-6 text-violet-700">About Us</h1> <div className="space-y-4 text-lg text-gray-700"> <p>Welcome to Graphifly! We are passionate about making your special day even more beautiful with our stunning collection of wedding templates.</p> <p>Our mission is to provide high-quality, easily customizable templates for invitations, save-the-dates, and more, helping you create a cohesive and elegant theme for your wedding without the hassle.</p> <p>Founded by a team of designers and wedding enthusiasts, we understand the importance of details. That's why every template is crafted with love, care, and a keen eye for modern trends and timeless elegance.</p> </div> </div> );
const ContactUsPage = () => ( <div className="container mx-auto px-6 py-12 max-w-4xl"> <h1 className="text-4xl font-bold mb-6 text-violet-700">Contact Us</h1> <div className="space-y-4 text-lg text-gray-700"> <p>We'd love to hear from you! Whether you have a question about our templates, a suggestion, or need help with a custom order, feel free to reach out.</p> <p><strong>Email:</strong> <a href="mailto:graphifly333@gmail.com" className="text-violet-600 hover:underline">graphifly333@gmail.com</a></p> <p><strong>WhatsApp:</strong> <a href={`https://wa.me/${YOUR_WHATSAPP_NUMBER}`} className="text-violet-600 hover:underline">+{YOUR_WHATSAPP_NUMBER}</a></p> <p><strong>Address:</strong> G-13 First Floor, Dipashri Marigold, Lanja, Ratnagiri, Maharashtra-416701</p> <p>We typically respond within 24 hours.</p> </div> </div> );
const PrivacyPolicyPage = () => ( <div className="container mx-auto px-6 py-12 max-w-4xl"> <h1 className="text-4xl font-bold mb-6 text-violet-700">Privacy Policy</h1> <div className="space-y-4 text-gray-700"> <p>Your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your personal information when you use our website.</p> <h2 className="text-2xl font-semibold mt-4">Information We Collect</h2> <p>We may collect personal information such as your name and email address when you contact us. For payment transactions, you will be redirected to our payment partner, Razorpay, and we do not store your financial details.</p> <h2 className="text-2xl font-semibold mt-4">How We Use Your Information</h2> <p>We use the information we collect to respond to your inquiries, process your customization orders, and improve our services.</p> </div> </div> );
const DisclaimerPage = () => ( <div className="container mx-auto px-6 py-12 max-w-4xl"> <h1 className="text-4xl font-bold mb-6 text-violet-700">Disclaimer</h1> <div className="space-y-4 text-gray-700"> <p>The information provided by Graphifly is for general informational purposes only. All information on the site is provided in good faith, however, we make no representation or warranty of any kind, express or implied, regarding the accuracy, adequacy, validity, reliability, availability, or completeness of any information on the site.</p> <p>The "Download Open Files" option provides demo files. These files are for personal use only and may not be redistributed or resold. For customized, high-resolution files, please use the "Customise & Pay" service.</p> </div> </div> );


function App() {
  const [templates, setTemplates] = useState(initialTemplatesData);
  const [currentPage, setCurrentPage] = useState('Home');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  const handleNavigate = (page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0); 
  };

  const handleLikeClick = (templateId) => {
    setTemplates(currentTemplates =>
      currentTemplates.map(t =>
        t.id === templateId ? { ...t, likes: t.likes + 1 } : t
      )
    );
  };

  const handleOpenModal = (template) => {
    setSelectedTemplate(template);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedTemplate(null);
  };

  const renderPage = () => {
    switch(currentPage) {
        case 'Home': return <HomePage templates={templates} onOpenModal={handleOpenModal} onLike={handleLikeClick} onNavigate={handleNavigate} />;
        case 'Templates': return <TemplatesPage templates={templates} onOpenModal={handleOpenModal} onLike={handleLikeClick} />;
        case 'HowItWorks': return <HowItWorksPage />;
        case 'FAQ': return <FAQPage />;
        case 'About': return <AboutUsPage />;
        case 'Contact': return <ContactUsPage />;
        case 'Privacy': return <PrivacyPolicyPage />;
        case 'Disclaimer': return <DisclaimerPage />;
        default: return <HomePage templates={templates} onOpenModal={handleOpenModal} onLike={handleLikeClick} onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800 flex flex-col">
      <Header onNavigate={handleNavigate} />
      <main className="flex-grow">
        {renderPage()}
      </main>
      <footer className="bg-white border-t border-gray-200 p-6 mt-10 text-center text-gray-500">
        <div className="flex justify-center flex-wrap gap-x-6 gap-y-2 mb-4">
            <a href="#home" onClick={(e) => { e.preventDefault(); handleNavigate('Home'); }} className="text-gray-600 hover:text-violet-700">Home</a>
            <a href="#about" onClick={(e) => { e.preventDefault(); handleNavigate('About'); }} className="text-gray-600 hover:text-violet-700">About Us</a>
            <a href="#contact" onClick={(e) => { e.preventDefault(); handleNavigate('Contact'); }} className="text-gray-600 hover:text-violet-700">Contact Us</a>
            <a href="#privacy" onClick={(e) => { e.preventDefault(); handleNavigate('Privacy'); }} className="text-gray-600 hover:text-violet-700">Privacy Policy</a>
            <a href="#disclaimer" onClick={(e) => { e.preventDefault(); handleNavigate('Disclaimer'); }} className="text-gray-600 hover:text-violet-700">Disclaimer</a>
        </div>
        <p>&copy; {new Date().getFullYear()} Graphifly. All rights reserved.</p>
      </footer>
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        template={selectedTemplate}
      />
    </div>
  );
}

export default App;
