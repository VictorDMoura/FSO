import { useState, useEffect } from "react"
import countriesService from "./services/countries"


const App = () => {
  const [countries, setCountries] = useState([])

  useEffect(() => {
    fetchCountries()
  }, [])

  const fetchCountries = async () => {
    const data = await countriesService.getAllCountries()
    setCountries(data)
  }


  return (
    <div>
      <h2>Countries</h2>
      <ul>
        {countries.map((country) => (
          <li key={country.name.common}>{country.name.common}</li>
        ))}
      </ul>
      </div>
  )
}

export default App