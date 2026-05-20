const { useState, useEffect, useRef, useCallback } = React;

const EXAMPLES = [
  {
    headline: "Premium Running Shoes",
    description: "Find the perfect running shoe for any terrain. Expert reviews, top brands, and unbeatable prices.",
    displayUrl: "www.runningshoes.com",
  },
  {
    headline: "Cloud Storage Solutions",
    description: "Enterprise-grade cloud storage with 99.9% uptime. Trusted by 50,000+ businesses worldwide.",
    displayUrl: "www.cloudvault.io",
  },
  {
    headline: "Learn to Code Online",
    description: "Master Python, JavaScript, AI and more with hands-on projects. Learn at your own pace.",
    displayUrl: "www.devacademy.com",
  },
];

const LIMITS = { h: 30, d: 90 };

function CharCount({ val, max }) {
  const len = val.length;
  const pct = len / max;
  const cls = pct >= 1 ? 'error' : pct >= 0.9 ? 'warn' : 'ok';
  return <span className={`char-count ${cls}`}>{len}/{max}</span>;
}

function Field({ label, name, value, onChange, limit, type='input', placeholder }) {
  const isErr = value.length > limit;
  return (
    <div className="field">
      <div className="field-header">
        <label className="field-label">{label}</label>
        <CharCount val={value} max={limit} />
      </div>
      {type === 'textarea' ? (
        <textarea
          className={`field-input ${isErr ? 'error' : ''}`}
          value={value}
          onChange={e => onChange(name, e.target.value)}
          placeholder={placeholder}
          rows={2}
        />
      ) : (
        <input
          className={`field-input ${isErr ? 'error' : ''}`}
          value={value}
          onChange={e => onChange(name, e.target.value)}
          placeholder={placeholder}
        />
      )}
    </div>
  );
}

function Toast({ toasts }) {
  return (
    <div className="toast-container">
      {toasts.map(t => (
        <div key={t.id} className="toast">
          <span>{t.icon}</span>
          {t.msg}
        </div>
      ))}
    </div>
  );
}

/* ── Shared AdBlock ─────────────────────────────────────────── */
function GlobeIcon() {
  return (
    <svg focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" style={{width:18,height:18,fill:'var(--google-text-gray)'}}>
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
    </svg>
  );
}

function ThreeDotsIcon() {
  return (
    <svg focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" style={{fill:'var(--google-text-gray)',flexShrink:0}}>
      <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
    </svg>
  );
}

function AdBlock({ form, id }) {
  const url = form.displayUrl || 'www.example.com';
  const headlineText = form.headline || 'Awesome Headline';
  const descText = form.description || 'Create Some Amazing Ad Copy Today. Make Your Ad Stand Out!';
  const siteName = url.replace(/^www\./,'').split('.')[0];
  const siteTitle = siteName.charAt(0).toUpperCase() + siteName.slice(1);
  const displayPath = url;

  return (
    <div id={id} style={{backgroundColor:'var(--google-bg)',padding:'16px',fontFamily:'Arial,sans-serif'}}>
      <div className="goopreview">
        {/* Sponsored label */}
        <span style={{fontSize:12,fontWeight:700,color:'var(--google-text-gray)',display:'block',marginBottom:6,letterSpacing:0}}>Sponsored</span>

        {/* URL line */}
        <div style={{display:'flex',alignItems:'center',marginBottom:2}}>
          {/* Globe icon circle */}
          <div style={{
            display:'flex',justifyContent:'center',alignItems:'center',
            marginRight:8,
            background:'var(--google-icon-bg)',
            border:'1px solid var(--google-border)',
            borderRadius:'50%',
            width:26,height:26,
            flexShrink:0
          }}>
            <GlobeIcon />
          </div>

          {/* Site title + display URL row */}
          <div style={{flex:1,minWidth:0}}>
            <span style={{fontSize:14,color:'var(--google-text)',display:'block',lineHeight:'18px',fontWeight:400}}>
              {siteTitle}
            </span>
            <div style={{display:'flex',alignItems:'center'}}>
              <span style={{fontSize:12,color:'var(--google-text)',lineHeight:'16px'}}>
                {displayPath}
              </span>
              <ThreeDotsIcon />
            </div>
          </div>
        </div>

        {/* Headline */}
        <h1 style={{margin:'4px 0 2px',padding:0}}>
          <a href="#" style={{
            fontSize:20,
            color:'var(--google-link)',
            textDecoration:'none',
            fontWeight:400,
            lineHeight:'26px',
            display:'block',
          }}
          onMouseEnter={e=>e.target.style.textDecoration='underline'}
          onMouseLeave={e=>e.target.style.textDecoration='none'}
          onClick={e=>e.preventDefault()}
          >
            {headlineText}
          </a>
        </h1>

        {/* Description */}
        <p style={{fontSize:14,color:'var(--google-desc)',margin:0,lineHeight:'20px'}}>
          {descText}
        </p>
      </div>
    </div>
  );
}

function DesktopPreview({ form, query }) {
  return (
    <div className="google-desktop">
      <div className="google-chrome-bar">
        <div className="chrome-dots">
          <div className="chrome-dot red" />
          <div className="chrome-dot yellow" />
          <div className="chrome-dot green" />
        </div>
        <div className="chrome-address">
          <span>🔒</span>
          <span>google.com/search?q={encodeURIComponent(query || 'your search query')}</span>
        </div>
      </div>
      <div className="google-page">
        <div className="google-search-bar">
          <div className="g-logo">G</div>
          <span style={{flex:1, fontSize:14, color:'var(--text2)'}}>
            {query || 'your search query'}
          </span>
          <span style={{fontSize:18}}>🔍</span>
        </div>
        <div className="google-tabs">
          {['All','Images','News','Maps','Shopping','More'].map((t,i) => (
            <div key={t} className={`google-tab ${i===0?'active':''}`}>{t}</div>
          ))}
        </div>
        <div className="result-count">About 2,140,000,000 results (0.42 seconds)</div>

        <AdBlock form={form} id="ad-preview-desktop" />

        <div className="organic-result">
          <div className="organic-url">www.example.com</div>
          <div className="organic-title">Organic Search Result Title</div>
          <div className="organic-snippet">This is how organic search results appear below sponsored ads. Your ad stands out prominently above these results...</div>
        </div>
        <div className="organic-result">
          <div className="organic-url">www.anothersite.com</div>
          <div className="organic-title">Another Organic Result</div>
          <div className="organic-snippet">More organic content appears here in Google search results pages...</div>
        </div>
      </div>
    </div>
  );
}

function MobilePreview({ form, query }) {
  return (
    <div className="mobile-frame">
      <div className="phone-outer">
        <div className="phone-notch">
          <div className="phone-status">
            <span>9:41</span>
            <span>📶 🔋</span>
          </div>
          <div className="phone-notch-pill" />
        </div>
        <div className="phone-content">
          <div className="mobile-search">
            <div className="mobile-g">G</div>
            <span style={{flex:1, fontSize:13, color:'var(--text2)'}}>
              {query || 'your search query'}
            </span>
            <span>🎤</span>
          </div>
          <div className="mobile-tabs">
            {['All','Images','News','Maps','Shopping'].map((t,i) => (
              <div key={t} className={`mobile-tab ${i===0?'active':''}`}>{t}</div>
            ))}
          </div>

          <div id="ad-preview-mobile" style={{transform:'scale(0.88)',transformOrigin:'top left',width:'113.6%'}}>
            <AdBlock form={form} />
          </div>
        </div>
      </div>
    </div>
  );
}

function App() {
  const [dark, setDark] = useState(false);
  const [mode, setMode] = useState('desktop');
  const [loading, setLoading] = useState(false);
  const [toasts, setToasts] = useState([]);
  const [generated, setGenerated] = useState(false);
  const [query, setQuery] = useState('');
  const [showCopyFlash, setShowCopyFlash] = useState(false);
  const [form, setForm] = useState({
    headline: '',
    description: '',
    displayUrl: '',
  });
  const [liveForm, setLiveForm] = useState(form);

  useEffect(() => {
    document.documentElement.setAttribute('data-dark', dark ? '' : null);
    if (dark) document.documentElement.setAttribute('data-dark', '');
    else document.documentElement.removeAttribute('data-dark');
  }, [dark]);

  // Live update
  useEffect(() => {
    setLiveForm(form);
  }, [form]);

  const addToast = (msg, icon = '✓') => {
    const id = Date.now();
    setToasts(t => [...t, { id, msg, icon }]);
    setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 3000);
  };

  const handleChange = (name, val) => {
    setForm(f => ({ ...f, [name]: val }));
  };

  const handleGenerate = () => {
    setLoading(true);
    setTimeout(() => {
      setGenerated(true);
      setLoading(false);
      addToast('Preview generated!', '🎉');
    }, 600);
  };

  const handleRandom = () => {
    const ex = EXAMPLES[Math.floor(Math.random() * EXAMPLES.length)];
    setForm(ex);
    setGenerated(true);
    const queries = ['running shoes online', 'cloud storage plans', 'learn programming'];
    setQuery(queries[EXAMPLES.indexOf(ex)] || '');
    addToast('Example loaded!', '🎲');
  };

  const handleCopy = () => {
    const parts = [
      `Headline: ${form.headline}`,
      `Description: ${form.description}`,
      `Display URL: ${form.displayUrl}`,
    ].filter(p => !p.endsWith(': ')).join('\n');
    navigator.clipboard.writeText(parts).then(() => {
      setShowCopyFlash(true);
      setTimeout(() => setShowCopyFlash(false), 800);
      addToast('Copied to clipboard!', '📋');
    });
  };

  const handleDownload = async () => {
    const id = mode === 'desktop' ? 'ad-preview-desktop' : 'ad-preview-mobile';
    const el = document.getElementById(id);
    if (!el) return;
    addToast('Generating image...', '📸');
    try {
      const canvas = await html2canvas(el, {
        backgroundColor: dark ? '#1c1a17' : '#ffffff',
        scale: 2,
        useCORS: true,
        logging: false,
      });
      const link = document.createElement('a');
      link.download = 'google-ad-preview.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
      addToast('Downloaded!', '✅');
    } catch(e) {
      addToast('Download failed', '❌');
    }
  };

  const hasContent = form.headline || form.description || form.displayUrl;

  return (
    <>
      <header className="app-header">
        <div className="logo">
          <div className="logo-icon">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{width:17,height:17}}>
              <path d="M3 11V13M6 8.5V15.5M9 6V18M12 4V20M15 6V18M18 8.5V15.5M21 11V13" stroke="white" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>
          BDT-Ads Generator
          <div className="badge">
            <div className="live-dot" />
            Live Preview
          </div>
        </div>
        <div className="header-actions">
          <button className="icon-btn" onClick={() => setDark(d => !d)} title="Toggle dark mode">
            {dark ? '☀️' : '🌙'}
          </button>
          <button className="btn btn-secondary" onClick={handleCopy} style={{fontSize:13}}>
            📋 Copy Text
          </button>
        </div>
      </header>

      <div className="main">
        {/* FORM PANEL */}
        <div className="form-panel">
          <div className="fade-up">
            <div className="section-title">Headline</div>
            <Field label="Headline" name="headline" value={form.headline} onChange={handleChange} limit={LIMITS.h} placeholder="Your main message" />
          </div>

          <div className="fade-up fade-up-1">
            <div className="section-title">Description</div>
            <Field label="Description" name="description" value={form.description} onChange={handleChange} limit={LIMITS.d} type="textarea" placeholder="Describe your product or service..." />
          </div>

          <div className="fade-up fade-up-2">
            <div className="section-title">Website URL</div>
            <div className="field">
              <div className="field-header">
                <label className="field-label">Display URL</label>
              </div>
              <input
                className="field-input"
                value={form.displayUrl}
                onChange={e => handleChange('displayUrl', e.target.value)}
                placeholder="www.yourdomain.com"
              />
            </div>
          </div>

          <div className="fade-up fade-up-3">
            <div className="field" style={{marginTop:8}}>
              <div className="field-header">
                <label className="field-label">Search Query <span style={{color:'var(--text3)'}}>for preview</span></label>
              </div>
              <input
                className="field-input"
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="e.g. buy running shoes online"
              />
            </div>
          </div>

          <div className="fade-up fade-up-4">
            <button
              className="btn btn-primary"
              onClick={handleGenerate}
              disabled={loading}
            >
              {loading ? <div className="spinner" /> : '✨'}
              {loading ? 'Generating...' : 'Generate Preview'}
            </button>

            <button className="btn random-btn" onClick={handleRandom}>
              🎲 Load Random Example
            </button>
          </div>

          <div className="divider" />

          <div className="fade-up fade-up-5">
            <div className="tip-row">
              <div className="tip">📏 Max 30 chars for headline</div>
              <div className="tip">📝 Max 90 chars for description</div>
              <div className="tip">🔗 URL auto-formatted</div>
            </div>
          </div>
        </div>

        {/* PREVIEW PANEL */}
        <div className="preview-panel">
          <div className="preview-top">
            <div style={{display:'flex',alignItems:'center',gap:10}}>
              <div className="preview-title">Ad Preview</div>
              {hasContent && (
                <div className="badge">
                  <div className="live-dot" />
                  Live
                </div>
              )}
            </div>
            <div className="toggle-group">
              <button
                className={`toggle-btn ${mode === 'desktop' ? 'active' : ''}`}
                onClick={() => setMode('desktop')}
              >
                🖥 Desktop
              </button>
              <button
                className={`toggle-btn ${mode === 'mobile' ? 'active' : ''}`}
                onClick={() => setMode('mobile')}
              >
                📱 Mobile
              </button>
            </div>
          </div>

          {!generated && !hasContent ? (
            <div className="empty-state fade-up">
              <div className="empty-icon">🎯</div>
              <div className="empty-title">No preview yet</div>
              <div className="empty-desc">Fill in the form on the left and click Generate Preview, or load a random example to get started.</div>
            </div>
          ) : (
            <div className="mockup-wrapper" key={mode}>
              {mode === 'desktop' ? (
                <DesktopPreview form={liveForm} query={query} />
              ) : (
                <MobilePreview form={liveForm} query={query} />
              )}

              <div className="preview-actions">
                <button className="btn btn-secondary" onClick={handleCopy}>
                  📋 Copy Ad Text
                </button>
                <button className="btn btn-secondary" onClick={handleDownload}>
                  📥 Download PNG
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="app-footer">
        Copyright &copy; {new Date().getFullYear()} by{' '}
        <a href="https://www.mazharul.bro.bd" target="_blank" rel="noopener noreferrer">Rafi</a>
        {' '}| All Rights Reserved.
      </footer>

      <Toast toasts={toasts} />
    </>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
