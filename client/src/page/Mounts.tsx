import React, { useEffect } from 'react'
import { useState } from 'react';
import { mountModel } from '../interfaces/mountModel';
import {useNavigate} from 'react-router-dom'
import axios from 'axios';
import './mounts.css'

export const useMounts = () => {
    const [mountsList, setMountsList] = useState<mountModel[]>()

    const getMounts = () => {
        axios.get('http://localhost:3001/api/get').then((res) => {
            setMountsList(res.data) 
         })
    }
    
    useEffect(() => {
        getMounts()
    }, [])

    return mountsList
}

export const Mounts: React.FC = () => {

    const mountsList = useMounts()
    const navigate = useNavigate()

  return (
    <div>
        <div className='mounts-title'>
            <h1>Montures :</h1>
        </div>
        <ul className='mounts-list'>
            {mountsList?.map(mount => (
                <li key={mount._id} onClick={() => navigate(`/${mount._id}`)}>
                    {mount.name}
                </li>
            ))}
        </ul>
    </div>
  )
}
