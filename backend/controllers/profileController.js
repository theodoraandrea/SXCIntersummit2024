exports.getProfile = (req, res) => {
  res.send(
    `<h1>Profile</h1><pre>${JSON.stringify(
      req.user,
      null,
      2
    )}</pre><a href="/auth/logout">Logout</a>`
  );
};
