function TTSGuideModal({ show, onClose }) {
  if (!show) return null;

  return (
    <>
      <div className="modal d-block" tabIndex="-1" role="dialog" aria-modal="true">
        <div className="modal-dialog modal-lg modal-dialog-scrollable" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">
                <i className="bi bi-journal-text me-2"></i>TTS Guide
              </h5>
              <button type="button" className="btn-close" aria-label="Close" onClick={onClose}></button>
            </div>

            <div className="modal-body tts-guide-body">
              <h6 className="fw-semibold">Model quick guide</h6>
              <ul>
                <li><strong>eleven_v3:</strong> most expressive option; best when you want emotion and character.</li>
                <li><strong>eleven_flash_v2_5:</strong> very fast generation with low latency.</li>
                <li><strong>eleven_turbo_v2_5:</strong> balanced quality + speed for general use.</li>
                <li><strong>eleven_multilingual_v2:</strong> strong multilingual performance and natural delivery.</li>
                <li><strong>STS models:</strong> specialized for speech-to-speech workflows.</li>
              </ul>

              <h6 className="fw-semibold mt-4">Best-practice tips for better generations</h6>
              <ul>
                <li>Write text like natural speech, not raw data.</li>
                <li>Normalize numbers, symbols, abbreviations, dates, and URLs before generation.</li>
                <li>Use punctuation intentionally: commas, periods, and ellipses help pacing.</li>
                <li>For <strong>v3</strong>, use audio tags like <code>[whispers]</code>, <code>[sighs]</code>, <code>[excited]</code> for expression.</li>
                <li>Match your tags to the selected voice style; not every voice responds well to every tag.</li>
                <li>Test a few voice/model combinations and keep the one that is most consistent for your use case.</li>
              </ul>

              <h6 className="fw-semibold mt-4">Copy-ready normalization examples</h6>
              <div className="small bg-light border rounded p-3">
                <div><code>$42.50</code> → “forty-two dollars and fifty cents”</div>
                <div><code>555-555-5555</code> → “five five five, five five five, five five five five”</div>
                <div><code>14:30</code> → “two thirty PM”</div>
                <div><code>2024-01-01</code> → “January first, two-thousand twenty-four”</div>
                <div><code>elevenlabs.io/docs</code> → “eleven labs dot io slash docs”</div>
              </div>

              <p className="text-muted small mt-3 mb-0">
                Source: ElevenLabs documentation (Models + TTS Best Practices)
              </p>
            </div>

            <div className="modal-footer">
              <a
                href="https://elevenlabs.io/docs/overview/models"
                target="_blank"
                rel="noreferrer"
                className="btn btn-outline-primary"
              >
                Models Docs
              </a>
              <a
                href="https://elevenlabs.io/docs/overview/capabilities/text-to-speech/best-practices"
                target="_blank"
                rel="noreferrer"
                className="btn btn-outline-primary"
              >
                Best Practices Docs
              </a>
              <button type="button" className="btn btn-secondary" onClick={onClose}>
                Close
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="modal-backdrop fade show" onClick={onClose}></div>
    </>
  );
}

export default TTSGuideModal;