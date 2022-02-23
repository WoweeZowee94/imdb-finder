import express from 'express'
import objection from 'objection'
const { ValidationError } = objection
import { FilmsList } from '../../../models/index.js'

const filmsListRouter = new express.Router()

filmsListRouter.post('/', async (req, res) => {
  const listInput = req.body
  const { movieId, userId } = listInput
    try {
      const newList = await FilmsList.query().insertAndFetch({ userId, movieId })
      return res.status(201).json({ filmsList: newList })
  } catch (error) {
      if (error instanceof ValidationError) {
          return res.status(422).json({ errors: error.data })
      }
      return res.status(500).json({ errors: error })
  }
})

export default filmsListRouter