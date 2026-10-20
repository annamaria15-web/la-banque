import React, { useState, useMemo } from 'react';
import { NavigationTab, Transaction } from '../types';
import {
  Search,
  X,
  FileDown,
  FileText,
  Calendar,
  TrendingUp,
  TrendingDown,
  ArrowDownLeft,
  ArrowUpRight,
  Shield,
  Download,
  Store,
  Headphones,
  ShoppingBag,
  User,
  RotateCcw,
  CreditCard,
  Utensils,
  CheckCircle,
  Clock,
  ChevronDown,
  BarChart3,
  Layers,
  ArrowLeftRight,
} from 'lucide-react';

interface ActivityViewProps {
  transactions: Transaction[];
  onSelectTab: (tab: NavigationTab) => void;
  onOpenTransaction: (tx: Transaction) => void;
  onShowToast: (msg: string) => void;
}

export const ActivityView: React.FC<ActivityViewProps> = ({
  transactions,
  onSelectTab,
  onOpenTransaction,
  onShowToast,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPeriod, setSelectedPeriod] = useState<'90d' | 'year' | 'custom'>('90d');
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'received' | 'sent' | 'refund' | 'subscription'>('all');
  const [showExportMenu, setShowExportMenu] = useState(false);

  // Filter transactions based on query & category
  const filteredTransactions = useMemo(() => {
    return transactions.filter((tx) => {
      const matchesSearch =
        tx.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tx.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tx.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tx.amount.toString().includes(searchQuery);

      const matchesType =
        selectedFilter === 'all' ? true : tx.type === selectedFilter;

      return matchesSearch && matchesType;
    });
  }, [transactions, searchQuery, selectedFilter]);

  // Group transactions by dateGroup
  const groups = useMemo(() => {
    const map = new Map<string, Transaction[]>();
    filteredTransactions.forEach((tx) => {
      const key = `${tx.dateGroup} • ${tx.dateStr}`;
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(tx);
    });
    return Array.from(map.entries());
  }, [filteredTransactions]);

  const handleExport = (format: 'CSV' | 'PDF') => {
    setShowExportMenu(false);
    onShowToast(`Export ${format} généré avec succès. Téléchargement démarré.`);
  };

  const getTxIcon = (iconType: string) => {
    switch (iconType) {
      case 'store':
        return <Store className="w-5 h-5" />;
      case 'headphones':
        return <Headphones className="w-5 h-5 text-slate-700" />;
      case 'shopping':
        return <ShoppingBag className="w-5 h-5 text-slate-700" />;
      case 'person':
        return <User className="w-5 h-5 text-[#0070BA]" />;
      case 'refund':
        return <RotateCcw className="w-5 h-5 text-[#0070BA]" />;
      case 'restaurant':
        return <Utensils className="w-5 h-5 text-slate-700" />;
      default:
        return <CreditCard className="w-5 h-5 text-[#0070BA]" />;
    }
  };

  return (
    <div className="flex-1 w-full bg-[#f9f9ff] min-h-[calc(100vh-4rem)]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Sub-sidebar on desktop: Opérations bancaires */}
          <aside className="hidden lg:block lg:col-span-3 space-y-4">
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 px-3">
                Opérations bancaires
              </span>
              <nav className="mt-3 flex flex-col space-y-1">
                <button
                  onClick={() => onSelectTab('accueil')}
                  className="flex items-center space-x-3 px-3 py-2.5 rounded-xl text-slate-600 hover:bg-slate-50 font-medium text-xs text-left cursor-pointer transition-colors"
                >
                  <Layers className="w-4 h-4 text-slate-400" />
                  <span>Aperçu général</span>
                </button>
                <button
                  onClick={() => onSelectTab('envoyer-et-demander')}
                  className="flex items-center space-x-3 px-3 py-2.5 rounded-xl text-slate-600 hover:bg-slate-50 font-medium text-xs text-left cursor-pointer transition-colors"
                >
                  <ArrowLeftRight className="w-4 h-4 text-slate-400" />
                  <span>Virements & Transferts</span>
                </button>
                <button
                  onClick={() => onSelectTab('portefeuille')}
                  className="flex items-center space-x-3 px-3 py-2.5 rounded-xl text-slate-600 hover:bg-slate-50 font-medium text-xs text-left cursor-pointer transition-colors"
                >
                  <CreditCard className="w-4 h-4 text-slate-400" />
                  <span>Comptes et cartes</span>
                </button>
                <button
                  className="flex items-center space-x-3 px-3 py-2.5 rounded-xl bg-[#EBF5FA] text-[#0070BA] font-bold text-xs text-left cursor-pointer"
                >
                  <FileText className="w-4 h-4 text-[#0070BA]" />
                  <span>Historique complet</span>
                </button>
                <button
                  onClick={() => onShowToast('Analyses avancées des dépenses du compte.')}
                  className="flex items-center space-x-3 px-3 py-2.5 rounded-xl text-slate-600 hover:bg-slate-50 font-medium text-xs text-left cursor-pointer transition-colors"
                >
                  <BarChart3 className="w-4 h-4 text-slate-400" />
                  <span>Analyses des dépenses</span>
                </button>
              </nav>

              <div className="mt-4 p-3 rounded-xl bg-slate-50 border border-slate-100">
                <div className="flex items-center space-x-2 text-[#107C41] text-xs font-semibold mb-1">
                  <Shield className="w-4 h-4" />
                  <span>Protection bancaire</span>
                </div>
                <p className="text-[11px] text-slate-500 leading-snug">
                  Vos transactions sont sécurisées et chiffrées de bout en bout.
                </p>
              </div>
            </div>
          </aside>

          {/* Main Activity Area (9 cols on lg) */}
          <div className="lg:col-span-9 space-y-6">
            {/* Header: Title and Export Controls */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <div className="flex items-center gap-1.5 text-[#0070BA] text-xs font-semibold uppercase tracking-wider mb-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Historique bancaire consolidé</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-[#001d59] tracking-tight">
                  Activité du compte
                </h1>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  Consultez l'historique complet de vos transferts, paiements et souscriptions.
                </p>
              </div>

              {/* Action Buttons: Monthly Statements & Download Activity */}
              <div className="flex items-center gap-2 self-start md:self-auto">
                <button
                  onClick={() => onShowToast('Relevé mensuel d\'octobre 2024 prêt à l\'affichage.')}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-slate-200/80 hover:bg-slate-300 text-[#001d59] text-xs font-bold transition-all shadow-xs cursor-pointer"
                  type="button"
                >
                  <FileText className="w-4 h-4" />
                  <span>Relevés mensuels</span>
                </button>

                <div className="relative">
                  <button
                    onClick={() => setShowExportMenu(!showExportMenu)}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#0070BA] hover:bg-[#005ea6] text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
                    type="button"
                  >
                    <Download className="w-4 h-4" />
                    <span>Télécharger l'activité</span>
                    <ChevronDown className="w-3.5 h-3.5 ml-0.5" />
                  </button>

                  {/* Dropdown Menu */}
                  {showExportMenu && (
                    <div className="absolute right-0 mt-2 w-64 rounded-xl bg-white shadow-xl z-30 p-2 border border-slate-100 animate-in fade-in duration-150">
                      <button
                        onClick={() => handleExport('CSV')}
                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-slate-50 text-left text-xs transition-colors cursor-pointer"
                      >
                        <FileText className="w-5 h-5 text-[#0070BA]" />
                        <div>
                          <p className="font-bold text-slate-800">Format CSV / Excel</p>
                          <p className="text-[11px] text-slate-400">Données brutes de transactions</p>
                        </div>
                      </button>
                      <button
                        onClick={() => handleExport('PDF')}
                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-slate-50 text-left text-xs transition-colors cursor-pointer mt-1"
                      >
                        <FileDown className="w-5 h-5 text-red-500" />
                        <div>
                          <p className="font-bold text-slate-800">Rapport PDF certifié</p>
                          <p className="text-[11px] text-slate-400">Relevé avec entête légal</p>
                        </div>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Financial Metrics Summary (3 cards) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Total Rentrées */}
              <div className="rounded-2xl bg-white p-5 shadow-sm border border-slate-100 flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Total des rentrées
                  </span>
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-[#107C41]">
                    <ArrowDownLeft className="w-4 h-4" />
                  </div>
                </div>
                <div className="mt-4">
                  <div className="text-2xl sm:text-3xl font-extrabold text-[#107C41] tracking-tight">
                    +1 450,00 $
                  </div>
                  <div className="flex items-center gap-1 text-slate-500 text-xs mt-1">
                    <TrendingUp className="w-3.5 h-3.5 text-[#107C41]" />
                    <span className="font-bold text-[#107C41]">+18.4%</span>
                    <span>vs mois précédent</span>
                  </div>
                </div>
              </div>

              {/* Total Dépenses */}
              <div className="rounded-2xl bg-white p-5 shadow-sm border border-slate-100 flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Total des dépenses
                  </span>
                  <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-800">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>
                <div className="mt-4">
                  <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                    -620,80 $
                  </div>
                  <div className="flex items-center gap-1 text-slate-500 text-xs mt-1">
                    <TrendingDown className="w-3.5 h-3.5 text-red-500" />
                    <span className="font-bold text-red-500">-5.2%</span>
                    <span>dépensé de moins</span>
                  </div>
                </div>
              </div>

              {/* Solde Net Généré & Sparkline */}
              <div className="rounded-2xl bg-gradient-to-br from-[#003087] to-[#0070BA] text-white p-5 shadow-md flex flex-col justify-between relative overflow-hidden">
                <div className="flex items-center justify-between relative z-10">
                  <span className="text-xs font-semibold uppercase tracking-wider text-blue-200">
                    Solde net généré
                  </span>
                  <BarChart3 className="w-5 h-5 text-blue-200" />
                </div>
                <div className="flex items-baseline justify-between mt-3 relative z-10">
                  <div>
                    <div className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                      +829,20 $
                    </div>
                    <p className="text-xs text-blue-100 mt-0.5">Flux monétaire net (octobre)</p>
                  </div>
                  {/* Vector Sparkline */}
                  <div className="w-24 h-10 opacity-95">
                    <svg className="w-full h-full overflow-visible" fill="none" viewBox="0 0 100 40">
                      <path
                        d="M 0 35 Q 20 28, 40 32 T 70 12 T 100 5"
                        fill="none"
                        stroke="#7ffc97"
                        strokeLinecap="round"
                        strokeWidth="3"
                      />
                      <circle cx="100" cy="5" fill="#ffffff" r="4" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Search Bar & Period Selector & Filter Chips */}
            <div className="rounded-2xl bg-white p-5 shadow-sm border border-slate-100 space-y-4">
              <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-3 justify-between">
                {/* Search Input */}
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Rechercher par nom, commerçant, montant ou e-mail..."
                    className="w-full pl-11 pr-10 py-2.5 rounded-full bg-slate-50 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#0070BA] transition-all"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>

                {/* Period Selector Pills */}
                <div className="flex items-center bg-slate-100 rounded-full p-1 text-xs font-semibold self-start sm:self-auto">
                  <button
                    onClick={() => {
                      setSelectedPeriod('90d');
                      onShowToast('Affichage des 90 derniers jours');
                    }}
                    className={`px-3.5 py-1.5 rounded-full transition-all cursor-pointer ${
                      selectedPeriod === '90d'
                        ? 'bg-white text-[#003087] shadow-xs font-bold'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    90 derniers jours
                  </button>
                  <button
                    onClick={() => {
                      setSelectedPeriod('year');
                      onShowToast('Affichage des transactions de cette année');
                    }}
                    className={`px-3.5 py-1.5 rounded-full transition-all cursor-pointer ${
                      selectedPeriod === 'year'
                        ? 'bg-white text-[#003087] shadow-xs font-bold'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Cette année
                  </button>
                  <button
                    onClick={() => {
                      setSelectedPeriod('custom');
                      onShowToast('Sélecteur de période personnalisée ouvert');
                    }}
                    className={`px-3.5 py-1.5 rounded-full transition-all flex items-center gap-1 cursor-pointer ${
                      selectedPeriod === 'custom'
                        ? 'bg-white text-[#003087] shadow-xs font-bold'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Personnalisée</span>
                  </button>
                </div>
              </div>

              {/* Fast Category Filter Chips */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar text-xs font-semibold">
                <button
                  onClick={() => setSelectedFilter('all')}
                  className={`px-4 py-1.5 rounded-full whitespace-nowrap transition-all cursor-pointer ${
                    selectedFilter === 'all'
                      ? 'bg-[#003087] text-white shadow-xs'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  Tous ({transactions.length})
                </button>
                <button
                  onClick={() => setSelectedFilter('received')}
                  className={`px-4 py-1.5 rounded-full whitespace-nowrap transition-all cursor-pointer ${
                    selectedFilter === 'received'
                      ? 'bg-[#003087] text-white shadow-xs'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  Paiements reçus
                </button>
                <button
                  onClick={() => setSelectedFilter('sent')}
                  className={`px-4 py-1.5 rounded-full whitespace-nowrap transition-all cursor-pointer ${
                    selectedFilter === 'sent'
                      ? 'bg-[#003087] text-white shadow-xs'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  Paiements envoyés
                </button>
                <button
                  onClick={() => setSelectedFilter('refund')}
                  className={`px-4 py-1.5 rounded-full whitespace-nowrap transition-all cursor-pointer ${
                    selectedFilter === 'refund'
                      ? 'bg-[#003087] text-white shadow-xs'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  Remboursements
                </button>
                <button
                  onClick={() => setSelectedFilter('subscription')}
                  className={`px-4 py-1.5 rounded-full whitespace-nowrap transition-all cursor-pointer ${
                    selectedFilter === 'subscription'
                      ? 'bg-[#003087] text-white shadow-xs'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  Abonnements
                </button>
              </div>
            </div>

            {/* Dual Column Layout: Transaction Feed (left 8) & Insight Panel (right 4) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Transaction List (8 cols) */}
              <div className="lg:col-span-8 space-y-4">
                {groups.length === 0 ? (
                  <div className="bg-white rounded-2xl p-8 text-center text-slate-500 border border-slate-100">
                    <p className="font-semibold text-slate-700">Aucune transaction trouvée</p>
                    <p className="text-xs mt-1">Essayez de modifier vos filtres ou vos termes de recherche.</p>
                  </div>
                ) : (
                  groups.map(([groupTitle, txList]) => (
                    <div key={groupTitle} className="space-y-2">
                      <div className="flex items-center justify-between px-2 pt-2">
                        <span className="text-xs font-bold text-[#001d59] tracking-tight">
                          {groupTitle}
                        </span>
                        <span className="text-xs text-slate-400">
                          {txList.length} mouvement{txList.length > 1 ? 's' : ''}
                        </span>
                      </div>

                      <div className="space-y-2">
                        {txList.map((tx) => {
                          const isPositive = tx.amount > 0;
                          return (
                            <div
                              key={tx.id}
                              onClick={() => onOpenTransaction(tx)}
                              className="group cursor-pointer rounded-2xl bg-white p-4 shadow-sm hover:shadow-md hover:bg-blue-50/20 transition-all flex items-center justify-between border border-slate-100"
                            >
                              <div className="flex items-center gap-3.5 min-w-0">
                                <div
                                  className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 shadow-xs ${
                                    isPositive
                                      ? 'bg-green-100 text-[#107C41]'
                                      : 'bg-slate-100 text-slate-700'
                                  }`}
                                >
                                  {getTxIcon(tx.iconType)}
                                </div>
                                <div className="min-w-0">
                                  <div className="flex items-center gap-2">
                                    <h4 className="font-bold text-sm text-slate-900 truncate group-hover:text-[#0070BA] transition-colors">
                                      {tx.name}
                                    </h4>
                                    <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-slate-100 text-slate-600">
                                      {tx.category}
                                    </span>
                                  </div>
                                  <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
                                    <span>{tx.timeStr || tx.dateStr}</span>
                                    <span>•</span>
                                    <span
                                      className={`flex items-center gap-1 font-medium ${
                                        tx.status === 'Terminé' ? 'text-[#107C41]' : 'text-amber-700'
                                      }`}
                                    >
                                      {tx.status === 'Terminé' ? (
                                        <CheckCircle className="w-3.5 h-3.5" />
                                      ) : (
                                        <Clock className="w-3.5 h-3.5" />
                                      )}
                                      <span>{tx.status}</span>
                                    </span>
                                  </div>
                                </div>
                              </div>

                              <div className="text-right shrink-0 flex flex-col items-end">
                                <div
                                  className={`font-bold text-sm sm:text-base tracking-tight ${
                                    tx.status === 'Sous séquestre'
                                      ? 'text-slate-900'
                                      : isPositive
                                      ? 'text-[#107C41]'
                                      : 'text-slate-900'
                                  }`}
                                >
                                  {isPositive ? '+' : '-'} {Math.abs(tx.amount).toFixed(2).replace('.', ',')} {tx.currency === 'EUR' ? '€' : '$'}
                                </div>
                                {tx.status === 'Sous séquestre' ? (
                                  <span className="mt-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#FCE8E6] text-[#A51D24] border border-[#FAD2CF]/60 inline-block">
                                    Sous séquestre
                                  </span>
                                ) : (
                                  <div className="text-[11px] text-slate-400">
                                    {isPositive ? 'Net crédité' : tx.paymentSource.slice(0, 18)}
                                  </div>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Sidebar Insights & Statistics (4 cols) */}
              <div className="lg:col-span-4 space-y-4">
                {/* Purchase Protection */}
                <div className="rounded-2xl bg-white p-5 shadow-sm border border-slate-100">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-[#0070BA]">
                      <Shield className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-sm text-[#001d59]">Protection des Achats</h3>
                      <span className="text-xs text-slate-500">Couverture éligible active</span>
                    </div>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Si un article éligible acheté n'arrive pas ou ne correspond pas du tout à sa description, nous vous remboursons intégralement.
                  </p>
                  <button
                    onClick={() => onSelectTab('aide')}
                    className="inline-flex items-center gap-1 mt-3 text-xs text-[#0070BA] font-bold hover:underline cursor-pointer"
                  >
                    <span>En savoir plus sur le gestionnaire de litiges</span>
                    <ChevronDown className="w-3.5 h-3.5 -rotate-90" />
                  </button>
                </div>

                {/* Spending by category */}
                <div className="rounded-2xl bg-white p-5 shadow-sm border border-slate-100">
                  <h3 className="font-bold text-sm text-[#001d59] mb-4">Dépenses par catégorie</h3>
                  <div className="space-y-4 text-xs">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-slate-700">Achats en ligne</span>
                        <span className="font-bold text-slate-900">348,20 $ (56%)</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                        <div className="h-full bg-[#0070BA] rounded-full" style={{ width: '56%' }} />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-slate-700">Restauration & sorties</span>
                        <span className="font-bold text-slate-900">182,10 $ (29%)</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                        <div className="h-full bg-[#63b0fe] rounded-full" style={{ width: '29%' }} />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-slate-700">Abonnements numériques</span>
                        <span className="font-bold text-slate-900">90,50 $ (15%)</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                        <div className="h-full bg-[#003087] rounded-full" style={{ width: '15%' }} />
                      </div>
                    </div>
                  </div>

                  <div className="mt-5 pt-3 border-t border-slate-100 bg-slate-50 p-3 rounded-xl flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-[#001d59]">Besoin d'un justificatif ?</div>
                      <div className="text-[11px] text-slate-500">Téléchargez un certificat fiscal annuel.</div>
                    </div>
                    <button
                      onClick={() => onShowToast('Génération du certificat fiscal annuel en cours...')}
                      className="p-2 rounded-full bg-white hover:bg-slate-100 text-[#0070BA] transition-colors shadow-xs cursor-pointer"
                      title="Obtenir le certificat"
                    >
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
