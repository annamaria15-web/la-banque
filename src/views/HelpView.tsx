import React, { useState } from 'react';
import { DISPUTES_CLOSED } from '../data/mockData';
import { Transaction } from '../types';
import {
  Search,
  Shield,
  ShieldAlert,
  ShieldCheck,
  LifeBuoy,
  Phone,
  MessageSquare,
  Bot,
  Users,
  CheckCircle,
  Clock,
  ChevronRight,
  ExternalLink,
  Copy,
  AlertTriangle,
  X,
  FileText,
  Mail,
  Lock,
  ArrowRight,
} from 'lucide-react';

interface HelpViewProps {
  transactions: Transaction[];
  onShowToast: (msg: string) => void;
  onSelectTab: (tab: any) => void;
}

export const HelpView: React.FC<HelpViewProps> = ({
  transactions,
  onShowToast,
  onSelectTab,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [disputeTab, setDisputeTab] = useState<'active' | 'closed'>('active');
  const [showDisputeModal, setShowDisputeModal] = useState(false);
  const [selectedTxId, setSelectedTxId] = useState(transactions[0]?.id || 'tx-1');
  const [disputeReason, setDisputeReason] = useState('Je n\'ai pas reçu l\'article commandé');
  const [expandedTopic, setExpandedTopic] = useState<string | null>(null);

  // Call code copy
  const copyAuthCode = () => {
    navigator.clipboard?.writeText('849203');
    onShowToast('Pass d\'authentification 849 203 copié.');
  };

  const handleStartDispute = (e: React.FormEvent) => {
    e.preventDefault();
    setShowDisputeModal(false);
    onShowToast('Dossier de réclamation PP-D-' + Math.floor(10000 + Math.random() * 90000) + ' ouvert. Un e-mail de suivi vous a été envoyé.');
  };

  const toggleTopic = (topic: string) => {
    setExpandedTopic(expandedTopic === topic ? null : topic);
  };

  return (
    <div className="flex-1 w-full bg-[#f9f9ff] min-h-[calc(100vh-4rem)]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Hero Section: Assistance & Global Search */}
        <section className="relative w-full rounded-2xl bg-gradient-to-r from-[#001d59] via-[#003087] to-[#0070BA] p-6 sm:p-10 text-white shadow-md overflow-hidden">
          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md w-max">
              <ShieldCheck className="w-4 h-4 text-emerald-300" />
              <span className="text-xs font-bold text-blue-100 tracking-wider uppercase">
                Assistance & Sécurité Certifiée
              </span>
            </div>

            <div className="space-y-1">
              <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
                Comment pouvons-nous vous aider aujourd'hui ?
              </h1>
              <p className="text-xs sm:text-sm text-blue-100 max-w-xl leading-relaxed">
                Trouvez instantanément des réponses à vos questions, suivez vos réclamations et sécurisez vos transactions avec notre garantie Protection des Achats.
              </p>
            </div>

            {/* Reactive Search Bar */}
            <div className="pt-2">
              <div className="relative flex items-center w-full bg-white rounded-full shadow-lg p-1.5 border border-slate-100">
                <Search className="w-5 h-5 text-slate-400 ml-3 shrink-0" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Ex : contester un prélèvement, délai de remboursement, modifier mon mot de passe..."
                  className="w-full bg-transparent border-0 outline-none px-3 py-2 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400"
                />
                <button
                  onClick={() => onShowToast(`Recherche d'aide lancée pour : "${searchQuery || 'aide générale'}"`)}
                  className="hidden sm:inline-flex items-center gap-1.5 bg-[#0070BA] hover:bg-[#005ea6] text-white px-5 py-2.5 rounded-full font-bold text-xs transition-all shadow-sm cursor-pointer shrink-0"
                  type="button"
                >
                  <span>Rechercher</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* Suggestions chips */}
              <div className="flex flex-wrap items-center gap-2 mt-3 text-xs text-blue-100">
                <span className="text-blue-200">Recherches fréquentes :</span>
                {['Paiement non autorisé', 'Délai virement bancaire', 'Colis non reçu'].map((chip) => (
                  <button
                    key={chip}
                    onClick={() => {
                      setSearchQuery(chip);
                      onShowToast(`Filtre d'aide appliqué : ${chip}`);
                    }}
                    className="px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all text-xs cursor-pointer font-medium"
                  >
                    {chip}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Watermark Illustration */}
          <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-15 pointer-events-none hidden lg:flex items-center justify-end pr-10">
            <Shield className="w-72 h-72 text-white" />
          </div>
        </section>

        {/* Security Alert / System Status Banner */}
        <div className="w-full rounded-2xl bg-white shadow-sm p-4 sm:p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border border-slate-100">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-green-100 text-[#107C41] flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm text-slate-900">Système de protection actif</span>
                <span className="px-2 py-0.5 rounded-full bg-green-100 text-[#107C41] font-bold text-[10px]">
                  100% Fonctionnel
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Chiffrement bancaire TLS 256 bits et surveillance continue anti-fraude 24h/24, 7j/7 sur votre compte.
              </p>
            </div>
          </div>
          <button
            onClick={() => onShowToast('Audit de sécurité complété : Aucun risque détecté. Votre compte est sécurisé.')}
            className="w-full md:w-auto px-5 py-2 rounded-full bg-slate-100 hover:bg-slate-200 text-[#001d59] font-bold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <Lock className="w-3.5 h-3.5" />
            <span>Audit de sécurité</span>
          </button>
        </div>

        {/* Main 12-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Main Column (8 cols): Dispute Center & FAQs */}
          <div className="lg:col-span-8 space-y-6">
            {/* Gestionnaire de Litiges */}
            <div className="bg-white rounded-2xl shadow-sm p-6 sm:p-8 border border-slate-100 space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 text-[#001d59] font-bold text-lg">
                    <LifeBuoy className="w-5 h-5 text-[#0070BA]" />
                    <h2>Gestionnaire de litiges</h2>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">
                    Consultez l'historique de vos requêtes, échangez avec les vendeurs ou escaladez un dossier.
                  </p>
                </div>
                <button
                  onClick={() => setShowDisputeModal(true)}
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-[#0070BA] hover:bg-[#005ea6] text-white font-bold text-xs transition-all shadow-sm cursor-pointer"
                  type="button"
                >
                  <AlertTriangle className="w-4 h-4" />
                  <span>Signaler un problème</span>
                </button>
              </div>

              {/* Tabs: Active vs Closed */}
              <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl w-max text-xs font-bold">
                <button
                  onClick={() => setDisputeTab('active')}
                  className={`px-4 py-2 rounded-lg transition-all cursor-pointer ${
                    disputeTab === 'active'
                      ? 'bg-white text-[#001d59] shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Dossiers en cours (0)
                </button>
                <button
                  onClick={() => setDisputeTab('closed')}
                  className={`px-4 py-2 rounded-lg transition-all cursor-pointer ${
                    disputeTab === 'closed'
                      ? 'bg-white text-[#001d59] shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Dossiers clos ({DISPUTES_CLOSED.length})
                </button>
              </div>

              {/* Tab 1: Active Cases (Zero state) */}
              {disputeTab === 'active' && (
                <div className="flex flex-col items-center justify-center p-8 bg-slate-50/70 rounded-2xl text-center border border-slate-100">
                  <div className="w-16 h-16 rounded-full bg-green-100 text-[#107C41] flex items-center justify-center mb-3">
                    <CheckCircle className="w-8 h-8" />
                  </div>
                  <h3 className="font-bold text-base text-slate-900">Aucun litige ouvert</h3>
                  <p className="text-xs text-slate-500 max-w-md mt-1 leading-relaxed">
                    Tous vos paiements et virements récents sont réguliers. Vous n'avez aucune action requise pour le moment.
                  </p>
                  <button
                    onClick={() => onSelectTab('activite')}
                    className="text-[#0070BA] hover:text-[#001d59] font-bold text-xs flex items-center gap-1 mt-4 cursor-pointer"
                  >
                    <span>Voir l'historique des transactions</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}

              {/* Tab 2: Closed Cases */}
              {disputeTab === 'closed' && (
                <div className="space-y-3">
                  {DISPUTES_CLOSED.map((disp) => (
                    <div
                      key={disp.id}
                      className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <CheckCircle className="w-6 h-6 text-[#107C41] shrink-0" />
                        <div>
                          <div className="font-bold text-xs text-slate-900">
                            Dossier {disp.caseNumber} • {disp.status}
                          </div>
                          <div className="text-[11px] text-slate-500 mt-0.5">
                            Clôturé le {disp.date} • Marchand : {disp.merchantName}
                          </div>
                          <div className="text-[10px] text-slate-400 mt-0.5">{disp.resolution}</div>
                        </div>
                      </div>
                      <span className="font-bold text-xs text-[#107C41]">{disp.amount}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* 3-Step Clear Resolution Process */}
              <div className="pt-4 space-y-4">
                <h4 className="font-bold text-sm text-[#001d59] flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#0070BA]" />
                  <span>Processus clair de résolution de litige</span>
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                  {/* Step 1 */}
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="w-7 h-7 rounded-full bg-[#001d59] text-white flex items-center justify-center font-bold text-xs">
                        1
                      </span>
                      <MessageSquare className="w-4 h-4 text-slate-400" />
                    </div>
                    <span className="font-bold text-slate-900 block pt-1">Discussion à l'amiable</span>
                    <p className="text-slate-500 text-[11px] leading-relaxed">
                      Vous disposez de 20 jours pour dialoguer directement avec le marchand via la messagerie sécurisée.
                    </p>
                  </div>

                  {/* Step 2 */}
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="w-7 h-7 rounded-full bg-[#001d59] text-white flex items-center justify-center font-bold text-xs">
                        2
                      </span>
                      <FileText className="w-4 h-4 text-slate-400" />
                    </div>
                    <span className="font-bold text-slate-900 block pt-1">Réclamation PayPal</span>
                    <p className="text-slate-500 text-[11px] leading-relaxed">
                      Sans solution trouvée, transférez le dossier à nos analystes spécialisés pour examen formel des pièces.
                    </p>
                  </div>

                  {/* Step 3 */}
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="w-7 h-7 rounded-full bg-[#107C41] text-white flex items-center justify-center font-bold text-xs">
                        3
                      </span>
                      <CheckCircle className="w-4 h-4 text-[#107C41]" />
                    </div>
                    <span className="font-bold text-slate-900 block pt-1">Décision & Remboursement</span>
                    <p className="text-slate-500 text-[11px] leading-relaxed">
                      Nous tranchons et procédons au remboursement intégral incluant les frais de livraison initiaux.
                    </p>
                  </div>
                </div>
              </div>

              {/* Purchase Protection Banner */}
              <div className="bg-blue-50/80 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border border-blue-100">
                <div className="flex items-center gap-3">
                  <Shield className="w-8 h-8 text-[#0070BA] shrink-0" />
                  <div>
                    <span className="font-bold text-xs text-[#001d59] block">
                      Programme Protection des Achats PayPal
                    </span>
                    <p className="text-[11px] text-slate-600 mt-0.5">
                      Vos achats éligibles sont couverts en cas de colis non reçu ou non conforme à la description du vendeur.
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => onShowToast('Conditions générales d\'éligibilité à la Protection des Achats PayPal.')}
                  className="shrink-0 px-4 py-2 rounded-full bg-white text-[#0070BA] font-bold text-xs hover:bg-slate-50 transition-colors shadow-xs cursor-pointer"
                >
                  Conditions éligibles
                </button>
              </div>
            </div>

            {/* Frequent Help Topics Grid */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="font-bold text-base text-[#0C2340] flex items-center gap-2">
                  <span>Rubriques d'aide fréquentes</span>
                </h2>
                <span className="text-xs text-slate-400">Mis à jour quotidiennement</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Topic 1 */}
                <div className="bg-white rounded-2xl shadow-sm p-6 border border-slate-100 flex flex-col justify-between space-y-3">
                  <div className="space-y-2">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0070BA] flex items-center justify-center">
                      <ArrowRight className="w-5 h-5 -rotate-45" />
                    </div>
                    <h3 className="font-bold text-sm text-[#0C2340]">Paiements et transferts</h3>
                    <p className="text-xs text-slate-500">
                      Gérer les virements différés, transferts bancaires rejetés et plafonds d'envoi.
                    </p>
                    <ul className="space-y-1.5 pt-1 text-xs text-[#0070BA]">
                      <li
                        onClick={() => toggleTopic('p1')}
                        className="flex items-center gap-1 hover:underline cursor-pointer"
                      >
                        <ChevronRight className="w-3.5 h-3.5" />
                        <span>Pourquoi mon paiement est-il en attente ?</span>
                      </li>
                      <li
                        onClick={() => toggleTopic('p2')}
                        className="flex items-center gap-1 hover:underline cursor-pointer"
                      >
                        <ChevronRight className="w-3.5 h-3.5" />
                        <span>Annuler un virement en cours</span>
                      </li>
                      <li
                        onClick={() => toggleTopic('p3')}
                        className="flex items-center gap-1 hover:underline cursor-pointer"
                      >
                        <ChevronRight className="w-3.5 h-3.5" />
                        <span>Délais de transfert vers mon compte bancaire</span>
                      </li>
                    </ul>
                  </div>
                  <button
                    onClick={() => onShowToast('Affichage des 14 articles sur les paiements et transferts.')}
                    className="text-left text-xs font-semibold text-slate-400 hover:text-[#0070BA] transition-colors flex items-center gap-1 cursor-pointer pt-2"
                  >
                    <span>Voir les 14 articles</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Topic 2 */}
                <div className="bg-white rounded-2xl shadow-sm p-6 border border-slate-100 flex flex-col justify-between space-y-3">
                  <div className="space-y-2">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0070BA] flex items-center justify-center">
                      <Lock className="w-5 h-5" />
                    </div>
                    <h3 className="font-bold text-sm text-[#0C2340]">Gestion de compte & sécurité</h3>
                    <p className="text-xs text-slate-500">
                      Authentification forte 2FA, modification de coordonnées et alertes de connexion.
                    </p>
                    <ul className="space-y-1.5 pt-1 text-xs text-[#0070BA]">
                      <li
                        onClick={() => toggleTopic('s1')}
                        className="flex items-center gap-1 hover:underline cursor-pointer"
                      >
                        <ChevronRight className="w-3.5 h-3.5" />
                        <span>Configurer la validation en deux étapes</span>
                      </li>
                      <li
                        onClick={() => toggleTopic('s2')}
                        className="flex items-center gap-1 hover:underline cursor-pointer"
                      >
                        <ChevronRight className="w-3.5 h-3.5" />
                        <span>Reconnaître un email ou SMS frauduleux (phishing)</span>
                      </li>
                      <li
                        onClick={() => toggleTopic('s3')}
                        className="flex items-center gap-1 hover:underline cursor-pointer"
                      >
                        <ChevronRight className="w-3.5 h-3.5" />
                        <span>Mettre à jour mon justificatif d'identité</span>
                      </li>
                    </ul>
                  </div>
                  <button
                    onClick={() => onShowToast('Affichage des 19 articles sur la gestion de compte et sécurité.')}
                    className="text-left text-xs font-semibold text-slate-400 hover:text-[#0070BA] transition-colors flex items-center gap-1 cursor-pointer pt-2"
                  >
                    <span>Voir les 19 articles</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Topic 3 */}
                <div className="bg-white rounded-2xl shadow-sm p-6 border border-slate-100 flex flex-col justify-between space-y-3">
                  <div className="space-y-2">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0070BA] flex items-center justify-center">
                      <FileText className="w-5 h-5" />
                    </div>
                    <h3 className="font-bold text-sm text-[#0C2340]">Remboursements & annulations</h3>
                    <p className="text-xs text-slate-500">
                      Vérifier où a été crédité un remboursement et contester un refus d'annulation.
                    </p>
                    <ul className="space-y-1.5 pt-1 text-xs text-[#0070BA]">
                      <li
                        onClick={() => toggleTopic('r1')}
                        className="flex items-center gap-1 hover:underline cursor-pointer"
                      >
                        <ChevronRight className="w-3.5 h-3.5" />
                        <span>Où est passé mon remboursement récent ?</span>
                      </li>
                      <li
                        onClick={() => toggleTopic('r2')}
                        className="flex items-center gap-1 hover:underline cursor-pointer"
                      >
                        <ChevronRight className="w-3.5 h-3.5" />
                        <span>Remboursement sur carte bancaire expirée</span>
                      </li>
                      <li
                        onClick={() => toggleTopic('r3')}
                        className="flex items-center gap-1 hover:underline cursor-pointer"
                      >
                        <ChevronRight className="w-3.5 h-3.5" />
                        <span>Annuler un abonnement récurrent ou pré-approuvé</span>
                      </li>
                    </ul>
                  </div>
                  <button
                    onClick={() => onShowToast('Affichage des 11 articles sur les remboursements.')}
                    className="text-left text-xs font-semibold text-slate-400 hover:text-[#0070BA] transition-colors flex items-center gap-1 cursor-pointer pt-2"
                  >
                    <span>Voir les 11 articles</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Topic 4 */}
                <div className="bg-white rounded-2xl shadow-sm p-6 border border-slate-100 flex flex-col justify-between space-y-3">
                  <div className="space-y-2">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0070BA] flex items-center justify-center">
                      <Search className="w-5 h-5" />
                    </div>
                    <h3 className="font-bold text-sm text-[#0C2340]">Frais & conversion de devises</h3>
                    <p className="text-xs text-slate-500">
                      Barèmes tarifaires, transactions transfrontalières et taux de change appliqués.
                    </p>
                    <ul className="space-y-1.5 pt-1 text-xs text-[#0070BA]">
                      <li
                        onClick={() => toggleTopic('f1')}
                        className="flex items-center gap-1 hover:underline cursor-pointer"
                      >
                        <ChevronRight className="w-3.5 h-3.5" />
                        <span>Frais applicables aux paiements internationaux</span>
                      </li>
                      <li
                        onClick={() => toggleTopic('f2')}
                        className="flex items-center gap-1 hover:underline cursor-pointer"
                      >
                        <ChevronRight className="w-3.5 h-3.5" />
                        <span>Choisir la devise de conversion lors de l'achat</span>
                      </li>
                      <li
                        onClick={() => toggleTopic('f3')}
                        className="flex items-center gap-1 hover:underline cursor-pointer"
                      >
                        <ChevronRight className="w-3.5 h-3.5" />
                        <span>Frais de virement instantané vers carte</span>
                      </li>
                    </ul>
                  </div>
                  <button
                    onClick={() => onShowToast('Affichage des 8 articles sur les frais et conversions.')}
                    className="text-left text-xs font-semibold text-slate-400 hover:text-[#0070BA] transition-colors flex items-center gap-1 cursor-pointer pt-2"
                  >
                    <span>Voir les 8 articles</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column (4 cols): Dedicated Support & Security Alert */}
          <div className="lg:col-span-4 space-y-6">
            {/* Dedicated Support Channels */}
            <div className="bg-white rounded-2xl shadow-sm p-6 border border-slate-100 space-y-4">
              <div className="flex items-center gap-2 text-[#001d59] font-bold text-base">
                <LifeBuoy className="w-5 h-5 text-[#0070BA]" />
                <h3>Contacter l'assistance</h3>
              </div>
              <p className="text-xs text-slate-500">
                Nos conseillers et outils automatisés vous accompagnent dans la résolution de vos démarches.
              </p>

              <div className="space-y-2.5">
                {/* Assistant Virtuel */}
                <div
                  onClick={() => onShowToast('L\'assistant virtuel PayPal est connecté et prêt à vous répondre.')}
                  className="bg-slate-50 hover:bg-slate-100 transition-colors rounded-xl p-3.5 flex items-center justify-between group cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#0070BA] text-white flex items-center justify-center shrink-0">
                      <Bot className="w-5 h-5" />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-bold text-xs text-slate-900">Assistant virtuel</span>
                      <span className="text-[11px] text-slate-500">Disponible 24h/24 & 7j/7</span>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-[#001d59] transition-colors" />
                </div>

                {/* Communauté PayPal */}
                <div
                  onClick={() => onShowToast('Ouverture de la communauté PayPal avec plus de 2,5 millions de membres.')}
                  className="bg-slate-50 hover:bg-slate-100 transition-colors rounded-xl p-3.5 flex items-center justify-between group cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#003087] text-white flex items-center justify-center shrink-0">
                      <Users className="w-5 h-5" />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-bold text-xs text-slate-900">Communauté PayPal</span>
                      <span className="text-[11px] text-slate-500">+2,5M membres actifs</span>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-[#001d59] transition-colors" />
                </div>

                {/* Nous appeler */}
                <div
                  onClick={() => onShowToast('Ligne téléphonique directe : 0800 942 890 (Appel gratuit)')}
                  className="bg-slate-50 hover:bg-slate-100 transition-colors rounded-xl p-3.5 flex items-center justify-between group cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-green-100 text-[#107C41] flex items-center justify-center shrink-0">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-bold text-xs text-slate-900">Nous appeler</span>
                      <span className="text-[11px] text-slate-500">Lun-Ven : 8h00 - 20h30</span>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-[#001d59] transition-colors" />
                </div>
              </div>

              {/* Temporary Phone Authentication Pass */}
              <div className="p-4 rounded-xl bg-slate-100/70 border border-slate-200/60 space-y-1">
                <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
                  <span>Pass d'authentification appel</span>
                  <span className="text-[#107C41] flex items-center gap-1 font-bold">
                    <span className="w-2 h-2 rounded-full bg-green-500 inline-block animate-pulse" />
                    Valide 60 min
                  </span>
                </div>
                <div className="flex items-center justify-between pt-1">
                  <span className="text-3xl font-extrabold tracking-wider text-[#001d59]">849 203</span>
                  <button
                    onClick={copyAuthCode}
                    className="p-1.5 text-[#0070BA] hover:text-[#001d59] rounded-lg transition-colors cursor-pointer"
                    title="Copier le code"
                  >
                    <Copy className="w-5 h-5" />
                  </button>
                </div>
                <span className="text-[11px] text-slate-500 block pt-1 leading-snug">
                  Communiquez ce numéro à notre serveur vocal pour un acheminement prioritaire sans vérification prolongée.
                </span>
              </div>
            </div>

            {/* Anti-Fraud Vigilance Alert & Hotlinked Image */}
            <div className="bg-white rounded-2xl shadow-sm p-6 border border-slate-100 space-y-4">
              <div className="flex items-center gap-2 text-[#001d59] font-bold text-sm">
                <ShieldAlert className="w-5 h-5 text-red-500" />
                <span>Alerte vigilance : Faux courriels</span>
              </div>

              {/* Hotlinked prevention scene image from user's HTML! */}
              <div className="w-full h-36 rounded-xl overflow-hidden relative shadow-xs">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBT6gD1vz2GVpcdLdAMDsdfev8r2CASF3YF5rhyfajM__37bR-SlT8AFI6K3S8VR_owJEStohfq7bW5f1ugf7ieM4J42J0-kzUsnXHeOYhY3T5pndpGC8IPZ2SCBKWsfLSp6_xJTyy97qBOXhrtx_2E-I1kz5amvOdXsZkuwyJFvxbSE2vrrJSMHoTddYMERwyLIfOe7IBHFEKeLdDvCHDYcg-s2HZWMhrKeGv16cjcwkc2FlATbSY8"
                  alt="Protection cybersécurité"
                  className="w-full h-full object-cover"
                />
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                PayPal ne vous demandera jamais par SMS ou courriel votre mot de passe, vos codes SMS confidentiels ou les chiffres complets de votre carte de crédit.
              </p>

              <button
                onClick={() => onShowToast('Adresse signalement phishing enregistrée : spoof@paypal.fr')}
                className="w-full inline-flex items-center justify-between text-[#0070BA] hover:text-[#001d59] font-bold text-xs pt-1 cursor-pointer"
              >
                <span>Signaler un phishing à spoof@paypal.fr</span>
                <Mail className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Interactive Dispute Modal */}
        {showDisputeModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/45 backdrop-blur-xs animate-in fade-in duration-200">
            <div className="bg-white w-full max-w-xl rounded-2xl shadow-2xl p-6 sm:p-8 space-y-4 border border-slate-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-[#001d59] font-bold text-lg">
                  <AlertTriangle className="w-6 h-6 text-red-500" />
                  <h3>Signaler une transaction litigieuse</h3>
                </div>
                <button
                  onClick={() => setShowDisputeModal(false)}
                  className="p-1 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <p className="text-xs text-slate-500">
                Sélectionnez la transaction avec laquelle vous rencontrez une anomalie. Les transactions éligibles sont celles effectuées au cours des 180 derniers jours.
              </p>

              {/* Transactions list to dispute */}
              <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                {transactions.slice(0, 4).map((tx) => (
                  <label
                    key={tx.id}
                    className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${
                      selectedTxId === tx.id
                        ? 'bg-blue-50/60 border-[#0070BA] ring-1 ring-[#0070BA]'
                        : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="disputed_tx"
                        checked={selectedTxId === tx.id}
                        onChange={() => setSelectedTxId(tx.id)}
                        className="accent-[#0070BA]"
                      />
                      <div>
                        <div className="font-bold text-xs text-slate-900">{tx.name}</div>
                        <div className="text-[11px] text-slate-500">
                          {tx.dateStr} • {tx.category}
                        </div>
                      </div>
                    </div>
                    <span className="font-bold text-xs text-slate-900">
                      {tx.amount > 0 ? '+' : '-'} {Math.abs(tx.amount).toFixed(2)} $
                    </span>
                  </label>
                ))}
              </div>

              {/* Dispute Reason */}
              <div className="space-y-1">
                <label className="font-bold text-xs text-slate-900">Quel est le motif principal ?</label>
                <select
                  value={disputeReason}
                  onChange={(e) => setDisputeReason(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 outline-none focus:ring-2 focus:ring-[#0070BA] focus:bg-white transition-all"
                >
                  <option>Je n'ai pas reçu l'article commandé</option>
                  <option>L'article reçu est nettement non conforme ou endommagé</option>
                  <option>Je n'ai pas autorisé cette transaction (suspicion de fraude)</option>
                  <option>Erreur de facturation ou prélèvement en double</option>
                </select>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setShowDisputeModal(false)}
                  className="px-5 py-2.5 rounded-full text-xs font-bold text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  Annuler
                </button>
                <button
                  type="button"
                  onClick={handleStartDispute}
                  className="px-6 py-2.5 rounded-full bg-[#0070BA] hover:bg-[#005ea6] text-white text-xs font-bold transition-colors shadow-sm cursor-pointer"
                >
                  Continuer vers le formulaire
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
