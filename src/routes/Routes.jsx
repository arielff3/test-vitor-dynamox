import { Suspense } from 'react'
import {
  Navigate,
  Route,
  Routes as RoutesReactRouterDom,
} from 'react-router-dom'
import { ProtectedRoute } from './components/ProtectedRoute'
import { PublicRoute } from './components/PublicRoute'

import { Login, Products } from './paths'

export const Routes = () => {
  return (
    <Suspense fallback={<p>carregando</p>}>
      <RoutesReactRouterDom>
        <Route element={<PublicRoute />}>
          <Route path="/" element={<Login />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path="/produtos" element={<Products />} />
        </Route>

        <Route path="*" element={<Navigate to="/404" />} />
        <Route path="/404" element={<Products />} />
      </RoutesReactRouterDom>
    </Suspense>
  )
}
