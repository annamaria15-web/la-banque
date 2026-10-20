import React, { useState } from 'react';
import { NavigationTab, ViewMode } from '../types';
import { Bell, Settings, User, Monitor, Smartphone, CheckCircle, ChevronDown, LogOut } from 'lucide-react';

interface HeaderProps {
  activeTab: NavigationTab;
  onSelectTab: (tab: NavigationTab) => void;
  viewMode: ViewMode;
  onToggleViewMode: (mode: ViewMode) => void;
  notificationCount: number;
  onClearNotifications: () => void;
  onShowToast: (msg: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  onSelectTab,
  viewMode,
  onToggleViewMode,
  notificationCount,
  onClearNotifications,
  onShowToast,
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const navItems: { id: NavigationTab; label: string }[] = [
    { id: 'accueil', label: 'Accueil' },
    { id: 'activite', label: 'Activité' },
    { id: 'envoyer-et-demander', label: 'Envoyer et demander' },
    { id: 'portefeuille', label: 'Portefeuille' },
    { id: 'offres', label: 'Offres' },
    { id: 'aide', label: 'Aide' },
  ];

  return (
    <header className="bg-[#003087] text-white sticky top-0 z-50 shadow-sm border-b border-[#002568]/40">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo and Primary Navigation */}
        <div className="flex items-center space-x-6 lg:space-x-8">
          {/* PayPal Logo */}
          <button
            onClick={() => onSelectTab('accueil')}
            aria-label="PayPal Accueil"
            className="flex items-center space-x-2 text-white hover:opacity-95 transition-opacity focus:outline-none"
          >
            <svg aria-hidden="true" className="w-8 h-8 fill-current text-white shrink-0" viewBox="0 0 32 32">
              <path
                d="M26.2 9.4c-.4 2.6-1.8 7.3-5.2 9.5-2.2 1.4-4.8 1.4-6.3 1.4h-2.1l-1.3 8.3H6.8l4.4-27.4h8.3c4 0 6.6.6 7.4 3.7.3 1.3.1 3-.7 4.5zm-5.3 1.8c.4-1.9-.7-3.4-3.5-3.4h-4.3l-1.8 11.2h3.2c3.4 0 5.8-.9 6.4-4.5.2-1.1.2-2.3 0-3.3z"
                fill="#0079C1"
              />
              <path
                d="M21.2 14.5c-.4 2.6-1.8 7.3-5.2 9.5-2.2 1.4-4.8 1.4-6.3 1.4h-2.1l-1.3 8.3H2.1l4.4-27.4h8.3c4 0 6.6.6 7.4 3.7.3 1.3.1 3-.7 4.5z"
                fill="#00457C"
                opacity="0.45"
              />
              <path
                d="M23.1 7.2c-.4 2.6-1.8 6.5-5.2 8.7-2.2 1.4-4.8 1.4-6.3 1.4H9.5l-1.4 8.7h4.2l.9-5.7h2.1c4 0 6.6-.6 7.4-3.7.3-1.3.1-3-.7-4.5-.4-1.8-1.5-3-3.9-3.9 2.5.5 4.5 1.7 5 5z"
                fill="#0079C1"
              />
              <path
                d="M9.5 0h7.9c3.9 0 6.4.6 7.2 3.6.4 1.4.2 3.2-.6 4.8-.4 2.6-1.8 6.5-5.2 8.7-2.2 1.4-4.8 1.4-6.3 1.4H9.5l-1.4 8.7H3.9L8.3 0h1.2z"
                fill="#FFFFFF"
              />
            </svg>
            <span className="font-bold text-2xl tracking-tight hidden sm:inline italic">PayPal</span>
          </button>

          {/* Desktop Navigation Tabs */}
          <nav aria-label="Navigation principale" className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onSelectTab(item.id)}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-150 cursor-pointer ${
                    isActive
                      ? 'bg-white text-[#003087] shadow-sm'
                      : 'text-white/90 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* User Account Controls & Mode Switcher */}
        <div className="flex items-center space-x-2 sm:space-x-4">
          {/* Device Frame View Toggle */}
          <div className="bg-[#002568] p-1 rounded-full flex items-center border border-white/10 text-xs">
            <button
              onClick={() => onToggleViewMode('desktop')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-full transition-all cursor-pointer ${
                viewMode === 'desktop'
                  ? 'bg-white text-[#003087] font-semibold shadow-xs'
                  : 'text-white/80 hover:text-white'
              }`}
              title="Affichage Web Bureau"
            >
              <Monitor className="w-3.5 h-3.5" />
              <span className="hidden xl:inline">Bureau</span>
            </button>
            <button
              onClick={() => onToggleViewMode('mobile')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-full transition-all cursor-pointer ${
                viewMode === 'mobile'
                  ? 'bg-white text-[#003087] font-semibold shadow-xs'
                  : 'text-white/80 hover:text-white'
              }`}
              title="Aperçu Application Mobile"
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span className="hidden xl:inline">Mobile</span>
            </button>
          </div>

          {/* Notification Bell */}
          <div className="relative">
            <button
              onClick={() => {
                setShowNotifications(!showNotifications);
                setShowUserMenu(false);
              }}
              aria-label="Notifications"
              className="p-2 text-white/90 hover:text-white hover:bg-white/10 rounded-full transition-colors relative cursor-pointer"
              type="button"
            >
              <Bell className="w-5 h-5" />
              {notificationCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-400 rounded-full ring-2 ring-[#003087]" />
              )}
            </button>

            {/* Notification Popover */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 sm:w-88 bg-white rounded-2xl shadow-xl text-slate-800 z-50 p-4 border border-slate-100 animate-in fade-in duration-150">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <h4 className="font-bold text-sm text-[#0C2340]">Notifications</h4>
                  {notificationCount > 0 && (
                    <button
                      onClick={onClearNotifications}
                      className="text-xs text-[#0070BA] hover:underline font-medium"
                    >
                      Tout marquer comme lu
                    </button>
                  )}
                </div>
                <div className="divide-y divide-slate-100 py-2 max-h-72 overflow-y-auto">
                  <div className="py-2.5 flex items-start space-x-3">
                    <span className="w-2 h-2 rounded-full bg-[#0070BA] mt-1.5 shrink-0" />
                    <div>
                      <p className="text-xs font-semibold text-slate-900">Paiement reçu de Studio Design Paris</p>
                      <p className="text-[11px] text-slate-500">+850,00 $ ont été crédités sur votre compte.</p>
                      <span className="text-[10px] text-slate-400">Aujourd'hui à 14:32</span>
                    </div>
                  </div>
                  <div className="py-2.5 flex items-start space-x-3">
                    <span className="w-2 h-2 rounded-full bg-[#107C41] mt-1.5 shrink-0" />
                    <div>
                      <p className="text-xs font-semibold text-slate-900">Protection des achats confirmée</p>
                      <p className="text-[11px] text-slate-500">Votre commande Amazon EU S.a.r.l. est couverte.</p>
                      <span className="text-[10px] text-slate-400">Hier à 19:40</span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setShowNotifications(false);
                    onSelectTab('activite');
                  }}
                  className="w-full mt-2 py-2 text-center text-xs text-[#0070BA] hover:bg-slate-50 rounded-lg font-semibold transition-colors"
                >
                  Voir toute l'activité
                </button>
              </div>
            )}
          </div>

          {/* Settings Button */}
          <button
            onClick={() => onShowToast('Paramètres du compte : profil, préférences et sécurité')}
            aria-label="Paramètres"
            className="p-2 text-white/90 hover:text-white hover:bg-white/10 rounded-full transition-colors cursor-pointer"
            type="button"
          >
            <Settings className="w-5 h-5" />
          </button>

          {/* User Profile Avatar with dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                setShowUserMenu(!showUserMenu);
                setShowNotifications(false);
              }}
              className="flex items-center space-x-1.5 p-1 rounded-full hover:bg-white/10 transition-colors cursor-pointer focus:outline-none"
            >
              <div className="w-8 h-8 rounded-full bg-[#00457C] border border-blue-400/40 flex items-center justify-center text-white text-xs font-bold">
                TD
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-white/80 hidden sm:block" />
            </button>

            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl text-slate-800 z-50 p-3 border border-slate-100 animate-in fade-in duration-150">
                <div className="px-3 py-2 border-b border-slate-100">
                  <p className="font-bold text-sm text-[#0C2340]">Thomas Delaunay</p>
                  <p className="text-xs text-slate-500">thomas.delaunay@example.com</p>
                  <span className="inline-flex items-center text-[10px] text-[#107C41] font-semibold mt-1 bg-green-50 px-2 py-0.5 rounded-full">
                    <CheckCircle className="w-3 h-3 mr-1 inline" />
                    Compte Vérifié
                  </span>
                </div>
                <div className="py-2 text-xs font-medium space-y-1">
                  <button
                    onClick={() => {
                      setShowUserMenu(false);
                      onSelectTab('portefeuille');
                    }}
                    className="w-full text-left px-3 py-2 hover:bg-slate-50 rounded-lg transition-colors"
                  >
                    Gérer mon portefeuille
                  </button>
                  <button
                    onClick={() => {
                      setShowUserMenu(false);
                      onSelectTab('aide');
                    }}
                    className="w-full text-left px-3 py-2 hover:bg-slate-50 rounded-lg transition-colors"
                  >
                    Centre d'aide et litiges
                  </button>
                </div>
                <div className="pt-2 border-t border-slate-100">
                  <button
                    onClick={() => {
                      setShowUserMenu(false);
                      onShowToast('Session sécurisée fermée');
                    }}
                    className="w-full flex items-center space-x-2 text-left px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors text-xs font-semibold"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Se déconnecter</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Quick Logout Link */}
          <button
            onClick={() => onShowToast('Déconnexion effectuée.')}
            className="hidden sm:inline-block text-sm font-semibold text-white/90 hover:text-white transition-colors pl-1 cursor-pointer"
          >
            Se déconnecter
          </button>
        </div>
      </div>
    </header>
  );
};
