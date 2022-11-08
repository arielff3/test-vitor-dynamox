import { lazy } from 'react'

export const Login = lazy(() =>
  import('src/pages/Login').then(module => ({
    default: module.Login,
  })),
)
export const GenericNotFound = lazy(() =>
  import('src/pages/GenericNotFound').then(module => ({
    default: module.GenericNotFound,
  })),
)
