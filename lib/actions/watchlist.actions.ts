'use server';

import { connectToDatabase } from '@/database/mongoose';
import { Watchlist } from '@/database/models/watchlist.model';
import { auth } from '@/lib/better-auth/auth';
import { headers } from 'next/headers';

export async function getWatchlistSymbolsByEmail(email: string): Promise<string[]> {
  if (!email) return [];

  try {
    const mongoose = await connectToDatabase();
    const db = mongoose.connection.db;
    if (!db) throw new Error('MongoDB connection not found');

    // Better Auth stores users in the "user" collection
    const user = await db.collection('user').findOne<{ _id?: unknown; id?: string; email?: string }>({ email });

    if (!user) return [];

    const userId = (user.id as string) || String((user as any)._id || '');
    if (!userId) return [];

    const items = await Watchlist.find({ userId }, { symbol: 1 }).lean();
    return items.map((i) => String(i.symbol));
  } catch (err) {
    console.error('getWatchlistSymbolsByEmail error:', err);
    return [];
  }
}

export async function getCurrentUserId(): Promise<string | null> {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    const id = session?.user?.id;
    return id || null;
  } catch (e) {
    console.error('getCurrentUserId error:', e);
    return null;
  }
}

export async function getUserWatchlist(): Promise<{ symbol: string; company: string }[]> {
  try {
    const userId = await getCurrentUserId();
    if (!userId) return [];
    await connectToDatabase();
    const items = await Watchlist.find({ userId }, { symbol: 1, company: 1 }).lean();
    return items.map((i) => ({ symbol: String(i.symbol), company: String(i.company) }));
  } catch (e) {
    console.error('getUserWatchlist error:', e);
    return [];
  }
}

export async function addToWatchlist(symbol: string, company: string): Promise<{ success: boolean; error?: string }>{
  try {
    const userId = await getCurrentUserId();
    if (!userId) return { success: false, error: 'Not authenticated' };
    await connectToDatabase();
    const upper = (symbol || '').toUpperCase();
    const name = company?.trim() || upper;
    await Watchlist.updateOne(
      { userId, symbol: upper },
      { $setOnInsert: { userId, symbol: upper, company: name, addedAt: new Date() } },
      { upsert: true }
    );
    return { success: true };
  } catch (e: any) {
    console.error('addToWatchlist error:', e);
    return { success: false, error: e?.message || 'Failed to add to watchlist' };
  }
}

export async function removeFromWatchlist(symbol: string): Promise<{ success: boolean; error?: string }>{
  try {
    const userId = await getCurrentUserId();
    if (!userId) return { success: false, error: 'Not authenticated' };
    await connectToDatabase();
    const upper = (symbol || '').toUpperCase();
    await Watchlist.deleteOne({ userId, symbol: upper });
    return { success: true };
  } catch (e: any) {
    console.error('removeFromWatchlist error:', e);
    return { success: false, error: e?.message || 'Failed to remove from watchlist' };
  }
}
