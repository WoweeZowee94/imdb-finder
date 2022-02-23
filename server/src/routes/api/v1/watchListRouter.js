import express from 'express'
import objection from 'objection'
import { WatchList } from '../../../models/index.js'
const { ValidationError } = objection


const watchListRouter = new express.Router()

watchListRouter.post('/', async (req, res) => {
  const listInput = req.body
  const { movieId, userId } = listInput
    try {
      const newList = await WatchList.query().insertAndFetch({ userId, movieId })
      return res.status(201).json({ watchList: newList })
  } catch (error) {
      if (error instanceof ValidationError) {
          return res.status(422).json({ errors: error.data })
      }
      return res.status(500).json({ errors: error })
  }
})

// filmsListRouter.post('/', async (req, res) => {
//   const listInput = req.body
//   const { movieId, userId } = listInput
//     try {
//       const newList = await FilmsList.query().insertAndFetch({ userId, movieId })
//       return res.status(201).json({ filmsList: newList })
//   } catch (error) {
//       if (error instanceof ValidationError) {
//           return res.status(422).json({ errors: error.data })
//       }
//       return res.status(500).json({ errors: error })
//   }
// })

export default watchListRouter