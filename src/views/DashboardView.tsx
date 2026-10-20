import React from 'react';
import { NavigationTab, Transaction, PaymentMethod } from '../types';
import {
  Send,
  Users,
  FileText,
  MoreHorizontal,
  ChevronRight,
  Plus,
  Calendar,
  Smartphone,
  ShieldCheck,
  Shield,
  CreditCard,
  Building2,
  Lock,
} from 'lucide-react';

interface DashboardViewProps {
  balanceUSD: number;
  transactions: Transaction[];
  paymentMethods: PaymentMethod[];
  onSelectTab: (tab: NavigationTab) => void;
  onOpenTransaction: (tx: Transaction) => void;
  onOpenAddPayment: () => void;
  onShowToast: (msg: string) => void;
  onQuickSend: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  balanceUSD,
  transactions,
  paymentMethods,
  onSelectTab,
  onOpenTransaction,
  onOpenAddPayment,
  onShowToast,
  onQuickSend,
}) => {
  // Recent transactions to show on dashboard (5 items)
  const recentTransactions = transactions.slice(0, 5);

  return (
    <main className="flex-grow max-w-[1440px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Secondary Navigation Sidebar (~16% desktop) */}
        <aside
          aria-label="Menu latéral secondaire"
          className="hidden lg:block lg:col-span-2 space-y-1"
          data-purpose="sidebar-nav"
        >
          <nav className="flex flex-col space-y-1">
            <button
              onClick={() => onSelectTab('accueil')}
              className="flex items-center space-x-3 px-4 py-3 rounded-2xl bg-[#EBF5FA] text-[#0070BA] font-semibold text-sm transition-colors text-left w-full cursor-pointer"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
              </svg>
              <span>Accueil</span>
            </button>

            <button
              onClick={() => onSelectTab('activite')}
              className="flex items-center space-x-3 px-4 py-3 rounded-2xl text-gray-700 hover:bg-gray-100 hover:text-gray-900 font-medium text-sm transition-colors text-left w-full cursor-pointer"
            >
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M4 6h16M4 10h16M4 14h16M4 18h16" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
              </svg>
              <span>Activité</span>
            </button>

            <button
              onClick={() => onSelectTab('envoyer-et-demander')}
              className="flex items-center space-x-3 px-4 py-3 rounded-2xl text-gray-700 hover:bg-gray-100 hover:text-gray-900 font-medium text-sm transition-colors text-left w-full cursor-pointer"
            >
              <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
              </svg>
              <span>Envoyer et demander</span>
            </button>

            <button
              onClick={() => onSelectTab('portefeuille')}
              className="flex items-center space-x-3 px-4 py-3 rounded-2xl text-gray-700 hover:bg-gray-100 hover:text-gray-900 font-medium text-sm transition-colors text-left w-full cursor-pointer"
            >
              <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M21 18v1c0 1.1-.9 2-2 2H5c-1.11 0-2-.9-2-2V5c0-1.1.89-2 2-2h14c1.1 0 2 .9 2 2v1h-9c-1.11 0-2 .9-2 2v8c0 1.1.89 2 2 2h9zm-9-2h10V8H12v8zm4-2.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" />
              </svg>
              <span>Portefeuille</span>
            </button>

            <button
              onClick={() => onSelectTab('offres')}
              className="flex items-center space-x-3 px-4 py-3 rounded-2xl text-gray-700 hover:bg-gray-100 hover:text-gray-900 font-medium text-sm transition-colors text-left w-full cursor-pointer"
            >
              <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M21.41 11.58l-9-9C12.05 2.22 11.55 2 11 2H4c-1.1 0-2 .9-2 2v7c0 .55.22 1.05.59 1.42l9 9c.36.36.86.58 1.41.58.55 0 1.05-.22 1.41-.59l7-7c.37-.36.59-.86.59-1.41 0-.55-.23-1.06-.59-1.42zM5.5 7C4.67 7 4 6.33 4 5.5S4.67 4 5.5 4 7 4.67 7 5.5 6.33 7 5.5 7z" />
              </svg>
              <span>Offres</span>
            </button>

            <button
              onClick={() => onSelectTab('aide')}
              className="flex items-center space-x-3 px-4 py-3 rounded-2xl text-gray-700 hover:bg-gray-100 hover:text-gray-900 font-medium text-sm transition-colors text-left w-full cursor-pointer"
            >
              <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 16h-2v-2h2v2zm1.07-7.75l-.9.92C12.45 11.9 12 12.5 12 14h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H7c0-2.76 2.24-5 5-5s5 2.24 5 5c0 1.04-.42 1.99-1.07 2.75z" />
              </svg>
              <span>Aide</span>
            </button>
          </nav>
        </aside>

        {/* Center Main Financial Column (~54% desktop) */}
        <section className="lg:col-span-6 space-y-6" data-purpose="central-financial-dashboard">
          {/* 1. Hero Balance Card with Gradient & Monogram Watermark */}
          <article
            className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#00457C] to-[#0079C1] p-6 text-white shadow-sm"
            data-purpose="paypal-balance-card"
          >
            {/* Background Monogram Watermark */}
            <div aria-hidden="true" className="absolute -right-2 -top-2 opacity-20 pointer-events-none">
              <svg className="w-36 h-36 fill-white" viewBox="0 0 32 32">
                <path d="M26.2 9.4c-.4 2.6-1.8 7.3-5.2 9.5-2.2 1.4-4.8 1.4-6.3 1.4h-2.1l-1.3 8.3H6.8l4.4-27.4h8.3c4 0 6.6.6 7.4 3.7.3 1.3.1 3-.7 4.5z" />
              </svg>
            </div>

            {/* Balance Info */}
            <div className="relative z-10">
              <h2 className="text-sm font-medium text-blue-100">Solde PayPal</h2>
              <button
                onClick={() => onSelectTab('portefeuille')}
                className="inline-flex items-center space-x-2 mt-2 group focus:outline-none text-left cursor-pointer"
              >
                <span className="text-4xl font-bold tracking-tight">
                  {balanceUSD.toFixed(2).replace('.', ',')} USD
                </span>
                <ChevronRight className="w-6 h-6 text-white/80 group-hover:translate-x-1 transition-transform" />
              </button>
              <p className="text-sm text-blue-100 mt-1 mb-6">Disponible</p>

              {/* Action Button */}
              <div>
                <button
                  onClick={() => onSelectTab('envoyer-et-demander')}
                  className="inline-block bg-white text-[#00457C] font-semibold text-sm px-6 py-2.5 rounded-full hover:bg-gray-100 transition-colors shadow-sm focus:ring-2 focus:ring-white focus:outline-none cursor-pointer"
                >
                  Transférer de l'argent
                </button>
              </div>
            </div>
          </article>

          {/* 2. Onboarding / Link Payment Banner */}
          <article
            onClick={onOpenAddPayment}
            className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:border-gray-200 transition-colors flex items-center justify-between group cursor-pointer"
            data-purpose="link-card-banner"
          >
            <div className="flex items-start sm:items-center space-x-4">
              {/* Card Icon with Plus Badge */}
              <div className="relative shrink-0">
                <div className="w-14 h-10 bg-[#0070BA] rounded-md flex items-center justify-center text-white shadow-inner">
                  <div className="w-8 h-1 bg-white/40 rounded-full mb-1" />
                </div>
                <div className="absolute -bottom-1 -right-1 bg-blue-700 rounded-full p-0.5 border-2 border-white text-white">
                  <Plus className="w-3.5 h-3.5" />
                </div>
              </div>

              {/* Descriptive Text and Button */}
              <div className="flex flex-col">
                <h3 className="font-bold text-gray-900 text-sm sm:text-base leading-tight">
                  Associez une carte ou un compte bancaire
                </h3>
                <p className="text-xs sm:text-sm text-gray-500 mt-0.5 mb-3 leading-snug">
                  Faites des achats, envoyez de l'argent et retirez vos fonds.
                </p>
                <div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenAddPayment();
                    }}
                    className="bg-[#0070BA] hover:bg-[#005ea6] text-white font-medium text-xs sm:text-sm px-5 py-2 rounded-full transition-colors cursor-pointer"
                    type="button"
                  >
                    Associer un moyen de paiement
                  </button>
                </div>
              </div>
            </div>

            {/* Chevron Right */}
            <div className="text-gray-400 group-hover:text-gray-600 group-hover:translate-x-0.5 transition-all hidden sm:block">
              <ChevronRight className="w-5 h-5" />
            </div>
          </article>

          {/* 3. Recent Activity Section */}
          <article
            className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm"
            data-purpose="recent-activity-feed"
          >
            {/* Section Header */}
            <div className="flex items-center justify-between pb-4 border-b border-gray-100">
              <h2 className="text-lg font-bold text-gray-900">Activité récente</h2>
              <button
                onClick={() => onSelectTab('activite')}
                className="text-sm font-semibold text-[#0070BA] hover:underline flex items-center space-x-1 cursor-pointer"
              >
                <span>Tout voir</span>
                <ChevronRight className="w-4 h-4 inline" />
              </button>
            </div>

            {/* Transaction List */}
            <ul className="divide-y divide-gray-100" role="list">
              {recentTransactions.map((tx) => {
                const isPositive = tx.amount > 0;
                return (
                  <li
                    key={tx.id}
                    onClick={() => onOpenTransaction(tx)}
                    className="py-4 flex items-center justify-between hover:bg-gray-50/50 -mx-3 px-3 rounded-xl transition-colors cursor-pointer"
                  >
                    <div className="flex items-center space-x-3.5">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-base shrink-0 ${
                          tx.name.includes('PayPal')
                            ? 'bg-[#0070BA]'
                            : tx.name.includes('Amazon')
                            ? 'bg-black'
                            : tx.name.includes('Boutique')
                            ? 'bg-[#0070BA]'
                            : 'bg-[#5856D6]'
                        }`}
                      >
                        {tx.name.includes('PayPal') ? (
                          <span className="italic font-serif">P</span>
                        ) : tx.name.includes('Amazon') ? (
                          <span className="text-lg lowercase font-serif">a</span>
                        ) : tx.name.includes('Boutique') ? (
                          <Building2 className="w-5 h-5" />
                        ) : (
                          <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                          </svg>
                        )}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 text-sm sm:text-base">{tx.name}</p>
                        <p className="text-xs sm:text-sm text-gray-500">
                          {tx.category} · {tx.dateStr}
                        </p>
                      </div>
                    </div>
                    <div className="text-right flex flex-col items-end">
                      <span
                        className={`font-semibold text-sm sm:text-base ${
                          tx.status === 'Sous séquestre'
                            ? 'text-slate-900'
                            : isPositive
                            ? 'text-[#107C41]'
                            : 'text-gray-900'
                        }`}
                      >
                        {isPositive ? '+' : '-'} {Math.abs(tx.amount).toFixed(2).replace('.', ',')} {tx.currency === 'EUR' ? '€' : 'USD'}
                      </span>
                      {tx.status === 'Sous séquestre' && (
                        <span className="mt-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#FCE8E6] text-[#A51D24] border border-[#FAD2CF]/60 inline-block">
                          Sous séquestre
                        </span>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>
          </article>
        </section>

        {/* Right Sidebar Column (~30% desktop) */}
        <section className="lg:col-span-4 space-y-6" data-purpose="quick-actions-and-services">
          {/* 1. Quick Actions: Envoyer de l'argent */}
          <article className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm" data-purpose="quick-actions">
            <h2 className="text-base font-bold text-gray-900 mb-4">Envoyer de l'argent</h2>
            <div className="grid grid-cols-4 gap-2 text-center">
              {/* Send Button */}
              <button
                onClick={onQuickSend}
                className="flex flex-col items-center group cursor-pointer focus:outline-none"
              >
                <div className="w-13 h-13 p-3.5 rounded-full bg-[#EBF5FA] group-hover:bg-[#d8eefc] text-[#0070BA] transition-colors flex items-center justify-center mb-2">
                  <Send className="w-6 h-6 -rotate-12 translate-x-0.5" />
                </div>
                <span className="text-xs font-semibold text-gray-800">Envoyer</span>
              </button>

              {/* Request Button */}
              <button
                onClick={() => onSelectTab('envoyer-et-demander')}
                className="flex flex-col items-center group cursor-pointer focus:outline-none"
              >
                <div className="w-13 h-13 p-3.5 rounded-full bg-[#EBF5FA] group-hover:bg-[#d8eefc] text-[#0070BA] transition-colors flex items-center justify-center mb-2">
                  <Users className="w-6 h-6" />
                </div>
                <span className="text-xs font-semibold text-gray-800">Demander</span>
              </button>

              {/* Invoice Button */}
              <button
                onClick={() => onShowToast('Création de facture professionnelle disponible.')}
                className="flex flex-col items-center group cursor-pointer focus:outline-none"
              >
                <div className="w-13 h-13 p-3.5 rounded-full bg-[#EBF5FA] group-hover:bg-[#d8eefc] text-[#0070BA] transition-colors flex items-center justify-center mb-2">
                  <FileText className="w-6 h-6" />
                </div>
                <span className="text-xs font-semibold text-gray-800">Facture</span>
              </button>

              {/* More Options Button */}
              <button
                onClick={() => onSelectTab('envoyer-et-demander')}
                className="flex flex-col items-center group cursor-pointer focus:outline-none"
              >
                <div className="w-13 h-13 p-3.5 rounded-full bg-[#EBF5FA] group-hover:bg-[#d8eefc] text-[#0070BA] transition-colors flex items-center justify-center mb-2">
                  <MoreHorizontal className="w-6 h-6" />
                </div>
                <span className="text-xs font-semibold text-gray-800">Plus</span>
              </button>
            </div>
          </article>

          {/* 2. Mes moyens de paiement */}
          <article className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm" data-purpose="payment-methods">
            <h2 className="text-base font-bold text-gray-900 mb-4">Mes moyens de paiement</h2>
            <div className="space-y-4">
              {/* Account balance summary item */}
              <button
                onClick={() => onSelectTab('portefeuille')}
                className="w-full flex items-center justify-between p-2 -mx-2 rounded-xl hover:bg-gray-50 transition-colors group text-left cursor-pointer"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-7 bg-[#0070BA] rounded flex items-center justify-center text-white shrink-0">
                    <span className="text-xs font-bold italic">P</span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900 leading-tight">Compte PayPal</p>
                    <p className="text-xs text-gray-500">{balanceUSD.toFixed(2).replace('.', ',')} USD</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors" />
              </button>

              {/* Action: Add Card or Bank Account */}
              <button
                onClick={onOpenAddPayment}
                className="flex items-center space-x-3 pt-2 text-[#0070BA] hover:text-[#005ea6] group font-semibold text-xs sm:text-sm text-left w-full cursor-pointer"
              >
                <div className="w-6 h-6 rounded-full bg-[#0070BA] text-white flex items-center justify-center shrink-0 group-hover:bg-[#005ea6] transition-colors">
                  <Plus className="w-4 h-4" />
                </div>
                <span>Associer une carte ou un compte bancaire</span>
              </button>
            </div>
          </article>

          {/* 3. Outils utiles */}
          <article className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm" data-purpose="useful-tools">
            <h2 className="text-base font-bold text-gray-900 mb-2">Outils utiles</h2>
            <ul className="divide-y divide-gray-100" role="list">
              <li>
                <button
                  onClick={() => onSelectTab('portefeuille')}
                  className="w-full py-3.5 flex items-center justify-between hover:text-[#0070BA] group transition-colors text-left cursor-pointer"
                >
                  <div className="flex items-center space-x-3 text-gray-800 group-hover:text-[#0070BA]">
                    <Calendar className="w-5 h-5 text-[#0070BA] shrink-0" />
                    <span className="text-xs sm:text-sm font-medium">Gérer les paiements récurrents</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-[#0070BA] group-hover:translate-x-0.5 transition-all" />
                </button>
              </li>
              <li>
                <button
                  onClick={() => onShowToast('Scannez le QR code pour télécharger l\'application mobile.')}
                  className="w-full py-3.5 flex items-center justify-between hover:text-[#0070BA] group transition-colors text-left cursor-pointer"
                >
                  <div className="flex items-center space-x-3 text-gray-800 group-hover:text-[#0070BA]">
                    <Smartphone className="w-5 h-5 text-[#0070BA] shrink-0" />
                    <span className="text-xs sm:text-sm font-medium">Obtenir l'application PayPal</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-[#0070BA] group-hover:translate-x-0.5 transition-all" />
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('aide')}
                  className="w-full py-3.5 flex items-center justify-between hover:text-[#0070BA] group transition-colors text-left cursor-pointer"
                >
                  <div className="flex items-center space-x-3 text-gray-800 group-hover:text-[#0070BA]">
                    <ShieldCheck className="w-5 h-5 text-[#0070BA] shrink-0" />
                    <span className="text-xs sm:text-sm font-medium">Résoudre un problème</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-[#0070BA] group-hover:translate-x-0.5 transition-all" />
                </button>
              </li>
            </ul>
          </article>

          {/* 4. Security & Trust Widget */}
          <article
            className="bg-[#EBF5FA] rounded-2xl p-6 border border-blue-100 flex items-start space-x-4"
            data-purpose="security-guarantee-card"
          >
            <div className="text-[#0070BA] shrink-0 mt-0.5">
              <Shield className="w-8 h-8 fill-current" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 text-sm sm:text-base leading-snug">
                PayPal, c'est plus de sécurité
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 mt-1 leading-relaxed">
                Vos informations sont protégées par notre système de sécurité.
              </p>
              <button
                onClick={() => onSelectTab('aide')}
                className="inline-flex items-center space-x-1 text-[#0070BA] hover:underline font-semibold text-xs sm:text-sm mt-2.5 cursor-pointer"
              >
                <span>En savoir plus</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </article>
        </section>
      </div>
    </main>
  );
};
