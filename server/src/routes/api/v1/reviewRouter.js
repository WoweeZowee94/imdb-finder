import express from 'express'
import Objection from 'objection'
import { Review } from '../../../models/index.js'
const { ValidationError } = Objection 

const reviewRouter = new express.Router()

reviewRouter.post('/', async (req, res) => {
  const formInput = req.body
  console.log(req.body)
  const { title, rating, body, userId, movieId, movieTitle } = formInput
  try {
      const newReview = await Review.query().insertAndFetch({ title, rating, body, userId, movieId, movieTitle })
      return res.status(201).json({ reviews: newReview })
  } catch (error) {
      if (error instanceof ValidationError) {
          return res.status(422).json({ errors: error.data })
      }
      return res.status(500).json({ errors: error })
  }
})

export default reviewRouter