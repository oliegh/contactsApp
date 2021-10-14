const fs = require('fs')
const { Router } = require('express')
const jwt = require('jsonwebtoken')
const config = require('config')
const { check, validationResult } = require('express-validator')
const router = Router()
const user = JSON.parse(fs.readFileSync('./db/user.json', 'UTF-8'))

// /api/auth/login
router.post(
  '/login',
  [
    check('email', 'Введите корректный email').normalizeEmail().isEmail(),
    check('password', 'Введите пароль').exists()
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req)

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'Некорректные данные при входе'
        })
      }

      const {email, password} = req.body

      if(email !== user.email) {
        return res.status(400).json({ message: 'Пользователь не найден' })
      }

      const isMatch = (password === user.password)

      if (!isMatch) {
        return res.status(400).json({ message: 'Неверный пароль, попробуйте снова' })
      }

      const token = jwt.sign(
        { userId: user.id },
        config.get('jwtSecret'),
        { expiresIn: '1h' }
      )

      res.json({token, userId: user.id})

    } catch (e) {
      res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
  })

module.exports = router