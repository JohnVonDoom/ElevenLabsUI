function GenerateButton({ loading, onClick }) {
  return (
    <div className="d-grid mb-3">
      <button
        onClick={onClick}
        disabled={loading}
        className="btn btn-primary btn-lg"
      >
        {loading ? (
          <>
            <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
            Generating...
          </>
        ) : (
          <>
            <i className="bi bi-play-fill me-1"></i>Generate
          </>
        )}
      </button>
    </div>
  );
}

export default GenerateButton;
