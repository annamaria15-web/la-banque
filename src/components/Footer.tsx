import React, { useState } from 'react';
import { NavigationTab } from '../types';
import { downloadProjectCode } from '../utils/downloadProjectCode';
import { Code, Download, Loader2 } from 'lucide-react';

interface FooterProps {
  onSelectTab: (tab: NavigationTab) => void;
  onShowToast: (msg: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectTab, onShowToast }) => {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownloadCode = async () => {
    try {
      setIsDownloading(true);
      onShowToast('Génération de l\'archive ZIP du code source...');
      await downloadProjectCode((status) => {
        onShowToast(status);
      });
    } catch (err) {
      console.error('Erreur lors du téléchargement du code:', err);
      onShowToast('Erreur lors de la génération de l\'archive ZIP.');
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <footer className="mt-auto border-t border-gray-200 bg-white py-6" data-purpose="footer-navigation">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 text-xs text-gray-500 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-4">
          <button
            onClick={() => onSelectTab('aide')}
            className="hover:underline hover:text-[#0070BA] transition-colors cursor-pointer"
          >
            Aide
          </button>
          <button
            onClick={() => onSelectTab('aide')}
            className="hover:underline hover:text-[#0070BA] transition-colors cursor-pointer"
          >
            Contact
          </button>
          <button
            onClick={() => onShowToast('Frais PayPal : Les transferts entre proches en EUR sont 100% gratuits.')}
            className="hover:underline hover:text-[#0070BA] transition-colors cursor-pointer"
          >
            Frais
          </button>
          <button
            onClick={() => onSelectTab('aide')}
            className="hover:underline hover:text-[#0070BA] transition-colors cursor-pointer"
          >
            Sécurité
          </button>
          <button
            onClick={() => onShowToast('Politique de confidentialité et protection des données personnelles RGPD.')}
            className="hover:underline hover:text-[#0070BA] transition-colors cursor-pointer"
          >
            Confidentialité
          </button>
          {/* Code Download Button as shown in the user's photo */}
          <button
            onClick={handleDownloadCode}
            disabled={isDownloading}
            title="Télécharger l'intégralité du code source du projet (ZIP)"
            className="inline-flex items-center gap-1.5 font-bold text-[#0070BA] hover:text-[#003087] hover:underline transition-colors cursor-pointer disabled:opacity-50"
          >
            {isDownloading ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <Code className="w-3.5 h-3.5" />
            )}
            <span>Code</span>
          </button>
          <button
            onClick={() => onShowToast('Application mobile PayPal disponible sur iOS App Store et Google Play.')}
            className="hover:underline hover:text-[#0070BA] transition-colors cursor-pointer"
          >
            Applications
          </button>
          <button
            onClick={() => onSelectTab('offres')}
            className="hover:underline hover:text-[#0070BA] transition-colors cursor-pointer"
          >
            Boutiques
          </button>
        </div>
        <div className="flex items-center space-x-4">
          <span>© 1999–2026 PayPal. Tous droits réservés.</span>
          <button
            onClick={() => onShowToast('Conditions d’utilisation du service de paiement PayPal.')}
            className="hover:underline hover:text-[#0070BA] transition-colors cursor-pointer"
          >
            Contrats d'utilisation
          </button>
        </div>
      </div>
    </footer>
  );
};

