import { useMemo, useState } from 'react'
import {
  AlertTriangle,
  BarChart3,
  Bell,
  CalendarDays,
  CircleDollarSign,
  Download,
  LayoutDashboard,
  Package,
  Search,
  Settings,
  ShoppingBag,
  ShoppingCart,
  Store,
  Truck,
  Users,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

type ViewKey = 'dashboard' | 'orders' | 'products' | 'finance' | 'stocks' | 'settings'

type TrendPoint = {
  label: string
  revenue: number
  orders: number
}

type Product = {
  sku: string
  name: string
  marketplace: 'WB' | 'Ozon'
  revenue: number
  orders: number
  stock: number
  margin: number
}

type Stock = {
  sku: string
  name: string
  warehouse: string
  marketplace: 'WB' | 'Ozon'
  stock: number
  daysLeft: number
}

const trends: TrendPoint[] = [
  { label: '01.05', revenue: 360000, orders: 118 },
  { label: '05.05', revenue: 438000, orders: 142 },
  { label: '09.05', revenue: 512000, orders: 156 },
  { label: '13.05', revenue: 628000, orders: 188 },
  { label: '17.05', revenue: 578000, orders: 173 },
  { label: '21.05', revenue: 704000, orders: 216 },
  { label: '25.05', revenue: 806000, orders: 238 },
]

const products: Product[] = [
  { sku: 'WB-2034', name: 'Oversize Hoodie Graphite', marketplace: 'WB', revenue: 874000, orders: 438, stock: 184, margin: 31 },
  { sku: 'OZ-1188', name: 'Basic T-Shirt Milk', marketplace: 'Ozon', revenue: 431000, orders: 392, stock: 92, margin: 24 },
  { sku: 'WB-4821', name: 'Denim Cargo Pants', marketplace: 'WB', revenue: 672000, orders: 286, stock: 51, margin: 27 },
  { sku: 'OZ-9120', name: 'Sport Sneakers White', marketplace: 'Ozon', revenue: 598000, orders: 211, stock: 39, margin: 19 },
  { sku: 'WB-6042', name: 'Leather Backpack Mini', marketplace: 'WB', revenue: 486000, orders: 174, stock: 24, margin: 22 },
]

const stocks: Stock[] = [
  { sku: 'WB-2034', name: 'Oversize Hoodie Graphite', warehouse: 'Коледино', marketplace: 'WB', stock: 84, daysLeft: 14 },
  { sku: 'OZ-1188', name: 'Basic T-Shirt Milk', warehouse: 'Хоругвино', marketplace: 'Ozon', stock: 62, daysLeft: 9 },
  { sku: 'WB-4821', name: 'Denim Cargo Pants', warehouse: 'Казань', marketplace: 'WB', stock: 18, daysLeft: 4 },
  { sku: 'OZ-9120', name: 'Sport Sneakers White', warehouse: 'Пушкино', marketplace: 'Ozon', stock: 9, daysLeft: 2 },
  { sku: 'WB-6042', name: 'Leather Backpack Mini', warehouse: 'Краснодар', marketplace: 'WB', stock: 24, daysLeft: 6 },
]

const navItems: Array<{ key: ViewKey; label: string; icon: LucideIcon }> = [
  { key: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { key: 'orders', label: 'Orders', icon: ShoppingBag },
  { key: 'products', label: 'Products', icon: Package },
  { key: 'finance', label: 'Finance', icon: BarChart3 },
  { key: 'stocks', label: 'Stocks', icon: Truck },
  { key: 'settings', label: 'Settings', icon: Settings },
]

const pageCopy: Record<ViewKey, { title: string; subtitle: string }> = {
  dashboard: {
    title: 'Marketplace Analytics',
    subtitle: 'WB и Ozon: продажи, прибыльность, остатки и операционные риски',
  },
  orders: {
    title: 'Orders',
    subtitle: 'Заказы, выкупы, отмены и динамика по периодам',
  },
  products: {
    title: 'Products',
    subtitle: 'SKU, маржинальность, остатки и вклад в выручку',
  },
  finance: {
    title: 'Finance',
    subtitle: 'Реклама, логистика, комиссии и прибыльность',
  },
  stocks: {
    title: 'Stocks',
    subtitle: 'Складское здоровье и риск out-of-stock',
  },
  settings: {
    title: 'Settings',
    subtitle: 'Подключения маркетплейсов и режим данных',
  },
}

const money = (value: number) =>
  new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    maximumFractionDigits: 0,
  }).format(value)

const number = (value: number) => new Intl.NumberFormat('ru-RU').format(value)

function App() {
  const [activeView, setActiveView] = useState<ViewKey>('dashboard')
  const totals = useMemo(() => {
    const revenue = trends.reduce((sum, point) => sum + point.revenue, 0)
    const orders = trends.reduce((sum, point) => sum + point.orders, 0)
    const lowStock = stocks.filter((item) => item.daysLeft <= 5).length
    const margin = Math.round(products.reduce((sum, item) => sum + item.margin, 0) / products.length)

    return {
      revenue,
      orders,
      lowStock,
      margin,
      adCost: 328000,
      logistics: 214000,
      commission: 486000,
    }
  }, [])

  const currentPage = pageCopy[activeView]

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-mark">MO</div>
          <div>
            <strong>MarketOps</strong>
            <span>Seller BI</span>
          </div>
        </div>

        <nav className="nav" aria-label="Главная навигация">
          {navItems.map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              className={activeView === key ? 'nav-item nav-item-active' : 'nav-item'}
              onClick={() => setActiveView(key)}
            >
              <Icon size={18} />
              {label}
            </button>
          ))}
        </nav>

        <div className="seller-card">
          <div className="seller-avatar">VK</div>
          <div>
            <strong>Seller Account</strong>
            <span>WB + Ozon</span>
          </div>
        </div>
      </aside>

      <main className="workspace">
        <header className="topbar">
          <div>
            <h1>{currentPage.title}</h1>
            <p>{currentPage.subtitle}</p>
          </div>
          <div className="topbar-actions">
            <label className="search">
              <Search size={17} />
              <input placeholder="Поиск SKU, заказа или склада" />
            </label>
            <button className="icon-button" aria-label="Уведомления">
              <Bell size={19} />
            </button>
            <button className="export-button">
              <Download size={17} />
              Export
            </button>
          </div>
        </header>

        <section className="period-panel">
          <div className="period-copy">
            <div className="period-icon">
              <CalendarDays size={20} />
            </div>
            <div>
              <strong>Период аналитики</strong>
              <span>Demo data · 30 дней · WB и Ozon</span>
            </div>
          </div>
          <div className="period-tabs">
            <button className="active">30 дней</button>
            <button>60 дней</button>
            <button>90 дней</button>
            <button>180 дней</button>
          </div>
        </section>

        {activeView === 'dashboard' && <Dashboard totals={totals} />}
        {activeView === 'orders' && <Orders totals={totals} />}
        {activeView === 'products' && <Products />}
        {activeView === 'finance' && <Finance totals={totals} />}
        {activeView === 'stocks' && <Stocks />}
        {activeView === 'settings' && <SettingsView />}
      </main>
    </div>
  )
}

function Dashboard({ totals }: { totals: { revenue: number; orders: number; lowStock: number; margin: number } }) {
  return (
    <>
      <section className="metric-grid">
        <Metric icon={CircleDollarSign} label="Выручка" value={money(totals.revenue)} trend="+11.8%" tone="gold" />
        <Metric icon={ShoppingCart} label="Заказы" value={number(totals.orders)} trend="+10.2%" tone="blue" />
        <Metric icon={Users} label="Маржа" value={`${totals.margin}%`} trend="+2.4%" tone="green" />
        <Metric icon={AlertTriangle} label="Stock Risk" value={String(totals.lowStock)} trend="-8.1%" tone="red" />
      </section>

      <section className="dashboard-grid">
        <article className="panel chart-panel">
          <PanelTitle title="Sales Overview" meta="Revenue vs orders" />
          <LineChart />
        </article>
        <article className="panel">
          <PanelTitle title="Order Mix" meta="Выкупы, отмены, возвраты" />
          <Donut />
        </article>
      </section>

      <section className="summary-grid">
        <SummaryTile title="Top product" text="Oversize Hoodie Graphite · 874 000 ₽" />
        <SummaryTile title="Marketplace split" text="WB 61% · Ozon 39%" />
        <SummaryTile title="Next action" text="Пополнить 3 SKU в ближайшие 7 дней" />
      </section>
    </>
  )
}

function Orders({ totals }: { totals: { orders: number } }) {
  return (
    <section className="content-grid">
      <article className="panel chart-panel">
        <PanelTitle title="Order Dynamics" meta={`${number(totals.orders)} заказов за период`} />
        <LineChart />
      </article>
      <article className="panel">
        <PanelTitle title="Recent Orders" meta="Последние операции" />
        <div className="table">
          {['#10482 · WB · Выкуплен', '#10481 · Ozon · В пути', '#10480 · WB · Новый', '#10479 · Ozon · Отмена'].map((item) => (
            <div className="table-row" key={item}>
              <strong>{item}</strong>
              <span>{money(12990)}</span>
            </div>
          ))}
        </div>
      </article>
    </section>
  )
}

function Products() {
  return (
    <section className="content-grid">
      <article className="panel">
        <PanelTitle title="Product Leaders" meta="SKU by revenue" />
        <ProductList />
      </article>
      <article className="panel chart-panel">
        <PanelTitle title="Product Revenue" meta="Вклад SKU" />
        <BarChartView />
      </article>
    </section>
  )
}

function Finance({ totals }: { totals: { revenue: number; adCost: number; logistics: number; commission: number } }) {
  return (
    <section className="metric-grid finance-grid">
      <Metric icon={CircleDollarSign} label="Выручка" value={money(totals.revenue)} trend="+11.8%" tone="gold" />
      <Metric icon={BarChart3} label="Реклама" value={money(totals.adCost)} trend="-4.3%" tone="red" />
      <Metric icon={Truck} label="Логистика" value={money(totals.logistics)} trend="+1.2%" tone="blue" />
      <Metric icon={Store} label="Комиссии" value={money(totals.commission)} trend="+3.8%" tone="green" />
    </section>
  )
}

function Stocks() {
  return (
    <section className="content-grid">
      <article className="panel chart-panel">
        <PanelTitle title="Warehouse Health" meta="Остатки по складам" />
        <BarChartView />
      </article>
      <article className="panel">
        <PanelTitle title="Critical Stock" meta="Пополнение" />
        <div className="table">
          {stocks.map((stock) => (
            <div className="table-row" key={stock.sku}>
              <strong>{stock.name}</strong>
              <span className={stock.daysLeft <= 5 ? 'risk' : ''}>{stock.stock} шт · {stock.daysLeft} дн.</span>
            </div>
          ))}
        </div>
      </article>
    </section>
  )
}

function SettingsView() {
  return (
    <section className="content-grid">
      <article className="panel settings-panel">
        <PanelTitle title="Integrations" meta="WB и Ozon API" />
        <p>Подключения спроектированы через backend API, чтобы токены маркетплейсов не попадали в браузер.</p>
      </article>
      <article className="panel settings-panel">
        <PanelTitle title="Data Mode" meta="Demo fallback" />
        <p>Без API-ключей интерфейс показывает демонстрационные данные и остаётся пригодным для презентации.</p>
      </article>
    </section>
  )
}

function Metric({ icon: Icon, label, value, trend, tone }: { icon: LucideIcon; label: string; value: string; trend: string; tone: string }) {
  return (
    <article className={`metric metric-${tone}`}>
      <Icon size={21} />
      <div>
        <span>{label}</span>
        <strong>{value}</strong>
        <p>{trend} к прошлому периоду</p>
      </div>
    </article>
  )
}

function PanelTitle({ title, meta }: { title: string; meta: string }) {
  return (
    <div className="panel-title">
      <div>
        <h2>{title}</h2>
        <p>{meta}</p>
      </div>
    </div>
  )
}

function LineChart() {
  const maxRevenue = Math.max(...trends.map((point) => point.revenue))
  const points = trends
    .map((point, index) => {
      const x = (index / (trends.length - 1)) * 100
      const y = 100 - (point.revenue / maxRevenue) * 86
      return `${x},${y}`
    })
    .join(' ')

  return (
    <div className="line-chart">
      <svg viewBox="0 0 100 100" preserveAspectRatio="none">
        <polyline points={points} fill="none" stroke="#4668db" strokeWidth="1.6" />
        <polygon points={`0,100 ${points} 100,100`} fill="url(#chartFill)" opacity="0.5" />
        <defs>
          <linearGradient id="chartFill" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#4668db" />
            <stop offset="100%" stopColor="#ffffff" />
          </linearGradient>
        </defs>
      </svg>
      <div className="chart-axis">
        {trends.map((point) => (
          <span key={point.label}>{point.label}</span>
        ))}
      </div>
    </div>
  )
}

function Donut() {
  return (
    <div className="donut-wrap">
      <div className="donut">
        <strong>81.8%</strong>
        <span>выкуп</span>
      </div>
      <div className="legend">
        <span><i className="green" /> Выкупы <b>1 007</b></span>
        <span><i className="gold" /> Отмены <b>112</b></span>
        <span><i className="red" /> Возвраты <b>70</b></span>
      </div>
    </div>
  )
}

function ProductList() {
  return (
    <div className="product-list">
      {products.map((product) => (
        <div className="product-row" key={product.sku}>
          <div className="product-icon">{product.marketplace}</div>
          <div>
            <strong>{product.name}</strong>
            <span>{product.sku} · {number(product.orders)} заказов · маржа {product.margin}%</span>
          </div>
          <b>{money(product.revenue)}</b>
        </div>
      ))}
    </div>
  )
}

function BarChartView() {
  const max = Math.max(...products.map((product) => product.revenue))

  return (
    <div className="bar-chart">
      {products.map((product) => (
        <div className="bar-item" key={product.sku}>
          <div className="bar" style={{ height: `${Math.max(18, (product.revenue / max) * 100)}%` }} />
          <span>{product.sku}</span>
        </div>
      ))}
    </div>
  )
}

function SummaryTile({ title, text }: { title: string; text: string }) {
  return (
    <article className="summary-tile">
      <strong>{title}</strong>
      <span>{text}</span>
    </article>
  )
}

export default App
