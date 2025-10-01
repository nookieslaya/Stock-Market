import { auth } from '@/lib/better-auth/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { getUserWatchlist } from '@/lib/actions/watchlist.actions';
import WatchlistButton from '@/components/WatchlistButton';

export default async function WatchlistPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  const user = session?.user;
  if (!user) redirect('/sign-in');

  const items = await getUserWatchlist();

  return (
    <section>
      <h1 className="text-2xl font-semibold text-gray-100 mb-6">Your Watchlist</h1>

      {items.length === 0 ? (
        <div className="watchlist-empty-container">
          <p className="watchlist-empty">Your watchlist is empty. Use the search to add stocks you care about.</p>
        </div>
      ) : (
        <div className="watchlist-container">
          <ul className="divide-y divide-gray-800 rounded-md overflow-hidden border border-gray-800">
            {items.map(({ symbol, company }) => (
              <li key={symbol} className="flex items-center justify-between p-4 bg-[#0f0f0f]">
                <div className="flex items-center gap-3">
                  <span className="text-gray-200 font-medium">{company}</span>
                  <span className="text-gray-500">({symbol})</span>
                </div>
                <div>
                  <WatchlistButton
                    symbol={symbol}
                    company={company}
                    isInWatchlist={true}
                    showTrashIcon={true}
                    type="button"
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
