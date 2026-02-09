function TextInput({ value, onChange }) {
  return (
    <div className="mb-3">
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Enter text here..."
        rows={6}
        className="form-control"
      />
    </div>
  );
}

export default TextInput;
