import React, { useState } from 'react';
import { NavigationTab, ViewMode, Transaction, PaymentMethod } from './types';
import { INITIAL_TRANSACTIONS, INITIAL_PAYMENT_METHODS } from './data/mockData';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Toast } from './components/Toast';
import { TransactionModal } from './components/TransactionModal';
import { AddPaymentModal } from './components/AddPaymentModal';
import { DashboardView } from './views/DashboardView';
import { MobileDashboardView } from './views/MobileDashboardView';
import { ActivityView } from './views/ActivityView';
import { SendRequestView } from './views/SendRequestView';
import { WalletView } from './views/WalletView';
import { HelpView } from './views/HelpView';
import { OffersView } from './views/OffersView';

export default function App() {
  const [activeTab, setActiveTab] = useState<NavigationTab>('accueil');
  const [viewMode, setViewMode] = useState<ViewMode>('desktop');
  const [balanceUSD, setBalanceUSD] = useState<number>(0.0);
  const [balanceEUR, setBalanceEUR] = useState<number>(142.5);
  const [transactions, setTransactions] = useState<Transaction[]>(INITIAL_TRANSACTIONS);
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>(INITIAL_PAYMENT_METHODS);

  // Modals & Popovers
  const [selectedTx, setSelectedTx] = useState<Transaction | null>(null);
  const [isAddPaymentOpen, setIsAddPaymentOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [notificationCount, setNotificationCount] = useState<number>(2);

  const showToast = (msg: string) => {
    setToastMessage(msg);
  };

  const handleClearNotifications = () => {
    setNotificationCount(0);
    showToast('Toutes les notifications ont été marquées comme lues.');
  };

  const handleTransferComplete = (amount: number, currency: 'USD' | 'EUR', recipientName: string) => {
    if (currency === 'USD') {
      setBalanceUSD((prev) => Math.max(0, prev - amount));
    } else {
      setBalanceEUR((prev) => Math.max(0, prev - amount));
    }

    const newTx: Transaction = {
      id: `tx-${Date.now()}`,
      name: recipientName,
      type: 'sent',
      category: 'Envoyé à un proche',
      amount: -amount,
      currency,
      dateStr: "Aujourd'hui",
      timeStr: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
      dateGroup: "Aujourd'hui",
      status: 'Terminé',
      email: `${recipientName.toLowerCase().replace(/\s+/g, '.')}@example.com`,
      paymentSource: 'Solde PayPal',
      fee: `0,00 ${currency === 'EUR' ? '€' : '$'}`,
      iconType: 'person',
    };

    setTransactions((prev) => [newTx, ...prev]);
    showToast(`Transfert de ${amount.toFixed(2)} ${currency === 'EUR' ? '€' : '$'} envoyé avec succès à ${recipientName}.`);
  };

  const handleAddPaymentMethod = (method: PaymentMethod) => {
    setPaymentMethods((prev) => [method, ...prev]);
  };

  const handleReportDispute = (tx: Transaction) => {
    setActiveTab('aide');
    showToast(`Ouverture du dossier de réclamation pour la transaction : ${tx.name}`);
  };

  return (
    <div className="min-h-screen bg-[#F5F7FA] text-[#0C2340] flex flex-col font-sans">
      {/* Global Header */}
      <Header
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        viewMode={viewMode}
        onToggleViewMode={setViewMode}
        notificationCount={notificationCount}
        onClearNotifications={handleClearNotifications}
        onShowToast={showToast}
      />

      {/* Main Content Rendered based on ViewMode and ActiveTab */}
      {viewMode === 'mobile' ? (
        <div className="flex-1 py-4 sm:py-8 flex justify-center items-start">
          <MobileDashboardView
            balanceUSD={balanceUSD}
            transactions={transactions}
            onSelectTab={setActiveTab}
            onOpenTransaction={setSelectedTx}
            onOpenAddPayment={() => setIsAddPaymentOpen(true)}
            onShowToast={showToast}
            onQuickSend={() => setActiveTab('envoyer-et-demander')}
          />
        </div>
      ) : (
        <div className="flex-1 flex flex-col">
          {activeTab === 'accueil' && (
            <DashboardView
              balanceUSD={balanceUSD}
              transactions={transactions}
              paymentMethods={paymentMethods}
              onSelectTab={setActiveTab}
              onOpenTransaction={setSelectedTx}
              onOpenAddPayment={() => setIsAddPaymentOpen(true)}
              onShowToast={showToast}
              onQuickSend={() => setActiveTab('envoyer-et-demander')}
            />
          )}

          {activeTab === 'activite' && (
            <ActivityView
              transactions={transactions}
              onSelectTab={setActiveTab}
              onOpenTransaction={setSelectedTx}
              onShowToast={showToast}
            />
          )}

          {activeTab === 'envoyer-et-demander' && (
            <SendRequestView
              balanceUSD={balanceUSD}
              balanceEUR={balanceEUR}
              onTransferComplete={handleTransferComplete}
              onShowToast={showToast}
            />
          )}

          {activeTab === 'portefeuille' && (
            <WalletView
              paymentMethods={paymentMethods}
              balanceUSD={balanceUSD}
              balanceEUR={balanceEUR}
              onOpenAddPayment={() => setIsAddPaymentOpen(true)}
              onShowToast={showToast}
            />
          )}

          {activeTab === 'offres' && <OffersView onShowToast={showToast} />}

          {activeTab === 'aide' && (
            <HelpView
              transactions={transactions}
              onShowToast={showToast}
              onSelectTab={setActiveTab}
            />
          )}

          {/* Standard PayPal Footer */}
          <Footer onSelectTab={setActiveTab} onShowToast={showToast} />
        </div>
      )}

      {/* Reusable Modals */}
      <TransactionModal
        transaction={selectedTx}
        onClose={() => setSelectedTx(null)}
        onReportDispute={handleReportDispute}
        onShowToast={showToast}
      />

      <AddPaymentModal
        isOpen={isAddPaymentOpen}
        onClose={() => setIsAddPaymentOpen(false)}
        onAddMethod={handleAddPaymentMethod}
        onShowToast={showToast}
      />

      {/* Floating Toast Notification */}
      <Toast message={toastMessage} onClose={() => setToastMessage(null)} />
    </div>
  );
}
