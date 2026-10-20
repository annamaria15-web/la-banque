import React from 'react';
import { Transaction } from '../types';
import { X, CheckCircle, Printer, AlertTriangle, Copy, Store, Headphones, ShoppingBag, User, RotateCcw, CreditCard, Utensils } from 'lucide-react';

interface TransactionModalProps {
  transaction: Transaction | null;
  onClose: () => void;
  onReportDispute: (tx: Transaction) => void;
  onShowToast: (msg: string) => void;
}

export const TransactionModal: React.FC<TransactionModalProps> = ({
  transaction,
  onClose,
  onReportDispute,
  onShowToast,
}) => {
  if (!transaction) return null;

  const isPositive = transaction.amount > 0;
  const currencySymbol = transaction.currency === 'EUR' ? '€' : '$';
  const formattedAmount = `${isPositive ? '+' : ''}${transaction.amount.toFixed(2).replace('.', ',')} ${currencySymbol}`;

  const getIcon = () => {
    switch (transaction.iconType) {
      case 'store':
        return <Store className="w-8 h-8" />;
      case 'headphones':
        return <Headphones className="w-8 h-8" />;
      case 'shopping':
        return <ShoppingBag className="w-8 h-8" />;
      case 'person':
        return <User className="w-8 h-8" />;
      case 'refund':
        return <RotateCcw className="w-8 h-8" />;
      case 'restaurant':
        return <Utensils className="w-8 h-8" />;
      default:
        return <CreditCard className="w-8 h-8" />;
    }
  };

  const copyTxId = () => {
    navigator.clipboard?.writeText(transaction.id);
    onShowToast(`Numéro de transaction ${transaction.id} copié.`);
  };

  const printReceipt = () => {
    window.print();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/45 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg rounded-2xl bg-white p-6 sm:p-8 shadow-2xl border border-slate-100 transform transition-transform"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          aria-label="Fermer"
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 transition-colors cursor-pointer"
          onClick={onClose}
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header / Avatar & Summary */}
        <div className="flex flex-col items-center text-center pb-4">
          <div
            className={`w-16 h-16 rounded-full flex items-center justify-center mb-3 shadow-inner ${
              isPositive ? 'bg-green-100 text-[#107C41]' : 'bg-[#EBF5FA] text-[#0070BA]'
            }`}
          >
            {getIcon()}
          </div>
          <h3 className="font-bold text-xl text-[#0C2340]">{transaction.name}</h3>
          <p className="text-xs text-slate-500 mt-0.5">{transaction.email}</p>
          <div
            className={`text-3xl font-extrabold tracking-tight mt-2 ${
              transaction.status === 'Sous séquestre'
                ? 'text-slate-900'
                : isPositive
                ? 'text-[#107C41]'
                : 'text-[#0C2340]'
            }`}
          >
            {formattedAmount}
          </div>
          <div
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold mt-2 ${
              transaction.status === 'Sous séquestre'
                ? 'bg-[#FCE8E6] text-[#A51D24] border border-[#FAD2CF]'
                : transaction.status === 'Terminé'
                ? 'bg-green-100 text-[#107C41]'
                : 'bg-amber-100 text-amber-800'
            }`}
          >
            <CheckCircle className="w-3.5 h-3.5" />
            <span>
              {transaction.status === 'Sous séquestre'
                ? 'Fonds sous séquestre (Protection & Garantie active)'
                : transaction.status === 'Terminé'
                ? 'Paiement compensé et validé'
                : transaction.status}
            </span>
          </div>
        </div>

        {/* Detail Parameters */}
        <div className="flex flex-col gap-2.5 py-4 bg-slate-50 rounded-xl px-4 my-2 text-xs">
          <div className="flex justify-between items-center">
            <span className="text-slate-500">Numéro de transaction</span>
            <div className="flex items-center space-x-1.5">
              <span className="font-mono font-semibold text-slate-800">{transaction.id}</span>
              <button
                onClick={copyTxId}
                className="text-[#0070BA] hover:text-[#00457C] transition-colors p-0.5"
                title="Copier l'identifiant"
              >
                <Copy className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-slate-500">Date et heure</span>
            <span className="font-medium text-slate-800">
              {transaction.dateStr} {transaction.timeStr ? `à ${transaction.timeStr}` : ''}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-slate-500">Mode de règlement</span>
            <span className="font-medium text-slate-800">{transaction.paymentSource}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-slate-500">Commission PayPal</span>
            <span className="font-medium text-slate-800">{transaction.fee}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-slate-500">Catégorie</span>
            <span className="font-medium text-slate-800">{transaction.category}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-2.5 mt-4">
          <button
            className="flex-1 py-2.5 px-4 rounded-full bg-slate-100 font-semibold text-xs text-[#003087] hover:bg-slate-200 transition-colors flex items-center justify-center gap-2 cursor-pointer"
            onClick={printReceipt}
            type="button"
          >
            <Printer className="w-4 h-4" />
            <span>Imprimer le reçu</span>
          </button>
          <button
            className="flex-1 py-2.5 px-4 rounded-full bg-red-50 text-red-700 font-semibold text-xs hover:bg-red-100 transition-colors flex items-center justify-center gap-2 cursor-pointer"
            onClick={() => {
              onClose();
              onReportDispute(transaction);
            }}
            type="button"
          >
            <AlertTriangle className="w-4 h-4" />
            <span>Signaler un litige</span>
          </button>
        </div>
      </div>
    </div>
  );
};
