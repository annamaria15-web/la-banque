import React, { useState } from 'react';
import { PaymentMethod } from '../types';
import { X, CreditCard, Landmark, ShieldCheck } from 'lucide-react';

interface AddPaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddMethod: (method: PaymentMethod) => void;
  onShowToast: (msg: string) => void;
}

export const AddPaymentModal: React.FC<AddPaymentModalProps> = ({
  isOpen,
  onClose,
  onAddMethod,
  onShowToast,
}) => {
  const [activeTab, setActiveTab] = useState<'card' | 'bank'>('card');
  const [cardNumber, setCardNumber] = useState('');
  const [cardHolder, setCardHolder] = useState('THOMAS DELAUNAY');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [bankIban, setBankIban] = useState('');
  const [bankName, setBankName] = useState('Société Générale');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (activeTab === 'card') {
      const cleanNumber = cardNumber.replace(/\s+/g, '');
      const last4 = cleanNumber.slice(-4) || '9901';
      const brand = cleanNumber.startsWith('5') ? 'mastercard' : 'visa';
      const newMethod: PaymentMethod = {
        id: `pm-${Date.now()}`,
        name: brand === 'visa' ? 'Visa Electron' : 'Mastercard Standard',
        type: 'card',
        brand,
        last4,
        holder: cardHolder.toUpperCase() || 'THOMAS DELAUNAY',
        expiry: cardExpiry || '10/29',
        bankName: 'Banque Partenaire',
        isPreferred: false,
        isDefault: false,
      };
      onAddMethod(newMethod);
      onShowToast(`Carte ${newMethod.name} (•••• ${last4}) associée avec succès !`);
    } else {
      const last4 = bankIban.replace(/\s+/g, '').slice(-4) || '3341';
      const newMethod: PaymentMethod = {
        id: `pm-${Date.now()}`,
        name: bankName || 'Compte Bancaire',
        type: 'bank',
        last4,
        bankName: bankName || 'Banque de France',
        holder: cardHolder.toUpperCase() || 'THOMAS DELAUNAY',
        isPreferred: false,
        statusBadge: 'Vérifié',
      };
      onAddMethod(newMethod);
      onShowToast(`Compte ${newMethod.bankName} (•••• ${last4}) vérifié et ajouté.`);
    }
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/45 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg rounded-2xl bg-white p-6 sm:p-8 shadow-2xl border border-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          aria-label="Fermer"
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 transition-colors cursor-pointer"
          onClick={onClose}
        >
          <X className="w-5 h-5" />
        </button>

        <h3 className="font-bold text-xl text-[#0C2340] mb-1">
          Associer un moyen de paiement
        </h3>
        <p className="text-xs text-slate-500 mb-5">
          Faites des achats en ligne sécurisés et transférez vos fonds vers votre compte.
        </p>

        {/* Tab selection Card vs Bank */}
        <div className="grid grid-cols-2 gap-2 p-1 bg-slate-100 rounded-xl mb-5 text-xs font-semibold">
          <button
            type="button"
            onClick={() => setActiveTab('card')}
            className={`flex items-center justify-center space-x-2 py-2.5 rounded-lg transition-all cursor-pointer ${
              activeTab === 'card'
                ? 'bg-white text-[#0070BA] shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <CreditCard className="w-4 h-4" />
            <span>Carte de débit ou crédit</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('bank')}
            className={`flex items-center justify-center space-x-2 py-2.5 rounded-lg transition-all cursor-pointer ${
              activeTab === 'bank'
                ? 'bg-white text-[#0070BA] shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Landmark className="w-4 h-4" />
            <span>Compte bancaire (IBAN)</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {activeTab === 'card' ? (
            <>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Numéro de carte
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    maxLength={19}
                    placeholder="4532 •••• •••• 4242"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-[#0070BA] focus:bg-white transition-all"
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 flex space-x-1">
                    <span className="text-[10px] font-bold text-[#003087] bg-slate-200 px-1.5 py-0.5 rounded">
                      VISA
                    </span>
                    <span className="text-[10px] font-bold text-amber-700 bg-amber-100 px-1.5 py-0.5 rounded">
                      MC
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Nom du titulaire
                </label>
                <input
                  type="text"
                  required
                  value={cardHolder}
                  onChange={(e) => setCardHolder(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 uppercase focus:outline-none focus:ring-2 focus:ring-[#0070BA] focus:bg-white transition-all"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Date d'expiration
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="MM/AA (ex: 08/28)"
                    maxLength={5}
                    value={cardExpiry}
                    onChange={(e) => setCardExpiry(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-mono focus:outline-none focus:ring-2 focus:ring-[#0070BA] focus:bg-white transition-all"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Code de sécurité (CVV)
                  </label>
                  <input
                    type="password"
                    required
                    maxLength={4}
                    placeholder="•••"
                    value={cardCvv}
                    onChange={(e) => setCardCvv(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-mono tracking-widest focus:outline-none focus:ring-2 focus:ring-[#0070BA] focus:bg-white transition-all"
                  />
                </div>
              </div>
            </>
          ) : (
            <>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Établissement bancaire
                </label>
                <input
                  type="text"
                  required
                  value={bankName}
                  onChange={(e) => setBankName(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0070BA] focus:bg-white transition-all"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  IBAN (Numéro de compte)
                </label>
                <input
                  type="text"
                  required
                  placeholder="FR76 3000 4000 •••• •••• •••• ••"
                  value={bankIban}
                  onChange={(e) => setBankIban(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-mono focus:outline-none focus:ring-2 focus:ring-[#0070BA] focus:bg-white transition-all"
                />
              </div>
            </>
          )}

          <div className="flex items-center space-x-2 pt-2 text-[11px] text-slate-500">
            <ShieldCheck className="w-4 h-4 text-[#0070BA] shrink-0" />
            <span>Vos informations sont chiffrées de bout en bout et protégées par DSP2.</span>
          </div>

          <div className="pt-3 flex items-center justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-full text-slate-600 hover:bg-slate-100 font-semibold transition-colors cursor-pointer"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-full bg-[#0070BA] hover:bg-[#005ea6] text-white font-semibold transition-colors shadow-sm cursor-pointer"
            >
              Confirmer et associer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
