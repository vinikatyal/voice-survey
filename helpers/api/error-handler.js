export { errorHandler };

function errorHandler(err, res) {
  if (res.code === 500) {
    return res.status(500).json({ message: res.message });
  }

  if (res.code >= 400) {
    return res.status(400).json({ message: res.message });
  }
  if (typeof err === "string") {
    // custom application error
    return res.status(400).json({ message: err });
  }

  if (err.name === "UnauthorizedError") {
    // jwt authentication error
    return res.status(401).json({ message: "Invalid Token" });
  }

  // default to 500 server error
  return res.status(500).json({ message: err.message });
}
