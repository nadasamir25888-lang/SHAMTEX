'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

export default function DashboardSidebar() {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <aside className="dashboard-sidebar">
      <div className="sidebar-header">
        <h2>لوحة التحكم</h2>
      </div>
      <nav className="sidebar-nav">
        <ul>
          <li>
            <Link
              href="/dashboard/products"
              className={`nav-link ${isActive('/dashboard/products') ? 'active' : ''}`}
            >
              المنتجات
            </Link>
          </li>
          <li>
            <Link
              href="/dashboard/add-product"
              className={`nav-link ${isActive('/dashboard/add-product') ? 'active' : ''}`}
            >
              إضافة منتج
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
