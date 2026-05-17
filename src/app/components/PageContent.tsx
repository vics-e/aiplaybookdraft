import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, Shield, Bot, MessageSquare, DollarSign, Calendar, FileText, CheckCircle, Lightbulb, Target, Zap, X, TrendingUp, Users, Download, ClipboardList, AlertCircle, ArrowRight, Database, Eye, Sparkles, ChevronDown, Lock, UserX, FileWarning, Users as UsersIcon, HelpCircle, Ban, XCircle } from 'lucide-react';
import type { PlaybookPage } from '../data/playbookData';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { ActivitySummary } from './ActivitySummary';
import coverBackground from 'figma:asset/7d10c58b13d65e57e14197ae9cce3c931f5cc649.png';
import sageLogo from 'figma:asset/85dce1db2c171f8d15f5e966d3ca5f37099a8078.png';
import aiAssistedFirmsImage from 'figma:asset/c4dcd24a1a26454f51b76968c451f7d30c463cc8.png';
import aiDividendImage from 'figma:asset/401a764ba6882b8cc4eaee28ab8349b4feeb6652.png';

interface PageContentProps {
  page: PlaybookPage;
  userInput: string;
  onInputChange: (value: string) => void;
  goToPage: (page: number) => void;
  pageInputs?: Record<string, string>;
  onUpdatePageInput?: (pageId: string, value: string) => void;
}

export function PageContent({ page, userInput, onInputChange, goToPage, pageInputs, onUpdatePageInput }: PageContentProps) {
  const [expandedItems, setExpandedItems] = useState<Set<number>>(new Set([0]));
  const [checkedItems, setCheckedItems] = useState<Set<number>>(new Set());

  const toggleExpanded = (index: number) => {
    setExpandedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };

  const toggleChecked = (index: number) => {
    setCheckedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };

  const getIcon = (iconName: string) => {
    const icons: Record<string, any> = {
      BookOpen, Shield, Bot, MessageSquare, DollarSign, Calendar, FileText,
      CheckCircle, Lightbulb, Target, Zap, X, TrendingUp, Users, Download, ClipboardList
    };
    return icons[iconName] || BookOpen;
  };

  // Helper to render title with green highlights
  const renderTitle = (title: string) => {
    return title.split('**').map((part, i) => 
      i % 2 === 1 ? (
        <span key={i} className="relative inline-block">
          <span className="relative z-10">{part}</span>
          <span className="absolute bottom-1 left-0 right-0 h-3 bg-[#00DC51] -z-10 opacity-30" />
        </span>
      ) : part
    );
  };

  if (page.type === 'cover') {
    return (
      <div className="relative flex flex-col h-full overflow-hidden bg-black">
        {/* Background Image - Full Cover */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img 
            src={coverBackground} 
            alt="" 
            className="absolute w-full h-full object-cover"
          />
        </div>

        {/* Content Container - Flexbox Layout */}
        <div className="relative z-10 flex flex-col h-full px-16 pt-24">
          {/* Title Section - Top */}
          <div className="flex-shrink-0 mb-12">
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="leading-[0.9] tracking-tight"
              style={{ fontFamily: 'var(--font-family-header)', fontWeight: 900 }}
            >
              <div className="text-6xl lg:text-7xl font-black text-white mb-3">
                THE AI PLAYBOOK
              </div>
              <div className="text-6xl lg:text-7xl font-black text-[#00DC51] leading-[0.9]">
                For Accountants &<br />
                Bookkeepers
              </div>
            </motion.h1>
          </div>

          {/* Subtitle */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex-shrink-0 max-w-2xl mb-12"
          >
            <p className="text-base text-white/95 leading-relaxed font-medium">
              From assistants to agents: building the AI-ready firm.<br />
              Artificial intelligence is now part of everyday accountancy.
            </p>
          </motion.div>

          {/* Spacer to push button down */}
          <div className="flex-grow" />

          {/* Start Playbook Button - Bottom Left */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="flex-shrink-0 pb-24"
          >
            <button
              onClick={() => goToPage(1)}
              className="group inline-flex items-center gap-2.5 px-8 py-3.5 bg-[#00DC51] text-black font-black rounded-full hover:bg-[#00FF5F] transition-all shadow-lg shadow-[#00DC51]/40 hover:shadow-[#00DC51]/60 hover:scale-105 text-base"
              style={{ fontFamily: 'var(--font-family-body)' }}
            >
              <span>Start Playbook</span>
              <span className="text-xl font-black group-hover:translate-x-1 transition-transform">→</span>
            </button>
          </motion.div>
        </div>

        {/* Sage Logo - Bottom Right Corner */}
        <motion.img 
          src={sageLogo} 
          alt="Sage" 
          className="absolute bottom-4 right-8 h-14 w-auto z-20"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
        />
      </div>
    );
  }

  if (page.type === 'contents') {
    return (
      <div className="h-full flex flex-col justify-center">
        <div className="text-center mb-8">
          <h2 className="text-4xl md:text-5xl font-black mb-3 tracking-tight" style={{ fontFamily: 'var(--font-family-header)' }}>Contents</h2>
          <p className="text-lg text-white/70 font-medium mb-2">Your roadmap to AI adoption</p>
          <p className="text-sm text-white/50 font-medium max-w-2xl mx-auto">
            This playbook is designed to help firms move from experimentation to structured, confident adoption.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 max-w-6xl mx-auto overflow-y-auto max-h-[60vh] pr-4 custom-scrollbar">
          {page.sections?.map((section, index) => {
            const Icon = getIcon(section.icon);
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.4 }}
                className="group bg-white/[0.03] border-2 border-white/10 rounded-xl p-5 hover:bg-white/[0.06] hover:border-[#00DC51]/50 transition-all cursor-pointer"
                onClick={() => goToPage(section.pageNumber)}
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#00DC51]/15 rounded-xl flex items-center justify-center flex-shrink-0 border border-[#00DC51]/30 group-hover:bg-[#00DC51]/25 group-hover:scale-110 transition-all">
                    <Icon className="text-[#00DC51]" size={22} strokeWidth={2.5} />
                  </div>
                  <div className="flex-1">
                    {section.sectionLabel && (
                      <p className="text-[#00DC51] font-black text-xs uppercase tracking-wider mb-1">{section.sectionLabel}</p>
                    )}
                    <h3 className="font-bold text-base mb-0.5 group-hover:text-[#00DC51] transition-colors">{section.title}</h3>
                    <p className="text-xs text-white/50 font-medium">{section.pages}</p>
                  </div>
                  <div className="text-[#00DC51] font-black text-sm tabular-nums">{section.pageNumber}</div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    );
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
    <div className="space-y-8">
      {/* Section Badge */}
      {page.section && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-block px-4 py-2 bg-[#00DC51]/15 border-2 border-[#00DC51]/40 rounded-full backdrop-blur-sm"
        >
          <span className="text-[#00DC51] font-bold text-xs tracking-wide uppercase">{page.section}</span>
        </motion.div>
      )}

      {/* Title */}
      <div>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-black mb-4 leading-[1.05] tracking-tight" style={{ fontFamily: 'var(--font-family-header)' }}>
          {renderTitle(page.title)}
        </h2>

        {/* Subtitle */}
        {page.subtitle && (
          <p className="text-base md:text-lg text-white/70 font-medium leading-relaxed">{page.subtitle}</p>
        )}
      </div>

      {/* Image */}
      {page.image && page.id !== 's3-difference' && page.id !== 's1-stages' && (
        <div className="rounded-2xl overflow-hidden border-2 border-white/10 shadow-2xl shadow-black/50">
          <ImageWithFallback
            src={page.id === 's1-intro' ? aiAssistedFirmsImage : page.id === 's5-dividend' ? aiDividendImage : page.image}
            alt={page.title}
            className={
              page.id === 's1-intro' ? 'w-full h-96 object-cover object-center' : 
              page.id === 's5-dividend' ? 'w-full h-80 object-cover object-center' :
              'w-full h-56 object-cover'
            }
            style={
              page.id === 's1-intro' || page.id === 's5-dividend' 
                ? { filter: 'contrast(1.05) saturate(1.1) brightness(1.02)' } 
                : undefined
            }
          />
        </div>
      )}

      {/* Custom Graphic for New Role of the Accountant */}
      {page.id === 's1-role' && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          {/* What AI Can Do vs What Accountants Must Do */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* AI Can Do Well */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="bg-white/5 border-2 border-white/20 rounded-xl p-6 hover:border-white/40 transition-all"
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center border-2 border-blue-400/50">
                  <Bot className="text-blue-400" size={24} strokeWidth={2.5} />
                </div>
                <h4 className="font-black text-lg">What AI Can Do Well</h4>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start gap-3 group">
                  <div className="w-6 h-6 bg-blue-500/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 border border-blue-400/30 group-hover:bg-blue-500/30 transition-all">
                    <CheckCircle className="text-blue-400" size={14} strokeWidth={3} />
                  </div>
                  <p className="text-sm text-white/80 font-medium leading-relaxed">Draft communications</p>
                </li>
                <li className="flex items-start gap-3 group">
                  <div className="w-6 h-6 bg-blue-500/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 border border-blue-400/30 group-hover:bg-blue-500/30 transition-all">
                    <CheckCircle className="text-blue-400" size={14} strokeWidth={3} />
                  </div>
                  <p className="text-sm text-white/80 font-medium leading-relaxed">Summarize data</p>
                </li>
                <li className="flex items-start gap-3 group">
                  <div className="w-6 h-6 bg-blue-500/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 border border-blue-400/30 group-hover:bg-blue-500/30 transition-all">
                    <CheckCircle className="text-blue-400" size={14} strokeWidth={3} />
                  </div>
                  <p className="text-sm text-white/80 font-medium leading-relaxed">Check consistency</p>
                </li>
                <li className="flex items-start gap-3 group">
                  <div className="w-6 h-6 bg-blue-500/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 border border-blue-400/30 group-hover:bg-blue-500/30 transition-all">
                    <CheckCircle className="text-blue-400" size={14} strokeWidth={3} />
                  </div>
                  <p className="text-sm text-white/80 font-medium leading-relaxed">Spot errors</p>
                </li>
                <li className="flex items-start gap-3 group">
                  <div className="w-6 h-6 bg-blue-500/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 border border-blue-400/30 group-hover:bg-blue-500/30 transition-all">
                    <CheckCircle className="text-blue-400" size={14} strokeWidth={3} />
                  </div>
                  <p className="text-sm text-white/80 font-medium leading-relaxed">Prepare reports</p>
                </li>
                <li className="flex items-start gap-3 group">
                  <div className="w-6 h-6 bg-blue-500/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 border border-blue-400/30 group-hover:bg-blue-500/30 transition-all">
                    <CheckCircle className="text-blue-400" size={14} strokeWidth={3} />
                  </div>
                  <p className="text-sm text-white/80 font-medium leading-relaxed">Follow workflows</p>
                </li>
              </ul>
            </motion.div>

            {/* What Accountants Must Do */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="bg-[#00DC51]/10 border-2 border-[#00DC51] rounded-xl p-6 shadow-lg shadow-[#00DC51]/20 hover:shadow-[#00DC51]/30 transition-all"
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="w-12 h-12 bg-[#00DC51]/30 rounded-xl flex items-center justify-center border-2 border-[#00DC51]">
                  <Target className="text-[#00DC51]" size={24} strokeWidth={2.5} />
                </div>
                <h4 className="font-black text-lg text-[#00DC51]">What Accountants Must Still Do</h4>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start gap-3 group">
                  <div className="w-6 h-6 bg-[#00DC51]/30 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 border border-[#00DC51] group-hover:bg-[#00DC51]/40 transition-all">
                    <AlertCircle className="text-[#00DC51]" size={14} strokeWidth={3} />
                  </div>
                  <p className="text-sm text-white/80 font-medium leading-relaxed">Apply judgement</p>
                </li>
                <li className="flex items-start gap-3 group">
                  <div className="w-6 h-6 bg-[#00DC51]/30 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 border border-[#00DC51] group-hover:bg-[#00DC51]/40 transition-all">
                    <AlertCircle className="text-[#00DC51]" size={14} strokeWidth={3} />
                  </div>
                  <p className="text-sm text-white/80 font-medium leading-relaxed">Make decisions</p>
                </li>
                <li className="flex items-start gap-3 group">
                  <div className="w-6 h-6 bg-[#00DC51]/30 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 border border-[#00DC51] group-hover:bg-[#00DC51]/40 transition-all">
                    <AlertCircle className="text-[#00DC51]" size={14} strokeWidth={3} />
                  </div>
                  <p className="text-sm text-white/80 font-medium leading-relaxed">Interpret context</p>
                </li>
                <li className="flex items-start gap-3 group">
                  <div className="w-6 h-6 bg-[#00DC51]/30 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 border border-[#00DC51] group-hover:bg-[#00DC51]/40 transition-all">
                    <AlertCircle className="text-[#00DC51]" size={14} strokeWidth={3} />
                  </div>
                  <p className="text-sm text-white/80 font-medium leading-relaxed">Advise clients</p>
                </li>
                <li className="flex items-start gap-3 group">
                  <div className="w-6 h-6 bg-[#00DC51]/30 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 border border-[#00DC51] group-hover:bg-[#00DC51]/40 transition-all">
                    <AlertCircle className="text-[#00DC51]" size={14} strokeWidth={3} />
                  </div>
                  <p className="text-sm text-white/80 font-medium leading-relaxed">Strengthen relationships</p>
                </li>
                <li className="flex items-start gap-3 group">
                  <div className="w-6 h-6 bg-[#00DC51]/30 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 border border-[#00DC51] group-hover:bg-[#00DC51]/40 transition-all">
                    <AlertCircle className="text-[#00DC51]" size={14} strokeWidth={3} />
                  </div>
                  <p className="text-sm text-white/80 font-medium leading-relaxed">Take responsibility</p>
                </li>
              </ul>
            </motion.div>
          </div>

          {/* The Shift - Enhanced Visual */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="rounded-2xl overflow-hidden border-2 border-[#00DC51]/40 shadow-2xl shadow-[#00DC51]/20 bg-gradient-to-br from-[#00DC51]/10 to-[#00DC51]/5 p-8"
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-[#00DC51] rounded-xl flex items-center justify-center shadow-lg shadow-[#00DC51]/40">
                <TrendingUp className="text-black" size={24} strokeWidth={2.5} />
              </div>
              <h4 className="font-black text-xl text-[#00DC51]">The Shift</h4>
            </div>
            
            <div className="flex items-center gap-3 justify-between">
              {/* Stage 1: Processor */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.4 }}
                className="bg-gradient-to-br from-white/10 to-white/5 border-2 border-white/30 rounded-xl p-5 text-center flex-1 shadow-lg"
              >
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 1, duration: 0.5, type: "spring" }}
                  className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mx-auto mb-3 border border-white/40"
                >
                  <Database className="text-white" size={24} strokeWidth={2.5} />
                </motion.div>
                <p className="font-black text-lg text-white">Processor</p>
                <p className="text-xs text-white/70 font-semibold mt-2">Data Handler</p>
                <p className="text-xs text-white/50 mt-3 leading-relaxed">Enters & manages data</p>
              </motion.div>

              {/* Arrow 1 */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.1, duration: 0.4 }}
                className="flex items-center gap-1 flex-shrink-0"
              >
                <div className="h-px w-8 bg-gradient-to-r from-white/30 to-white/50"></div>
                <ArrowRight className="text-white/50" size={28} strokeWidth={3} />
                <div className="h-px w-8 bg-gradient-to-r from-white/50 to-white/30"></div>
              </motion.div>

              {/* Stage 2: Reviewer */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.4 }}
                className="bg-gradient-to-br from-white/15 to-white/8 border-2 border-white/40 rounded-xl p-5 text-center flex-1 shadow-lg"
              >
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 1.4, duration: 0.5, type: "spring" }}
                  className="w-12 h-12 bg-white/25 rounded-lg flex items-center justify-center mx-auto mb-3 border border-white/50"
                >
                  <Eye className="text-white" size={24} strokeWidth={2.5} />
                </motion.div>
                <p className="font-black text-lg text-white">Reviewer</p>
                <p className="text-xs text-white/80 font-semibold mt-2">Insight Provider</p>
                <p className="text-xs text-white/60 mt-3 leading-relaxed">Validates & spots patterns</p>
              </motion.div>

              {/* Arrow 2 */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.5, duration: 0.4 }}
                className="flex items-center gap-1 flex-shrink-0"
              >
                <div className="h-px w-8 bg-gradient-to-r from-white/40 to-[#00DC51]/60"></div>
                <ArrowRight className="text-[#00DC51]" size={28} strokeWidth={3} />
                <div className="h-px w-8 bg-gradient-to-r from-[#00DC51]/60 to-[#00DC51]/40"></div>
              </motion.div>

              {/* Stage 3: Adviser */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.6, duration: 0.4 }}
                className="bg-gradient-to-br from-[#00DC51]/30 to-[#00DC51]/15 border-2 border-[#00DC51] rounded-xl p-5 text-center shadow-xl shadow-[#00DC51]/40 flex-1"
              >
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 1.8, duration: 0.5, type: "spring" }}
                  className="w-12 h-12 bg-[#00DC51]/40 rounded-lg flex items-center justify-center mx-auto mb-3 border border-[#00DC51]"
                >
                  <Sparkles className="text-[#00DC51]" size={24} strokeWidth={2.5} />
                </motion.div>
                <p className="font-black text-lg text-[#00DC51]">Adviser</p>
                <p className="text-xs text-[#00DC51]/90 font-bold mt-2">Trusted Partner</p>
                <p className="text-xs text-[#00DC51]/70 mt-3 leading-relaxed">Provides strategy & growth</p>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Custom Graphic for Three Stages */}
      {page.id === 's1-stages' && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="rounded-2xl overflow-hidden border-2 border-white/10 shadow-2xl shadow-black/50 bg-gradient-to-br from-white/[0.03] to-white/[0.01] p-8"
        >
          <div className="grid md:grid-cols-3 gap-6 relative">
            {/* Stage 1 - Automation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="bg-white/5 border-2 border-white/20 rounded-xl p-6 flex flex-col hover:border-white/40 transition-all"
            >
              <div className="flex flex-col items-center text-center mb-4">
                <div className="w-20 h-20 bg-white/10 rounded-2xl flex items-center justify-center mb-4 border-2 border-white/30">
                  <div className="text-white font-black text-sm">Step 1</div>
                </div>
                <h3 className="text-2xl font-black mb-3">Automation</h3>
                <p className="text-sm text-white/70 font-medium leading-relaxed">Rules-based systems: bank feeds, automated postings, OCR. Predictable but limited.</p>
              </div>
            </motion.div>

            {/* Arrow 1 */}
            <div className="hidden md:flex absolute top-[120px] left-[30%] items-center justify-center pointer-events-none z-10">
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="text-[#00DC51] font-black text-2xl"
              >
                →
              </motion.div>
            </div>

            {/* Stage 2 - AI Assistants */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="bg-white/5 border-2 border-[#00DC51]/30 rounded-xl p-6 flex flex-col hover:border-[#00DC51]/50 transition-all"
            >
              <div className="flex flex-col items-center text-center mb-4">
                <div className="w-20 h-20 bg-[#00DC51]/20 rounded-2xl flex items-center justify-center mb-4 border-2 border-[#00DC51]/40">
                  <div className="text-[#00DC51] font-black text-sm">Step 2</div>
                </div>
                <h3 className="text-2xl font-black mb-3 text-white">AI Assistants</h3>
                <p className="text-sm text-white/70 font-medium leading-relaxed">AI helps with tasks: drafting emails, summarizing info, explaining figures. Requires prompts and human direction.</p>
              </div>
            </motion.div>

            {/* Arrow 2 */}
            <div className="hidden md:flex absolute top-[120px] left-[63.5%] items-center justify-center pointer-events-none z-10">
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="text-[#00DC51] font-black text-2xl"
              >
                →
              </motion.div>
            </div>

            {/* Stage 3 - AI Agents */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="bg-[#00DC51]/10 border-2 border-[#00DC51] rounded-xl p-6 flex flex-col shadow-lg shadow-[#00DC51]/20 hover:shadow-[#00DC51]/30 transition-all"
            >
              <div className="flex flex-col items-center text-center mb-4">
                <div className="w-20 h-20 bg-[#00DC51]/30 rounded-2xl flex items-center justify-center mb-4 border-2 border-[#00DC51] shadow-lg shadow-[#00DC51]/30">
                  <div className="text-[#00DC51] font-black text-sm">Step 3</div>
                </div>
                <h3 className="text-2xl font-black mb-3 text-[#00DC51]">AI Agents</h3>
                <p className="text-sm text-white/70 font-medium leading-relaxed">AI operates with a defined goal: performs multiple steps, works inside systems, presents results for approval.</p>
              </div>
            </motion.div>
          </div>

          {/* Evolution Label */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="flex items-center justify-center mt-6"
          >
            <div className="flex items-center gap-3">
              <div className="h-px w-12 bg-gradient-to-r from-white/20 to-[#00DC51]/40" />
              <div className="text-xs font-black text-white/40 uppercase tracking-wider">Evolution of AI</div>
              <div className="h-px w-12 bg-gradient-to-r from-[#00DC51]/40 to-[#00DC51]" />
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Custom Graphic for Assistants vs Agents */}
      {page.id === 's3-difference' && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="rounded-2xl overflow-hidden border-2 border-white/10 shadow-2xl shadow-black/50 bg-gradient-to-br from-white/[0.03] to-white/[0.01] p-8"
        >
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            {/* AI Assistant */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="bg-blue-500/10 border-2 border-blue-400/40 rounded-xl p-6 flex flex-col shadow-lg shadow-blue-500/10 hover:border-blue-400/60 transition-all"
            >
              <div className="flex flex-col h-full">
                <div className="w-14 h-14 bg-blue-500/20 rounded-xl flex items-center justify-center mb-4 border-2 border-blue-400/50 shadow-lg shadow-blue-500/20">
                  <MessageSquare className="text-blue-400" size={26} strokeWidth={2.5} />
                </div>
                <h3 className="text-2xl font-black mb-2 text-blue-400">AI Assistant</h3>
                
                {/* Subtitle */}
                <div className="mb-4 pb-4 border-b border-blue-400/20">
                  <p className="text-sm font-bold text-blue-400/80 italic">
                    Assistants respond to what you ask.
                  </p>
                </div>
                
                <p className="text-sm text-white/80 font-medium leading-relaxed mb-5">
                  You drive the process. AI responds to prompts and helps with tasks along the way. You remain in control at every step.
                </p>
                
                {/* Examples */}
                <div className="bg-blue-500/20 border-2 border-blue-400/30 rounded-lg p-4 mt-auto">
                  <div className="text-xs font-black text-blue-400 uppercase tracking-wider mb-3">Examples in Practice</div>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <div className="w-1 h-1 bg-blue-400 rounded-full flex-shrink-0 mt-1.5 shadow-[0_0_4px_rgba(96,165,250,0.8)]" />
                      <p className="text-xs text-white/80 font-medium leading-relaxed">
                        "Summarise this client email"
                      </p>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1 h-1 bg-blue-400 rounded-full flex-shrink-0 mt-1.5 shadow-[0_0_4px_rgba(96,165,250,0.8)]" />
                      <p className="text-xs text-white/80 font-medium leading-relaxed">
                        "Draft a response to this query"
                      </p>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1 h-1 bg-blue-400 rounded-full flex-shrink-0 mt-1.5 shadow-[0_0_4px_rgba(96,165,250,0.8)]" />
                      <p className="text-xs text-white/80 font-medium leading-relaxed">
                        "Explain this variance"
                      </p>
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>

            {/* AI Agent */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="bg-[#00DC51]/10 border-2 border-[#00DC51] rounded-xl p-6 flex flex-col shadow-lg shadow-[#00DC51]/20 hover:shadow-[#00DC51]/30 transition-all"
            >
              <div className="flex flex-col h-full">
                <div className="w-14 h-14 bg-[#00DC51]/30 rounded-xl flex items-center justify-center mb-4 border-2 border-[#00DC51] shadow-lg shadow-[#00DC51]/30">
                  <Bot className="text-[#00DC51]" size={26} strokeWidth={2.5} />
                </div>
                <h3 className="text-2xl font-black mb-2 text-[#00DC51]">AI Agent</h3>
                
                {/* Subtitle */}
                <div className="mb-4 pb-4 border-b border-[#00DC51]/20">
                  <p className="text-sm font-bold text-[#00DC51]/80 italic">
                    Agents work toward what you want to achieve.
                  </p>
                </div>
                
                <p className="text-sm text-white/80 font-medium leading-relaxed mb-5">
                  Agent works autonomously toward a goal. It determines the steps, performs actions within guardrails, and presents results for your review.
                </p>
                
                {/* Examples */}
                <div className="bg-[#00DC51]/20 border-2 border-[#00DC51]/30 rounded-lg p-4 mt-auto">
                  <div className="text-xs font-black text-[#00DC51] uppercase tracking-wider mb-3">Examples in Practice</div>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <div className="w-1 h-1 bg-[#00DC51] rounded-full flex-shrink-0 mt-1.5 shadow-[0_0_4px_rgba(0,220,81,0.8)]" />
                      <p className="text-xs text-white/80 font-medium leading-relaxed">
                        "Prepare the quarterly update for Client X, identify any issues, and draft the client communication"
                      </p>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1 h-1 bg-[#00DC51] rounded-full flex-shrink-0 mt-1.5 shadow-[0_0_4px_rgba(0,220,81,0.8)]" />
                      <p className="text-xs text-white/80 font-medium leading-relaxed">
                        "Review all outstanding items for clients in Group A, send reminders where needed, and flag urgent cases"
                      </p>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1 h-1 bg-[#00DC51] rounded-full flex-shrink-0 mt-1.5 shadow-[0_0_4px_rgba(0,220,81,0.8)]" />
                      <p className="text-xs text-white/80 font-medium leading-relaxed">
                        "Complete the month-end close checks and prepare the management report"
                      </p>
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}

      {/* Custom Interactive Graphic for Core Agent Workflows */}
      {page.id === 's3-workflows' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          <div className="text-sm text-white/70 font-medium leading-relaxed mb-6">
            These four workflows represent the most common agent applications in accountancy firms. Click each workflow to explore its details.
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {[
              {
                num: 1,
                title: 'Quarterly Update Preparation',
                icon: 'Calendar',
                goal: 'Prepare a draft quarterly business review for the accountant to review and finalise.',
                actions: [
                  'Collect management accounts, bank statements, and prior quarter comparisons',
                  'Check completeness of data (missing months, incomplete records)',
                  'Analyse revenue and cost trends vs. prior periods',
                  'Identify significant variances (e.g., revenue down 15%, costs up 20%)',
                  'Flag anomalies or unexpected movements',
                  'Prepare draft commentary explaining key changes',
                  'Generate summary report with charts and comparisons'
                ],
                review: 'Accountant reviews the analysis, applies judgement to explanations, adds context, and approves the final update before sending to the client.'
              },
              {
                num: 2,
                title: 'Period-End Preparation',
                icon: 'FileText',
                goal: 'Prepare year-end or period-end workpapers and identify items requiring accountant attention.',
                actions: [
                  'Review general ledger for the period',
                  'Identify unusual postings or out-of-pattern transactions',
                  'Perform variance analysis against budget or prior period',
                  'Check for incomplete journal entries or missing descriptions',
                  'Prepare reconciliation workpapers',
                  'Draft variance explanations based on data patterns',
                  'Flag items requiring professional judgement (e.g., provisions, accruals)'
                ],
                review: 'Accountant reviews the workpapers, validates variance explanations, applies professional judgement to flagged items, and finalises the close.'
              },
              {
                num: 3,
                title: 'Client Onboarding',
                icon: 'Users',
                goal: 'Complete the client onboarding process and ensure all required information is collected and verified.',
                actions: [
                  'Send initial welcome email and information request to new client',
                  'Track receipt of requested documents (ID, company records, bank details, etc.)',
                  'Perform completeness checks against onboarding checklist',
                  'Follow up on missing items with reminder emails',
                  'Verify information format and completeness (e.g., correct file types, readable scans)',
                  'Prepare onboarding status report showing what\'s complete and what\'s outstanding',
                  'Escalate to accountant if client is non-responsive after multiple reminders'
                ],
                review: 'Accountant reviews the completed onboarding file, confirms all compliance checks are satisfied, and approves the client for active service.'
              },
              {
                num: 4,
                title: 'Client Chaser (Outstanding Items)',
                icon: 'ClipboardList',
                goal: 'Manage and chase outstanding client items until resolved or escalated.',
                actions: [
                  'Monitor list of outstanding items (missing invoices, unsigned documents, overdue information)',
                  'Send polite reminder emails at defined intervals (e.g., 7 days, 14 days)',
                  'Track client responses and update status',
                  'Identify items that remain outstanding beyond firm thresholds',
                  'Escalate to accountant when: client is unresponsive, item is critical and overdue, or deadline is approaching',
                  'Log all communications and status updates in client file'
                ],
                review: 'Accountant reviews escalated items and decides whether to contact the client directly, adjust timelines, or take other action.'
              }
            ].map((workflow, index) => {
              const [isExpanded, setIsExpanded] = React.useState(false);
              const Icon = getIcon(workflow.icon);

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.4 }}
                  className="group"
                >
                  <motion.div
                    animate={{
                      y: isExpanded ? 0 : [0, -4, 0],
                    }}
                    transition={{
                      y: {
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: index * 0.3
                      }
                    }}
                    className={`bg-gradient-to-br from-white/[0.08] to-white/[0.03] border-2 rounded-xl p-5 cursor-pointer transition-all ${
                      isExpanded
                        ? 'border-[#00DC51] shadow-xl shadow-[#00DC51]/20'
                        : 'border-white/20 hover:border-[#00DC51]/50 hover:shadow-lg hover:shadow-[#00DC51]/10'
                    }`}
                    onClick={() => setIsExpanded(!isExpanded)}
                  >
                    {/* Header */}
                    <div className="flex items-start gap-4 mb-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 border-2 transition-all ${
                        isExpanded
                          ? 'bg-[#00DC51] border-[#00DC51] shadow-lg shadow-[#00DC51]/40'
                          : 'bg-white/10 border-white/30'
                      }`}>
                        {isExpanded ? (
                          <Icon className="text-black" size={22} strokeWidth={2.5} />
                        ) : (
                          <span className="text-white font-black text-sm">{workflow.num}</span>
                        )}
                      </div>
                      <div className="flex-1">
                        <h4 className={`font-black text-base mb-1 transition-colors ${
                          isExpanded ? 'text-[#00DC51]' : 'text-white'
                        }`}>
                          {workflow.title}
                        </h4>
                        <p className="text-xs text-white/60 font-medium leading-relaxed">
                          {workflow.goal}
                        </p>
                      </div>
                      <motion.div
                        animate={{ rotate: isExpanded ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                        className="flex-shrink-0"
                      >
                        <ArrowRight className={`transition-colors ${
                          isExpanded ? 'text-[#00DC51]' : 'text-white/40'
                        }`} size={20} strokeWidth={2.5} style={{ transform: 'rotate(90deg)' }} />
                      </motion.div>
                    </div>

                    {/* Expandable Content */}
                    <motion.div
                      initial={false}
                      animate={{
                        height: isExpanded ? 'auto' : 0,
                        opacity: isExpanded ? 1 : 0
                      }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="pt-4 border-t border-white/10 space-y-4">
                        {/* Agent Actions */}
                        <div>
                          <div className="flex items-center gap-2 mb-3">
                            <Bot className="text-[#00DC51]" size={16} strokeWidth={2.5} />
                            <span className="text-xs font-black text-[#00DC51] uppercase tracking-wider">Agent Actions</span>
                          </div>
                          <div className="space-y-2 pl-1">
                            {workflow.actions.map((action, i) => (
                              <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.1 + (i * 0.05), duration: 0.3 }}
                                className="flex items-start gap-2"
                              >
                                <div className="w-1 h-1 bg-[#00DC51] rounded-full flex-shrink-0 mt-1.5 shadow-[0_0_4px_rgba(0,220,81,0.8)]" />
                                <p className="text-xs text-white/70 font-medium leading-relaxed">{action}</p>
                              </motion.div>
                            ))}
                          </div>
                        </div>

                        {/* Review Point */}
                        <div className="bg-[#00DC51]/10 border-2 border-[#00DC51]/30 rounded-lg p-3">
                          <div className="flex items-center gap-2 mb-2">
                            <Eye className="text-[#00DC51]" size={14} strokeWidth={2.5} />
                            <span className="text-xs font-black text-[#00DC51] uppercase tracking-wider">Review Point</span>
                          </div>
                          <p className="text-xs text-white/80 font-medium leading-relaxed">
                            {workflow.review}
                          </p>
                        </div>
                      </div>
                    </motion.div>

                    {/* Click prompt when collapsed */}
                    {!isExpanded && (
                      <div className="mt-3 text-xs text-white/40 font-medium text-center">
                        Click to expand details
                      </div>
                    )}
                  </motion.div>
                </motion.div>
              );
            })}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="relative bg-gradient-to-r from-[#00DC51]/15 to-transparent border-l-4 border-[#00DC51] rounded-r-xl p-5 backdrop-blur-sm"
          >
            <p className="font-bold text-base leading-relaxed">
              Each workflow has a clear outcome, structured steps, and human oversight. The agent performs the process; the accountant reviews and approves the result.
            </p>
          </motion.div>
        </motion.div>
      )}

      {/* Custom Interactive Graphic for Agent Maturity Ladder - Timeline Scrubber */}
      {page.id === 's3-maturity' && (() => {
        const stages = [
          {
            stage: 'Stage 1',
            title: 'Prompts',
            desc: 'Staff use AI to answer questions or draft text. Work is still entirely human-led.',
            shortLabel: 'Prompts'
          },
          {
            stage: 'Stage 2',
            title: 'Assistants',
            desc: 'AI is used regularly for defined tasks. It helps with drafting, checking, and summarising, while the accountant remains in control.',
            shortLabel: 'Assistants'
          },
          {
            stage: 'Stage 3',
            title: 'Workflow Packs',
            desc: 'Prompts, checklists, and processes are standardised across the firm. Work becomes more consistent and repeatable.',
            shortLabel: 'Workflow Packs'
          },
          {
            stage: 'Stage 4',
            title: 'Agents',
            desc: 'AI operates inside systems to achieve defined goals or outputs. It can perform multiple steps, gather information, carry out checks, and prepare results for review.',
            shortLabel: 'Agents'
          },
          {
            stage: 'Stage 5',
            title: 'Orchestrated Agents',
            desc: 'Multiple agents work together across systems. They coordinate tasks, share data, and deliver end-to-end outcomes across entire workflows.',
            shortLabel: 'Orchestrated'
          }
        ];

        const [currentStage, setCurrentStage] = React.useState(0);

        const handleTrackClick = (e: React.MouseEvent<HTMLDivElement>) => {
          const rect = e.currentTarget.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const percentage = x / rect.width;
          const stageIndex = Math.min(Math.floor(percentage * stages.length), stages.length - 1);
          setCurrentStage(stageIndex);
        };

        const progressPercentage = (currentStage / (stages.length - 1)) * 100;

        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            {/* Timeline Track */}
            <div className="space-y-6">
              {/* Track */}
              <div
                className="relative h-3 bg-white/10 rounded-full cursor-pointer group"
                onClick={handleTrackClick}
              >
                {/* Fill */}
                <motion.div
                  className="absolute left-0 top-0 h-full bg-gradient-to-r from-[#00DC51]/60 to-[#00DC51] rounded-full"
                  initial={{ width: '0%' }}
                  animate={{ width: `${progressPercentage}%` }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                />

                {/* Thumb */}
                <motion.div
                  className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-7 h-7 bg-[#00DC51] rounded-full border-4 border-black shadow-lg shadow-[#00DC51]/40"
                  initial={{ left: '0%' }}
                  animate={{
                    left: `${progressPercentage}%`,
                    scale: [1, 1.2, 1]
                  }}
                  transition={{
                    left: { duration: 0.4, ease: "easeOut" },
                    scale: { duration: 0.3 }
                  }}
                />
              </div>

              {/* Stops */}
              <div className="relative flex justify-between px-1">
                {stages.map((stage, index) => {
                  const isActive = index === currentStage;
                  const isPast = index < currentStage;

                  return (
                    <div
                      key={index}
                      className="flex flex-col items-center cursor-pointer group/stop"
                      onClick={() => setCurrentStage(index)}
                      style={{ width: `${100 / stages.length}%` }}
                    >
                      {/* Pip */}
                      <motion.div
                        animate={{
                          scale: isActive ? [1, 1.3, 1] : 1,
                          backgroundColor: isActive || isPast ? '#00DC51' : 'rgba(255,255,255,0.3)'
                        }}
                        transition={{
                          scale: { duration: 0.3 },
                          backgroundColor: { duration: 0.2 }
                        }}
                        className={`w-3 h-3 rounded-full mb-3 transition-all ${
                          isActive
                            ? 'shadow-lg shadow-[#00DC51]/60'
                            : 'group-hover/stop:bg-[#00DC51]/60'
                        }`}
                      />

                      {/* Label */}
                      <div className={`text-center text-xs font-bold transition-colors ${
                        isActive
                          ? 'text-[#00DC51]'
                          : isPast
                          ? 'text-white/70'
                          : 'text-white/40 group-hover/stop:text-white/60'
                      }`}>
                        {stage.shortLabel}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Detail Panel */}
            <motion.div
              key={currentStage}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-gradient-to-br from-[#00DC51]/15 to-[#00DC51]/5 border-2 border-[#00DC51] rounded-2xl p-8"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-[#00DC51] rounded-xl flex items-center justify-center shadow-lg shadow-[#00DC51]/40">
                  <span className="text-black font-black text-lg">{currentStage + 1}</span>
                </div>
                <div>
                  <div className="text-xs font-black text-[#00DC51] uppercase tracking-wider mb-1">
                    {stages[currentStage].stage}
                  </div>
                  <h3 className="text-2xl font-black text-white">
                    {stages[currentStage].title}
                  </h3>
                </div>
              </div>

              <p className="text-base text-white/80 font-medium leading-relaxed">
                {stages[currentStage].desc}
              </p>
            </motion.div>

            {/* Navigation Hint */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-center text-xs text-white/40 font-medium"
            >
              Click any stage or drag along the track to explore your maturity progression
            </motion.div>

            {/* Key message */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="relative bg-gradient-to-r from-[#00DC51]/15 to-transparent border-l-4 border-[#00DC51] rounded-r-xl p-5 backdrop-blur-sm"
            >
              <p className="font-bold text-base leading-relaxed">
                AI maturity is not about using smarter prompts. It is about moving from manual effort, to assisted tasks, to goal-driven agent outcomes.
              </p>
            </motion.div>

            {/* Target box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7 }}
              className="bg-[#00DC51]/10 border-2 border-[#00DC51] rounded-xl p-5"
            >
              <div className="flex items-center gap-3 mb-2">
                <Target className="text-[#00DC51]" size={20} strokeWidth={2.5} />
                <h4 className="font-black text-base text-[#00DC51]">Where to Focus</h4>
              </div>
              <p className="text-sm text-white/80 font-medium leading-relaxed">
                Most firms should aim to reach Stage 3-4 (Workflow Packs to Agents) within 90 days.
              </p>
            </motion.div>
          </motion.div>
        );
      })()}

      {/* Content Blocks */}
      <div className="space-y-5">
        {page.content.map((block, index) => {
          // Skip the numbered-list and quote on s1-stages page since they're in the custom graphic
          if (page.id === 's1-stages' && (block.type === 'numbered-list' || block.type === 'quote')) {
            return null;
          }
          // Skip the columns, box, and quote on s3-difference page since they're in the custom graphic
          if (page.id === 's3-difference' && (block.type === 'columns' || block.type === 'box' || block.type === 'quote')) {
            return null;
          }
          // Skip the columns and box on s1-role page since they're in the custom graphic
          if (page.id === 's1-role' && (block.type === 'columns' || block.type === 'box')) {
            return null;
          }
          // Skip content on s3-workflows page since it's in the custom graphic
          if (page.id === 's3-workflows' && (block.type === 'text' || block.type === 'box' || block.type === 'highlight')) {
            return null;
          }
          // Skip content on s3-maturity page since it's in the custom graphic
          if (page.id === 's3-maturity' && (block.type === 'numbered-list' || block.type === 'highlight' || block.type === 'box')) {
            return null;
          }

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05, duration: 0.4 }}
            >
              {block.type === 'text' && (
                <p className="text-white/80 leading-relaxed text-sm font-medium">{block.text}</p>
              )}

              {block.type === 'highlight' && (
                <motion.div
                  whileHover={page.section?.includes('Section 2') ? { x: 4 } : {}}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="relative bg-gradient-to-r from-[#00DC51]/15 to-transparent border-l-4 border-[#00DC51] rounded-r-xl p-5 backdrop-blur-sm group"
                >
                  {page.section?.includes('Section 2') && (
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-[#00DC51]/20 rounded-full blur-xl group-hover:bg-[#00DC51]/30 transition-all" />
                  )}
                  <div className="relative flex items-start gap-3">
                    {page.section?.includes('Section 2') && (
                      <Lightbulb className="text-[#00DC51] flex-shrink-0 mt-0.5" size={20} strokeWidth={2.5} />
                    )}
                    <p className="font-bold text-base leading-relaxed flex-1">{block.text}</p>
                  </div>
                </motion.div>
              )}

              {block.type === 'list' && (
                <div className="space-y-2.5">
                  {block.items?.map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-[#00DC51] rounded-full flex-shrink-0 mt-2 shadow-[0_0_8px_rgba(0,220,81,0.6)]" />
                      <p className="text-white/80 text-sm font-medium flex-1 leading-relaxed">{item}</p>
                    </div>
                  ))}
                </div>
              )}

              {block.type === 'numbered-list' && (
                <>
                  {/* TABS/COMPARISON - for Section 3 Assistant vs Agent */}
                  {(page.id === 's3-difference' && (block.boxTitle === 'Assistant-Led Work:' || block.boxTitle === 'Agent-Led Work:')) ? null :

                  /* STEP CARDS - for Section 4 Prompt Framework */
                  page.section?.includes('Section 4') && block.boxTitle === 'Every Effective Prompt Has 4 Parts:' ? (
                    <div className="space-y-3">
                      <h4 className="font-black text-base mb-4 text-[#00DC51]">{block.boxTitle}</h4>
                      {block.items?.map((item, i) => {
                        if (typeof item === 'string') return null;
                        const isExpanded = expandedItems.has(i + 100); // offset to avoid collision
                        const stepIcons = [Users, FileText, Database, Shield];
                        const StepIcon = stepIcons[i] || CheckCircle;

                        return (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className={`border-2 rounded-xl overflow-hidden transition-all ${
                              isExpanded
                                ? 'bg-[#00DC51]/10 border-[#00DC51]'
                                : 'bg-white/5 border-white/20 hover:border-[#00DC51]/30'
                            }`}
                          >
                            <button
                              onClick={() => toggleExpanded(i + 100)}
                              className="w-full flex items-center justify-between p-5 text-left"
                            >
                              <div className="flex items-center gap-4">
                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${
                                  isExpanded ? 'bg-[#00DC51] text-black scale-110' : 'bg-[#00DC51]/20 text-[#00DC51] border-2 border-[#00DC51]/30'
                                }`}>
                                  <StepIcon size={22} strokeWidth={2.5} />
                                </div>
                                <div>
                                  <h5 className="font-bold text-base">{item.title}</h5>
                                  {!isExpanded && (
                                    <p className="text-xs text-white/50 font-medium mt-1">Click to see examples</p>
                                  )}
                                </div>
                              </div>
                              <ChevronDown
                                className={`transition-transform text-white/60 ${isExpanded ? 'rotate-180' : ''}`}
                                size={20}
                                strokeWidth={2.5}
                              />
                            </button>
                            <AnimatePresence>
                              {isExpanded && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: 'auto', opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.3 }}
                                  className="overflow-hidden"
                                >
                                  <div className="px-5 pb-5 pl-20">
                                    <p className="text-white/70 text-sm font-medium leading-relaxed whitespace-pre-line">{item.desc}</p>
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </motion.div>
                        );
                      })}
                    </div>
                  )

                  /* CHOICE CARDS - for Section 5 AI Dividend */
                  : page.section?.includes('Section 5') && block.boxTitle === 'Four Ways to Use the AI Dividend:' ? (
                    <div>
                      <h4 className="font-black text-base mb-4 text-[#00DC51]">{block.boxTitle}</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {block.items?.map((item, i) => {
                          if (typeof item === 'string') return null;
                          const isWarning = item.warning;
                          const itemIcon = item.icon ? item.icon : null;
                          const IconComponent = itemIcon ? getIcon(itemIcon) : CheckCircle;

                          return (
                            <motion.div
                              key={i}
                              initial={{ opacity: 0, scale: 0.95 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: i * 0.1 }}
                              whileHover={{ scale: isWarning ? 1 : 1.03, y: isWarning ? 0 : -4 }}
                              className={`rounded-xl p-5 border-2 transition-all ${
                                isWarning
                                  ? 'bg-red-500/10 border-red-500/40 opacity-60 cursor-not-allowed'
                                  : i === 2 || i === 3
                                  ? 'bg-[#00DC51]/10 border-[#00DC51] shadow-lg shadow-[#00DC51]/20 hover:shadow-[#00DC51]/30 cursor-pointer'
                                  : 'bg-white/5 border-white/20 hover:border-white/40 cursor-pointer'
                              }`}
                            >
                              <div className="flex items-start gap-4 mb-3">
                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center border-2 flex-shrink-0 ${
                                  isWarning
                                    ? 'bg-red-500/20 border-red-500/50'
                                    : i === 2 || i === 3
                                    ? 'bg-[#00DC51]/30 border-[#00DC51]'
                                    : 'bg-white/10 border-white/30'
                                }`}>
                                  <IconComponent
                                    className={isWarning ? 'text-red-400' : i === 2 || i === 3 ? 'text-[#00DC51]' : 'text-white/60'}
                                    size={22}
                                    strokeWidth={2.5}
                                  />
                                </div>
                                <div className="flex-1">
                                  <h5 className={`font-bold text-base mb-2 ${
                                    isWarning ? 'text-red-400' : i === 2 || i === 3 ? 'text-[#00DC51]' : ''
                                  }`}>
                                    {item.title}
                                  </h5>
                                  {isWarning && (
                                    <span className="inline-block px-2 py-1 bg-red-500/20 border border-red-500/40 rounded text-xs font-bold text-red-400 mb-2">
                                      Not Recommended
                                    </span>
                                  )}
                                  <p className="text-sm text-white/70 font-medium leading-relaxed">{item.desc}</p>
                                </div>
                              </div>
                            </motion.div>
                          );
                        })}
                      </div>
                    </div>
                  )

                  /* EXPANDABLE PROMPT TYPES - for Section 4 Five Prompt Types */
                  : page.section?.includes('Section 4') && block.boxTitle === 'The Five Prompt Types:' ? (
                    <div className="space-y-3">
                      <h4 className="font-black text-base mb-4 text-[#00DC51]">{block.boxTitle}</h4>
                      {block.items?.map((item, i) => {
                        if (typeof item === 'string') return null;
                        const isExpanded = expandedItems.has(i + 200); // offset
                        const promptIcons = [MessageSquare, FileText, Lightbulb, CheckCircle, HelpCircle];
                        const PromptIcon = promptIcons[i] || FileText;
                        const colors = [
                          { bg: 'bg-blue-500/20', border: 'border-blue-500/40', text: 'text-blue-400', hoverBorder: 'hover:border-blue-500/60' },
                          { bg: 'bg-purple-500/20', border: 'border-purple-500/40', text: 'text-purple-400', hoverBorder: 'hover:border-purple-500/60' },
                          { bg: 'bg-yellow-500/20', border: 'border-yellow-500/40', text: 'text-yellow-400', hoverBorder: 'hover:border-yellow-500/60' },
                          { bg: 'bg-green-500/20', border: 'border-green-500/40', text: 'text-green-400', hoverBorder: 'hover:border-green-500/60' },
                          { bg: 'bg-orange-500/20', border: 'border-orange-500/40', text: 'text-orange-400', hoverBorder: 'hover:border-orange-500/60' }
                        ];
                        const color = colors[i] || colors[0];

                        return (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.08 }}
                            className={`border-2 rounded-xl overflow-hidden transition-all ${
                              isExpanded
                                ? `${color.bg} ${color.border}`
                                : `bg-white/5 border-white/20 ${color.hoverBorder}`
                            }`}
                          >
                            <button
                              onClick={() => toggleExpanded(i + 200)}
                              className="w-full flex items-center justify-between p-4 text-left group"
                            >
                              <div className="flex items-center gap-3">
                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center border-2 transition-all ${
                                  isExpanded ? `${color.bg} ${color.border}` : `bg-white/10 border-white/30 group-hover:${color.bg}`
                                }`}>
                                  <PromptIcon className={isExpanded ? color.text : 'text-white/60'} size={20} strokeWidth={2.5} />
                                </div>
                                <h5 className="font-bold text-sm">{item.title}</h5>
                              </div>
                              <ChevronDown
                                className={`transition-transform text-white/60 ${isExpanded ? 'rotate-180' : ''}`}
                                size={18}
                                strokeWidth={2.5}
                              />
                            </button>
                            <AnimatePresence>
                              {isExpanded && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: 'auto', opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.3 }}
                                  className="overflow-hidden"
                                >
                                  <div className="px-4 pb-4 pl-16">
                                    <p className="text-white/70 text-sm font-medium leading-relaxed whitespace-pre-line">{item.desc}</p>
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </motion.div>
                        );
                      })}
                    </div>
                  )

                  /* ACCORDION STYLE - for s2-ethics-responsibility (Five Fundamental Principles) */
                  : page.id === 's2-ethics-responsibility' && block.boxTitle === 'The Five Fundamental Principles:' ? (
                    <div className="space-y-2">
                      <h4 className="font-black text-base mb-4 text-[#00DC51]">{block.boxTitle}</h4>
                      {block.items?.map((item, i) => {
                        if (typeof item === 'string') return null;
                        const isExpanded = expandedItems.has(i);

                        return (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.05 }}
                            className={`border-2 rounded-xl overflow-hidden transition-all ${
                              isExpanded
                                ? 'bg-[#00DC51]/10 border-[#00DC51]'
                                : 'bg-white/5 border-white/20 hover:border-white/40'
                            }`}
                          >
                            <button
                              onClick={() => toggleExpanded(i)}
                              className="w-full flex items-center justify-between p-4 text-left"
                            >
                              <div className="flex items-center gap-3">
                                <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-black text-sm ${
                                  isExpanded ? 'bg-[#00DC51] text-black' : 'bg-white/10 text-white/60'
                                }`}>
                                  {i + 1}
                                </div>
                                <h5 className="font-bold text-base">{item.title}</h5>
                              </div>
                              <ChevronDown
                                className={`transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                                size={20}
                                strokeWidth={2.5}
                              />
                            </button>
                            <AnimatePresence>
                              {isExpanded && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: 'auto', opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.2 }}
                                  className="overflow-hidden"
                                >
                                  <div className="px-4 pb-4 pl-16">
                                    <p className="text-white/70 text-sm font-medium leading-relaxed">{item.desc}</p>
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </motion.div>
                        );
                      })}
                    </div>
                  )

                  /* ICON GRID CARDS - for s2-data-confidentiality (Key Risks) */
                  : page.id === 's2-data-confidentiality' && block.boxTitle === 'Key Confidentiality Risks with AI:' ? (
                    <div>
                      <h4 className="font-black text-base mb-4 text-[#00DC51]">{block.boxTitle}</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {block.items?.map((item, i) => {
                          if (typeof item === 'string') return null;
                          const riskIcons = [Lock, UserX, FileWarning, UsersIcon];
                          const RiskIcon = riskIcons[i] || AlertCircle;

                          return (
                            <motion.div
                              key={i}
                              initial={{ opacity: 0, scale: 0.95 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: i * 0.1 }}
                              whileHover={{ scale: 1.02 }}
                              className="group bg-white/5 border-2 border-white/20 rounded-xl p-5 hover:bg-[#00DC51]/5 hover:border-[#00DC51]/50 transition-all cursor-pointer"
                            >
                              <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-red-500/20 border-2 border-red-500/40 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-red-500/30 group-hover:scale-110 transition-all">
                                  <RiskIcon className="text-red-400" size={22} strokeWidth={2.5} />
                                </div>
                                <div className="flex-1">
                                  <h5 className="font-bold text-base mb-2">{item.title}</h5>
                                  <p className="text-white/60 text-sm font-medium leading-relaxed">{item.desc}</p>
                                </div>
                              </div>
                            </motion.div>
                          );
                        })}
                      </div>
                    </div>
                  )

                  /* CHECKLIST STYLE - for s2-policy */
                  : page.id === 's2-policy' ? (
                    <div className="bg-white/5 border-2 border-white/20 rounded-xl p-6">
                      <h4 className="font-black text-base mb-5 flex items-center gap-2">
                        <ClipboardList className="text-[#00DC51]" size={20} strokeWidth={2.5} />
                        Minimum AI Policy Checklist
                      </h4>
                      <div className="space-y-3">
                        {block.items?.map((item, i) => {
                          if (typeof item === 'string') return null;
                          const isChecked = checkedItems.has(i);

                          return (
                            <motion.div
                              key={i}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: i * 0.05 }}
                              onClick={() => toggleChecked(i)}
                              className={`flex items-start gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                                isChecked
                                  ? 'bg-[#00DC51]/15 border-[#00DC51]'
                                  : 'bg-white/5 border-white/10 hover:border-white/30'
                              }`}
                            >
                              <div className={`w-6 h-6 rounded-md border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-all ${
                                isChecked
                                  ? 'bg-[#00DC51] border-[#00DC51]'
                                  : 'bg-transparent border-white/30'
                              }`}>
                                {isChecked && (
                                  <CheckCircle className="text-black" size={16} strokeWidth={3} />
                                )}
                              </div>
                              <div className="flex-1">
                                <h5 className={`font-bold text-sm mb-1 ${isChecked ? 'text-white' : 'text-white/90'}`}>
                                  {item.title}
                                </h5>
                                <p className={`text-sm font-medium leading-relaxed ${isChecked ? 'text-white/70' : 'text-white/60'}`}>
                                  {item.desc}
                                </p>
                              </div>
                            </motion.div>
                          );
                        })}
                      </div>
                    </div>
                  )

                  /* EXPANDABLE CARDS - for s2-failure-modes */
                  : page.id === 's2-failure-modes' && block.boxTitle ? (
                    <div className="space-y-3">
                      <h4 className="font-black text-base mb-4 text-[#00DC51]">{block.boxTitle}</h4>
                      {block.items?.map((item, i) => {
                        if (typeof item === 'string') return null;
                        const isExpanded = expandedItems.has(i);
                        const failureIcons = [HelpCircle, AlertCircle, Ban, XCircle];
                        const FailureIcon = failureIcons[i] || AlertCircle;

                        return (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.05 }}
                            className={`border-2 rounded-xl overflow-hidden transition-all ${
                              isExpanded
                                ? 'bg-orange-500/10 border-orange-500/50'
                                : 'bg-white/5 border-white/20 hover:border-orange-500/30'
                            }`}
                          >
                            <button
                              onClick={() => toggleExpanded(i)}
                              className="w-full flex items-center justify-between p-4 text-left"
                            >
                              <div className="flex items-center gap-3">
                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                                  isExpanded ? 'bg-orange-500/30 border-2 border-orange-500' : 'bg-orange-500/20 border-2 border-orange-500/30'
                                }`}>
                                  <FailureIcon className="text-orange-400" size={20} strokeWidth={2.5} />
                                </div>
                                <h5 className="font-bold text-base">{item.title}</h5>
                              </div>
                              <ChevronDown
                                className={`transition-transform text-white/60 ${isExpanded ? 'rotate-180' : ''}`}
                                size={20}
                                strokeWidth={2.5}
                              />
                            </button>
                            <AnimatePresence>
                              {isExpanded && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: 'auto', opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.2 }}
                                  className="overflow-hidden"
                                >
                                  <div className="px-4 pb-4 pl-16">
                                    <p className="text-white/70 text-sm font-medium leading-relaxed">{item.desc}</p>
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </motion.div>
                        );
                      })}
                    </div>
                  )

                  /* DEFAULT NUMBERED LIST - for all other pages */
                  : (
                    <div className={block.boxTitle ? "bg-[#00DC51]/10 border-2 border-[#00DC51] rounded-xl p-5 backdrop-blur-sm" : ""}>
                      {block.boxTitle && (
                        <h4 className="font-black text-base mb-4">{block.boxTitle}</h4>
                      )}

                      {/* Numbered Items */}
                      <div className="space-y-3">
                        {block.items?.map((item, i) => {
                        const isWarning = typeof item === 'object' && item.warning;
                        const itemIcon = typeof item === 'object' && item.icon ? item.icon : null;
                        const itemTitle = typeof item === 'string' ? item : item.title;
                        const itemDesc = typeof item === 'object' && item.desc ? item.desc : null;
                        const itemExample = typeof item === 'object' && item.example ? item.example : null;

                        return (
                          <div key={i} className="flex items-start gap-3 group">
                            {/* Number Badge with optional icon */}
                            <div className={`${page.id === 's1-stages' ? 'w-20 h-20' : 'w-9 h-9'} ${isWarning ? 'bg-white/10 border-2 border-white/20' : 'bg-[#00DC51]'} rounded-xl flex items-center justify-center flex-shrink-0 ${isWarning ? 'text-white/40' : 'text-black'} font-black ${page.id === 's1-stages' ? 'text-xs' : 'text-sm'} shadow-lg ${isWarning ? 'shadow-black/20' : 'shadow-[#00DC51]/30'} group-hover:scale-110 transition-transform`}>
                              {itemIcon ? (
                                (() => {
                                  const Icon = getIcon(itemIcon);
                                  return <Icon size={18} strokeWidth={2.5} />;
                                })()
                              ) : (
                                page.id === 's1-stages' ? `Step ${i + 1}` : i + 1
                              )}
                            </div>

                            {/* Content */}
                            <div className="flex-1 pt-1">
                              {typeof item === 'string' ? (
                                <p className="text-white/80 text-sm font-medium leading-relaxed">{item}</p>
                              ) : (
                                <>
                                  <h4 className={`font-bold text-base mb-1.5 ${isWarning ? 'text-white/50' : ''}`}>
                                    {item.title}
                                  </h4>
                                  {itemDesc && (
                                    <p className="text-white/60 font-medium text-sm leading-relaxed">{itemDesc}</p>
                                  )}
                                  {itemExample && (
                                    <p className="text-white/50 font-medium text-xs leading-relaxed mt-2 italic">{itemExample}</p>
                                  )}
                                </>
                              )}
                            </div>
                          </div>
                        );
                      })}
                      </div>
                    </div>
                  )}
                </>
              )}

              {block.type === 'box' && (
                <motion.div
                  whileHover={page.section?.includes('Section 2') ? { scale: 1.01 } : {}}
                  transition={{ type: "spring", stiffness: 300 }}
                  className={`rounded-xl p-5 border-2 transition-all ${
                    block.style === 'green'
                      ? 'bg-[#00DC51]/10 border-[#00DC51] hover:shadow-lg hover:shadow-[#00DC51]/20'
                      : block.style === 'dark'
                      ? 'bg-black/40 border-white/20 hover:border-white/30'
                      : 'bg-white/5 border-white/20 hover:border-white/30'
                  }`}>
                  {block.title && (
                    <div className="flex items-start gap-3 mb-2.5">
                      {page.section?.includes('Section 2') && block.style === 'green' && (
                        <div className="w-8 h-8 bg-[#00DC51] rounded-lg flex items-center justify-center flex-shrink-0">
                          <CheckCircle className="text-black" size={16} strokeWidth={3} />
                        </div>
                      )}
                      {page.section?.includes('Section 2') && block.style === 'dark' && (
                        <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0">
                          <AlertCircle className="text-white/60" size={16} strokeWidth={3} />
                        </div>
                      )}
                      <h4 className="font-black text-base flex-1">{block.title}</h4>
                    </div>
                  )}
                  <p className={`font-medium leading-relaxed text-sm whitespace-pre-line ${
                    page.section?.includes('Section 2') ? 'text-white/80' : 'text-white/80'
                  }`}>{block.text}</p>
                </motion.div>
              )}

              {block.type === 'quote' && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  className="relative bg-gradient-to-r from-[#00DC51]/15 to-transparent border-l-4 border-[#00DC51] rounded-r-xl p-6 backdrop-blur-sm group hover:from-[#00DC51]/20 transition-all"
                >
                  <div className="absolute -left-1 top-5 w-1 h-10 bg-[#00DC51] shadow-[0_0_12px_rgba(0,220,81,0.8)] group-hover:h-14 transition-all" />
                  <div className="flex items-start gap-4">
                    <div className="text-[#00DC51] opacity-30 text-5xl font-serif leading-none">"</div>
                    <p className="text-lg font-bold italic leading-relaxed flex-1 pt-2">{block.text}</p>
                  </div>
                </motion.div>
              )}

              {block.type === 'columns' && (
                /* INTERACTIVE COMPARISON CARDS - for Section 3 */
                page.section?.includes('Section 3') ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {block.columns?.map((col, i) => {
                      const parts = col.text.split(/\n\nExamples:\s*/i);
                      const mainText = parts[0];
                      const examplesText = parts[1];
                      const lines = mainText.split('\n').filter(line => line.trim());

                      return (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.15 }}
                          whileHover={{ scale: 1.02, y: -4 }}
                          className={`rounded-xl p-5 border-2 transition-all cursor-pointer ${
                            col.highlight
                              ? 'bg-[#00DC51]/10 border-[#00DC51] shadow-lg shadow-[#00DC51]/20 hover:shadow-[#00DC51]/30'
                              : 'bg-white/5 border-white/20 hover:border-white/40'
                          }`}
                        >
                          {col.icon && (
                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 border-2 transition-all ${
                              col.highlight
                                ? 'bg-[#00DC51]/30 border-[#00DC51]'
                                : 'bg-white/10 border-white/30'
                            }`}>
                              {(() => {
                                const Icon = getIcon(col.icon);
                                return <Icon className={col.highlight ? 'text-[#00DC51]' : 'text-white/60'} size={22} strokeWidth={2.5} />;
                              })()}
                            </div>
                          )}
                          <h4 className={`font-black text-base mb-4 ${col.highlight ? 'text-[#00DC51]' : ''}`}>{col.title}</h4>

                          <div className="space-y-2 mb-4">
                            {lines.map((line, lineIndex) => (
                              <div key={lineIndex} className="flex items-start gap-2">
                                <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1.5 ${
                                  col.highlight ? 'bg-[#00DC51] shadow-[0_0_8px_rgba(0,220,81,0.6)]' : 'bg-white/40'
                                }`} />
                                <p className="text-sm text-white/80 font-medium leading-relaxed">{line.trim()}</p>
                              </div>
                            ))}
                          </div>

                          {examplesText && (
                            <div className={`mt-4 pt-4 border-t ${col.highlight ? 'border-[#00DC51]/30' : 'border-white/10'}`}>
                              <p className={`text-xs font-bold mb-2 ${col.highlight ? 'text-[#00DC51]' : 'text-white/70'}`}>Examples:</p>
                              <div className="space-y-1.5">
                                {examplesText.split('\n').filter(line => line.trim()).map((example, exIndex) => (
                                  <p key={exIndex} className="text-xs text-white/60 font-medium leading-relaxed">
                                    {example.trim()}
                                  </p>
                                ))}
                              </div>
                            </div>
                          )}
                        </motion.div>
                      );
                    })}
                  </div>
                ) : (
                  /* DEFAULT COLUMNS - for other sections */
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {block.columns?.map((col, i) => {
                      const parts = col.text.split(/\n\nExamples:\s*/i);
                      const mainText = parts[0];
                      const examplesText = parts[1];

                      return (
                        <div key={i} className={`rounded-xl p-4 border-2 ${
                          col.highlight
                            ? 'bg-[#00DC51]/10 border-[#00DC51]'
                            : 'bg-white/5 border-white/20'
                        }`}>
                          {col.icon && (
                            <div className="w-10 h-10 bg-[#00DC51]/20 rounded-xl flex items-center justify-center mb-3 border border-[#00DC51]/30">
                              {(() => {
                                const Icon = getIcon(col.icon);
                                return <Icon className="text-[#00DC51]" size={20} strokeWidth={2.5} />;
                              })()}
                            </div>
                          )}
                          <h4 className="font-black text-sm mb-2">{col.title}</h4>
                          <p className="text-xs text-white/70 font-medium leading-relaxed mb-3">{mainText}</p>

                          {examplesText && (
                            <div className="mt-4 pt-3 border-t border-white/10">
                              <p className="text-xs font-bold text-[#00DC51] mb-2">Examples:</p>
                              <p className="text-xs text-white/60 font-medium leading-relaxed italic">
                                {examplesText}
                              </p>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Interactive Activity */}
      {page.activity && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-br from-[#00DC51]/15 to-[#00DC51]/5 border-2 border-[#00DC51] rounded-2xl p-6 backdrop-blur-sm"
        >
          <div className="flex items-start gap-4 mb-5">
            <div className="w-11 h-11 bg-[#00DC51] rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-[#00DC51]/40">
              <Lightbulb className="text-black" size={22} strokeWidth={2.5} />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-black text-[#00DC51] uppercase tracking-wider">Activity</span>
                <div className="h-px flex-1 bg-[#00DC51]/30" />
              </div>
              <h4 className="font-black text-lg mb-2">{page.activity.title}</h4>
              <p className="text-sm text-white/70 font-medium leading-relaxed">{page.activity.prompt}</p>
            </div>
          </div>
          
          {/* Text Area for regular activities */}
          {(!page.activity.type || page.activity.type === 'text') && (
            <>
              <textarea
                value={userInput}
                onChange={(e) => onInputChange(e.target.value)}
                placeholder="Type your answer here..."
                className="w-full bg-black/40 border-2 border-white/20 focus:border-[#00DC51] rounded-xl p-4 text-white placeholder-white/40 focus:outline-none resize-none font-medium transition-colors text-sm min-h-[140px]"
              />
              
              {userInput && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mt-3 flex items-center gap-2 text-[#00DC51] font-bold text-xs"
                >
                  <CheckCircle size={16} strokeWidth={2.5} />
                  <span>Answer saved locally</span>
                </motion.div>
              )}
            </>
          )}

          {/* Multi-Question Input */}
          {page.activity.type === 'multi-question' && page.activity.questions && (
            <div className="space-y-5">
              {page.activity.questions.map((question, index) => {
                const questionKey = `question-${index}`;
                let savedInputs = {};
                try {
                  savedInputs = userInput && userInput !== '' ? JSON.parse(userInput) : {};
                } catch (e) {
                  savedInputs = {};
                }
                const questionValue = savedInputs[questionKey] || '';

                // Check if this is the first question and there are dropdown options
                const isFirstQuestionWithDropdown = index === 0 && page.activity.dropdownOptions && page.activity.dropdownOptions.length > 0;

                // Detect if question asks for a list of items (e.g., "List 3 types", "List 2 types")
                const listMatch = question.match(/[Ll]ist\s+(\d+)\s+types?/);
                const itemCount = listMatch ? parseInt(listMatch[1], 10) : 0;

                return (
                  <div key={index} className="space-y-2">
                    <label className="text-sm font-bold text-white/90 block">
                      {index + 1}. {question}
                    </label>

                    {isFirstQuestionWithDropdown ? (
                      <select
                        value={questionValue}
                        onChange={(e) => {
                          const newInputs = { ...savedInputs, [questionKey]: e.target.value };
                          onInputChange(JSON.stringify(newInputs));
                        }}
                        className="w-full bg-black/40 border-2 border-white/20 focus:border-[#00DC51] rounded-xl px-4 py-3 text-white focus:outline-none font-medium transition-colors text-sm appearance-none cursor-pointer"
                        style={{
                          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%2300DC51' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
                          backgroundRepeat: 'no-repeat',
                          backgroundPosition: 'right 1rem center',
                          backgroundSize: '1.25rem',
                          paddingRight: '3rem'
                        }}
                      >
                        <option value="" disabled>Select a workflow...</option>
                        {page.activity.dropdownOptions.map((option) => (
                          <option key={option} value={option} className="bg-black text-white">
                            {option}
                          </option>
                        ))}
                      </select>
                    ) : itemCount > 0 ? (
                      // Render multiple input boxes for list questions
                      <div className="space-y-3">
                        {Array.from({ length: itemCount }).map((_, itemIndex) => {
                          const itemKey = `${questionKey}-item-${itemIndex}`;
                          const itemValue = savedInputs[itemKey] || '';

                          return (
                            <div key={itemIndex} className="flex items-start gap-3">
                              <div className="w-8 h-8 bg-[#00DC51] rounded-lg flex items-center justify-center flex-shrink-0 text-black font-black text-sm shadow-lg shadow-[#00DC51]/30 mt-1">
                                {itemIndex + 1}
                              </div>
                              <input
                                type="text"
                                value={itemValue}
                                onChange={(e) => {
                                  const newInputs = { ...savedInputs, [itemKey]: e.target.value };
                                  onInputChange(JSON.stringify(newInputs));
                                }}
                                placeholder={`Type item ${itemIndex + 1}...`}
                                className="flex-1 bg-black/40 border-2 border-white/20 focus:border-[#00DC51] rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none font-medium transition-colors text-sm"
                              />
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <textarea
                        value={questionValue}
                        onChange={(e) => {
                          const newInputs = { ...savedInputs, [questionKey]: e.target.value };
                          onInputChange(JSON.stringify(newInputs));
                        }}
                        placeholder="Type your answer here..."
                        className="w-full bg-black/40 border-2 border-white/20 focus:border-[#00DC51] rounded-xl p-4 text-white placeholder-white/40 focus:outline-none resize-none font-medium transition-colors text-sm min-h-[100px]"
                      />
                    )}
                  </div>
                );
              })}

              {userInput && userInput !== '{}' && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mt-3 flex items-center gap-2 text-[#00DC51] font-bold text-xs"
                >
                  <CheckCircle size={16} strokeWidth={2.5} />
                  <span>Answers saved locally</span>
                </motion.div>
              )}
            </div>
          )}

          {/* Numbered List Input for list activities */}
          {page.activity.type === 'numbered-list' && page.activity.listCount && (
            <div className="space-y-3">
              {Array.from({ length: page.activity.listCount }).map((_, index) => {
                const inputKey = `item-${index}`;
                let savedInputs = {};
                try {
                  savedInputs = userInput && userInput !== '' ? JSON.parse(userInput) : {};
                } catch (e) {
                  // If parsing fails, start with empty object
                  savedInputs = {};
                }
                const itemValue = savedInputs[inputKey] || '';
                const placeholderPrefix = page.activity.placeholderPrefix || 'Item';

                return (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-[#00DC51] rounded-lg flex items-center justify-center flex-shrink-0 text-black font-black text-sm shadow-lg shadow-[#00DC51]/30">
                      {index + 1}
                    </div>
                    <input
                      type="text"
                      value={itemValue}
                      onChange={(e) => {
                        const newInputs = { ...savedInputs, [inputKey]: e.target.value };
                        onInputChange(JSON.stringify(newInputs));
                      }}
                      placeholder={`${placeholderPrefix} ${index + 1}...`}
                      className="flex-1 bg-black/40 border-2 border-white/20 focus:border-[#00DC51] rounded-lg px-4 py-2.5 text-white placeholder-white/40 focus:outline-none font-medium transition-colors text-sm"
                    />
                  </div>
                );
              })}
              
              {userInput && userInput !== '{}' && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mt-3 flex items-center gap-2 text-[#00DC51] font-bold text-xs"
                >
                  <CheckCircle size={16} strokeWidth={2.5} />
                  <span>List saved locally</span>
                </motion.div>
              )}
            </div>
          )}

          {/* Dropdown Select */}
          {page.activity.type === 'dropdown' && page.activity.dropdownOptions && (
            <>
              <select
                value={userInput}
                onChange={(e) => onInputChange(e.target.value)}
                className="w-full bg-black/40 border-2 border-white/20 focus:border-[#00DC51] rounded-xl p-4 text-white focus:outline-none font-medium transition-colors text-sm appearance-none cursor-pointer"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%2300DC51' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'right 1rem center',
                  backgroundSize: '1.5rem',
                  paddingRight: '3rem'
                }}
              >
                <option value="" className="bg-black">Select an option...</option>
                {page.activity.dropdownOptions.map((option, index) => (
                  <option key={index} value={option} className="bg-black">
                    {option}
                  </option>
                ))}
              </select>
              
              {userInput && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mt-3 flex items-center gap-2 text-[#00DC51] font-bold text-xs"
                >
                  <CheckCircle size={16} strokeWidth={2.5} />
                  <span>Selection saved locally</span>
                </motion.div>
              )}
            </>
          )}

          {/* Yes/No Radio Buttons */}
          {page.activity.type === 'yes-no' && (
            <>
              <div className="flex items-center gap-6">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <div className={`w-12 h-12 rounded-full border-3 flex items-center justify-center transition-all ${
                    userInput === 'yes' 
                      ? 'bg-[#00DC51] border-[#00DC51] shadow-lg shadow-[#00DC51]/40' 
                      : 'bg-black/40 border-white/20 group-hover:border-[#00DC51]/50'
                  }`}>
                    {userInput === 'yes' && (
                      <CheckCircle size={24} strokeWidth={3} className="text-black" />
                    )}
                  </div>
                  <input
                    type="radio"
                    name="yes-no"
                    value="yes"
                    checked={userInput === 'yes'}
                    onChange={(e) => onInputChange(e.target.value)}
                    className="sr-only"
                  />
                  <span className="text-base font-bold">Yes</span>
                </label>
                
                <label className="flex items-center gap-3 cursor-pointer group">
                  <div className={`w-12 h-12 rounded-full border-3 flex items-center justify-center transition-all ${
                    userInput === 'no' 
                      ? 'bg-[#00DC51] border-[#00DC51] shadow-lg shadow-[#00DC51]/40' 
                      : 'bg-black/40 border-white/20 group-hover:border-[#00DC51]/50'
                  }`}>
                    {userInput === 'no' && (
                      <CheckCircle size={24} strokeWidth={3} className="text-black" />
                    )}
                  </div>
                  <input
                    type="radio"
                    name="yes-no"
                    value="no"
                    checked={userInput === 'no'}
                    onChange={(e) => onInputChange(e.target.value)}
                    className="sr-only"
                  />
                  <span className="text-base font-bold">No</span>
                </label>
              </div>
              
              {userInput && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mt-3 flex items-center gap-2 text-[#00DC51] font-bold text-xs"
                >
                  <CheckCircle size={16} strokeWidth={2.5} />
                  <span>Answer saved locally</span>
                </motion.div>
              )}
            </>
          )}

          {/* Fill in the Gaps */}
          {page.activity.type === 'fill-gaps' && page.activity.gapSentence && (
            <>
              <div className="space-y-4">
                <div className="text-sm text-white/80 font-medium leading-relaxed whitespace-pre-wrap">
                  {page.activity.gapSentence.split('___').map((part, index, arr) => {
                    if (index === arr.length - 1) return <span key={index}>{part}</span>;
                    
                    const gapKey = `gap-${index}`;
                    let savedInputs = {};
                    try {
                      savedInputs = userInput && userInput !== '' ? JSON.parse(userInput) : {};
                    } catch (e) {
                      savedInputs = {};
                    }
                    const gapValue = savedInputs[gapKey] || '';
                    
                    return (
                      <span key={index}>
                        {part}
                        <input
                          type="text"
                          value={gapValue}
                          onChange={(e) => {
                            const newInputs = { ...savedInputs, [gapKey]: e.target.value };
                            onInputChange(JSON.stringify(newInputs));
                          }}
                          placeholder="___"
                          className="inline-block min-w-[200px] bg-black/40 border-b-2 border-[#00DC51]/50 focus:border-[#00DC51] px-2 py-1 text-white placeholder-white/30 focus:outline-none font-medium transition-colors text-sm mx-1"
                        />
                      </span>
                    );
                  })}
                </div>
              </div>
              
              {userInput && userInput !== '{}' && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mt-3 flex items-center gap-2 text-[#00DC51] font-bold text-xs"
                >
                  <CheckCircle size={16} strokeWidth={2.5} />
                  <span>Answers saved locally</span>
                </motion.div>
              )}
            </>
          )}

          {/* Checkbox Tasks */}
          {page.activity.type === 'checkbox-tasks' && page.activity.checkboxTasks && (
            <div className="space-y-4">
              {page.activity.checkboxTasks.map((task, taskIndex) => {
                const taskKey = `task-${taskIndex}`;
                let savedInputs = {};
                try {
                  savedInputs = userInput && userInput !== '' ? JSON.parse(userInput) : {};
                } catch (e) {
                  savedInputs = {};
                }
                const taskData = savedInputs[taskKey] || { label: '', checks: [] };

                return (
                  <div key={taskIndex} className="bg-white/5 border-2 border-white/10 rounded-xl p-4 space-y-3">
                    {/* Task Name Input */}
                    <input
                      type="text"
                      value={taskData.label || ''}
                      onChange={(e) => {
                        const newTaskData = { ...taskData, label: e.target.value };
                        const newInputs = { ...savedInputs, [taskKey]: newTaskData };
                        onInputChange(JSON.stringify(newInputs));
                      }}
                      placeholder={task.label}
                      className="w-full bg-black/40 border-2 border-white/20 focus:border-[#00DC51] rounded-lg px-4 py-2.5 text-white placeholder-white/40 focus:outline-none font-bold transition-colors text-sm"
                    />
                    
                    {/* Checkboxes */}
                    <div className="space-y-2 pl-2">
                      {task.criteria.map((criterion, criterionIndex) => {
                        const isChecked = taskData.checks?.includes(criterion) || false;
                        
                        return (
                          <label key={criterionIndex} className="flex items-center gap-3 cursor-pointer group">
                            <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                              isChecked
                                ? 'bg-[#00DC51] border-[#00DC51]'
                                : 'bg-black/40 border-white/30 group-hover:border-[#00DC51]/50'
                            }`}>
                              {isChecked && (
                                <CheckCircle size={14} strokeWidth={3} className="text-black" />
                              )}
                            </div>
                            <input
                              type="checkbox"
                              checked={isChecked}
                              onChange={(e) => {
                                const currentChecks = taskData.checks || [];
                                const newChecks = e.target.checked
                                  ? [...currentChecks, criterion]
                                  : currentChecks.filter(c => c !== criterion);
                                const newTaskData = { ...taskData, checks: newChecks };
                                const newInputs = { ...savedInputs, [taskKey]: newTaskData };
                                onInputChange(JSON.stringify(newInputs));
                              }}
                              className="sr-only"
                            />
                            <span className="text-xs font-medium text-white/70 group-hover:text-white/90 transition-colors">
                              {criterion}
                            </span>
                          </label>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
              
              {userInput && userInput !== '{}' && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mt-3 flex items-center gap-2 text-[#00DC51] font-bold text-xs"
                >
                  <CheckCircle size={16} strokeWidth={2.5} />
                  <span>Tasks saved locally</span>
                </motion.div>
              )}
            </div>
          )}

          {/* Task Classification - New improved layout for "Where AI Works Best" */}
          {page.activity.type === 'task-classification' && page.activity.taskCount && (
            <div className="space-y-3">
              {Array.from({ length: page.activity.taskCount }).map((_, taskIndex) => {
                const taskKey = `task-${taskIndex}`;
                let savedInputs = {};
                try {
                  savedInputs = userInput && userInput !== '' ? JSON.parse(userInput) : {};
                } catch (e) {
                  savedInputs = {};
                }
                const taskData = savedInputs[taskKey] || { label: '', classification: '', topCandidate: false };

                return (
                  <div key={taskIndex} className="bg-white/5 border-2 border-white/10 rounded-xl p-4">
                    {/* Task Name Input */}
                    <input
                      type="text"
                      value={taskData.label || ''}
                      onChange={(e) => {
                        const newTaskData = { ...taskData, label: e.target.value };
                        const newInputs = { ...savedInputs, [taskKey]: newTaskData };
                        onInputChange(JSON.stringify(newInputs));
                      }}
                      placeholder={`Task ${taskIndex + 1}`}
                      className="w-full bg-black/40 border-2 border-white/20 focus:border-[#00DC51] rounded-lg px-4 py-2.5 text-white placeholder-white/40 focus:outline-none font-bold transition-colors text-sm mb-3"
                    />
                    
                    {/* Classification and Top Candidate - Side by Side */}
                    <div className="flex items-center gap-3">
                      {/* Left: Radio buttons for classification */}
                      <div className="flex-1 flex items-center gap-4">
                        <label className="flex items-center gap-2 cursor-pointer group">
                          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                            taskData.classification === 'ai-ready'
                              ? 'bg-[#00DC51] border-[#00DC51]'
                              : 'bg-black/40 border-white/30 group-hover:border-[#00DC51]/50'
                          }`}>
                            {taskData.classification === 'ai-ready' && (
                              <div className="w-2 h-2 bg-black rounded-full" />
                            )}
                          </div>
                          <input
                            type="radio"
                            name={`classification-${taskIndex}`}
                            checked={taskData.classification === 'ai-ready'}
                            onChange={() => {
                              const newTaskData = { ...taskData, classification: 'ai-ready' };
                              const newInputs = { ...savedInputs, [taskKey]: newTaskData };
                              onInputChange(JSON.stringify(newInputs));
                            }}
                            className="sr-only"
                          />
                          <span className="text-xs font-medium text-white/70 group-hover:text-white/90 transition-colors">
                            AI-ready workflow
                          </span>
                        </label>

                        <label className="flex items-center gap-2 cursor-pointer group">
                          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                            taskData.classification === 'human-led'
                              ? 'bg-[#00DC51] border-[#00DC51]'
                              : 'bg-black/40 border-white/30 group-hover:border-[#00DC51]/50'
                          }`}>
                            {taskData.classification === 'human-led' && (
                              <div className="w-2 h-2 bg-black rounded-full" />
                            )}
                          </div>
                          <input
                            type="radio"
                            name={`classification-${taskIndex}`}
                            checked={taskData.classification === 'human-led'}
                            onChange={() => {
                              const newTaskData = { ...taskData, classification: 'human-led' };
                              const newInputs = { ...savedInputs, [taskKey]: newTaskData };
                              onInputChange(JSON.stringify(newInputs));
                            }}
                            className="sr-only"
                          />
                          <span className="text-xs font-medium text-white/70 group-hover:text-white/90 transition-colors">
                            Human-led with AI support
                          </span>
                        </label>
                      </div>

                      {/* Right: Top Candidate Checkbox with vertical separator */}
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-px bg-white/20" />
                        <label className="flex items-center gap-2 cursor-pointer group">
                          <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                            taskData.topCandidate
                              ? 'bg-[#00DC51] border-[#00DC51]'
                              : 'bg-black/40 border-white/30 group-hover:border-[#00DC51]/50'
                          }`}>
                            {taskData.topCandidate && (
                              <CheckCircle size={14} strokeWidth={3} className="text-black" />
                            )}
                          </div>
                          <input
                            type="checkbox"
                            checked={taskData.topCandidate || false}
                            onChange={(e) => {
                              const newTaskData = { ...taskData, topCandidate: e.target.checked };
                              const newInputs = { ...savedInputs, [taskKey]: newTaskData };
                              onInputChange(JSON.stringify(newInputs));
                            }}
                            className="sr-only"
                          />
                          <span className="text-xs font-medium text-white/70 group-hover:text-white/90 transition-colors whitespace-nowrap">
                            Top candidate for agent automation
                          </span>
                        </label>
                      </div>
                    </div>
                  </div>
                );
              })}
              
              {userInput && userInput !== '{}' && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mt-3 flex items-center gap-2 text-[#00DC51] font-bold text-xs"
                >
                  <CheckCircle size={16} strokeWidth={2.5} />
                  <span>Tasks saved locally</span>
                </motion.div>
              )}
            </div>
          )}

          {/* Spec Form */}
          {page.activity.type === 'spec-form' && page.activity.specFields && (
            <div className="space-y-5">
              {page.activity.specFields.map((field, index) => {
                const fieldKey = `field-${index}`;
                let savedInputs = {};
                try {
                  savedInputs = userInput && userInput !== '' ? JSON.parse(userInput) : {};
                } catch (e) {
                  savedInputs = {};
                }
                const fieldValue = savedInputs[fieldKey] || '';

                return (
                  <div key={index} className="space-y-2">
                    <label className="text-sm font-bold text-white/90 block">
                      {field.label}:
                    </label>
                    {field.helper && (
                      <p className="text-xs text-white/60 -mt-1 mb-2">{field.helper}</p>
                    )}
                    <textarea
                      value={fieldValue}
                      onChange={(e) => {
                        const newInputs = { ...savedInputs, [fieldKey]: e.target.value };
                        onInputChange(JSON.stringify(newInputs));
                      }}
                      placeholder={field.placeholder}
                      className="w-full bg-black/40 border-2 border-white/20 focus:border-[#00DC51] rounded-xl p-4 text-white placeholder-white/40 focus:outline-none resize-none font-medium transition-colors text-sm min-h-[80px]"
                    />
                  </div>
                );
              })}
              
              {userInput && userInput !== '{}' && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mt-3 flex items-center gap-2 text-[#00DC51] font-bold text-xs"
                >
                  <CheckCircle size={16} strokeWidth={2.5} />
                  <span>Spec saved locally</span>
                </motion.div>
              )}
            </div>
          )}
        </motion.div>
      )}

      {/* Certificate Download Button */}
      {page.id === 'certificate' && userInput && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-6"
        >
          <button
            onClick={() => {
              // Create a printable certificate
              window.print();
            }}
            className="w-full group inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#00DC51] text-black font-black rounded-xl hover:bg-[#00FF5F] transition-all shadow-lg shadow-[#00DC51]/40 hover:shadow-[#00DC51]/60 hover:scale-105 text-base"
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
      {page.takeaway && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-[#00DC51]/10 border-2 border-[#00DC51] rounded-2xl p-6 backdrop-blur-sm"
        >
          <div className="flex items-start gap-4">
            <div className="w-11 h-11 bg-[#00DC51] rounded-full flex items-center justify-center flex-shrink-0 shadow-lg shadow-[#00DC51]/40">
              <Zap className="text-black" size={22} strokeWidth={2.5} />
            </div>
            <div className="flex-1">
              <div className="text-xs font-black text-[#00DC51] mb-2 uppercase tracking-wider">Key Takeaway</div>
              <p className="font-bold text-base leading-relaxed">{page.takeaway}</p>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}