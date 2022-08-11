import { useEffect, useState } from "react"
import { projectFirestore } from "../firebase/config"




const useDocument = (collection, id) => {
 const [ document, setDocument] = useState(null)
 const [error, setError] = useState(null)

// realtime data for document 
 useEffect(() => {
 const ref = projectFirestore.collection(collection).doc(id)
 
 const unsubscribe = ref.onSnapshot((snapshot) => {
 if(snapshot.data()){
    setDocument({...snapshot.data(), id: snapshot.id})
    setError(null)
 } 
 else{
    setError('no Document found Error')
 }
}, (err) => {
 console.log(err.message)
 setError('failded to get the document')
 })


 return () => unsubscribe()

 }, [collection, id])


  return {
    document, error
  }
}

export  {useDocument}