import React, { useState } from 'react';
import { NavigationTab, Transaction } from '../types';
import { downloadProjectCode } from '../utils/downloadProjectCode';
import {
  Send,
  Users,
  FileText,
  MoreHorizontal,
  ChevronRight,
  Settings,
  Bell,
  Calendar,
  Smartphone,
  ShieldCheck,
  Shield,
  CreditCard,
  Building2,
  Home,
  List,
  Wallet,
  HelpCircle,
  Code,
  Loader2,
} from 'lucide-react';

interface MobileDashboardViewProps {
  balanceUSD: number;
  transactions: Transaction[];
  onSelectTab: (tab: NavigationTab) => void;
  onOpenTransaction: (tx: Transaction) => void;
  onOpenAddPayment: () => void;
  onShowToast: (msg: string) => void;
  onQuickSend: () => void;
}

export const MobileDashboardView: React.FC<MobileDashboardViewProps> = ({
  balanceUSD,
  transactions,
  onSelectTab,
  onOpenTransaction,
  onOpenAddPayment,
  onShowToast,
  onQuickSend,
}) => {
  const recentTransactions = transactions.slice(0, 5);
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownloadCode = async () => {
    try {
      setIsDownloading(true);
      onShowToast('Génération du code source (ZIP)...');
      await downloadProjectCode((status) => {
        onShowToast(status);
      });
    } catch (err) {
      console.error(err);
      onShowToast('Erreur lors du téléchargement du code.');
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto min-h-[calc(100vh-4rem)] bg-[#F5F7FA] flex flex-col shadow-2xl relative overflow-x-hidden border-x border-slate-200">
      {/* Mobile Top Bar */}
      <header className="bg-[#003087] text-white sticky top-0 z-30 shadow-md">
        <div className="px-4 py-3 flex items-center justify-between">
          {/* User Avatar & Brand */}
          <div className="flex items-center space-x-3">
            <button
              onClick={() => onShowToast('Profil utilisateur : Thomas Delaunay')}
              aria-label="Profil utilisateur"
              className="w-9 h-9 rounded-full bg-[#00457C] border border-blue-400/40 flex items-center justify-center text-white active:scale-95 transition-transform cursor-pointer"
              type="button"
            >
              <svg className="w-5 h-5 text-white/90" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
              </svg>
            </button>

            <div className="flex items-center space-x-1.5" data-purpose="brand-logo">
              <svg className="w-6 h-7" fill="none" viewBox="0 0 34 40" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M26.4 11.2C26.1 8 23.4 5.7 19.3 5.7H9.2C8.5 5.7 7.9 6.2 7.8 6.9L4 31.2C3.9 31.7 4.3 32.2 4.8 32.2H11.5L13.2 21.2C13.3 20.5 13.9 20 14.6 20H18C23.2 20 27.2 17.9 28 12.8C28.2 11.7 28 10.9 26.4 11.2Z"
                  fill="#0079C1"
                />
                <path
                  d="M22.5 16.3C21.8 20.3 18.7 22 14.6 22H11.7L9.9 33.3C9.8 33.9 10.2 34.4 10.8 34.4H16.8C17.4 34.4 17.9 33.9 18 33.3L19.4 24.3C19.5 23.7 20 23.3 20.6 23.3H21.5C25.7 23.3 29 21.6 29.8 16.6C30.2 14.1 29.3 12.3 27.6 11.3C26.8 15 23.8 16.3 22.5 16.3Z"
                  fill="#00457C"
                />
              </svg>
              <span className="text-xl font-bold tracking-tight text-white italic">PayPal</span>
            </div>
          </div>

          {/* Shortcuts */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => onShowToast('Vous avez 2 notifications non lues')}
              aria-label="Notifications"
              className="p-2 rounded-full hover:bg-white/10 active:bg-white/20 transition relative cursor-pointer"
              type="button"
            >
              <Bell className="w-5 h-5 text-white" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-400 rounded-full ring-2 ring-[#003087]" />
            </button>
            <button
              onClick={() => onShowToast('Paramètres de l\'application')}
              aria-label="Paramètres"
              className="p-2 rounded-full hover:bg-white/10 active:bg-white/20 transition cursor-pointer"
              type="button"
            >
              <Settings className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>
      </header>

      {/* Scrollable Content */}
      <main className="flex-1 overflow-y-auto px-4 pt-4 pb-24 space-y-4 no-scrollbar">
        {/* Hero Balance Card */}
        <section
          className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#00457C] to-[#0079C1] p-5 text-white shadow-md"
          data-purpose="hero-balance"
        >
          <div className="absolute -right-3 -bottom-5 opacity-15 pointer-events-none">
            <svg className="w-36 h-36" fill="currentColor" viewBox="0 0 34 40">
              <path d="M26.4 11.2C26.1 8 23.4 5.7 19.3 5.7H9.2C8.5 5.7 7.9 6.2 7.8 6.9L4 31.2C3.9 31.7 4.3 32.2 4.8 32.2H11.5L13.2 21.2C13.3 20.5 13.9 20 14.6 20H18C23.2 20 27.2 17.9 28 12.8C28.2 11.7 28 10.9 26.4 11.2Z" />
            </svg>
          </div>
          <div className="relative z-10 flex flex-col justify-between">
            <div>
              <span className="text-sm font-medium text-blue-100 tracking-wide">Solde PayPal</span>
              <div
                onClick={() => onSelectTab('portefeuille')}
                className="mt-1 flex items-baseline space-x-2 cursor-pointer"
              >
                <span className="text-3xl font-extrabold tracking-tight">
                  {balanceUSD.toFixed(2).replace('.', ',')} USD
                </span>
                <ChevronRight className="w-4 h-4 text-blue-200 stroke-2" />
              </div>
              <p className="text-xs text-blue-200 font-normal mt-0.5">Disponible</p>
            </div>

            <div className="mt-5">
              <button
                onClick={() => onSelectTab('envoyer-et-demander')}
                className="inline-flex items-center justify-center bg-white text-[#003087] font-semibold text-xs sm:text-sm px-5 py-2.5 rounded-full shadow-sm active:bg-blue-50 transition active:scale-[0.98] cursor-pointer"
                type="button"
              >
                Transférer de l'argent
              </button>
            </div>
          </div>
        </section>

        {/* Quick Actions Grid */}
        <section className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100" data-purpose="quick-actions">
          <div className="flex items-center justify-between px-1">
            <button
              onClick={onQuickSend}
              className="group flex flex-col items-center focus:outline-none cursor-pointer"
              type="button"
            >
              <div className="w-12 h-12 rounded-full bg-[#EBF3FB] group-active:bg-blue-100 flex items-center justify-center transition-transform active:scale-90">
                <Send className="w-6 h-6 text-[#0070BA] -rotate-45 -mr-0.5 mt-0.5" />
              </div>
              <span className="text-xs font-semibold text-slate-800 mt-2">Envoyer</span>
            </button>

            <button
              onClick={() => onSelectTab('envoyer-et-demander')}
              className="group flex flex-col items-center focus:outline-none cursor-pointer"
              type="button"
            >
              <div className="w-12 h-12 rounded-full bg-[#EBF3FB] group-active:bg-blue-100 flex items-center justify-center transition-transform active:scale-90">
                <Users className="w-6 h-6 text-[#0070BA]" />
              </div>
              <span className="text-xs font-semibold text-slate-800 mt-2">Demander</span>
            </button>

            <button
              onClick={() => onShowToast('Nouvelle facture prête à l\'envoi.')}
              className="group flex flex-col items-center focus:outline-none cursor-pointer"
              type="button"
            >
              <div className="w-12 h-12 rounded-full bg-[#EBF3FB] group-active:bg-blue-100 flex items-center justify-center transition-transform active:scale-90">
                <FileText className="w-6 h-6 text-[#0070BA]" />
              </div>
              <span className="text-xs font-semibold text-slate-800 mt-2">Facture</span>
            </button>

            <button
              onClick={() => onSelectTab('envoyer-et-demander')}
              className="group flex flex-col items-center focus:outline-none cursor-pointer"
              type="button"
            >
              <div className="w-12 h-12 rounded-full bg-[#EBF3FB] group-active:bg-blue-100 flex items-center justify-center transition-transform active:scale-90">
                <MoreHorizontal className="w-6 h-6 text-[#0070BA]" />
              </div>
              <span className="text-xs font-semibold text-slate-800 mt-2">Plus</span>
            </button>
          </div>
        </section>

        {/* Link Account Card Banner */}
        <section
          onClick={onOpenAddPayment}
          className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 flex items-start space-x-3.5 relative cursor-pointer"
          data-purpose="onboarding-link-card"
        >
          <div className="relative shrink-0">
            <div className="w-12 h-10 bg-gradient-to-tr from-[#00457C] to-[#0070BA] rounded-lg flex flex-col justify-between p-1.5 shadow-sm">
              <div className="w-3 h-1.5 bg-yellow-400 rounded-[2px] opacity-90" />
              <div className="w-6 h-1 bg-white/40 rounded-full" />
            </div>
            <span className="absolute -bottom-1 -right-1 w-5 h-5 bg-[#0070BA] text-white rounded-full flex items-center justify-center text-xs font-bold ring-2 ring-white">
              +
            </span>
          </div>

          <div className="flex-1 pr-4">
            <h3 className="text-sm font-bold text-slate-900 leading-tight">Associez une carte ou un compte bancaire</h3>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              Faites des achats, envoyez de l'argent et retirez vos fonds.
            </p>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onOpenAddPayment();
              }}
              className="mt-3 inline-block bg-[#0070BA] hover:bg-[#003087] text-white text-xs font-semibold px-4 py-1.5 rounded-full shadow-sm active:scale-95 transition cursor-pointer"
              type="button"
            >
              Associer un moyen de paiement
            </button>
          </div>

          <div className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400">
            <ChevronRight className="w-4 h-4 stroke-2" />
          </div>
        </section>

        {/* Payment Methods Section */}
        <section
          className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 space-y-3"
          data-purpose="payment-methods-card"
        >
          <h2 className="text-sm font-bold text-slate-900">Mes moyens de paiement</h2>
          <div
            onClick={() => onSelectTab('portefeuille')}
            className="flex items-center justify-between py-2 border-b border-slate-100 cursor-pointer"
          >
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-full bg-[#EBF3FB] flex items-center justify-center text-[#0070BA] font-bold italic text-sm">
                P
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900">Compte PayPal</p>
                <p className="text-[11px] text-slate-500">{balanceUSD.toFixed(2).replace('.', ',')} USD</p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </div>

          <button
            onClick={onOpenAddPayment}
            className="w-full flex items-center space-x-2.5 text-[#0070BA] font-semibold text-xs py-1 active:opacity-75 transition cursor-pointer text-left"
            type="button"
          >
            <span className="w-6 h-6 rounded-full bg-[#0070BA] text-white flex items-center justify-center text-sm font-bold">
              +
            </span>
            <span>Associer une carte ou un compte bancaire</span>
          </button>
        </section>

        {/* Recent Activity Feed */}
        <section
          className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100"
          data-purpose="recent-activity-section"
        >
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-sm font-bold text-slate-900">Activité récente</h2>
            <button
              onClick={() => onSelectTab('activite')}
              className="text-xs font-bold text-[#0070BA] hover:underline flex items-center cursor-pointer"
              type="button"
            >
              Tout voir
              <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
            </button>
          </div>

          <div className="divide-y divide-slate-100">
            {recentTransactions.map((tx) => {
              const isPositive = tx.amount > 0;
              return (
                <div
                  key={tx.id}
                  onClick={() => onOpenTransaction(tx)}
                  className="py-3 flex items-center justify-between cursor-pointer active:bg-slate-50 rounded-lg px-1 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center text-white shrink-0 shadow-sm ${
                        tx.name.includes('PayPal')
                          ? 'bg-[#0070BA]'
                          : tx.name.includes('Amazon')
                          ? 'bg-slate-900'
                          : tx.name.includes('Boutique')
                          ? 'bg-[#0070BA]'
                          : 'bg-[#512DA8]'
                      }`}
                    >
                      {tx.name.includes('PayPal') ? (
                        <span className="font-bold text-base italic">P</span>
                      ) : tx.name.includes('Amazon') ? (
                        <span className="font-bold text-sm">a</span>
                      ) : tx.name.includes('Boutique') ? (
                        <Building2 className="w-5 h-5" />
                      ) : (
                        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                        </svg>
                      )}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-900">{tx.name}</p>
                      <p className="text-[11px] text-slate-500">
                        {tx.category} · {tx.dateStr}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end shrink-0">
                    <span
                      className={`text-xs font-bold ${
                        tx.status === 'Sous séquestre'
                          ? 'text-slate-900'
                          : isPositive
                          ? 'text-[#107C41]'
                          : 'text-slate-900'
                      }`}
                    >
                      {isPositive ? '+' : '-'} {Math.abs(tx.amount).toFixed(2).replace('.', ',')} {tx.currency === 'EUR' ? '€' : 'USD'}
                    </span>
                    {tx.status === 'Sous séquestre' && (
                      <span className="mt-1 px-2 py-0.5 rounded-full text-[9px] font-bold bg-[#FCE8E6] text-[#A51D24] border border-[#FAD2CF]/60 inline-block">
                        Sous séquestre
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Useful Tools Section */}
        <section className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100" data-purpose="useful-tools">
          <h2 className="text-sm font-bold text-slate-900 mb-2">Outils utiles</h2>
          <div className="divide-y divide-slate-100">
            <button
              onClick={() => onSelectTab('portefeuille')}
              className="w-full py-3 flex items-center justify-between group text-left cursor-pointer"
              type="button"
            >
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-[#0070BA]">
                  <Calendar className="w-4 h-4" />
                </div>
                <span className="text-xs font-medium text-slate-800">Gérer les paiements récurrents</span>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </button>

            <button
              onClick={() => onShowToast('Application mobile prête à être installée')}
              className="w-full py-3 flex items-center justify-between group text-left cursor-pointer"
              type="button"
            >
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-[#0070BA]">
                  <Smartphone className="w-4 h-4" />
                </div>
                <span className="text-xs font-medium text-slate-800">Obtenir l'application PayPal</span>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </button>

            <button
              onClick={() => onSelectTab('aide')}
              className="w-full py-3 flex items-center justify-between group text-left cursor-pointer"
              type="button"
            >
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-[#0070BA]">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <span className="text-xs font-medium text-slate-800">Résoudre un problème</span>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </button>
          </div>
        </section>

        {/* Security Banner */}
        <section
          className="bg-[#F0F7FD] rounded-2xl p-4 border border-[#D0E5F5] flex items-start space-x-3"
          data-purpose="security-banner"
        >
          <div className="w-9 h-9 rounded-full bg-[#0070BA] text-white flex items-center justify-center shrink-0 shadow-sm mt-0.5">
            <Shield className="w-5 h-5 fill-current" />
          </div>
          <div className="flex-1">
            <h3 className="text-xs font-bold text-slate-900">PayPal, c'est plus de sécurité</h3>
            <p className="text-[11px] text-slate-600 mt-0.5 leading-snug">
              Vos informations sont protégées par notre système de sécurité.
            </p>
            <button
              onClick={() => onSelectTab('aide')}
              className="inline-flex items-center text-[11px] font-bold text-[#0070BA] hover:underline mt-1.5 cursor-pointer"
            >
              En savoir plus
              <ChevronRight className="w-3 h-3 ml-0.5" />
            </button>
          </div>
        </section>

        {/* Mobile footer legal links matching user's photo (Sécurité, Confidentialité, Code) */}
        <div className="pt-3 pb-6 text-center text-xs text-slate-500 space-y-2 border-t border-slate-200/60 mt-4">
          <div className="flex items-center justify-center gap-3 font-medium">
            <button
              onClick={() => onSelectTab('aide')}
              className="hover:underline hover:text-[#0070BA] cursor-pointer"
            >
              Sécurité
            </button>
            <span>•</span>
            <button
              onClick={() => onShowToast('Protection des données personnelles et confidentialité.')}
              className="hover:underline hover:text-[#0070BA] cursor-pointer"
            >
              Confidentialité
            </button>
            <span>•</span>
            <button
              onClick={handleDownloadCode}
              disabled={isDownloading}
              title="Télécharger le code source du projet (ZIP)"
              className="font-bold text-[#0070BA] hover:text-[#003087] hover:underline cursor-pointer inline-flex items-center gap-1"
            >
              {isDownloading ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <Code className="w-3.5 h-3.5" />
              )}
              <span>Code</span>
            </button>
          </div>
          <p className="text-[11px] text-slate-400">© 1999–2026 PayPal. Tous droits réservés.</p>
        </div>
      </main>

      {/* Bottom Navigation Bar */}
      <nav
        className="fixed bottom-0 max-w-md w-full bg-white/95 backdrop-blur-md border-t border-slate-200 z-40 pb-2 shadow-lg"
        data-purpose="bottom-nav-bar"
      >
        <div className="flex items-center justify-around py-1.5">
          <button
            onClick={() => onSelectTab('accueil')}
            className="flex flex-col items-center flex-1 py-1 text-[#0070BA] cursor-pointer"
            type="button"
          >
            <Home className="w-5 h-5" />
            <span className="text-[10px] font-bold mt-1">Accueil</span>
          </button>

          <button
            onClick={() => onSelectTab('activite')}
            className="flex flex-col items-center flex-1 py-1 text-slate-500 hover:text-slate-800 active:scale-95 transition cursor-pointer"
            type="button"
          >
            <List className="w-5 h-5" />
            <span className="text-[10px] font-medium mt-1">Activité</span>
          </button>

          <button
            onClick={() => onSelectTab('envoyer-et-demander')}
            className="flex flex-col items-center flex-1 py-1 text-slate-500 hover:text-slate-800 active:scale-95 transition cursor-pointer"
            type="button"
          >
            <Send className="w-5 h-5" />
            <span className="text-[10px] font-medium mt-1">Paiements</span>
          </button>

          <button
            onClick={() => onSelectTab('portefeuille')}
            className="flex flex-col items-center flex-1 py-1 text-slate-500 hover:text-slate-800 active:scale-95 transition cursor-pointer"
            type="button"
          >
            <Wallet className="w-5 h-5" />
            <span className="text-[10px] font-medium mt-1">Portefeuille</span>
          </button>

          <button
            onClick={() => onSelectTab('aide')}
            className="flex flex-col items-center flex-1 py-1 text-slate-500 hover:text-slate-800 active:scale-95 transition cursor-pointer"
            type="button"
          >
            <HelpCircle className="w-5 h-5" />
            <span className="text-[10px] font-medium mt-1">Aide</span>
          </button>
        </div>
      </nav>
    </div>
  );
};
