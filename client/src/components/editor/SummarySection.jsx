import React, { useState } from 'react';
import { Sparkles } from 'lucide-react';
import { aiService } from '../../services/api';
import AIEnhanceBox from '../AIEnhanceBox';

const SummarySection = ({ summary = '', onChange, context = {} }) => {
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [suggestion, setSuggestion] = useState('');
  const [aiError, setAiError] = useState('');

  const handleImproveWithAI = async () => {
    if (!summary || !summary.trim()) {
      setAiError('Please enter a summary draft first before requesting AI improvement.');
      return;
    }

    setIsEnhancing(true);
    setAiError('');
    setSuggestion('');

    try {
      const res = await aiService.enhance({
        section: 'summary',
        text: summary,
        context: {
          role: context.profession || '',
        },
      });

      if (res.data?.success) {
        setSuggestion(res.data.suggestion);
      } else {
        setAiError(res.data?.message || 'Failed to enhance summary.');
      }
    } catch (err) {
      setAiError(err.response?.data?.message || 'Error communicating with AI service.');
    } finally {
      setIsEnhancing(false);
    }
  };

  const handleUseSuggestion = (improvedText) => {
    onChange(improvedText);
    setSuggestion('');
  };

  const handleCancelSuggestion = () => {
    setSuggestion('');
    setAiError('');
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '0.75rem' }}>
        <div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.25rem' }}>
            Professional Summary
          </h2>
          <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>
            A concise 3-4 sentence overview highlighting your core strengths, experience, and value.
          </p>
        </div>

        <button
          type="button"
          onClick={handleImproveWithAI}
          disabled={isEnhancing || !summary.trim()}
          className="btn btn-ai btn-sm"
          title="Improve summary using Gemini AI"
        >
          <Sparkles size={14} />
          <span>{isEnhancing ? 'Improving...' : 'Improve with AI'}</span>
        </button>
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="summary">
          <span>Summary Paragraph</span>
          <span className="optional">Optional</span>
        </label>
        <textarea
          id="summary"
          className="form-textarea"
          rows={6}
          placeholder="e.g. Versatile Full Stack Software Engineer with expertise in building scalable MERN stack web applications and microservices. Adept at optimizing database performance, designing intuitive user interfaces, and delivering clean, maintainable code."
          value={summary}
          onChange={(e) => onChange(e.target.value)}
        />
        <span className="form-helper">
          Aim for 40-70 words focusing on technical capabilities and problem-solving impact.
        </span>
      </div>

      {/* AI Suggestion Box */}
      <AIEnhanceBox
        isLoading={isEnhancing}
        suggestion={suggestion}
        onUseSuggestion={handleUseSuggestion}
        onRegenerate={handleImproveWithAI}
        onCancel={handleCancelSuggestion}
        error={aiError}
      />
    </div>
  );
};

export default SummarySection;
