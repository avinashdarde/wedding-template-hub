import React, { useState, useEffect, useMemo } from 'react';
import { Search, Download, Heart, X, MessageSquare, Gift, Send, Wallet, ChevronDown, Menu, Crown, Instagram } from 'lucide-react';

// Placeholder for your details. Update this.
const YOUR_WHATSAPP_NUMBER = "919075469856"; // Replace with your WhatsApp number

const initialTemplatesData = [
    // =================================================================
    // ======================= INVITATIONS CATEGORY ======================3
    // =================================================================
    { id: 1, name: 'Classic Wedding Invitation Template', price: '99 / 2$', isPremium: true, previewImages: ['https://i.ibb.co/F9QzwqV/ID1.jpg'], category: 'Invitations', likes: 252, tags: ['classic', 'floral', 'elegant invitation', 'wedding card'] },
    { id: 2, name: 'Classic Wedding Invitation Template', price: '99 / 2$', previewImages: ['https://i.ibb.co/hJTsSBxX/ID2.jpg'], category: 'Invitations', likes: 13 },
    { id: 3, name: 'Classic Wedding Invitation Template', price: '99 / 2$', previewImages: ['https://i.ibb.co/6JPTNYtx/ID3.jpg'], category: 'Invitations', likes: 14 },
    { id: 4, name: 'Classic Wedding Invitation Template', price: '99 / 2$', previewImages: ['https://i.ibb.co/VczfNDGL/ID4.jpg'], category: 'Invitations', likes: 10 },
    { id: 5, name: 'Classic Wedding Invitation Template', price: '99 / 2$', previewImages: ['https://i.ibb.co/B563HMXN/ID5.jpg'], category: 'Invitations', likes: 19 },
    { id: 6, name: 'Classic Wedding Invitation Template', price: '99 / 2$', previewImages: ['https://i.ibb.co/G447FtB1/ID6.jpg'], category: 'Invitations', likes: 19 },
    { id: 7, name: 'Classic Wedding Invitation Template', price: '99 / 2$', previewImages: ['https://i.ibb.co/3YNZXmTr/ID7.jpg'], category: 'Invitations', likes: 19 },
    { id: 8, name: 'Classic Wedding Invitation Template', price: '99 / 2$', previewImages: ['https://i.ibb.co/V03n9pYQ/ID8.jpg'], category: 'Invitations', likes: 19 },
    { id: 9, name: 'Classic Wedding Invitation Template', price: '99 / 2$', previewImages: ['https://i.ibb.co/ZR8Pxdbk/ID9.jpg'], category: 'Invitations', likes: 19 },
    { id: 10, name: 'Classic Wedding Invitation Template', price: '99 / 2$', previewImages: ['https://i.ibb.co/k2RbFYk4/ID10.jpg'], category: 'Invitations', likes: 16 },
    { id: 11, name: 'Classic Wedding Invitation Template', price: '99 / 2$', previewImages: ['https://i.ibb.co/ZRdvRzqB/ID11.jpg'], category: 'Invitations', likes: 16 },
    { id: 12, name: 'Classic Wedding Invitation Template', price: '99 / 2$', previewImages: ['https://i.ibb.co/60F9jVdL/ID12.jpg'], category: 'Invitations', likes: 16 },
    { id: 13, name: 'Classic Wedding Invitation Template', price: '99 / 2$', previewImages: ['https://i.ibb.co/kstYjXJs/ID13.jpg'], category: 'Invitations', likes: 16 },
    { id: 14, name: 'Classic Wedding Invitation Template', price: '99 / 2$', previewImages: ['https://i.ibb.co/pBz5MbNv/ID14.jpg'], category: 'Invitations', likes: 18 },
    { id: 15, name: 'Classic Wedding Invitation Template', price: '99 / 2$', previewImages: ['https://i.ibb.co/pCnRf6L/ID15.jpg'], category: 'Invitations', likes: 18 },
    { id: 16, name: 'Classic Wedding Invitation Template', price: '99 / 2$', previewImages: ['https://i.ibb.co/KzXTDBjS/ID16.jpg'], category: 'Invitations', likes: 18 },
    { id: 17, name: 'Classic Wedding Invitation Template', price: '99 / 2$', previewImages: ['https://i.ibb.co/8kK1rhw/ID17.jpg'], category: 'Invitations', likes: 18 },
    { id: 18, name: 'Classic Wedding Invitation Template', price: '99 / 2$', previewImages: ['https://i.ibb.co/FbwMTqGP/ID18.jpg'], category: 'Invitations', likes: 18 },
    { id: 19, name: 'Classic Wedding Invitation Template', price: '99 / 2$', previewImages: ['https://i.ibb.co/Kj5zkkn1/ID19.jpg'], category: 'Invitations', likes: 18 },
    { id: 20, name: 'Classic Wedding Invitation Template', price: '99 / 2$', previewImages: ['https://i.ibb.co/hxKBYNSM/ID20.jpg'], category: 'Invitations', likes: 14 },
    { id: 21, name: 'Classic Wedding Invitation Template', price: '99 / 2$', previewImages: ['https://i.ibb.co/LynG8D2/ID21.jpg'], category: 'Invitations', likes: 14 },
    { id: 22, name: 'Classic Wedding Invitation Template', price: '99 / 2$', previewImages: ['https://i.ibb.co/Pvpcr1dD/ID22.jpg'], category: 'Invitations', likes: 14 },
    { id: 23, name: 'Classic Wedding Invitation Template', price: '99 / 2$', previewImages: ['https://i.ibb.co/jPNjFg0p/ID23.jpg'], category: 'Invitations', likes: 14 },
    { id: 24, name: 'Classic Wedding Invitation Template', price: '99 / 2$', previewImages: ['https://i.ibb.co/Q3R2gt8h/ID24.jpg'], category: 'Invitations', likes: 14 },
    { id: 25, name: 'Classic Wedding Invitation Template', price: '99 / 2$', previewImages: ['https://i.ibb.co/5gdMhk3m/ID25.jpg'], category: 'Invitations', likes: 14 },
    { id: 26, name: 'Classic Wedding Invitation Template', price: '99 / 2$', previewImages: ['https://i.ibb.co/XfsXfGp7/ID26.jpg'], category: 'Invitations', likes: 8 },
    { id: 27, name: 'Classic Wedding Invitation Template', price: '99 / 2$', previewImages: ['https://i.ibb.co/gbY71mP8/ID27.jpg'], category: 'Invitations', likes: 8 },
    { id: 28, name: 'Classic Wedding Invitation Template', price: '99 / 2$', previewImages: ['https://i.ibb.co/fz4gZKbj/ID28.jpg'], category: 'Invitations', likes: 8 },
    { id: 29, name: 'Classic Wedding Invitation Template', price: '99 / 2$', previewImages: ['https://i.ibb.co/sd2Vz9Lk/ID29.jpg'], category: 'Invitations', likes: 8 },
    { id: 30, name: 'Classic Wedding Invitation Template', price: '99 / 2$', previewImages: ['https://i.ibb.co/svCtLd04/ID30.jpg'], category: 'Invitations', likes: 8 },
    { id: 31, name: 'Classic Wedding Invitation Template', price: '99 / 2$', previewImages: ['https://i.ibb.co/BV2m4qh1/ID31.jpg'], category: 'Invitations', likes: 9 },
    { id: 32, name: 'Classic Wedding Invitation Template', price: '99 / 2$', previewImages: ['https://i.ibb.co/ZpVwxQk9/ID32.jpg'], category: 'Invitations', likes: 9 },
    { id: 33, name: 'Classic Wedding Invitation Template', price: '99 / 2$', previewImages: ['https://i.ibb.co/GfNm1hQS/ID33.jpg'], category: 'Invitations', likes: 9 },
    { id: 34, name: 'Classic Wedding Invitation Template', price: '99 / 2$', previewImages: ['https://i.ibb.co/WvyZZ26G/ID34.jpg'], category: 'Invitations', likes: 9 },
    { id: 35, name: 'Classic Wedding Invitation Template', price: '99 / 2$', previewImages: ['https://i.ibb.co/mVv5xr35/ID35.jpg'], category: 'Invitations', likes: 9 },
    { id: 36, name: 'Classic Wedding Invitation Template', price: '99 / 2$', previewImages: ['https://i.ibb.co/yHvC7tp/ID36.jpg'], category: 'Invitations', likes: 9 },
    { id: 37, name: 'Classic Wedding Invitation Template', price: '99 / 2$', previewImages: ['https://i.ibb.co/N2Z2hJ1Y/ID37.jpg'], category: 'Invitations', likes: 3 },
    { id: 38, name: 'Classic Wedding Invitation Template', price: '99 / 2$', previewImages: ['https://i.ibb.co/KJxkCtw/ID38.jpg'], category: 'Invitations', likes: 3 },
    { id: 39, name: 'Classic Wedding Invitation Template', price: '99 / 2$', previewImages: ['https://i.ibb.co/dwBkSDwt/ID39.jpg'], category: 'Invitations', likes: 3 },
    { id: 40, name: 'Classic Wedding Invitation Template', price: '99 / 2$', previewImages: ['https://i.ibb.co/BHCYvBsg/ID40.jpg'], category: 'Invitations', likes: 3 },
    { id: 41, name: 'Classic Wedding Invitation Template', price: '99 / 2$', previewImages: ['https://i.ibb.co/zTmx39jK/ID41.jpg'], category: 'Invitations', likes: 7 },
    { id: 42, name: 'Classic Wedding Invitation Template', price: '99 / 2$', previewImages: ['https://i.ibb.co/DHM8NzLX/ID42.jpg'], category: 'Invitations', likes: 7 },
    { id: 43, name: 'Classic Wedding Invitation Template', price: '99 / 2$', previewImages: ['https://i.ibb.co/JF7tTMLr/ID43.jpg'], category: 'Invitations', likes: 7 },
    { id: 44, name: 'Classic Wedding Invitation Template', price: '99 / 2$', previewImages: ['https://i.ibb.co/FbPW4wdd/ID44.jpg'], category: 'Invitations', likes: 7 },
    { id: 45, name: 'Classic Wedding Invitation Template', price: '99 / 2$', previewImages: ['https://i.ibb.co/0RK25yyy/ID45.jpg'], category: 'Invitations', likes: 9 },
    { id: 46, name: 'Classic Wedding Invitation Template', price: '99 / 2$', previewImages: ['https://i.ibb.co/zTTM91Tf/ID46.jpg'], category: 'Invitations', likes: 9 },
    { id: 47, name: 'Classic Wedding Invitation Template', price: '99 / 2$', previewImages: ['https://i.ibb.co/KcNNJKp3/ID47.jpg'], category: 'Invitations', likes: 9 },
    { id: 48, name: 'Classic Wedding Invitation Template', price: '99 / 2$', previewImages: ['https://i.ibb.co/Hfp7KhBv/ID48.jpg'], category: 'Invitations', likes: 9 },
    { id: 49, name: 'Classic Wedding Invitation Template', price: '99 / 2$', previewImages: ['https://i.ibb.co/zh4JYtTj/ID49.jpg'], category: 'Invitations', likes: 12 },
    { id: 50, name: 'Classic Wedding Invitation Template', price: '99 / 2$', previewImages: ['https://i.ibb.co/hJ1ZFRxg/ID50.jpg'], category: 'Invitations', likes: 12 },
    { id: 51, name: 'Classic Wedding Invitation Template', price: '99 / 2$', previewImages: ['https://i.ibb.co/ymsVfRMm/ID51.jpg'], category: 'Invitations', likes: 12 },
    { id: 52, name: 'Classic Wedding Invitation Template', price: '99 / 2$', previewImages: ['https://i.ibb.co/CpSjZ0SH/ID52.jpg'], category: 'Invitations', likes: 12 },
    { id: 53, name: 'Classic Wedding Invitation Template', price: '99 / 2$', previewImages: ['https://i.ibb.co/NdtD2C2K/ID53.jpg'], category: 'Invitations', likes: 12 },
    { id: 54, name: 'Classic Wedding Invitation Template', price: '99 / 2$', previewImages: ['https://i.ibb.co/Ld2dnF6q/ID54.jpg'], category: 'Invitations', likes: 20 },
    { id: 55, name: 'Classic Wedding Invitation Template', price: '99 / 2$', previewImages: ['https://i.ibb.co/pBVQ5RRs/ID55.jpg'], category: 'Invitations', likes: 20 },
    { id: 56, name: 'Classic Wedding Invitation Template', price: '99 / 2$', previewImages: ['https://i.ibb.co/ZzLsRML1/ID56.jpg'], category: 'Invitations', likes: 20 },
    { id: 57, name: 'Classic Wedding Invitation Template', price: '99 / 2$', previewImages: ['https://i.ibb.co/PJJ5KXR/ID57.jpg'], category: 'Invitations', likes: 20 },
    { id: 58, name: 'Classic Wedding Invitation Template', price: '99 / 2$', previewImages: ['https://i.ibb.co/qY1w8M9F/ID58.jpg'], category: 'Invitations', likes: 20 },
    { id: 59, name: 'Classic Wedding Invitation Template', price: '99 / 2$', previewImages: ['https://i.ibb.co/931hBx9x/ID59.jpg'], category: 'Invitations', likes: 11 },
    { id: 60, name: 'Classic Wedding Invitation Template', price: '99 / 2$', previewImages: ['https://i.ibb.co/s90vP4Cz/ID60.jpg'], category: 'Invitations', likes: 11 },
    { id: 61, name: 'Classic Wedding Invitation Template', price: '99 / 2$', previewImages: ['https://i.ibb.co/QjpVJJYx/ID61.jpg'], category: 'Invitations', likes: 11 },
    { id: 62, name: 'Classic Wedding Invitation Template', price: '99 / 2$', previewImages: ['https://i.ibb.co/KpD6L2xv/ID62.jpg'], category: 'Invitations', likes: 11 },
    { id: 63, name: 'Classic Wedding Invitation Template', price: '99 / 2$', previewImages: ['https://i.ibb.co/7NLMbxq0/ID63.jpg'], category: 'Invitations', likes: 11 },
    { id: 64, name: 'Classic Wedding Invitation Template', price: '99 / 2$', previewImages: ['https://i.ibb.co/zWKKks32/ID64.jpg'], category: 'Invitations', likes: 6 },
    { id: 65, name: 'Classic Wedding Invitation Template', price: '99 / 2$', previewImages: ['https://i.ibb.co/DH6fyCmQ/ID65.jpg'], category: 'Invitations', likes: 6 },
    { id: 66, name: 'Classic Wedding Invitation Template', price: '99 / 2$', previewImages: ['https://i.ibb.co/vvxnKyFp/ID66.jpg'], category: 'Invitations', likes: 6 },
    { id: 67, name: 'Classic Wedding Invitation Template', price: '99 / 2$', previewImages: ['https://i.ibb.co/XRMsCKw/ID67.jpg'], category: 'Invitations', likes: 6 },
    { id: 68, name: 'Classic Wedding Invitation Template', price: '99 / 2$', previewImages: ['https://i.ibb.co/LXRCgBbZ/ID68.jpg'], category: 'Invitations', likes: 8 },
    { id: 69, name: 'Classic Wedding Invitation Template', price: '99 / 2$', previewImages: ['https://i.ibb.co/HL16rp12/ID69.jpg'], category: 'Invitations', likes: 8 },
    { id: 70, name: 'Classic Wedding Invitation Template', price: '99 / 2$', previewImages: ['https://i.ibb.co/NdbGRnqX/ID70.jpg'], category: 'Invitations', likes: 8 },
    { id: 71, name: 'Classic Wedding Invitation Template', price: '99 / 2$', previewImages: ['https://i.ibb.co/fYqwDHVD/ID71.jpg'], category: 'Invitations', likes: 8 },
    { id: 72, name: 'Classic Wedding Invitation Template', price: '99 / 2$', previewImages: ['https://i.ibb.co/WpNbB0hc/ID72.jpg'], category: 'Invitations', likes: 8 },
    { id: 73, name: 'Classic Wedding Invitation Template', price: '99 / 2$', previewImages: ['https://i.ibb.co/mVszk0d3/ID73.jpg'], category: 'Invitations', likes: 3 },
    { id: 74, name: 'Classic Wedding Invitation Template', price: '99 / 2$', previewImages: ['https://i.ibb.co/6RTzZGS8/ID74.jpg'], category: 'Invitations', likes: 3 },
    { id: 75, name: 'Classic Wedding Invitation Template', price: '99 / 2$', previewImages: ['https://i.ibb.co/39vBZLwC/ID75.jpg'], category: 'Invitations', likes: 3 },
    { id: 76, name: 'Classic Wedding Invitation Template', price: '99 / 2$', previewImages: ['https://i.ibb.co/ZpMR5HGh/ID76.jpg'], category: 'Invitations', likes: 3 },
    { id: 77, name: 'Classic Wedding Invitation Template', price: '99 / 2$', previewImages: ['https://i.ibb.co/dwY5H87G/ID77.jpg'], category: 'Invitations', likes: 3 },
    { id: 78, name: 'Classic Wedding Invitation Template', price: '99 / 2$', previewImages: ['https://i.ibb.co/Mx6MnBDy/ID78.jpg'], category: 'Invitations', likes: 1 },
    { id: 79, name: 'Classic Wedding Invitation Template', price: '99 / 2$', previewImages: ['https://i.ibb.co/gbTqCK9q/ID79.jpg'], category: 'Invitations', likes: 1 },
    { id: 80, name: 'Classic Wedding Invitation Template', price: '99 / 2$', previewImages: ['https://i.ibb.co/0RbWF1Lf/ID80.jpg'], category: 'Invitations', likes: 1 },
    { id: 81, name: 'Classic Wedding Invitation Template', price: '99 / 2$', previewImages: ['https://i.ibb.co/gLR2bCgT/ID81.jpg'], category: 'Invitations', likes: 1 },
    { id: 82, name: 'Classic Wedding Invitation Template', price: '99 / 2$', previewImages: ['https://i.ibb.co/LDz2bYNQ/ID82.jpg'], category: 'Invitations', likes: 22 },
    { id: 83, name: 'Classic Wedding Invitation Template', price: '99 / 2$', previewImages: ['https://i.ibb.co/7d7L3B8Q/ID83.jpg'], category: 'Invitations', likes: 22 },
    { id: 84, name: 'Classic Wedding Invitation Template', price: '99 / 2$', previewImages: ['https://i.ibb.co/60CHbDNp/ID84.jpg'], category: 'Invitations', likes: 22 },
    { id: 85, name: 'Classic Wedding Invitation Template', price: '99 / 2$', previewImages: ['https://i.ibb.co/FbcQjW8G/ID85.jpg'], category: 'Invitations', likes: 22 },
    { id: 86, name: 'Classic Wedding Invitation Template', price: '99 / 2$', previewImages: ['https://i.ibb.co/XZGf9qH1/ID86.jpg'], category: 'Invitations', likes: 22 },
    { id: 87, name: 'Classic Wedding Invitation Template', price: '99 / 2$', previewImages: ['https://i.ibb.co/x8wjhrfP/ID87.jpg'], category: 'Invitations', likes: 25 },
    { id: 88, name: 'Classic Wedding Invitation Template', price: '99 / 2$', previewImages: ['https://i.ibb.co/rRbYmg8k/ID88.jpg'], category: 'Invitations', likes: 25 },
    { id: 89, name: 'Classic Wedding Invitation Template', price: '99 / 2$', previewImages: ['https://i.ibb.co/zThgYLjK/ID89.jpg'], category: 'Invitations', likes: 25 },
    { id: 90, name: 'Classic Wedding Invitation Template', price: '99 / 2$', previewImages: ['https://i.ibb.co/RGR1zPP4/ID90.jpg'], category: 'Invitations', likes: 483 },
    { id: 91, name: 'Classic Wedding Invitation Template', price: '99 / 2$', previewImages: ['https://i.ibb.co/q3Vb5njN/ID91.jpg'], category: 'Invitations', likes: 25 },
    { id: 92, name: 'Classic Wedding Invitation Template', price: '99 / 2$', previewImages: ['https://i.ibb.co/prnt5VZW/ID92.jpg'], category: 'Invitations', likes: 25 },
    { id: 93, name: 'Classic Wedding Invitation Template', price: '99 / 2$', previewImages: ['https://i.ibb.co/XrrVZzSV/ID93.jpg'], category: 'Invitations', likes: 500 },
    { id: 94, name: 'Classic Wedding Invitation Template', price: '99 / 2$', previewImages: ['https://i.ibb.co/6JJxPcvW/ID94.jpg'], category: 'Invitations', likes: 10 },
    { id: 95, name: 'Classic Wedding Invitation Template', price: '99 / 2$', previewImages: ['https://i.ibb.co/5hk82j6k/ID95.jpg'], category: 'Invitations', likes: 10 },
    { id: 96, name: 'Classic Wedding Invitation Template', price: '99 / 2$', previewImages: ['https://i.ibb.co/8g2zL4hb/ID96.jpg'], category: 'Invitations', likes: 10 },
    { id: 97, name: 'Classic Wedding Invitation Template', price: '99 / 2$', previewImages: ['https://i.ibb.co/vxyySY1X/ID97.jpg'], category: 'Invitations', likes: 10 },
    { id: 98, name: 'Classic Wedding Invitation Template', price: '99 / 2$', previewImages: ['https://i.ibb.co/VWCL460N/ID98.jpg'], category: 'Invitations', likes: 2 },
    { id: 99, name: 'Classic Wedding Invitation Template', price: '99 / 2$', previewImages: ['https://i.ibb.co/fVFMC4GT/ID99.jpg'], category: 'Invitations', likes: 2 },
    { id: 100, name: 'Classic Wedding Invitation Template', price: '99 / 2$', previewImages: ['https://i.ibb.co/pq8ywQ7/ID100.jpg'], category: 'Invitations', likes: 2 },
    { id: 101, name: 'Hindi Wedding Invitation Template', price: '99 / 2$', previewImages: ['https://i.ibb.co/mF5Gbd5R/ID101.jpg'], category: 'Invitations', likes: 156, tags: ['hindi wedding invitation, hindi wedding invitation template, hindi, hindi invitation card'] },
    { id: 102, name: 'Hindi Wedding Invitation Template', price: '99 / 2$', previewImages: ['https://i.ibb.co/7dxPWLMV/ID102.jpg'], category: 'Invitations', likes: 99, tags: ['hindi wedding invitation, hindi wedding invitation template, hindi, hindi invitation card'] },
    { id: 103, name: 'Hindi Wedding Invitation Template', price: '99 / 2$', previewImages: ['https://i.ibb.co/5g3snTT0/ID103.jpg'], category: 'Invitations', likes: 27, tags: ['hindi wedding invitation, hindi wedding invitation template, hindi, hindi invitation card'] },
    { id: 104, name: 'Hindi Wedding Invitation Template', price: '99 / 2$', previewImages: ['https://i.ibb.co/r27QDn4M/ID104.jpg'], category: 'Invitations', likes: 17, tags: ['hindi wedding invitation, hindi wedding invitation template, hindi, hindi invitation card'] },
    { id: 105, name: 'Hindi Wedding Invitation Template', price: '99 / 2$', previewImages: ['https://i.ibb.co/rKRFKFvd/ID105.jpg'], category: 'Invitations', likes: 82, tags: ['hindi wedding invitation, hindi wedding invitation template, hindi, hindi invitation card'] },
    { id: 106, name: 'Hindi Wedding Invitation Template', price: '99 / 2$', previewImages: ['https://i.ibb.co/hRSsmBxK/ID106.jpg'], category: 'Invitations', likes: 4, tags: ['hindi wedding invitation, hindi wedding invitation template, hindi, hindi invitation card'] },
    { id: 107, name: 'Hindi Wedding Invitation Template', price: '99 / 2$', previewImages: ['https://i.ibb.co/NgBgg4Hb/ID107.jpg'], category: 'Invitations', likes: 56, tags: ['hindi wedding invitation, hindi wedding invitation template, hindi, hindi invitation card'] },
    { id: 108, name: 'Hindi Wedding Invitation Template', price: '99 / 2$', previewImages: ['https://i.ibb.co/BvQGz7y/ID108.jpg'], category: 'Invitations', likes: 471, tags: ['hindi wedding invitation, hindi wedding invitation template, hindi, hindi invitation card'] },
    { id: 109, name: 'Hindi Wedding Invitation Template', price: '99 / 2$', previewImages: ['https://i.ibb.co/YFQffCNP/ID109.jpg'], category: 'Invitations', likes: 94, tags: ['hindi wedding invitation, hindi wedding invitation template, hindi, hindi invitation card'] },
    { id: 110, name: 'Hindi Wedding Invitation Template', price: '99 / 2$', previewImages: ['https://i.ibb.co/5gw9167n/ID110.jpg'], category: 'Invitations', likes: 38, tags: ['hindi wedding invitation, hindi wedding invitation template, hindi, hindi invitation card'] },
    { id: 111, name: 'Foral Wedding Invitation Template', price: '99 / 2$', previewImages: ['https://i.ibb.co/fGvSZ7kv/ID111.jpg'], category: 'Invitations', likes: 96, tags: ['wedding invitation, wedding card, floral wedding invitation, wedding template, wedding tamplate design'] },
    { id: 112, name: 'Foral Wedding Invitation Template', price: '99 / 2$', previewImages: ['https://i.ibb.co/nsh7hkv5/ID112.jpg'], category: 'Invitations', likes: 95, tags: ['wedding invitation, wedding card, floral wedding invitation, wedding template, wedding tamplate design'] },
    { id: 113, name: 'Foral Wedding Invitation Template', price: '99 / 2$', previewImages: ['https://i.ibb.co/8nycBfzL/ID113.jpg'], category: 'Invitations', likes: 99, tags: ['wedding invitation, wedding card, floral wedding invitation, wedding template, wedding tamplate design'] },
    { id: 114, name: 'Foral Wedding Invitation Template', price: '99 / 2$', previewImages: ['https://i.ibb.co/wF1j0DwM/ID114.jpg'], category: 'Invitations', likes: 93, tags: ['wedding invitation, wedding card, floral wedding invitation, wedding template, wedding tamplate design'] },
    { id: 115, name: 'Foral Wedding Invitation Template', price: '99 / 2$', previewImages: ['https://i.ibb.co/S7JzdL9N/ID115.jpg'], category: 'Invitations', likes: 95, tags: ['wedding invitation, wedding card, floral wedding invitation, wedding template, wedding tamplate design'] },
    { id: 116, name: 'Foral Wedding Invitation Template', price: '99 / 2$', previewImages: ['https://i.ibb.co/bjJY6Mhd/ID116.jpg'], category: 'Invitations', likes: 91, tags: ['wedding invitation, wedding card, floral wedding invitation, wedding template, wedding tamplate design'] },
    { id: 117, name: 'Foral Wedding Invitation Template', price: '99 / 2$', previewImages: ['https://i.ibb.co/bg0KF4g2/ID117.jpg'], category: 'Invitations', likes: 93, tags: ['wedding invitation, wedding card, floral wedding invitation, wedding template, wedding tamplate design'] },
    { id: 118, name: 'Foral Wedding Invitation Template', price: '99 / 2$', previewImages: ['https://i.ibb.co/Xky5BJxT/ID118.jpg'], category: 'Invitations', likes: 93, tags: ['wedding invitation, wedding card, floral wedding invitation, wedding template, wedding tamplate design'] },
    { id: 119, name: 'Foral Wedding Invitation Template', price: '99 / 2$', previewImages: ['https://i.ibb.co/5fY49hk/ID119.jpg'], category: 'Invitations', likes: 97, tags: ['wedding invitation, wedding card, floral wedding invitation, wedding template, wedding tamplate design'] },
    { id: 120, name: 'Foral Wedding Invitation Template', price: '99 / 2$', previewImages: ['https://i.ibb.co/6Jy5vPpV/ID120.jpg'], category: 'Invitations', likes: 97, tags: ['wedding invitation, wedding card, floral wedding invitation, wedding template, wedding tamplate design'] },
    { id: 121, name: 'Foral Wedding Invitation Template', price: '99 / 2$', previewImages: ['https://i.ibb.co/V08hJgLs/ID121.jpg'], category: 'Invitations', likes: 96, tags: ['wedding invitation, wedding card, floral wedding invitation, wedding template, wedding tamplate design'] },
    { id: 122, name: 'Foral Wedding Invitation Template', price: '99 / 2$', previewImages: ['https://i.ibb.co/xtw5N1dm/ID122.jpg'], category: 'Invitations', likes: 96, tags: ['wedding invitation, wedding card, floral wedding invitation, wedding template, wedding tamplate design'] },
    { id: 123, name: 'Foral Wedding Invitation Template', price: '99 / 2$', previewImages: ['https://i.ibb.co/21B15hHz/ID123.jpg'], category: 'Invitations', likes: 99, tags: ['wedding invitation, wedding card, floral wedding invitation, wedding template, wedding tamplate design'] },
    { id: 124, name: 'Foral Wedding Invitation Template', price: '99 / 2$', previewImages: ['https://i.ibb.co/h1Yqzqpm/ID124.jpg'], category: 'Invitations', likes: 121, tags: ['wedding invitation, wedding card, floral wedding invitation, wedding template, wedding tamplate design'] },
    { id: 125, name: 'Foral Wedding Invitation Template', price: '99 / 2$', previewImages: ['https://i.ibb.co/Lh5jFwbQ/ID125.jpg'], category: 'Invitations', likes: 118, tags: ['wedding invitation, wedding card, floral wedding invitation, wedding template, wedding tamplate design'] },
    { id: 126, name: 'Foral Wedding Invitation Template', price: '99 / 2$', previewImages: ['https://i.ibb.co/nMCLmKdL/ID126.jpg'], category: 'Invitations', likes: 95, tags: ['wedding invitation, wedding card, floral wedding invitation, wedding template, wedding tamplate design'] },
    { id: 127, name: 'Foral Wedding Invitation Template', price: '99 / 2$', previewImages: ['https://i.ibb.co/1Yr7Dfyc/ID127.jpg'], category: 'Invitations', likes: 119, tags: ['wedding invitation, wedding card, floral wedding invitation, wedding template, wedding tamplate design'] },
    { id: 128, name: 'Foral Wedding Invitation Template', price: '99 / 2$', previewImages: ['https://i.ibb.co/RknnvM0x/ID128.jpg'], category: 'Invitations', likes: 124, tags: ['wedding invitation, wedding card, floral wedding invitation, wedding template, wedding tamplate design'] },
    { id: 129, name: 'Foral Wedding Invitation Template', price: '99 / 2$', previewImages: ['https://i.ibb.co/hRXpdkCn/ID129.jpg'], category: 'Invitations', likes: 103, tags: ['wedding invitation, wedding card, floral wedding invitation, wedding template, wedding tamplate design'] },
    { id: 130, name: 'Foral Wedding Invitation Template', price: '99 / 2$', previewImages: ['https://i.ibb.co/fY00VdR7/ID130.jpg'], category: 'Invitations', likes: 95, tags: ['wedding invitation, wedding card, floral wedding invitation, wedding template, wedding tamplate design'] },
    { id: 131, name: 'Foral Wedding Invitation Template', price: '99 / 2$', previewImages: ['https://i.ibb.co/r2vczZX3/ID131.jpg'], category: 'Invitations', likes: 103, tags: ['wedding invitation, wedding card, floral wedding invitation, wedding template, wedding tamplate design'] },
    { id: 132, name: 'Foral Wedding Invitation Template', price: '99 / 2$', previewImages: ['https://i.ibb.co/QvXS4Kct/ID132.jpg'], category: 'Invitations', likes: 95, tags: ['wedding invitation, wedding card, floral wedding invitation, wedding template, wedding tamplate design'] },
    { id: 133, name: 'Foral Wedding Invitation Template', price: '99 / 2$', previewImages: ['https://i.ibb.co/CKfDFC3K/ID133.jpg'], category: 'Invitations', likes: 95, tags: ['wedding invitation, wedding card, floral wedding invitation, wedding template, wedding tamplate design'] },
    { id: 134, name: 'Foral Wedding Invitation Template', price: '99 / 2$', previewImages: ['https://i.ibb.co/hF4gsft2/ID134.jpg'], category: 'Invitations', likes: 103, tags: ['wedding invitation, wedding card, floral wedding invitation, wedding template, wedding tamplate design'] },
    { id: 135, name: 'Foral Wedding Invitation Template', price: '99 / 2$', previewImages: ['https://i.ibb.co/p6K04Gtx/ID135.jpg'], category: 'Invitations', likes: 113, tags: ['wedding invitation, wedding card, floral wedding invitation, wedding template, wedding tamplate design'] },
    { id: 136, name: 'Foral Wedding Invitation Template', price: '99 / 2$', previewImages: ['https://i.ibb.co/fYBWkJFB/ID136.jpg'], category: 'Invitations', likes: 115, tags: ['wedding invitation, wedding card, floral wedding invitation, wedding template, wedding tamplate design'] },
    { id: 137, name: 'Foral Wedding Invitation Template', price: '99 / 2$', previewImages: ['https://i.ibb.co/RGsLVhZt/ID137.jpg'], category: 'Invitations', likes: 95, tags: ['wedding invitation, wedding card, floral wedding invitation, wedding template, wedding tamplate design'] },
    { id: 138, name: 'Foral Wedding Invitation Template', price: '99 / 2$', previewImages: ['https://i.ibb.co/0Rmfk23s/ID138.jpg'], category: 'Invitations', likes: 117, tags: ['wedding invitation, wedding card, floral wedding invitation, wedding template, wedding tamplate design'] },
    { id: 139, name: 'Foral Wedding Invitation Template', price: '99 / 2$', previewImages: ['https://i.ibb.co/SDV3CHyw/ID139.jpg'], category: 'Invitations', likes: 119, tags: ['wedding invitation, wedding card, floral wedding invitation, wedding template, wedding tamplate design'] },
    { id: 140, name: 'Foral Wedding Invitation Template', price: '99 / 2$', previewImages: ['https://i.ibb.co/qMC8Dzqc/ID140.jpg'], category: 'Invitations', likes: 111, tags: ['wedding invitation, wedding card, floral wedding invitation, wedding template, wedding tamplate design'] },
    { id: 141, name: 'Foral Wedding Invitation Template', price: '99 / 2$', previewImages: ['https://i.ibb.co/6Jf33m9q/ID141.jpg'], category: 'Invitations', likes: 95, tags: ['wedding invitation, wedding card, floral wedding invitation, wedding template, wedding tamplate design'] },
    { id: 142, name: 'Foral Wedding Invitation Template', price: '99 / 2$', previewImages: ['https://i.ibb.co/W4WsHWtC/ID142.jpg'], category: 'Invitations', likes: 112, tags: ['wedding invitation, wedding card, floral wedding invitation, wedding template, wedding tamplate design'] },
    { id: 143, name: 'Foral Wedding Invitation Template', price: '99 / 2$', previewImages: ['https://i.ibb.co/zWp6MKm3/ID143.jpg'], category: 'Invitations', likes: 107, tags: ['wedding invitation, wedding card, floral wedding invitation, wedding template, wedding tamplate design'] },
    { id: 144, name: 'Foral Wedding Invitation Template', price: '99 / 2$', previewImages: ['https://i.ibb.co/C5QtC5Cq/ID144.jpg'], category: 'Invitations', likes: 95, tags: ['wedding invitation, wedding card, floral wedding invitation, wedding template, wedding tamplate design'] },
    { id: 145, name: 'Foral Wedding Invitation Template', price: '99 / 2$', previewImages: ['https://i.ibb.co/B5R3YXKz/ID145.jpg'], category: 'Invitations', likes: 103, tags: ['wedding invitation, wedding card, floral wedding invitation, wedding template, wedding tamplate design'] },
    { id: 146, name: 'Foral Wedding Invitation Template', price: '99 / 2$', previewImages: ['https://i.ibb.co/rCH9QSg/ID146.jpg'], category: 'Invitations', likes: 95, tags: ['wedding invitation, wedding card, floral wedding invitation, wedding template, wedding tamplate design'] },
    { id: 147, name: 'Foral Wedding Invitation Template', price: '99 / 2$', previewImages: ['https://i.ibb.co/FkjvMwFh/ID147.jpg'], category: 'Invitations', likes: 108, tags: ['wedding invitation, wedding card, floral wedding invitation, wedding template, wedding tamplate design'] },
    { id: 148, name: 'Foral Wedding Invitation Template', price: '99 / 2$', previewImages: ['https://i.ibb.co/67S9Vq9Z/ID148.jpg'], category: 'Invitations', likes: 95, tags: ['wedding invitation, wedding card, floral wedding invitation, wedding template, wedding tamplate design'] },
    { id: 149, name: 'Foral Wedding Invitation Template', price: '99 / 2$', previewImages: ['https://i.ibb.co/Kx6M9KBM/ID149.jpg'], category: 'Invitations', likes: 104, tags: ['wedding invitation, wedding card, floral wedding invitation, wedding template, wedding tamplate design'] },
    { id: 150, name: 'Foral Wedding Invitation Template', price: '99 / 2$', previewImages: ['https://i.ibb.co/TDM8qT4s/ID150.jpg'], category: 'Invitations', likes: 95, tags: ['wedding invitation, wedding card, floral wedding invitation, wedding template, wedding tamplate design'] },
    { id: 151, name: 'Foral Wedding Invitation Template', price: '99 / 2$', previewImages: ['https://i.ibb.co/kg5J4Bnz/ID151.jpg'], category: 'Invitations', likes: 106, tags: ['wedding invitation, wedding card, floral wedding invitation, wedding template, wedding tamplate design'] },
    { id: 152, name: 'Foral Wedding Invitation Template', price: '99 / 2$', previewImages: ['https://i.ibb.co/5gVGDV3G/ID152.jpg'], category: 'Invitations', likes: 109, tags: ['wedding invitation, wedding card, floral wedding invitation, wedding template, wedding tamplate design'] },
    { id: 153, name: 'Foral Wedding Invitation Template', price: '99 / 2$', previewImages: ['https://i.ibb.co/67tTrzWW/ID153.jpg'], category: 'Invitations', likes: 103, tags: ['wedding invitation, wedding card, floral wedding invitation, wedding template, wedding tamplate design'] },
    { id: 154, name: 'Foral Wedding Invitation Template', price: '99 / 2$', previewImages: ['https://i.ibb.co/b4TDqSv/ID154.jpg'], category: 'Invitations', likes: 99, tags: ['wedding invitation, wedding card, floral wedding invitation, wedding template, wedding tamplate design'] },
    { id: 155, name: 'Foral Wedding Invitation Template', price: '99 / 2$', previewImages: ['https://i.ibb.co/C5n0bd3g/ID155.jpg'], category: 'Invitations', likes: 101, tags: ['wedding invitation, wedding card, floral wedding invitation, wedding template, wedding tamplate design'] },
    { id: 156, name: 'Foral Wedding Invitation Template', price: '99 / 2$', previewImages: ['https://i.ibb.co/qF77rd5F/ID156.jpg'], category: 'Invitations', likes: 104, tags: ['wedding invitation, wedding card, floral wedding invitation, wedding template, wedding tamplate design'] },
    { id: 157, name: 'Foral Wedding Invitation Template', price: '99 / 2$', previewImages: ['https://i.ibb.co/p6xQPJLP/ID157.jpg'], category: 'Invitations', likes: 104, tags: ['wedding invitation, wedding card, floral wedding invitation, wedding template, wedding tamplate design'] },
    { id: 158, name: 'Foral Wedding Invitation Template', price: '99 / 2$', previewImages: ['https://i.ibb.co/wNSkt3HY/ID158.jpg'], category: 'Invitations', likes: 75, tags: ['wedding invitation, wedding card, floral wedding invitation, wedding template, wedding tamplate design'] },
    { id: 159, name: 'Foral Wedding Invitation Template', price: '99 / 2$', previewImages: ['https://i.ibb.co/xtdT7Thm/ID159.jpg'], category: 'Invitations', likes: 92, tags: ['wedding invitation, wedding card, floral wedding invitation, wedding template, wedding tamplate design'] },
    { id: 160, name: 'Foral Wedding Invitation Template', price: '99 / 2$', previewImages: ['https://i.ibb.co/JRTVPbnh/ID160.jpg'], category: 'Invitations', likes: 94, tags: ['wedding invitation, wedding card, floral wedding invitation, wedding template, wedding tamplate design'] },
    { id: 161, name: 'Foral Wedding Invitation Template', price: '99 / 2$', previewImages: ['https://i.ibb.co/21nQkb40/ID161.jpg'], category: 'Invitations', likes: 94, tags: ['wedding invitation, wedding card, floral wedding invitation, wedding template, wedding tamplate design'] },
    { id: 162, name: 'Foral Wedding Invitation Template', price: '99 / 2$', previewImages: ['https://i.ibb.co/fzr7NRZW/ID162.jpg'], category: 'Invitations', likes: 90, tags: ['wedding invitation, wedding card, floral wedding invitation, wedding template, wedding tamplate design'] },
    { id: 163, name: 'Foral Wedding Invitation Template', price: '99 / 2$', previewImages: ['https://i.ibb.co/Kz52YQYL/ID163.jpg'], category: 'Invitations', likes: 110, tags: ['wedding invitation, wedding card, floral wedding invitation, wedding template, wedding tamplate design'] },
    { id: 164, name: 'Foral Wedding Invitation Template', price: '99 / 2$', previewImages: ['https://i.ibb.co/fdkCYrsM/ID164.jpg'], category: 'Invitations', likes: 101, tags: ['wedding invitation, wedding card, floral wedding invitation, wedding template, wedding tamplate design'] },
    { id: 165, name: 'Foral Wedding Invitation Template', price: '99 / 2$', previewImages: ['https://i.ibb.co/23Yzv8h5/ID165.jpg'], category: 'Invitations', likes: 95, tags: ['wedding invitation, wedding card, floral wedding invitation, wedding template, wedding tamplate design'] },
    { id: 166, name: 'Foral Wedding Invitation Template', price: '99 / 2$', previewImages: ['https://i.ibb.co/9mg7vXGr/ID166.jpg'], category: 'Invitations', likes: 88, tags: ['wedding invitation, wedding card, floral wedding invitation, wedding template, wedding tamplate design'] },
    { id: 167, name: 'Foral Wedding Invitation Template', price: '99 / 2$', previewImages: ['https://i.ibb.co/V0MHCxSt/ID167.jpg'], category: 'Invitations', likes: 78, tags: ['wedding invitation, wedding card, floral wedding invitation, wedding template, wedding tamplate design'] },
    { id: 168, name: 'Foral Wedding Invitation Template', price: '99 / 2$', previewImages: ['https://i.ibb.co/MDhpVS3w/ID168.jpg'], category: 'Invitations', likes: 109, tags: ['wedding invitation, wedding card, floral wedding invitation, wedding template, wedding tamplate design'] },
    { id: 169, name: 'Foral Wedding Invitation Template', price: '99 / 2$', previewImages: ['https://i.ibb.co/WWrmfsB3/ID169.jpg'], category: 'Invitations', likes: 120, tags: ['wedding invitation, wedding card, floral wedding invitation, wedding template, wedding tamplate design'] },
    { id: 170, name: 'Foral Wedding Invitation Template', price: '99 / 2$', previewImages: ['https://i.ibb.co/tPQkL6z9/ID170.jpg'], category: 'Invitations', likes: 121, tags: ['wedding invitation, wedding card, floral wedding invitation, wedding template, wedding tamplate design'] },

    // =================================================================
    // ======================= SAVE THE DATE ======================
    // =================================================================

    { id: 1001, name: 'Wedding Save-the-Date Card Template', price: '99 / 2$', previewImages: ['https://i.ibb.co/7hk4587/ID1001.jpg'], category: 'Save-the-Date', likes: 198 },
    { id: 1002, name: 'Wedding Save-the-Date Card Template', price: '99 / 2$', previewImages: ['https://i.ibb.co/1fjQCLvb/ID1002.jpg'], category: 'Save-the-Date', likes: 234 },
    { id: 1003, name: 'Wedding Save-the-Date Card Template', price: '99 / 2$', previewImages: ['https://i.ibb.co/Z6ZnLrh3/ID1003.jpg'], category: 'Save-the-Date', likes: 213 },
    { id: 1004, name: 'Wedding Save-the-Date Card Template', price: '99 / 2$', previewImages: ['https://i.ibb.co/LzjFqf58/ID1004.jpg'], category: 'Save-the-Date', likes: 134 },
    { id: 1005, name: 'Wedding Save-the-Date Card Template', price: '99 / 2$', previewImages: ['https://i.ibb.co/RkSS8whh/ID1005.jpg'], category: 'Save-the-Date', likes: 166 },
    { id: 1006, name: 'Wedding Save-the-Date Card Template', price: '99 / 2$', previewImages: ['https://i.ibb.co/20DzKwcc/ID1006.jpg'], category: 'Save-the-Date', likes: 157 },
    { id: 1007, name: 'Wedding Save-the-Date Card Template', price: '99 / 2$', previewImages: ['https://i.ibb.co/Z6zbB1fw/ID1007.jpg'], category: 'Save-the-Date', likes: 196 },
    { id: 1008, name: 'Wedding Save-the-Date Card Template', price: '99 / 2$', previewImages: ['https://i.ibb.co/Cstgj4r9/ID1008.jpg'], category: 'Save-the-Date', likes: 466 },
    { id: 1009, name: 'Wedding Save-the-Date Card Template', price: '99 / 2$', previewImages: ['https://i.ibb.co/N6T5Gx2T/ID1009.jpg'], category: 'Save-the-Date', likes: 145 },
    { id: 1010, name: 'Wedding Save-the-Date Card Template', price: '99 / 2$', previewImages: ['https://i.ibb.co/JF3ffjtS/ID1010.jpg'], category: 'Save-the-Date', likes: 158 },
    { id: 1011, name: 'Wedding Save-the-Date Card Template', price: '99 / 2$', previewImages: ['https://i.ibb.co/spdnL3zC/ID1011.jpg'], category: 'Save-the-Date', likes: 139 },
    { id: 1012, name: 'Wedding Save-the-Date Card Template', price: '99 / 2$', previewImages: ['https://i.ibb.co/GQQRwWXp/ID1012.jpg'], category: 'Save-the-Date', likes: 284 },
    { id: 1013, name: 'Wedding Save-the-Date Card Template', price: '99 / 2$', previewImages: ['https://i.ibb.co/60MjXS4L/ID1013.jpg'], category: 'Save-the-Date', likes: 164 },
    { id: 1014, name: 'Wedding Save-the-Date Card Template', price: '99 / 2$', previewImages: ['https://i.ibb.co/8g3WLPkq/ID1014.jpg'], category: 'Save-the-Date', likes: 274 },
    { id: 1015, name: 'Wedding Save-the-Date Card Template', price: '99 / 2$', previewImages: ['https://i.ibb.co/bMvmG60W/ID1015.jpg'], category: 'Save-the-Date', likes: 178 },
    { id: 1016, name: 'Wedding Save-the-Date Card Template', price: '99 / 2$', previewImages: ['https://i.ibb.co/XkKKwthr/ID1016.jpg'], category: 'Save-the-Date', likes: 193 },
    { id: 1017, name: 'Wedding Save-the-Date Card Template', price: '99 / 2$', previewImages: ['https://i.ibb.co/v4rCdzmt/ID1017.jpg'], category: 'Save-the-Date', likes: 127 },
    { id: 1018, name: 'Wedding Save-the-Date Card Template', price: '99 / 2$', previewImages: ['https://i.ibb.co/jvFsh72F/ID1018.jpg'], category: 'Save-the-Date', likes: 165 },
    { id: 1019, name: 'Wedding Save-the-Date Card Template', price: '99 / 2$', previewImages: ['https://i.ibb.co/S7ydnz2M/ID1019.jpg'], category: 'Save-the-Date', likes: 125 },
    { id: 1020, name: 'Wedding Save-the-Date Card Template', price: '99 / 2$', previewImages: ['https://i.ibb.co/hJ26gwsw/ID1020.jpg'], category: 'Save-the-Date', likes: 345 },
    { id: 1021, name: 'Wedding Save-the-Date Card Template', price: '99 / 2$', previewImages: ['https://i.ibb.co/pjB1J09k/ID1021.jpg'], category: 'Save-the-Date', likes: 345 },
    { id: 1022, name: 'Wedding Save-the-Date Card Template', price: '99 / 2$', previewImages: ['https://i.ibb.co/pBmQdNsb/ID1022.jpg'], category: 'Save-the-Date', likes: 345 },
    { id: 1023, name: 'Wedding Save-the-Date Card Template', price: '99 / 2$', previewImages: ['https://i.ibb.co/99FM94kx/ID1023.jpg'], category: 'Save-the-Date', likes: 345 },
    { id: 1024, name: 'Wedding Save-the-Date Card Template', price: '99 / 2$', previewImages: ['https://i.ibb.co/n881Kgjg/ID1024.jpg'], category: 'Save-the-Date', likes: 345 },
    { id: 1025, name: 'Wedding Save-the-Date Card Template', price: '99 / 2$', previewImages: ['https://i.ibb.co/ZRRWJyYW/ID1025.jpg'], category: 'Save-the-Date', likes: 345 },

    // =================================================================
    // ======================= VIDEOS CATEGORY =========================
    // =================================================================
    { id: 3001, // Har video ke liye alag ID dein (3002, 3003...)
      name: 'Modern Video Invite',
      price: '149',
      isPremium: false,
      // Thumbnail ke liye imgbb.com jaisi site se hi link use karein
      previewImages: ['https://i.ibb.co/fjkw7mT/V1.jpg'], 
      // Video ke liye seedha project ka link dein
      previewVideo: '/videos/V1.mp4', 
      downloadFormats: { },
      category: 'Videos',
      likes: 180,
      tags: ['video invitation', 'modern invite', 'e-invite'] },
    
        { id: 3002, // Har video ke liye alag ID dein (3002, 3003...)
      name: 'Modern Video Invite',
      price: '149',
      isPremium: false,
      // Thumbnail ke liye imgbb.com jaisi site se hi link use karein
      previewImages: ['https://i.ibb.co/wZsG7hF8/V2.jpg'], 
      // Video ke liye seedha project ka link dein
      previewVideo: '/videos/V2.mp4', 
      downloadFormats: { },
      category: 'Videos',
      likes: 90,
      tags: ['video invitation', 'modern invite', 'e-invite'] },
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
      
      {/* ===== CROWN ICON WALA NAYA CODE YAHAN ADD KIYA GAYA HAI ===== */}
      {template.isPremium && (
        <div className="absolute top-2 left-2 bg-yellow-400 text-white p-1.5 rounded-full shadow-lg z-10" title="Premium Template">
          <Crown size={18} />
        </div>
      )}
      {/* ============================================================= */}

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
        const isCustomizable = template.category === 'Invitations' || template.category === 'Save-the-Date' || template.category === 'Videos';
        const whatsappMessage = `Hi, I want to customise template ID: ${template.id} - ${template.name}. Please provide payment details.`;
        const encodedMessage = encodeURIComponent(whatsappMessage);
        const whatsappLink = `https://wa.me/${YOUR_WHATSAPP_NUMBER}?text=${encodedMessage}`;
        // Naya hissa video/image dikhane ke liye
const MediaPreview = (
  <div className="mb-4 rounded-lg overflow-hidden shadow-lg bg-gray-200">
    {template.previewVideo ? (
      <video src={template.previewVideo} className="w-full h-auto" controls autoPlay loop muted>
        Your browser does not support the video tag.
      </video>
    ) : (
      <img src={template.previewImages[0]} alt={`${template.name} Preview`} className="w-full h-auto object-cover" />
    )}
  </div>
);

        return (
            <>
                 {MediaPreview}
                 <h3 className="text-2xl font-bold text-gray-800 mb-4">{template.name}</h3>
                 <h3 className="text-2xl font-bold text-gray-800 mb-4">{template.name}</h3>
                 {isCustomizable ? (
                    <div className="space-y-4">
    <div className="text-center p-4 bg-violet-50 rounded-lg">
        <h4 className="font-bold text-lg text-violet-800">Customization Price: ₹{template.isPremium ? '250 / 4$' : template.price}</h4>
        <ol className="text-left mt-4 space-y-2 text-gray-600 list-decimal list-inside">
            <li>Click the WhatsApp button below.</li>
            <li>Send the pre-filled message with your details.</li>
            <li>Make the payment on the UPI ID Or Paypal I provide on WhatsApp.</li>
            <li>You will receive your design within 24 Hours!</li>
        </ol>
    </div>
    <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="w-full flex items-center justify-center gap-3 bg-green-500 text-white font-bold py-3 px-6 rounded-lg hover:bg-green-600 transition-all duration-300">
        <MessageSquare size={20}/> Chat on WhatsApp to Customise
    </a>
        <button 
          onClick={() => {
            // Step 1: Message banayein
            const instaMessage = `Hi, I want to customise template ID: ${template.id} - ${template.name}.`;
            
            // Step 2: Message ko clipboard par copy karein
            navigator.clipboard.writeText(instaMessage);
            
            // Step 3: User ko batayein ki message copy ho gaya hai
            alert('Template details copied! Now pasting in Instagram chat.');
            
            // Step 4: Instagram chat kholein
            const instagramUsername = 'graphifly'; // <-- APNA USERNAME YAHAN DAALEIN
            window.open(`https://ig.me/m/${instagramUsername}`, '_blank');
          }}
          className="w-full mt-2 flex items-center justify-center gap-3 bg-gradient-to-r from-pink-500 to-orange-500 text-white font-bold py-3 px-6 rounded-lg hover:opacity-90 transition-all duration-300"
        >
          <Instagram size={20}/> Chat on Instagram
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
        <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-5 relative overflow-y-auto max-h-[90vh]" onClick={(e) => e.stopPropagation()}>
          <button onClick={onClose} className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 transition-colors">
            <X size={24} />
          </button>
          {renderContent()}
        </div>
      </div>
    );
}

const HomePage = ({ templates, onOpenModal, onLike, onNavigate }) => {
    // Puraane 'const topTemplates = ...' ko is poore code se replace karein
    const topInvitationTemplates = useMemo(() =>
        templates
            .filter(t => t.category === 'Invitations') // Sirf Invitations chuno
            .sort((a, b) => b.likes - a.likes) // Likes ke hisab se sort karo
            .slice(0, 6), // Shuru ke 6 le lo
        [templates]
    );

    const topSaveTheDateTemplates = useMemo(() =>
        templates
            .filter(t => t.category === 'Save-the-Date') // Sirf Save-the-Date chuno
            .sort((a, b) => b.likes - a.likes) // Likes ke hisab se sort karo
            .slice(0, 6), // Shuru ke 6 le lo
        [templates]
    );

    const top12Templates = [...topInvitationTemplates, ...topSaveTheDateTemplates];

    return (
        <>
            <div className="relative text-center py-16 md:py-24 bg-violet-50 overflow-hidden">
                <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(to_bottom,white,transparent)]"></div>
                <div className="container mx-auto px-6 relative z-10">
                    <h1 className="text-4xl md:text-6xl font-extrabold text-gray-800 mb-4">Your Vision, Our Templates</h1>
                    <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                        "Your unique wedding invitation for just ₹99 / $2! Select a template, send your details, and have your design in 24 Hours."
                    </p>
                     <button onClick={() => onNavigate('Templates')} className="bg-violet-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-violet-700 transition-all text-lg">
                        Explore All Templates
                    </button>
                </div>
            </div>
            <div className="container mx-auto px-6 py-12">
                <h2 className="text-3xl font-bold text-center mb-8">Top Liked Templates</h2>
        <div className="grid grid-cols-3 lg:grid-cols-6 gap-4">
          {top12Templates.map(template => (
            <TemplateCard key={template.id} template={template} onOpenModal={onOpenModal} onLike={onLike} />
          ))}
        </div>
                    <div className="text-center mt-12">
     <button onClick={() => onNavigate('Templates')} className="bg-violet-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-violet-700 transition-all text-lg">
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
        return templates
          .filter((template) => {
            const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                              (template.tags && template.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())));
            const matchesCategory = selectedCategory === 'All' || template.category === selectedCategory;
            return matchesSearch && matchesCategory;
          })
          .sort((a, b) => b.likes - a.likes);
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
        { icon: <Wallet size={40} className="text-violet-500" />, title: "3. Make Payment", description: "We will provide you with our UPI ID Or Paypal on WhatsApp for you to complete the payment." },
        { icon: <Gift size={40} className="text-violet-500" />, title: "4. Get Your Design", description: "Within 24 Hours, you will receive your beautifully customized design on WhatsApp!" }
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
        { q: "How much time does it take to get the design?", a: "You will receive your customized design on WhatsApp within 24 Hours after you provide your details and complete the payment." },
        { q: "In which format will I receive the files?", a: "You will receive a high-quality JPG or PNG file, perfect for sharing on social media or for printing." },
        { q: "How do I make the payment?", a: "After you send us your details on WhatsApp, we will provide our UPI ID Or Paypal for payment. You can pay using any UPI app like Google Pay, PhonePe, or Paytm." },
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
