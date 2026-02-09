function ApiKeyInput({ apiKey, showApiKey, onApiKeyChange, onToggleShow, onClear }) {
  return (
    <div className="bg-light border border-2 border-dashed rounded p-3 mb-4">
      <div className="input-group mb-2">
        <input
          type={showApiKey ? 'text' : 'password'}
          value={apiKey}
          onChange={onApiKeyChange}
          placeholder="Enter your ElevenLabs API key"
          className="form-control font-monospace"
        />
        <button
          type="button"
          onClick={onToggleShow}
          className="btn btn-outline-secondary"
        >
          <i className={`bi ${showApiKey ? 'bi-eye-slash' : 'bi-eye'}`}></i>
        </button>
        <button
          type="button"
          onClick={onClear}
          className="btn btn-outline-danger"
        >
          <i className="bi bi-trash"></i>
        </button>
      </div>
      <p className="text-muted text-center mb-0 small">
        <i className="bi bi-lock-fill me-1"></i>
        Your API key is stored locally on your computer and only sent to ElevenLabs' official API
      </p>
    </div>
  );
}

export default ApiKeyInput;
