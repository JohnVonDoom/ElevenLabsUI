import { useEffect, useState } from 'react';

function CreateProfileModal({ show, onClose, onSubmit }) {
  const [name, setName] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [touched, setTouched] = useState(false);

  useEffect(() => {
    if (!show) {
      setName('');
      setApiKey('');
      setTouched(false);
    }
  }, [show]);

  if (!show) return null;

  const nameValid = name.trim().length > 0;
  const apiKeyValid = apiKey.trim().length > 0;

  const handleSubmit = (e) => {
    e.preventDefault();
    setTouched(true);

    if (!nameValid || !apiKeyValid) return;

    onSubmit(name.trim(), apiKey.trim());
  };

  return (
    <>
      <div className="modal d-block" tabIndex="-1" role="dialog" aria-modal="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <form onSubmit={handleSubmit} noValidate>
              <div className="modal-header">
                <h5 className="modal-title">
                  <i className="bi bi-person-badge me-2"></i>Create API Profile
                </h5>
                <button type="button" className="btn-close" aria-label="Close" onClick={onClose}></button>
              </div>

              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">Profile Name</label>
                  <input
                    type="text"
                    className={`form-control ${touched && !nameValid ? 'is-invalid' : ''}`}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Main Account"
                  />
                  <div className="invalid-feedback">Profile name is required.</div>
                </div>

                <div>
                  <label className="form-label">ElevenLabs API Key</label>
                  <input
                    type="password"
                    className={`form-control ${touched && !apiKeyValid ? 'is-invalid' : ''}`}
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    placeholder="Enter API key"
                  />
                  <div className="invalid-feedback">API key is required.</div>
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={onClose}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Create Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="modal-backdrop fade show" onClick={onClose}></div>
    </>
  );
}

export default CreateProfileModal;