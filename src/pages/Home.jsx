import { Box } from "@mui/material"
import LoadingButton from '@mui/lab/LoadingButton'
import { useDispatch } from "react-redux"
import { setBoards } from "../redux/features/boardSlice"
import { useNavigate } from "react-router-dom"
import boardApi from "../api/boardApi"
import { useState } from "react"

const Home = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)

  const createProjecto = async () => {
    setLoading(true)
    try {
      /*const res = await boardApi.create()
      dispatch(setBoards([res]))*/
      navigate(`/create_project`)
    } catch (err) {
      alert(err)
    } finally {
      setLoading(false)
    }
  }
    return (
        <Box sx={{
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          
          <LoadingButton
            variant='outlined'
            color='success'
            onClick={createProjecto}
            loading={loading}
          >
            Click here to create your first board
          </LoadingButton>
          iiiiyy8y8y8y8
        </Box>
      )
}

export default Home