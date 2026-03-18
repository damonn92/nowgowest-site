module.exports = async (_req, res) => {
  return res.status(410).json({
    ok: false,
    error: "deprecated_endpoint",
    message: "Lead capture moved to browser form submit in /consult.html"
  });
};
