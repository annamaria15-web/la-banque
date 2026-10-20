import React, { useState } from 'react';
import { OFFERS_DATA } from '../data/mockData';
import { OfferItem } from '../types';
import { Tag, Check, Sparkles, ShoppingBag, Store, Utensils, Headphones, ExternalLink, ArrowRight } from 'lucide-react';

interface OffersViewProps {
  onShowToast: (msg: string) => void;
}

export const OffersView: React.FC<OffersViewProps> = ({ onShowToast }) => {
  const [offers, setOffers] = useState<OfferItem[]>(OFFERS_DATA);
  const [selectedFilter, setSelectedFilter] = useState<string>('all');

  const toggleActivate = (id: string, brand: string) => {
    setOffers((prev) =>
      prev.map((o) => {
        if (o.id === id) {
          const next = !o.activated;
          onShowToast(
            next
              ? `Offre ${brand} activée ! Le cashback sera crédité automatiquement.`
              : `Offre ${brand} désactivée.`
          );
          return { ...o, activated: next };
        }
        return o;
      })
    );
  };

  const filteredOffers = offers.filter((o) => {
    if (selectedFilter === 'all') return true;
    if (selectedFilter === 'activated') return o.activated;
    return true;
  });

  const getBrandIcon = (logo: string) => {
    switch (logo) {
      case 'storefront':
        return <Store className="w-6 h-6 text-[#0070BA]" />;
      case 'shopping_bag':
        return <ShoppingBag className="w-6 h-6 text-[#5856D6]" />;
      case 'restaurant':
        return <Utensils className="w-6 h-6 text-amber-600" />;
      case 'headphones':
        return <Headphones className="w-6 h-6 text-emerald-600" />;
      default:
        return <Tag className="w-6 h-6 text-[#0070BA]" />;
    }
  };

  return (
    <div className="flex-1 w-full bg-[#f9f9ff] min-h-[calc(100vh-4rem)]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Banner */}
        <section className="rounded-2xl bg-gradient-to-r from-[#003087] to-[#0070BA] p-6 sm:p-8 text-white shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-xs font-bold text-blue-100">
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Avantages & Cashback PayPal</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Économisez sur vos achats chez nos marchands partenaires
            </h1>
            <p className="text-xs sm:text-sm text-blue-100 leading-relaxed">
              Activez vos réductions en un clic. Vos remboursements et remises sont crédités directement sur votre solde PayPal.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-white/10 p-1 rounded-full text-xs font-bold">
            <button
              onClick={() => setSelectedFilter('all')}
              className={`px-4 py-2 rounded-full transition-all cursor-pointer ${
                selectedFilter === 'all'
                  ? 'bg-white text-[#003087] shadow-sm'
                  : 'text-white/80 hover:text-white'
              }`}
            >
              Toutes les offres ({offers.length})
            </button>
            <button
              onClick={() => setSelectedFilter('activated')}
              className={`px-4 py-2 rounded-full transition-all cursor-pointer ${
                selectedFilter === 'activated'
                  ? 'bg-white text-[#003087] shadow-sm'
                  : 'text-white/80 hover:text-white'
              }`}
            >
              Mes offres actives ({offers.filter((o) => o.activated).length})
            </button>
          </div>
        </section>

        {/* Offers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredOffers.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex flex-col justify-between space-y-4 hover:shadow-md transition-shadow"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center">
                    {getBrandIcon(item.logo)}
                  </div>
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-green-100 text-[#107C41]">
                    {item.cashback}
                  </span>
                </div>

                <div>
                  <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                    {item.category}
                  </span>
                  <h3 className="font-bold text-base text-slate-900 mt-0.5">{item.brand}</h3>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">{item.description}</p>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 space-y-2 text-xs">
                <span className="text-[11px] text-slate-400 block">{item.expiry}</span>
                <button
                  onClick={() => toggleActivate(item.id, item.brand)}
                  className={`w-full py-2.5 rounded-full font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-xs cursor-pointer ${
                    item.activated
                      ? 'bg-green-100 text-[#107C41] hover:bg-green-200'
                      : 'bg-[#0070BA] text-white hover:bg-[#005ea6]'
                  }`}
                >
                  {item.activated ? (
                    <>
                      <Check className="w-4 h-4 stroke-[3]" />
                      <span>Offre activée</span>
                    </>
                  ) : (
                    <span>Activer l'offre</span>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
