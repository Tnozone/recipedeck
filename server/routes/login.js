router.post('/login', async (req, res) => {
  const { loginIdentifier, password } = req.body

  const user = await User.findOne({
    $or: [
      { username: loginIdentifier },
      { email: loginIdentifier }
    ]
  })

  if (!user) {
    return res.status(401).json({
      message: 'Invalid username/email or password'
    })
  }

  if (user.password !== password) {
    return res.status(401).json({
      message: 'Invalid username/email or password'
    })
  }

  res.json({
    _id: user._id,
    username: user.username,
    email: user.email
  })
})