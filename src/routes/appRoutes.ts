import { Application } from 'express'
import moviesRouter from './movieRoutes'

 const appRoutes =(app:Application)=>{
    app.use('/api/movies',moviesRouter)
}

export default appRoutes