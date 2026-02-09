function ErrorAlert({ message }) {
  if (!message) return null;

  return (
    <div className="alert alert-danger d-flex align-items-center" role="alert">
      <i className="bi bi-exclamation-triangle-fill me-2"></i>
      <div>{message}</div>
    </div>
  );
}

export default ErrorAlert;
