import { NextRequest, NextResponse } from 'next/server';
import { addToWatchlist, removeFromWatchlist } from '@/lib/actions/watchlist.actions';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const symbol = (body?.symbol || '').toString();
    const company = (body?.company || '').toString();
    if (!symbol) return NextResponse.json({ success: false, error: 'Symbol is required' }, { status: 400 });

    const res = await addToWatchlist(symbol, company);
    const status = res.success ? 200 : 400;
    return NextResponse.json(res, { status });
  } catch (e: any) {
    return NextResponse.json({ success: false, error: e?.message || 'Unexpected error' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const symbol = (body?.symbol || '').toString();
    if (!symbol) return NextResponse.json({ success: false, error: 'Symbol is required' }, { status: 400 });

    const res = await removeFromWatchlist(symbol);
    const status = res.success ? 200 : 400;
    return NextResponse.json(res, { status });
  } catch (e: any) {
    return NextResponse.json({ success: false, error: e?.message || 'Unexpected error' }, { status: 500 });
  }
}
