import React, { useState } from 'react';
import { PaymentMethod } from '../types';
import {
  CreditCard,
  Plus,
  CheckCircle,
  Landmark,
  Shield,
  Lock,
  ChevronRight,
  Calendar,
  Star,
  Trash2,
  Sliders,
  Snowflake,
  Info,
  Layers,
  ArrowLeftRight,
  FileText,
  BarChart3,
  Gauge,
  Wifi,
} from 'lucide-react';

interface WalletViewProps {
  paymentMethods: PaymentMethod[];
  balanceUSD: number;
  balanceEUR: number;
  onOpenAddPayment: () => void;
  onShowToast: (msg: string) => void;
}

export const WalletView: React.FC<WalletViewProps> = ({
  paymentMethods,
  balanceUSD,
  balanceEUR,
  onOpenAddPayment,
  onShowToast,
}) => {
  const [selectedMethodId, setSelectedMethodId] = useState<string>('pm-1');

  // Automatic payment preferences
  const [prefOnline, setPrefOnline] = useState(true);
  const [prefSubscriptions, setPrefSubscriptions] = useState(true);
  const [prefBackup, setPrefBackup] = useState(false);

  // Security freeze state
  const [isFrozen, setIsFrozen] = useState(false);

  const selectedMethod =
    paymentMethods.find((p) => p.id === selectedMethodId) || paymentMethods[0];

  const handleToggleFreeze = () => {
    setIsFrozen(!isFrozen);
    onShowToast(
      isFrozen
        ? 'Carte déverrouillée : les débits sont de nouveau autorisés.'
        : 'Gel temporaire activé : les débits instantanés sont bloqués par mesure de sécurité.'
    );
  };

  const handleSetPreferred = (methodName: string) => {
    onShowToast(`${methodName} définie comme moyen de paiement préféré.`);
  };

  const handleUpdateExpiry = () => {
    onShowToast('Modification de la date d’expiration enregistrée.');
  };

  const handleDeleteMethod = (methodName: string) => {
    onShowToast(`Suppression demandée pour ${methodName}.`);
  };

  return (
    <div className="flex-1 w-full bg-[#f9f9ff] min-h-[calc(100vh-4rem)]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col lg:flex-row gap-6 w-full items-start">
          {/* Left Payment Methods Sidebar (w-80) */}
          <aside className="w-full lg:w-80 flex flex-col gap-4 shrink-0">
            {/* Header / Active Count */}
            <div className="flex items-center justify-between px-1">
              <span className="font-bold text-base text-[#0C2340]">Moyens de paiement</span>
              <span className="text-xs font-bold text-[#0070BA] bg-blue-100/70 px-2.5 py-0.5 rounded-full">
                {paymentMethods.length + 2} actifs
              </span>
            </div>

            {/* Action: Add card or bank */}
            <button
              onClick={onOpenAddPayment}
              className="w-full group bg-white hover:bg-slate-50 transition-all rounded-2xl p-4 shadow-sm border border-slate-100 flex items-center justify-between text-left cursor-pointer"
              type="button"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-50 text-[#0070BA] flex items-center justify-center transition-transform group-hover:scale-105">
                  <Plus className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-bold text-xs text-[#001d59]">Associer une carte ou un compte</div>
                  <div className="text-[11px] text-slate-500">Banque, débit ou crédit</div>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </button>

            {/* PayPal Balances */}
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-1 block">
                Soldes PayPal
              </span>

              {/* Solde USD */}
              <button
                onClick={() => {
                  setSelectedMethodId('balance-usd');
                  onShowToast('Solde USD principal sélectionné.');
                }}
                className={`w-full flex items-center justify-between p-2.5 rounded-xl transition-all text-left cursor-pointer ${
                  selectedMethodId === 'balance-usd' ? 'bg-slate-100 ring-2 ring-[#0070BA]' : 'hover:bg-slate-50'
                }`}
                type="button"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-full bg-blue-50 text-[#003087] flex items-center justify-center font-bold text-base shrink-0">
                    $
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-xs text-slate-900 truncate">Solde USD</span>
                      <span className="text-[10px] bg-blue-100 text-[#003087] px-1.5 py-0.2 rounded font-semibold shrink-0">
                        Principal
                      </span>
                    </div>
                    <div className="text-xs text-slate-500">{balanceUSD.toFixed(2).replace('.', ',')} USD</div>
                  </div>
                </div>
                {selectedMethodId === 'balance-usd' && (
                  <CheckCircle className="w-4 h-4 text-[#0070BA]" />
                )}
              </button>

              {/* Solde EUR */}
              <button
                onClick={() => {
                  setSelectedMethodId('balance-eur');
                  onShowToast('Solde EUR disponible sélectionné.');
                }}
                className={`w-full flex items-center justify-between p-2.5 rounded-xl transition-all text-left cursor-pointer ${
                  selectedMethodId === 'balance-eur' ? 'bg-slate-100 ring-2 ring-[#0070BA]' : 'hover:bg-slate-50'
                }`}
                type="button"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-full bg-blue-50 text-[#0070BA] flex items-center justify-center font-bold text-base shrink-0">
                    €
                  </div>
                  <div className="min-w-0">
                    <div className="font-bold text-xs text-slate-900 truncate">Solde disponible EUR</div>
                    <div className="text-xs text-[#107C41] font-bold">
                      {balanceEUR.toFixed(2).replace('.', ',')} €
                    </div>
                  </div>
                </div>
                {selectedMethodId === 'balance-eur' && (
                  <CheckCircle className="w-4 h-4 text-[#0070BA]" />
                )}
              </button>
            </div>

            {/* Cartes Bancaires */}
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-1 block">
                Cartes bancaires
              </span>

              {paymentMethods
                .filter((p) => p.type === 'card')
                .map((card) => {
                  const isSelected = selectedMethodId === card.id;
                  return (
                    <button
                      key={card.id}
                      onClick={() => setSelectedMethodId(card.id)}
                      className={`w-full flex items-center justify-between p-2.5 rounded-xl transition-all text-left cursor-pointer ${
                        isSelected ? 'bg-slate-100 ring-2 ring-[#0070BA]' : 'hover:bg-slate-50'
                      }`}
                      type="button"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div
                          className={`w-10 h-7 rounded flex items-center justify-center text-white font-extrabold text-[11px] shrink-0 shadow-xs ${
                            card.brand === 'mastercard'
                              ? 'bg-slate-800'
                              : 'bg-[#003087]'
                          }`}
                        >
                          {card.brand === 'mastercard' ? 'MC' : 'VISA'}
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-1.5">
                            <span className="font-bold text-xs text-slate-900 truncate">{card.name}</span>
                            {card.isPreferred && (
                              <span className="text-[10px] bg-green-100 text-[#107C41] px-1.5 py-0.2 rounded font-semibold shrink-0">
                                Préférée
                              </span>
                            )}
                          </div>
                          <div className="text-xs text-slate-500 font-mono">•••• {card.last4}</div>
                        </div>
                      </div>
                      {isSelected && <CheckCircle className="w-4 h-4 text-[#0070BA]" />}
                    </button>
                  );
                })}
            </div>

            {/* Comptes Bancaires */}
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-1 block">
                Comptes bancaires
              </span>

              {paymentMethods
                .filter((p) => p.type === 'bank')
                .map((bank) => {
                  const isSelected = selectedMethodId === bank.id;
                  return (
                    <button
                      key={bank.id}
                      onClick={() => setSelectedMethodId(bank.id)}
                      className={`w-full flex items-center justify-between p-2.5 rounded-xl transition-all text-left cursor-pointer ${
                        isSelected ? 'bg-slate-100 ring-2 ring-[#0070BA]' : 'hover:bg-slate-50'
                      }`}
                      type="button"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-10 h-10 rounded-full bg-green-50 text-[#107C41] flex items-center justify-center shrink-0">
                          <Landmark className="w-5 h-5" />
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-1">
                            <span className="font-bold text-xs text-slate-900 truncate">{bank.name}</span>
                            <CheckCircle className="w-3.5 h-3.5 text-[#107C41]" />
                          </div>
                          <div className="text-xs text-slate-500 font-mono">•••• {bank.last4}</div>
                        </div>
                      </div>
                      {isSelected && <CheckCircle className="w-4 h-4 text-[#0070BA]" />}
                    </button>
                  );
                })}
            </div>

            {/* Reassurance Badge */}
            <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-100 flex items-center gap-3 text-slate-600">
              <Lock className="w-5 h-5 text-[#0070BA] shrink-0" />
              <p className="text-[11px] leading-relaxed">
                Vos identifiants bancaires et numéros de cartes sont cryptés et ne sont jamais partagés avec les marchands.
              </p>
            </div>
          </aside>

          {/* Central Detail Panel (flex-1) */}
          <div className="flex-1 w-full space-y-6">
            {/* Realistic Credit Card & Metadata Header */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-100">
              <div className="flex flex-col xl:flex-row gap-6 sm:gap-8 items-start justify-between">
                {/* 3D Realistic Embossed Corporate Card */}
                <div
                  className={`w-full sm:w-96 h-56 rounded-2xl p-6 text-white shadow-xl relative overflow-hidden flex flex-col justify-between shrink-0 transition-transform ${
                    isFrozen ? 'opacity-85 grayscale' : ''
                  } ${
                    selectedMethod.brand === 'mastercard'
                      ? 'bg-gradient-to-tr from-slate-900 via-slate-800 to-amber-900'
                      : 'bg-gradient-to-tr from-[#001d59] via-[#003087] to-[#0070BA]'
                  }`}
                >
                  {/* Subtle ambient blur circles */}
                  <div className="absolute -right-8 -bottom-8 w-44 h-44 rounded-full bg-white/10 blur-xl pointer-events-none" />
                  <div className="absolute -left-10 -top-10 w-36 h-36 rounded-full bg-cyan-400/20 blur-lg pointer-events-none" />

                  {/* Top Row: Contactless + Card Brand */}
                  <div className="flex justify-between items-start relative z-10">
                    <div className="flex items-center gap-2">
                      <Wifi className="w-5 h-5 text-blue-200 rotate-90" />
                      <span className="text-[10px] tracking-wider uppercase font-semibold opacity-90">
                        {isFrozen ? 'GEL TEMPORAIRE ACTIF' : 'DÉBIT IMMÉDIAT'}
                      </span>
                    </div>
                    <div className="text-xl tracking-wider font-extrabold italic text-white">
                      {selectedMethod.brand === 'mastercard' ? 'Mastercard' : 'VISA'}
                    </div>
                  </div>

                  {/* Golden EMV Chip */}
                  <div className="relative z-10 w-11 h-8 rounded-sm bg-gradient-to-br from-amber-200 via-amber-300 to-amber-500 p-1 flex flex-col justify-between shadow-inner opacity-95">
                    <div className="w-full h-0.5 bg-amber-700/40 rounded-xs" />
                    <div className="flex justify-between h-2.5">
                      <div className="w-2.5 h-full bg-amber-700/30 rounded-xs" />
                      <div className="w-2.5 h-full bg-amber-700/30 rounded-xs" />
                    </div>
                    <div className="w-full h-0.5 bg-amber-700/40 rounded-xs" />
                  </div>

                  {/* Bottom Row: Number & Cardholder & Expiry */}
                  <div className="relative z-10 flex flex-col gap-1">
                    <div className="text-lg tracking-widest font-mono font-bold text-white shadow-xs">
                      •••• •••• •••• {selectedMethod.last4 || '4242'}
                    </div>
                    <div className="flex justify-between items-end pt-1">
                      <div>
                        <div className="text-[9px] uppercase opacity-70 tracking-wider">Titulaire</div>
                        <div className="text-xs tracking-wider font-bold uppercase">
                          {selectedMethod.holder || 'THOMAS DELAUNAY'}
                        </div>
                      </div>
                      <div>
                        <div className="text-[9px] uppercase opacity-70 tracking-wider">Expire fin</div>
                        <div className="text-xs font-mono font-bold">
                          {selectedMethod.expiry || '08/27'}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Meta-Information & Quick Actions */}
                <div className="flex-1 w-full flex flex-col justify-between h-full gap-4">
                  <div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl font-extrabold text-[#0C2340]">
                          {selectedMethod.name}
                        </span>
                        <span className="text-xs bg-green-100 text-[#107C41] px-2.5 py-0.5 rounded-full font-bold">
                          Par défaut
                        </span>
                      </div>
                    </div>
                    <p className="text-xs text-slate-500 mt-1">
                      Émise par {selectedMethod.bankName || 'La Banque Postale'} • Compte courant rattaché
                    </p>
                  </div>

                  {/* Verification Status Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 py-1">
                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                      <span className="text-[11px] text-slate-500">Type d'utilisation</span>
                      <div className="font-bold text-xs text-slate-900 mt-0.5">
                        Achats en ligne & Abonnements
                      </div>
                    </div>
                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                      <span className="text-[11px] text-slate-500">Statut de vérification</span>
                      <div className="font-bold text-xs text-[#107C41] flex items-center gap-1 mt-0.5">
                        <CheckCircle className="w-3.5 h-3.5" />
                        <span>Confirmée 3D Secure</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions Buttons */}
                  <div className="flex flex-wrap items-center gap-2 pt-1">
                    <button
                      onClick={handleUpdateExpiry}
                      className="px-4 py-2 rounded-full bg-[#0070BA] hover:bg-[#005ea6] text-white font-bold text-xs transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
                    >
                      <Calendar className="w-3.5 h-3.5" />
                      <span>Mettre à jour la date</span>
                    </button>
                    <button
                      onClick={() => handleSetPreferred(selectedMethod.name)}
                      className="px-4 py-2 rounded-full bg-slate-100 hover:bg-slate-200 text-[#0070BA] font-bold text-xs transition-colors flex items-center gap-1.5 cursor-pointer"
                    >
                      <Star className="w-3.5 h-3.5" />
                      <span>Définir comme préférée</span>
                    </button>
                    <button
                      onClick={() => handleDeleteMethod(selectedMethod.name)}
                      className="px-4 py-2 rounded-full bg-red-50 hover:bg-red-100 text-red-600 font-bold text-xs transition-colors flex items-center gap-1.5 ml-auto cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Supprimer</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Préférences de paiement automatique */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-base text-[#0C2340]">Préférences de paiement automatique</h3>
                  <p className="text-xs text-slate-500">
                    Gérez comment cette carte intervient lors de vos règlements marchands récurrents.
                  </p>
                </div>
                <Sliders className="w-5 h-5 text-[#0070BA]" />
              </div>

              <div className="space-y-3">
                {/* Switch 1: Paiement en ligne préféré */}
                <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-blue-50 text-[#0070BA] flex items-center justify-center">
                      <CreditCard className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-bold text-xs text-slate-900">Paiement en ligne préféré</div>
                      <div className="text-[11px] text-slate-500">
                        Utiliser cette carte en priorité pour régler sur Internet via PayPal
                      </div>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={prefOnline}
                      onChange={(e) => {
                        setPrefOnline(e.target.checked);
                        onShowToast('Préférence paiement en ligne mise à jour.');
                      }}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#0070BA]" />
                  </label>
                </div>

                {/* Switch 2: Abonnements et prélèvements récurrents */}
                <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-blue-50 text-[#0070BA] flex items-center justify-center">
                      <Layers className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-bold text-xs text-slate-900">Abonnements et prélèvements récurrents</div>
                      <div className="text-[11px] text-slate-500">
                        Netflix, Spotify, Uber et autres marchands pré-autorisés
                      </div>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={prefSubscriptions}
                      onChange={(e) => {
                        setPrefSubscriptions(e.target.checked);
                        onShowToast('Préférence abonnements mise à jour.');
                      }}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#0070BA]" />
                  </label>
                </div>

                {/* Switch 3: Paiement d'appoint automatique */}
                <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-blue-50 text-[#0070BA] flex items-center justify-center">
                      <Shield className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-bold text-xs text-slate-900">Paiement d'appoint automatique</div>
                      <div className="text-[11px] text-slate-500">
                        Compléter les débits si le solde PayPal principal est insuffisant
                      </div>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={prefBackup}
                      onChange={(e) => {
                        setPrefBackup(e.target.checked);
                        onShowToast('Paiement d’appoint automatique configuré.');
                      }}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#0070BA]" />
                  </label>
                </div>
              </div>
            </div>

            {/* Plafonds d'utilisation & Sécurité Bancaire (2 cols) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Plafonds d'utilisation */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex flex-col justify-between gap-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-sm text-[#0C2340]">Plafonds d'utilisation</h4>
                    <p className="text-xs text-slate-500">Période en cours (glissante sur 30 jours)</p>
                  </div>
                  <Gauge className="w-5 h-5 text-slate-400" />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-slate-700">Achats cumulés en ligne</span>
                    <span className="font-bold text-slate-900">820,00 € / 2 500,00 €</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                    <div className="bg-[#0070BA] h-full rounded-full" style={{ width: '32.8%' }} />
                  </div>
                  <div className="flex justify-between text-[11px] text-slate-500">
                    <span>Utilisé : 32.8%</span>
                    <span>Reste disponible : 1 680,00 €</span>
                  </div>
                </div>

                <div className="space-y-2 pt-1">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-slate-700">Virements immédiats autorisés</span>
                    <span className="font-bold text-slate-900">150,00 € / 1 000,00 €</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                    <div className="bg-[#107C41] h-full rounded-full" style={{ width: '15%' }} />
                  </div>
                  <div className="flex justify-between text-[11px] text-slate-500">
                    <span>Utilisé : 15%</span>
                    <span>Plafond renouvelé dans 12 jours</span>
                  </div>
                </div>

                <button
                  onClick={() => onShowToast('Demande de relèvement de plafonds transmise à votre banque.')}
                  className="w-full py-2 text-center text-xs text-[#0070BA] font-bold hover:underline cursor-pointer"
                  type="button"
                >
                  Demander une modification des plafonds
                </button>
              </div>

              {/* Sécurité Bancaire & Gel Temporaire */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex flex-col justify-between gap-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-sm text-[#0C2340]">Sécurité bancaire</h4>
                    <p className="text-xs text-slate-500">Surveillance et blocages d'urgence</p>
                  </div>
                  <Shield className="w-5 h-5 text-[#107C41]" />
                </div>

                <div className="space-y-3">
                  {/* Positive AES-256 alert */}
                  <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <Lock className="w-5 h-5 text-[#107C41] shrink-0 mt-0.5" />
                    <div>
                      <div className="font-bold text-xs text-slate-900">Chiffrement AES-256 actif</div>
                      <div className="text-[11px] text-slate-500 leading-snug">
                        Le numéro complet de cette carte n'apparaît sur aucun reçu d'achat marchand.
                      </div>
                    </div>
                  </div>

                  {/* Temporary freeze toggle */}
                  <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <div className="flex items-center gap-3">
                      <Snowflake className="w-5 h-5 text-slate-500" />
                      <div>
                        <div className="font-bold text-xs text-slate-900">Gel temporaire</div>
                        <div className="text-[11px] text-slate-500">Bloquer les débits instantanés</div>
                      </div>
                    </div>
                    <button
                      onClick={handleToggleFreeze}
                      className={`px-4 py-1.5 rounded-full font-bold text-xs transition-colors cursor-pointer ${
                        isFrozen
                          ? 'bg-red-600 text-white hover:bg-red-700'
                          : 'bg-slate-200 text-slate-800 hover:bg-slate-300'
                      }`}
                      type="button"
                    >
                      {isFrozen ? 'Dégeler' : 'Activer'}
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 text-slate-400 text-[11px] pt-1">
                  <Info className="w-3.5 h-3.5" />
                  <span>Protégé par la Protection des Achats PayPal éligible.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
