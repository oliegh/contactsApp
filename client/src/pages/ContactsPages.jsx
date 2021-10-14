import { useCallback, useContext, useEffect, useState } from "react"
import { DebounceInput } from 'react-debounce-input'
import { Contact } from "../components/Contact"
import { Loader } from "../components/Loader"
import { AuthContext } from "../context/AuthContext"
import { useHttp } from "../hooks/http.hoock"


export const ContactsPages = () => {
  const [contacts, setContacts] = useState([])
  const [searchTerm, setSearchTerm] = useState(null);
  const { loading, request } = useHttp()
  const { token } = useContext(AuthContext)

  const fetchContacts = useCallback(async () => {
    try {
      const fetched = await request('/api/contact', 'GET', null, {
        Authorization: `Bearer ${token}`
      })
      setContacts(fetched)
    } catch (e) { }
  }, [token, request])

  useEffect(() => {
    fetchContacts()
  }, [fetchContacts])

  const fetchSearch = useCallback(async (value) => {
    try {
      const fetched = await request(`/api/contact/${value}`, 'GET', null, {
        Authorization: `Bearer ${token}`
      })
      setContacts(fetched)
    } catch (e) { }
  }, [token, request])

  useEffect(() => {
    console.log(searchTerm);
    if( searchTerm !== null ) {
      fetchSearch(searchTerm)
    }
  }, [searchTerm])

  return (
    <div>
      <div class="input-field col s6">
        <DebounceInput
          value={searchTerm}
          placeholder="Search"
          debounceTimeout={300}
          onChange={event => setSearchTerm(event.target.value)} />
      </div>
      {!loading ? <Contact contacts={contacts} /> : <Loader />}
    </div>
  )
}