import { useEffect, useState } from 'react'

const CAT_ENDPOINT_RANDOM_FACT = 'https://catfact.ninja/fact'
//const CAT_ENDPOINT_IMAGE_URL = `https://cataas.com/cat/says/${threeFirstWords}?fontSize=50&fontColor=red&json=true`
const CAT_PREFIX_IMAGE_URL = 'https://cataas.com'

export function App() {

  const [fact, setFact] = useState()
  const [imageUrl, setImageUrl] = useState()
  const [factError, setFactError] = useState()

  useEffect(() => {
    fetch(CAT_ENDPOINT_RANDOM_FACT)
      .then(res => {
        if(!res.ok) {
          setFactError('No se ha podido recuperar la cita.')
        }
        return res.json()
      })
      .then(data => {
        const { fact } = data
        setFact(fact)
      })
  }, [])

  useEffect(() => {
    if (!fact) return

    const threeFirstWords = fact.split(' ', 3).join(' ')
    console.log(threeFirstWords)

    fetch(`https://cataas.com/cat/says/${threeFirstWords}?fontSize=50&fontColor=red&json=true`)
      .then(res => res.json())
      .then(response => {
        const { url } = response
        setImageUrl(url)
      })
  }, [])

  return (
    <>
      <h1>App de Gatos</h1>
      {fact ? <p>{fact}</p> : <p>{factError}</p>}
      {imageUrl ? <img src={`${CAT_PREFIX_IMAGE_URL}${imageUrl}`} alt={`Image extracted using the first three words for ${fact}`} title={`Image extracted using the first three words for ${fact}`} /> : <p>No se encontró una imagen.</p>}
    </>
  )
}