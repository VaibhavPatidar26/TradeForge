import { useAuth } from '../context/AuthContext';
import { Navbar } from '../components/Navbar';
import { useWebSocket } from '../hooks/useWebSocket';

function StatCard({ label, value, icon, accent = false }: {
  label: string;
  value: string;
  icon: React.ReactNode;
  accent?: boolean;
}) {
  return (
    <div className="card p-6">
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-medium text-slate-400">{label}</span>
        <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${accent ? 'bg-brand/10 text-brand' : 'bg-slate-800 text-slate-400'}`}>
          {icon}
        </div>
      </div>
      <p className={`text-2xl font-bold font-mono ${accent ? 'text-brand' : 'text-white'}`}>{value}</p>
    </div>
  );
}

function WsStatusBadge({ status }: { status: 'connecting' | 'connected' | 'disconnected' }) {
  const configs = {
    connecting: { dot: 'bg-yellow-400 animate-pulse', text: 'text-yellow-400', label: 'Connecting…' },
    connected: { dot: 'bg-brand animate-pulse', text: 'text-brand', label: 'Live' },
    disconnected: { dot: 'bg-red-400', text: 'text-red-400', label: 'Disconnected' },
  };
  const c = configs[status];
  return (
    <div className="flex items-center gap-2">
      <span className={`h-2 w-2 rounded-full ${c.dot}`} />
      <span className={`text-xs font-medium ${c.text}`}>{c.label}</span>
    </div>
  );
}

export default function Dashboard() {
  const { user } = useAuth();
  const { status: wsStatus, lastMessage } = useWebSocket('ws://localhost:8080');

  const formattedBalance = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 2,
  }).format(Number(user?.balance ?? 0));

  const joinedDate = new Date().toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="min-h-screen bg-slate-950">
      <Navbar />

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 space-y-8">

        {/* Welcome banner */}
        <div className="relative overflow-hidden card p-6 md:p-8">
          {/* Glow */}
          <div className="absolute -top-10 -right-10 h-48 w-48 rounded-full bg-brand/10 blur-3xl pointer-events-none" />

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <p className="text-slate-400 text-sm font-medium mb-1">Welcome back,</p>
              <h2 className="text-2xl md:text-3xl font-bold text-white">{user?.name} 👋</h2>
              <p className="text-slate-500 text-sm mt-1">{user?.email}</p>
            </div>
            <div className="shrink-0">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-brand/10 border border-brand/20 text-2xl font-bold text-brand">
                {user?.name.charAt(0).toUpperCase()}
              </div>
            </div>
          </div>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <StatCard
            label="Account Balance"
            value={formattedBalance}
            accent
            icon={
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            }
          />
          <StatCard
            label="Account ID"
            value={`#${user?.id.slice(0, 8).toUpperCase()}`}
            icon={
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z" />
              </svg>
            }
          />
          <StatCard
            label="Member Since"
            value={joinedDate}
            icon={
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
              </svg>
            }
          />
        </div>

        {/* Market Feed + Profile sections */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Live market feed */}
          <div className="lg:col-span-2 card p-6">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="font-semibold text-white">Market Feed</h3>
                <p className="text-xs text-slate-500 mt-0.5">Real-time WebSocket stream</p>
              </div>
              <WsStatusBadge status={wsStatus} />
            </div>

            {/* WS message display */}
            <div className="rounded-xl bg-slate-950 border border-slate-800 p-4 font-mono text-sm min-h-[120px] flex flex-col gap-2">
              {wsStatus === 'connecting' && (
                <div className="flex items-center gap-2 text-yellow-400">
                  <svg className="h-3.5 w-3.5 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  <span className="text-xs">Connecting to ws://localhost:8080…</span>
                </div>
              )}
              {wsStatus === 'disconnected' && (
                <p className="text-xs text-red-400">⚠ Unable to connect to market feed server.</p>
              )}
              {wsStatus === 'connected' && (
                <div className="space-y-1.5">
                  <p className="text-xs text-slate-500">{'>'} Connected to TradeForge market feed</p>
                  {lastMessage && (
                    <p className="text-xs text-brand">{'>'} {lastMessage}</p>
                  )}
                  <span className="inline-flex items-center gap-1 text-xs text-slate-600">
                    <span className="h-1.5 w-1.5 rounded-full bg-brand animate-pulse" />
                    Streaming live data…
                  </span>
                </div>
              )}
            </div>

            <p className="mt-3 text-xs text-slate-600">
              Market data streams via Upstox API → Redis → WebSocket to browser.
            </p>
          </div>

          {/* Account details */}
          <div className="card p-6">
            <h3 className="font-semibold text-white mb-5">Account Details</h3>
            <dl className="space-y-4">
              {[
                { label: 'Name', value: user?.name },
                { label: 'Email', value: user?.email },
                {
                  label: 'Balance',
                  value: formattedBalance,
                  highlight: true,
                },
                { label: 'Account Type', value: 'Paper Trading' },
                { label: 'Status', value: 'Active', badge: true },
              ].map(({ label, value, highlight, badge }) => (
                <div key={label} className="flex items-center justify-between py-2 border-b border-slate-800 last:border-0">
                  <dt className="text-xs text-slate-500">{label}</dt>
                  {badge ? (
                    <span className="badge-green">
                      <span className="h-1.5 w-1.5 rounded-full bg-green-400" />
                      {value}
                    </span>
                  ) : (
                    <dd className={`text-sm font-medium font-mono truncate max-w-[140px] ${highlight ? 'text-brand' : 'text-slate-200'}`}>
                      {value}
                    </dd>
                  )}
                </div>
              ))}
            </dl>
          </div>
        </div>

        {/* Coming soon teaser */}
        <div className="card p-6">
          <h3 className="font-semibold text-white mb-4">Upcoming Features</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {['Portfolio', 'Buy / Sell', 'Order History', 'Watchlist'].map((feat) => (
              <div key={feat} className="flex items-center gap-2.5 rounded-xl bg-slate-800/50 border border-slate-800 px-3 py-3">
                <svg className="h-4 w-4 text-slate-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-xs text-slate-500 font-medium">{feat}</span>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
