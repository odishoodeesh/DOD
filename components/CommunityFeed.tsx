import React, { useEffect, useState } from 'react';
import { db } from '../lib/firebase';
import { collection, query, orderBy, limit, onSnapshot } from 'firebase/firestore';

interface ShowcaseItem {
  id: string;
  imageUrl: string;
  scenarioName: string;
  scenarioIcon: string;
  timestamp: any;
}

const CommunityFeed: React.FC = () => {
  const [items, setItems] = useState<ShowcaseItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    // Note: If you see permission-denied, ensure your Firestore rules allow public read:
    // allow read: if true;
    const q = query(
      collection(db, "showcase"), 
      orderBy("timestamp", "desc"), 
      limit(12)
    );

    const unsubscribe = onSnapshot(
      q, 
      (snapshot) => {
        const newItems = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as ShowcaseItem[];
        setItems(newItems);
        setLoading(false);
        setHasError(false);
      },
      (error) => {
        console.warn("Community Feed access restricted (Firestore Rules):", error.message);
        setHasError(true);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  // If there's an error (like permission-denied) or no items after loading, 
  // we gracefully hide the entire section.
  if (hasError || (!loading && items.length === 0)) {
    return null;
  }

  if (loading) {
    return (
      <div className="space-y-8 py-12">
        <div className="flex items-center gap-3">
          <div className="h-8 w-48 bg-neutral-900 rounded-lg shimmer" />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="aspect-square rounded-2xl bg-neutral-900/50 shimmer border border-neutral-800" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 py-12 animate-in fade-in duration-1000">
      <div className="flex items-center gap-3">
        <span className="flex h-3 w-3 relative">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
        </span>
        <h2 className="text-2xl font-bold tracking-tight text-white uppercase italic">Live Showcase</h2>
        <div className="h-px flex-1 bg-gradient-to-r from-neutral-800 to-transparent"></div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
        {items.map((item) => (
          <div key={item.id} className="group relative aspect-square rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-900 transition-all hover:border-blue-500/50 hover:scale-[1.03]">
            <img 
              src={item.imageUrl} 
              alt={item.scenarioName} 
              className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-3">
              <div className="flex items-center gap-2">
                <span className="text-xs bg-white/10 backdrop-blur-md px-2 py-1 rounded-full border border-white/20 font-semibold text-white">
                  {item.scenarioIcon} {item.scenarioName}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommunityFeed;