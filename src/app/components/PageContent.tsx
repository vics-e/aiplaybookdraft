import { motion } from 'motion/react';
import {
  BookOpen,
  Bot,
  Calendar,
  CheckCircle,
  ClipboardList,
  DollarSign,
  Download,
  FileText,
  Lightbulb,
  MessageSquare,
  Shield,
  Target,
  TrendingUp,
  Users,
  X,
  Zap,
} from 'lucide-react';
import type { PlaybookPage } from '../data/playbookData';
import { NUMBERED_TREATMENT_BY_PAGE_ID } from './NumberedContentTreatments';
import { ImageWithFallback } from './media/ImageWithFallback';
import { ActivitySummary } from './ActivitySummary';
import { TAKEAWAY_BAND_PAGE_IDS } from './content/ContentPanels';
import { buildCertificatePrintMarkup } from './certificate/certificateMarkup';
import { parseStructuredInputs } from './content/promptLibraryModel';
import { ContentsPage, CoverPage } from './content/PageShells';
import { GlossaryExperience } from './content/GlossaryExperience';
import { PromptLibraryExperience } from './content/PromptLibraryExperience';
import { WorkflowMapperExperience } from './content/WorkflowMapperExperience';
import { AgentSpecificationExperience } from './content/AgentSpecificationExperience';
import { ToolMatrixExperience } from './content/ToolMatrixExperience';
import { GenericContentRenderer } from './content/GenericContentRenderer';
import { GenericActivityRenderer } from './content/GenericActivityRenderer';
import { AccountantRoleVisual } from './content/visuals/AccountantRoleVisual';
import { AgentMaturityVisual } from './content/visuals/AgentMaturityVisual';
import { AssistantsAgentsVisual } from './content/visuals/AssistantsAgentsVisual';
import { CoreAgentWorkflowsVisual } from './content/visuals/CoreAgentWorkflowsVisual';
import { ThreeStagesVisual } from './content/visuals/ThreeStagesVisual';
import aiAssistedFirmsImage from '../../assets/images/optimised/ai-assisted-firms.jpg';
import aiDividendImage from '../../assets/images/optimised/ai-dividend.jpg';
import ethicsResponsibilityImage from '../../assets/images/optimised/ethics-responsibility.jpg';
import assistantsAgentsImage from '../../assets/images/optimised/assistants-agents.jpg';
import promptingFrameworkImage from '../../assets/images/optimised/prompting-framework.jpg';
import firstThirtyDaysImage from '../../assets/images/optimised/first-30-days.jpg';
import acceptableUsePolicyImage from '../../assets/images/optimised/acceptable-use-policy.jpg';

interface PageContentProps {
  page: PlaybookPage;
  userInput: string;
  onInputChange: (value: string) => void;
  goToPage: (page: number) => void;
  pageInputs?: Record<string, string>;
  onUpdatePageInput?: (pageId: string, value: string) => void;
}

const SECTION_IMAGE_BY_PAGE_ID: Record<string, string> = {
  's1-intro': aiAssistedFirmsImage,
  's2-ethics-responsibility': ethicsResponsibilityImage,
  's3-where-assistants': assistantsAgentsImage,
  's4-framework': promptingFrameworkImage,
  's5-dividend': aiDividendImage,
  's6-days1-30': firstThirtyDaysImage,
  's7-policy': acceptableUsePolicyImage,
};

const CERTIFICATE_NAME_PLACEHOLDER = '[Name / Practice Name]';

export function PageContent({ page, userInput, onInputChange, goToPage, pageInputs, onUpdatePageInput }: PageContentProps) {
  const sectionImageSrc = SECTION_IMAGE_BY_PAGE_ID[page.id];
  const numberedTreatment = NUMBERED_TREATMENT_BY_PAGE_ID[page.id];
  const usesSectionImageTreatment = Boolean(sectionImageSrc);
  const isCertificatePage = page.id === 'certificate';
  let parsedCertificateInputs: Record<string, string> = {};
  if (isCertificatePage) {
    try {
      parsedCertificateInputs = userInput && userInput !== '' ? JSON.parse(userInput) : {};
    } catch {
      parsedCertificateInputs = {};
    }
  }
  const certificateName = isCertificatePage ? (parsedCertificateInputs['question-0'] || '').trim() : '';
  const certificateDisplayName = certificateName || CERTIFICATE_NAME_PLACEHOLDER;
  const certificateTitleBlock = isCertificatePage ? page.content.find(block => block.type === 'box') : undefined;
  const certificateStatement = isCertificatePage ? page.content.find(block => block.type === 'highlight')?.text || '' : '';
  const poweredBySageBlock = isCertificatePage
    ? page.content.find(block => block.type === 'box' && block.title === 'Powered by Sage')
    : undefined;
  const certificateCompletionDate = isCertificatePage
    ? new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date())
    : '';
  const isPromptLibraryPage = page.id === 's4-library';
  const isGlossaryPage = page.id === 's7-glossary';
  const isWorkflowMapPage = page.id === 's3-workflow-map';
  const isAgentSpecWizardPage = page.id === 's7-agent-spec';
  const isToolMatrixPage = page.id === 's7-tool-matrix';
  const structuredInputs = parseStructuredInputs(userInput) as Record<string, any>;
  const ninetyDayWorkflowAnswer = page.id === 's6-days61-90'
    ? (structuredInputs['workflow-name'] || structuredInputs['task-0']?.label || '').trim()
    : '';
  const resolvedTakeaway = page.takeaway
    ? page.id === 's6-days61-90' && page.takeaway.includes('[your answer from the activity above]')
      ? page.takeaway.replace(
          '[your answer from the activity above]',
          ninetyDayWorkflowAnswer || '[your answer from the activity above]'
        )
      : page.takeaway
    : '';
  const usesTakeawayBand = TAKEAWAY_BAND_PAGE_IDS.has(page.id);


  const getIcon = (iconName: string) => {
    const icons: Record<string, any> = {
      BookOpen, Shield, Bot, MessageSquare, DollarSign, Calendar, FileText,
      CheckCircle, Lightbulb, Target, Zap, X, TrendingUp, Users, Download, ClipboardList
    };
    return icons[iconName] || BookOpen;
  };

  // Approved page titles are rendered without automatic word-level colour emphasis.
  const renderTitle = (title: string) => {
    return title.replace(/\*\*/g, '');
  };

  const handleCertificatePrint = () => {
    if (typeof window === 'undefined') {
      return;
    }

    const printWindow = window.open('', '_blank', 'width=1280,height=900');
    if (!printWindow) {
      return;
    }

    const printDocument = buildCertificatePrintMarkup({
      title: certificateTitleBlock?.title || 'The AI Playbook for Accountants & Bookkeepers',
      subtitle: certificateTitleBlock?.text || 'Certificate of Completion',
      displayName: certificateDisplayName,
      statement: certificateStatement,
      poweredByTitle: poweredBySageBlock?.title || 'Powered by Sage',
      poweredByText: poweredBySageBlock?.text || '',
      completionDate: certificateCompletionDate,
    });

    printWindow.document.open();
    printWindow.document.write(printDocument);
    printWindow.document.close();
  };

  if (page.type === 'cover') {
    return <CoverPage goToPage={goToPage} />;
  }

  if (page.type === 'contents') {
    return <ContentsPage page={page} goToPage={goToPage} getIcon={getIcon} />;
  }

  if (page.type === 'summary' && pageInputs && onUpdatePageInput) {
    return (
      <ActivitySummary
        pageInputs={pageInputs}
        onInputChange={onUpdatePageInput}
      />
    );
  }

  return (
    <div className={`playbook-page-content space-y-8 ${isWorkflowMapPage ? 'mx-auto max-w-[860px] space-y-7' : ''} ${isCertificatePage ? 'certificate-page-root' : ''}`}>
      {/* Section Badge */}
      {page.section && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className={`playbook-page-eyebrow inline-block ${
            isCertificatePage ? 'certificate-screen-only' : ''
          }`}
        >
          <span>{page.section}</span>
        </motion.div>
      )}

      {/* Title */}
      <div className={`${isWorkflowMapPage ? 'max-w-4xl space-y-3' : ''} ${isCertificatePage ? 'certificate-screen-only' : ''}`}>
        <h2 className="playbook-page-title mb-4" style={{ fontFamily: 'var(--font-family-header)' }}>
          {renderTitle(page.title)}
        </h2>

        {/* Subtitle */}
        {page.subtitle && (
          <p className="playbook-page-subtitle">{page.subtitle}</p>
        )}
      </div>

      {/* Image */}
      {(page.image || sectionImageSrc) && page.id !== 's3-difference' && page.id !== 's1-stages' && (
        <div
          className={`rounded-2xl overflow-hidden border-2 border-white/10 shadow-2xl shadow-black/50 ${
            usesSectionImageTreatment ? 'mx-auto w-full max-w-3xl aspect-[3/2]' : ''
          } ${
            isCertificatePage ? 'certificate-screen-only' : ''
          }`}
        >
          <ImageWithFallback
            src={sectionImageSrc ?? page.image}
            alt={page.title}
            className={
              usesSectionImageTreatment ? 'w-full h-full object-cover object-center' :
              'w-full h-56 object-cover'
            }
            style={
              usesSectionImageTreatment
                ? { filter: 'contrast(1.05) saturate(1.1) brightness(1.02)' }
                : undefined
            }
          />
        </div>
      )}

      <AccountantRoleVisual pageId={page.id} />

      <ThreeStagesVisual pageId={page.id} numberedTreatment={numberedTreatment} />

      <AssistantsAgentsVisual pageId={page.id} />

      <CoreAgentWorkflowsVisual pageId={page.id} getIcon={getIcon} />

      <AgentMaturityVisual pageId={page.id} numberedTreatment={numberedTreatment} />

      {isGlossaryPage ? (
        <GlossaryExperience page={page} userInput={userInput} onInputChange={onInputChange} />
      ) : isPromptLibraryPage ? (
        <PromptLibraryExperience page={page} userInput={userInput} onInputChange={onInputChange} />
      ) : (
      /* Content Blocks */
      <GenericContentRenderer
        page={page}
        numberedTreatment={numberedTreatment}
        getIcon={getIcon}
      />
      )}

      {isWorkflowMapPage && page.activity && (
        <WorkflowMapperExperience page={page} userInput={userInput} onInputChange={onInputChange} />
      )}

      {isAgentSpecWizardPage && page.activity && page.activity.specFields && (
        <AgentSpecificationExperience page={page} userInput={userInput} onInputChange={onInputChange} />
      )}

      {isToolMatrixPage && page.activity && (
        <ToolMatrixExperience page={page} userInput={userInput} onInputChange={onInputChange} />
      )}

      {/* Interactive Activity */}
      {page.activity && !isPromptLibraryPage && !isWorkflowMapPage && !isAgentSpecWizardPage && !isToolMatrixPage && (
        <GenericActivityRenderer page={page} userInput={userInput} onInputChange={onInputChange} />
      )}

      {/* Certificate Download Button */}
      {page.id === 'certificate' && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-6 certificate-screen-only"
        >
          <button
            onClick={handleCertificatePrint}
            className="certificate-print-button w-full group inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#00DC51] text-black font-black rounded-xl hover:bg-[#00FF5F] transition-all shadow-lg shadow-[#00DC51]/40 hover:shadow-[#00DC51]/60 hover:scale-105 text-base"
          >
            <Download size={22} strokeWidth={2.5} />
            <span>Download Certificate</span>
          </button>
          <p className="text-xs text-white/50 text-center mt-3 font-medium">
            Click to print or save as PDF
          </p>
        </motion.div>
      )}

      {/* Key Takeaway */}
      {page.takeaway && (usesTakeawayBand ? (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className={`grid grid-cols-[48px_1fr] overflow-hidden rounded-2xl border-[1.5px] accent-border bg-[var(--color-surface-1)] sm:grid-cols-[64px_1fr] ${isCertificatePage ? 'certificate-screen-only' : ''}`}
        >
          <div className="accent-bg flex min-h-full items-center justify-center">
            <Zap className="text-black" size={24} strokeWidth={2.6} aria-hidden="true" />
          </div>
          <div className="p-5 sm:p-6">
            <div className="playbook-page-eyebrow mb-2">Key Takeaway</div>
            <p className="text-base font-bold leading-relaxed text-white sm:text-lg">{resolvedTakeaway}</p>
          </div>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className={`border-b border-b-[var(--color-rule)] border-t-[3px] border-t-[var(--color-accent)] py-6 sm:py-7 ${isCertificatePage ? 'certificate-screen-only' : ''}`}
        >
          <div className="playbook-page-eyebrow mb-3">Key Takeaway</div>
          <p className="playbook-component-title max-w-4xl text-white">{resolvedTakeaway}</p>
        </motion.div>
      ))}
    </div>
  );
}
