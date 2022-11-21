import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react';
import { mountModel } from '../interfaces/mountModel';
import { useMounts } from './Mounts';


type PostParams = {
    id: string
  }

const useMount = (id:string | undefined) => {
    const [oneMount, setOneMount] = useState<mountModel | null>(null)
  
    const getMount = async () => {
        const response = await fetch(`http://localhost:3001/api/get/${id}`)
        const data: mountModel = await response.json()
        setOneMount(data)
    }

    useEffect(() => {
      if (!id) return ;
    getMount()
    }, [id])

    return oneMount
    
}


const Mount = () => {

const { id } = useParams<PostParams>()
const oneMount = useMount(id)
const mountsList = useMounts()
console.log(oneMount?.statistics)

if(!oneMount) return null
    return (
      <div className='post__wrap'>
      <div className='post__container'>
          <h1>Détail de la monture</h1>
          <h1>Publication n°{oneMount._id}</h1>
          <h2>Titre : {oneMount.name}</h2>
          <p>Stats</p>
          <Link style={{ textDecoration: 'none', fontSize: 'x-large'}} to="/">Page d'accueil</Link>
      </div>
      <ul className='users-list'>
            {mountsList?.map(mount => (
                <li key={mount._id}>
                    {mount.name}
                </li>
            ))}
        </ul>
      </div>
    )
}

export default Mount