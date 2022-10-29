import { useState, useRef, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useFirestore } from '../../hooks/useFirestore'
import { useCollection } from '../../hooks/useCollection'

// styles
import './CreateBom.css'

export default function CreateBom() {  
  const [title, setTitle] = useState('')
  const [method, setMethod] = useState('')
  const [materials, setMaterials] = useState([])
  
  const [volumen, setVolumen] = useState('')
  const [newMaterial, setNewMaterial] = useState('')
  
  const { documents, error } = useCollection('bom')
  const { addDocument, response } = useFirestore('bom')
  const history = useHistory()
  
  const handleSubmit = (e) => {
    e.preventDefault()
    addDocument({
        material:materials,
        bomName:title,
        note:method,

    })
    history.push('/admin')

  }

  const handleAdd = () => {
 
   let volumenType=document.getElementById("volumenType").value

  // materials.push({volumen,volumenType,newMaterial })
   setMaterials(prevMaterials => [...prevMaterials, {volumen,volumenType,  newMaterial}])
    setNewMaterial("")
    setVolumen("")
    console.log(materials)
   /* e.preventDefault()
    const ing = newIngredient.trim()

    if (ing && !ingredients.includes(ing)) {
      setIngredients(prevIngredients => [...prevIngredients, newIngredient])
    }
    setNewIngredient('')
    ingredientInput.current.focus()*/
  }

  // redirect the user when we get data response
 /* useEffect(() => {
    if (response) {
      history.push('/')
    }
  }, [response, history])*/

  return (
    <div className="create">
      <h2 className="page-title">"Termékjegyzék": BOM lista készítése</h2>
      <form onSubmit={handleSubmit}>

        <label>
          <span>Bom neve</span>
          <input 
            type="text" 
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            required
          />
        </label>

        <label>
          <span>Szükséges anyagok</span>
          <div className="ingredients">
            <input 
              type="text" 
              onChange={(e) => setNewMaterial(e.target.value)}
              value={newMaterial}
             
            />
           </div>
        </label>
        <label>
            <select  id="volumenType" required >
                <option selected value="-">-</option>
                <option value="db">Db</option>
                <option value="méter">Méter</option>
            </select>
           
        </label>
       
        <label>
          <span>Mennyiség:</span>
          <input 
            type="number" 
            onChange={(e) => setVolumen(e.target.value)}
            value={volumen}
            required 
          />
        </label>
        <button onClick={handleAdd} className="btn">Hozzáad</button>
        <p>Anyaglista: {materials.map(i => <em key={i}>{i}, </em>)}</p>
        <label>
          <span>Megjegyzések</span>
          <textarea 
            onChange={(e) => setMethod(e.target.value)}
            value={method}
            required
          />
        </label>

        <button className="btn">Rögzítés</button>
      </form>
    </div>
  )
}
