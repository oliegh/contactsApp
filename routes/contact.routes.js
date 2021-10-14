const fs = require('fs')
const { Router } = require('express')
const auth = require('../middleware/auth.middleware')
const router = Router()
const contacts = JSON.parse(fs.readFileSync('./db/contacts.json', 'UTF-8')).contacts

router.get('/', auth, async (req, res) => {
  try {
    res.json(contacts)
  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
  }
})

router.get('/:search', auth, async (req, res) => {
  try {
    const serchValuse = req.params.search

    let sortingContacts = contacts.filter(contact => {
      if(contact.name.indexOf(serchValuse) + 1 || contact.phone.indexOf(serchValuse) + 1 || contact.email.indexOf(serchValuse) + 1) {
        return true
      }else {
        return false
      }
    })    
    res.json(sortingContacts)
  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
  }
})

module.exports = router