import { useState } from "react"
import styles from './styles/app.module.css'
import "./App.css"

function App() {
  const [files, setFiles] = useState([])
  const [path, setPath] = useState()
  

  const onChange = (e) => {
    const file=e.target.files[0]
    setPath(URL.createObjectURL(file))
    setFiles([...files,  file])
    
    
  }

  const submit = async (e) => {
    e.preventDefault()
    const form = new FormData()
    form.append('path','http1')
    files.forEach(file=>form.append('files',file))
    
     const res = await fetch('http://localhost:5001/upload', {
       method: 'POST',
       headers: {
        enctype: 'multipart/form-data'
       },
       body:form
     })
    
     setFiles([])
    }
   
  
  return (
    <div className="App">
      <form onSubmit={submit}>
        <input type="file" onChange={onChange} />
        <button>Submit</button>
      </form>
      <div className={styles.image}>
        <img src={path}/>
     </div>
      
    </div>
  )
}

export default App
