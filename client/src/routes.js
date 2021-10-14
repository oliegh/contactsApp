import { Switch, Route, Redirect } from 'react-router-dom'
import AuthPages from './pages/AuthPages'
import { ContactsPages } from './pages/ContactsPages'

export const useRoutes = isAutenticated => {
  if (isAutenticated) {
    return (
      <Switch>
        <Route path="/contacts" exact>
          <ContactsPages />
        </Route>
        <Redirect to="/contacts" />
      </Switch>
    )
  }

  return (
    <Switch>
      <Route path="/" exact>
        <AuthPages />
      </Route>
      <Redirect to="/" />
    </Switch>
  )
}