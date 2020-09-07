import { UserDocument, UserODM } from 'src/models/odms/user'
import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt'
import { sign } from 'jsonwebtoken'

export interface JwtPayload {
  id: string
  username: string
}

export const getJwtStrategy = () =>
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    },
    (payload: JwtPayload, done) => {
      UserODM.findOne(
        { id: payload.id, username: payload.username },
        (err, user) => {
          if (err) return done(err)
          done(null, user)
        }
      )
    }
  )

export function signPayload(payload: JwtPayload) {
  return sign(payload, process.env.JWT_SECRET || 'default')
}
