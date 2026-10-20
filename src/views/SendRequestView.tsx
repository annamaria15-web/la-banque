import React, { useState } from 'react';
import { Contact, Transaction } from '../types';
import { INITIAL_CONTACTS } from '../data/mockData';
import {
  Send,
  ArrowDownLeft,
  Users,
  PiggyBank,
  Shield,
  Search,
  X,
  Lock,
  ArrowRight,
  Check,
  CheckCircle,
  CreditCard,
  Wallet,
  Link as LinkIcon,
  Copy,
  Plus,
} from 'lucide-react';

interface SendRequestViewProps {
  balanceUSD: number;
  balanceEUR: number;
  onTransferComplete: (amount: number, currency: 'USD' | 'EUR', recipientName: string) => void;
  onShowToast: (msg: string) => void;
}

export const SendRequestView: React.FC<SendRequestViewProps> = ({
  balanceUSD,
  balanceEUR,
  onTransferComplete,
  onShowToast,
}) => {
  const [subTab, setSubTab] = useState<'send' | 'request' | 'contacts' | 'pools'>('send');

  // Transfer form state
  const [selectedContact, setSelectedContact] = useState<Contact>(INITIAL_CONTACTS[1]); // Marie Moreau
  const [recipientInput, setRecipientInput] = useState(INITIAL_CONTACTS[1].name);
  const [currency, setCurrency] = useState<'EUR' | 'USD'>('EUR');
  const [amount, setAmount] = useState<number>(50);
  const [paymentType, setPaymentType] = useState<'friends' | 'goods'>('friends');
  const [message, setMessage] = useState('');
  const [fundingSource, setFundingSource] = useState<'balance' | 'card'>('balance');

  // Confirmation Modal
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [completedTxDetails, setCompletedTxDetails] = useState<{
    amount: number;
    currency: 'USD' | 'EUR';
    recipient: string;
    id: string;
  } | null>(null);

  const currencySymbol = currency === 'EUR' ? '€' : '$';

  const handleSelectContact = (c: Contact) => {
    setSelectedContact(c);
    setRecipientInput(c.name);
  };

  const handleQuickAmount = (val: number) => {
    setAmount(val);
  };

  const handleSubmitTransfer = () => {
    if (amount <= 0) {
      onShowToast('Veuillez entrer un montant valide supérieur à 0.');
      return;
    }

    const txId = `PP-${Math.floor(10000000 + Math.random() * 90000000)}-FR`;
    const details = {
      amount,
      currency,
      recipient: recipientInput || selectedContact.name,
      id: txId,
    };
    setCompletedTxDetails(details);
    setShowSuccessModal(true);
    onTransferComplete(amount, currency, details.recipient);
  };

  const copyPayPalMe = () => {
    navigator.clipboard?.writeText('https://paypal.me/thomasdelaunay');
    onShowToast('Lien personnel PayPal.Me copié dans le presse-papiers !');
  };

  return (
    <div className="flex-1 w-full bg-[#f9f9ff] min-h-[calc(100vh-4rem)]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Sub-navigation Tabs */}
        <div className="w-full bg-white rounded-2xl shadow-sm mb-6 p-2 flex flex-wrap items-center justify-between gap-3 border border-slate-100">
          <div className="flex items-center gap-1.5 flex-wrap">
            <button
              onClick={() => setSubTab('send')}
              className={`px-5 py-2 rounded-full font-bold text-xs sm:text-sm transition-all shadow-xs flex items-center gap-2 cursor-pointer ${
                subTab === 'send'
                  ? 'bg-[#003087] text-white'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <Send className="w-4 h-4" />
              <span>Envoyer de l'argent</span>
            </button>

            <button
              onClick={() => setSubTab('request')}
              className={`px-5 py-2 rounded-full font-bold text-xs sm:text-sm transition-all flex items-center gap-2 cursor-pointer ${
                subTab === 'request'
                  ? 'bg-[#003087] text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <ArrowDownLeft className="w-4 h-4" />
              <span>Demander de l'argent</span>
            </button>

            <button
              onClick={() => setSubTab('contacts')}
              className={`px-5 py-2 rounded-full font-bold text-xs sm:text-sm transition-all flex items-center gap-2 cursor-pointer ${
                subTab === 'contacts'
                  ? 'bg-[#003087] text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>Contacts</span>
            </button>

            <button
              onClick={() => setSubTab('pools')}
              className={`px-5 py-2 rounded-full font-bold text-xs sm:text-sm transition-all flex items-center gap-2 cursor-pointer ${
                subTab === 'pools'
                  ? 'bg-[#003087] text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <PiggyBank className="w-4 h-4" />
              <span>Cagnottes</span>
            </button>
          </div>

          <div className="hidden sm:flex items-center gap-2 px-3 text-slate-500 text-xs">
            <Shield className="w-4 h-4 text-[#0070BA]" />
            <span className="font-semibold">Protection des achats active</span>
          </div>
        </div>

        {subTab === 'send' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left Column: Transfer Form (8 cols) */}
            <div className="lg:col-span-8 space-y-6">
              {/* Step 1: Recipient Selection */}
              <section className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 space-y-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className="w-8 h-8 rounded-full bg-[#d1e4ff] text-[#003087] flex items-center justify-center font-bold text-xs">
                      1
                    </span>
                    <h2 className="font-bold text-base text-slate-900">Destinataire</h2>
                  </div>
                  <span className="text-xs text-slate-400 font-medium">Étape 1 sur 2</span>
                </div>

                {/* Recipient Search Input */}
                <div className="relative w-full">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                    <Search className="w-5 h-5" />
                  </div>
                  <input
                    type="text"
                    value={recipientInput}
                    onChange={(e) => setRecipientInput(e.target.value)}
                    placeholder="Nom, @pseudo, adresse email ou mobile"
                    className="w-full pl-12 pr-10 py-3 bg-slate-50 text-slate-900 placeholder:text-slate-400 text-sm rounded-full outline-none focus:bg-white focus:ring-2 focus:ring-[#0070BA] transition-all"
                  />
                  {recipientInput && (
                    <button
                      onClick={() => setRecipientInput('')}
                      className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>

                {/* Recent & Favorite Contacts */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                      Contacts récents & favoris
                    </span>
                    <button
                      onClick={() => setSubTab('contacts')}
                      className="text-[#0070BA] hover:text-[#003087] text-xs font-bold transition-colors cursor-pointer"
                    >
                      Tous les contacts
                    </button>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {INITIAL_CONTACTS.map((c) => {
                      const isSelected = selectedContact.id === c.id;
                      return (
                        <button
                          key={c.id}
                          onClick={() => handleSelectContact(c)}
                          className={`flex flex-col items-center p-3 rounded-2xl transition-all text-center group cursor-pointer ${
                            isSelected
                              ? 'bg-[#d1e4ff]/40 ring-2 ring-[#0070BA]'
                              : 'bg-slate-50 hover:bg-slate-100 ring-1 ring-transparent'
                          }`}
                        >
                          <div className="relative w-14 h-14 rounded-full overflow-hidden mb-2 shadow-xs ring-2 ring-transparent group-hover:ring-[#0070BA] transition-all">
                            <img src={c.avatarUrl} alt={c.name} className="w-full h-full object-cover" />
                          </div>
                          <span className={`font-bold text-xs truncate w-full ${isSelected ? 'text-[#003087]' : 'text-slate-800'}`}>
                            {c.name}
                          </span>
                          <span className="text-[11px] text-slate-500 truncate w-full">{c.handle}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </section>

              {/* Step 2: Amount & Currency */}
              <section className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 space-y-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className="w-8 h-8 rounded-full bg-[#d1e4ff] text-[#003087] flex items-center justify-center font-bold text-xs">
                      2
                    </span>
                    <h2 className="font-bold text-base text-slate-900">Montant du transfert</h2>
                  </div>

                  {/* Currency Switcher */}
                  <div className="bg-slate-100 p-1 rounded-full flex items-center text-xs font-bold">
                    <button
                      onClick={() => setCurrency('EUR')}
                      className={`px-3 py-1 rounded-full transition-all cursor-pointer ${
                        currency === 'EUR'
                          ? 'bg-white text-[#003087] shadow-xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      EUR (€)
                    </button>
                    <button
                      onClick={() => setCurrency('USD')}
                      className={`px-3 py-1 rounded-full transition-all cursor-pointer ${
                        currency === 'USD'
                          ? 'bg-white text-[#003087] shadow-xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      USD ($)
                    </button>
                  </div>
                </div>

                {/* Big Amount Display */}
                <div className="flex flex-col items-center justify-center py-6 bg-slate-50/70 rounded-2xl border border-slate-100">
                  <div className="flex items-baseline justify-center gap-2 text-slate-900">
                    <span className="text-4xl sm:text-5xl font-extrabold text-[#0070BA] select-none">
                      {currencySymbol}
                    </span>
                    <input
                      type="number"
                      min={1}
                      step="any"
                      value={amount || ''}
                      onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
                      className="w-48 bg-transparent text-center text-4xl sm:text-5xl font-extrabold text-slate-900 outline-none border-b-2 border-[#0070BA] focus:border-[#003087] transition-all p-0"
                    />
                  </div>
                  <span className="text-xs text-slate-500 mt-2">
                    Frais PayPal : <strong className="text-[#107C41]">0,00 {currencySymbol} Gratuit</strong>
                  </span>
                </div>

                {/* Quick Amount Selector Pills */}
                <div className="flex items-center justify-center gap-2 flex-wrap text-xs font-bold">
                  {[20, 50, 100, 250].map((val) => (
                    <button
                      key={val}
                      onClick={() => handleQuickAmount(val)}
                      className={`px-5 py-2 rounded-full transition-all cursor-pointer ${
                        amount === val
                          ? 'bg-[#0070BA] text-white shadow-xs'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      +{val}
                    </button>
                  ))}
                </div>

                {/* Transfer Type Radio */}
                <div className="space-y-2 pt-2">
                  <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
                    Type d'envoi
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {/* Friends & Family */}
                    <label
                      onClick={() => setPaymentType('friends')}
                      className={`cursor-pointer p-4 rounded-xl flex items-start gap-3 transition-all ${
                        paymentType === 'friends'
                          ? 'bg-white ring-2 ring-[#0070BA] shadow-sm'
                          : 'bg-slate-50 hover:bg-slate-100'
                      }`}
                    >
                      <input
                        type="radio"
                        name="paymentType"
                        checked={paymentType === 'friends'}
                        onChange={() => setPaymentType('friends')}
                        className="mt-1 accent-[#0070BA]"
                      />
                      <div className="flex flex-col">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-xs sm:text-sm text-slate-900">
                            Envoyer à un proche
                          </span>
                          <span className="px-2 py-0.5 rounded-full bg-green-100 text-[#107C41] font-bold text-[10px]">
                            Gratuit
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                          Pour les amis ou la famille en zone euro. Aucun frais prélevé sur la transaction.
                        </p>
                      </div>
                    </label>

                    {/* Goods & Services */}
                    <label
                      onClick={() => setPaymentType('goods')}
                      className={`cursor-pointer p-4 rounded-xl flex items-start gap-3 transition-all ${
                        paymentType === 'goods'
                          ? 'bg-white ring-2 ring-[#0070BA] shadow-sm'
                          : 'bg-slate-50 hover:bg-slate-100'
                      }`}
                    >
                      <input
                        type="radio"
                        name="paymentType"
                        checked={paymentType === 'goods'}
                        onChange={() => setPaymentType('goods')}
                        className="mt-1 accent-[#0070BA]"
                      />
                      <div className="flex flex-col">
                        <div className="flex items-center gap-1.5">
                          <span className="font-bold text-xs sm:text-sm text-slate-900">
                            Biens et services
                          </span>
                          <Shield className="w-3.5 h-3.5 text-[#0070BA]" />
                        </div>
                        <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                          Couvert par la Protection des Achats PayPal. Des frais standard vendeur s'appliquent.
                        </p>
                      </div>
                    </label>
                  </div>
                </div>

                {/* Optional Note / Message */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-500">
                    Ajouter une note ou un message (facultatif)
                  </label>
                  <input
                    type="text"
                    maxLength={120}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Ex: Remboursement du restaurant hier soir 🍕"
                    className="w-full px-4 py-2.5 bg-slate-50 text-slate-900 placeholder:text-slate-400 text-xs sm:text-sm rounded-xl outline-none focus:bg-white focus:ring-2 focus:ring-[#0070BA] transition-all"
                  />
                </div>
              </section>
            </div>

            {/* Right Column: Transfer Summary & Funding Source (4 cols) */}
            <div className="lg:col-span-4 space-y-6">
              {/* Transfer Summary Card */}
              <section className="bg-white rounded-2xl p-6 shadow-md border border-slate-100 space-y-4">
                <h3 className="font-bold text-sm text-[#001d59] pb-2 border-b border-slate-100">
                  Récapitulatif du transfert
                </h3>

                {/* Recipient preview */}
                <div className="flex items-center gap-3 py-1">
                  <div className="w-12 h-12 rounded-full overflow-hidden shadow-xs shrink-0 ring-2 ring-[#0070BA]/20">
                    <img
                      src={selectedContact.avatarUrl}
                      alt={selectedContact.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="font-bold text-sm text-slate-900 truncate">
                      {recipientInput || selectedContact.name}
                    </span>
                    <span className="text-xs text-slate-500 truncate">{selectedContact.handle}</span>
                  </div>
                </div>

                {/* Breakdown details */}
                <div className="space-y-2 py-1 text-xs text-slate-600">
                  <div className="flex items-center justify-between">
                    <span>Montant envoyé</span>
                    <span className="font-bold text-slate-900">
                      {amount.toFixed(2).replace('.', ',')} {currencySymbol}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Frais PayPal</span>
                    <span className="text-[#107C41] font-bold">0,00 {currencySymbol} (Gratuit)</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Délai estimé</span>
                    <span className="text-slate-800 font-bold">Instantané</span>
                  </div>
                  <div className="pt-2 flex items-center justify-between text-base font-bold text-slate-900 border-t border-slate-100">
                    <span>Total à payer</span>
                    <span className="text-2xl font-extrabold text-[#001d59]">
                      {amount.toFixed(2).replace('.', ',')} {currencySymbol}
                    </span>
                  </div>
                </div>

                {/* Funding Source Selector */}
                <div className="space-y-2 pt-2">
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
                    Mode de paiement
                  </span>

                  {/* Option 1: PayPal Balance */}
                  <label
                    onClick={() => setFundingSource('balance')}
                    className={`cursor-pointer p-3 rounded-xl flex items-center justify-between transition-all ${
                      fundingSource === 'balance'
                        ? 'bg-slate-50 ring-2 ring-[#0070BA]'
                        : 'hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="fundingSource"
                        checked={fundingSource === 'balance'}
                        onChange={() => setFundingSource('balance')}
                        className="accent-[#0070BA]"
                      />
                      <div className="w-8 h-8 rounded-full bg-[#003087] text-white flex items-center justify-center shrink-0">
                        <Wallet className="w-4 h-4" />
                      </div>
                      <div className="flex flex-col text-left">
                        <span className="font-bold text-xs text-slate-900">Solde PayPal</span>
                        <span className="text-[11px] text-slate-500">
                          Disponible : {currency === 'EUR' ? `${balanceEUR.toFixed(2)} €` : `${balanceUSD.toFixed(2)} $`}
                        </span>
                      </div>
                    </div>
                    {fundingSource === 'balance' && (
                      <CheckCircle className="w-5 h-5 text-[#0070BA]" />
                    )}
                  </label>

                  {/* Option 2: Linked Card */}
                  <label
                    onClick={() => setFundingSource('card')}
                    className={`cursor-pointer p-3 rounded-xl flex items-center justify-between transition-all ${
                      fundingSource === 'card'
                        ? 'bg-slate-50 ring-2 ring-[#0070BA]'
                        : 'hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="fundingSource"
                        checked={fundingSource === 'card'}
                        onChange={() => setFundingSource('card')}
                        className="accent-[#0070BA]"
                      />
                      <div className="w-8 h-8 rounded-full bg-slate-200 text-slate-800 flex items-center justify-center shrink-0">
                        <CreditCard className="w-4 h-4" />
                      </div>
                      <div className="flex flex-col text-left">
                        <span className="font-bold text-xs text-slate-900">Visa Débit •••• 4289</span>
                        <span className="text-[11px] text-slate-500">Expire 09/27</span>
                      </div>
                    </div>
                    {fundingSource === 'card' && (
                      <CheckCircle className="w-5 h-5 text-[#0070BA]" />
                    )}
                  </label>
                </div>

                {/* Submit Transfer Button */}
                <div className="pt-2 space-y-2">
                  <button
                    onClick={handleSubmitTransfer}
                    className="w-full py-3.5 px-6 rounded-full bg-[#0070BA] hover:bg-[#005ea6] text-white font-bold text-sm transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98]"
                    type="button"
                  >
                    <span>Continuer</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <div className="flex items-center justify-center gap-1.5 text-slate-400 text-[11px] pt-1">
                    <Lock className="w-3.5 h-3.5" />
                    <span>Chiffrement 256 bits conforme DSP2</span>
                  </div>
                </div>
              </section>

              {/* Promotional Card: PayPal.Me Link */}
              <div className="bg-gradient-to-br from-[#003087] to-[#001d59] rounded-2xl p-5 text-white shadow-sm space-y-3">
                <div className="flex items-center gap-1.5 text-blue-200 text-xs font-semibold">
                  <LinkIcon className="w-4 h-4" />
                  <span>Lien personnel PayPal.Me</span>
                </div>
                <h4 className="font-bold text-sm leading-snug">Recevez des paiements encore plus vite</h4>
                <p className="text-xs text-blue-100 leading-relaxed">
                  Partagez votre lien personnalisé avec vos contacts pour vous faire rembourser en un clic.
                </p>
                <button
                  onClick={copyPayPalMe}
                  className="px-4 py-2 bg-white text-[#003087] hover:bg-slate-100 font-bold text-xs rounded-full transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
                  type="button"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copier mon lien PayPal.Me</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Sub-tab: Demander de l'argent */}
        {subTab === 'request' && (
          <div className="max-w-2xl mx-auto bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-100 space-y-6">
            <div>
              <h2 className="text-xl font-bold text-[#001d59]">Demander un paiement</h2>
              <p className="text-xs text-slate-500 mt-1">
                Envoyez une demande à un proche ou créez un lien de partage instantané.
              </p>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Destinataire de la demande
                </label>
                <input
                  type="text"
                  placeholder="Adresse e-mail, mobile ou @pseudo"
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0070BA] focus:bg-white transition-all"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Montant demandé
                </label>
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold text-[#0070BA]">€</span>
                  <input
                    type="number"
                    defaultValue={35}
                    className="flex-1 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-bold focus:outline-none focus:ring-2 focus:ring-[#0070BA] focus:bg-white transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Motif de la demande
                </label>
                <input
                  type="text"
                  placeholder="Ex: Participation au cadeau commun d'anniversaire"
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0070BA] focus:bg-white transition-all"
                />
              </div>

              <button
                onClick={() => {
                  onShowToast('Demande de paiement envoyée par notification et e-mail.');
                  setSubTab('send');
                }}
                className="w-full py-3 bg-[#0070BA] hover:bg-[#005ea6] text-white font-bold rounded-full transition-colors shadow-sm cursor-pointer mt-4"
              >
                Envoyer la demande de paiement
              </button>
            </div>
          </div>
        )}

        {/* Sub-tab: Contacts */}
        {subTab === 'contacts' && (
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-[#001d59]">Vos contacts enregistrés</h2>
                <p className="text-xs text-slate-500 mt-1">
                  Retrouvez et gérez la liste de vos bénéficiaires récents.
                </p>
              </div>
              <button
                onClick={() => onShowToast('Formulaire d\'ajout de nouveau contact ouvert.')}
                className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#0070BA] text-white font-bold text-xs hover:bg-[#005ea6] transition-colors cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Nouveau contact</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {INITIAL_CONTACTS.map((c) => (
                <div
                  key={c.id}
                  className="p-4 rounded-xl border border-slate-100 bg-slate-50/60 flex flex-col items-center text-center space-y-2 hover:shadow-sm transition-all"
                >
                  <img src={c.avatarUrl} alt={c.name} className="w-16 h-16 rounded-full object-cover shadow-xs" />
                  <div className="min-w-0 w-full">
                    <h4 className="font-bold text-sm text-slate-900 truncate">{c.name}</h4>
                    <p className="text-xs text-slate-500 truncate">{c.handle}</p>
                    <p className="text-[11px] text-slate-400 truncate mt-0.5">{c.email}</p>
                  </div>
                  <button
                    onClick={() => {
                      handleSelectContact(c);
                      setSubTab('send');
                    }}
                    className="w-full mt-2 py-1.5 rounded-full bg-white hover:bg-slate-100 text-[#0070BA] border border-slate-200 font-bold text-xs transition-colors cursor-pointer"
                  >
                    Envoyer
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Sub-tab: Cagnottes */}
        {subTab === 'pools' && (
          <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-100 space-y-6 text-center max-w-xl mx-auto">
            <div className="w-16 h-16 rounded-full bg-blue-100 text-[#0070BA] flex items-center justify-center mx-auto">
              <PiggyBank className="w-8 h-8" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-[#001d59]">Cagnottes entre amis</h2>
              <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
                Créez une cagnotte sans frais pour organiser un voyage de groupe, un cadeau commun ou des frais partagés.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 text-left text-xs space-y-2">
              <div className="flex justify-between font-bold text-slate-800">
                <span>Cagnotte en cours : Weekend à Lisbonne</span>
                <span className="text-[#107C41]">320,00 € / 500,00 €</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-200 overflow-hidden">
                <div className="h-full bg-[#107C41] rounded-full" style={{ width: '64%' }} />
              </div>
              <p className="text-[11px] text-slate-500">6 participants ont déjà contribué.</p>
            </div>

            <button
              onClick={() => onShowToast('Cagnotte configurée avec succès.')}
              className="px-6 py-3 rounded-full bg-[#0070BA] text-white font-bold text-xs hover:bg-[#005ea6] transition-colors shadow-sm cursor-pointer"
            >
              Créer une nouvelle cagnotte
            </button>
          </div>
        )}

        {/* Transfer Success Confirmation Modal */}
        {showSuccessModal && completedTxDetails && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/45 backdrop-blur-xs animate-in fade-in duration-200">
            <div className="bg-white rounded-2xl max-w-md w-full p-6 sm:p-8 shadow-2xl text-center space-y-4 border border-slate-100">
              <div className="w-16 h-16 rounded-full bg-green-100 text-[#107C41] flex items-center justify-center mx-auto">
                <Check className="w-8 h-8 stroke-[3]" />
              </div>

              <div>
                <h3 className="text-xl font-extrabold text-[#001d59]">Paiement effectué !</h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-1">
                  Vous avez envoyé{' '}
                  <strong className="text-slate-900">
                    {completedTxDetails.amount.toFixed(2).replace('.', ',')}{' '}
                    {completedTxDetails.currency === 'EUR' ? '€' : '$'}
                  </strong>{' '}
                  à <strong className="text-slate-900">{completedTxDetails.recipient}</strong>.
                </p>
              </div>

              <div className="w-full bg-slate-50 p-4 rounded-xl text-left space-y-1.5 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-500">Numéro de transaction :</span>
                  <span className="font-mono font-bold text-slate-900">{completedTxDetails.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Mode de paiement :</span>
                  <span className="font-semibold text-slate-900">
                    {fundingSource === 'balance' ? 'Solde PayPal' : 'Visa Débit •••• 4289'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Délai :</span>
                  <span className="text-[#107C41] font-semibold">Crédité immédiatement</span>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <button
                  onClick={() => setShowSuccessModal(false)}
                  className="flex-1 py-3 rounded-full bg-[#0070BA] text-white font-bold text-xs hover:bg-[#005ea6] transition-colors cursor-pointer"
                >
                  Terminer
                </button>
                <button
                  onClick={() => {
                    setShowSuccessModal(false);
                    setAmount(20);
                  }}
                  className="flex-1 py-3 rounded-full bg-slate-100 text-slate-700 font-bold text-xs hover:bg-slate-200 transition-colors cursor-pointer"
                >
                  Autre envoi
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
