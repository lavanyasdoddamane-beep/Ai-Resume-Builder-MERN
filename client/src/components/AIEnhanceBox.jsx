import React from 'react';
import { Sparkles, Check, RefreshCw, X, Loader2 } from 'lucide-react';

/**
 * AIEnhanceBox Component
 * Implements the mandatory AI improvement flow:
 * - Does NOT silently replace text
 * - Displays AI suggestion separately
 * - Shows: Use Suggestion, Regenerate, Cancel
 * - Only replaces when user explicitly clicks "Use Suggestion"
 */
const AIEnhanceBox = ({
  isLoading,
  suggestion,
  onUseSuggestion,
  onRegenerate,
  onCancel,
  error,
}) => {
  if (!isLoading && !suggestion && !error) return null;

  return (
    <div className="ai-suggestion-box">
      <div className="ai-suggestion-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
          <Sparkles size={16} color="#2563eb" />
          <span>Gemini AI Suggestion</span>
        </div>
        <button
          type="button"
          onClick={onCancel}
          style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b' }}
          title="Dismiss suggestion"
        >
          <X size={16} />
        </button>
      </div>

      {isLoading ? (
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', padding: '1rem', color: '#1e40af', fontSize: '0.875rem' }}>
          <Loader2 size={18} style={{ animation: 'spin 1s linear infinite' }} />
          <span>Generating ATS-optimized suggestions with Gemini AI...</span>
        </div>
      ) : error ? (
        <div style={{ padding: '0.75rem', color: '#dc2626', fontSize: '0.8125rem' }}>
          {error}
        </div>
      ) : (
        <>
          <div className="ai-suggestion-content">
            {suggestion}
          </div>

          <div className="ai-suggestion-actions">
            <button
              type="button"
              className="btn btn-primary btn-sm"
              onClick={() => onUseSuggestion(suggestion)}
              style={{ backgroundColor: '#16a34a', borderColor: '#16a34a' }}
            >
              <Check size={14} />
              <span>Use Suggestion</span>
            </button>

            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={onRegenerate}
            >
              <RefreshCw size={14} />
              <span>Regenerate</span>
            </button>

            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={onCancel}
            >
              <X size={14} />
              <span>Cancel</span>
            </button>
          </div>
        </>
      )}

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default AIEnhanceBox;
