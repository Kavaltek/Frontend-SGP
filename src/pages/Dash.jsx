import { Box } from "@mui/material"
import LoadingButton from '@mui/lab/LoadingButton'
import { useDispatch } from "react-redux"
import { setBoards } from "../redux/features/boardSlice"
import { useNavigate } from "react-router-dom"
import boardApi from "../api/boardApi"
import { useState } from "react"
import Paper from '@mui/material/Paper'; 
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { IconButton } from '@mui/material'
import { styled } from '@mui/material/styles';
import ButtonBase from '@mui/material/ButtonBase';
import assets from '../assets/index'

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
  const Img = styled('img')({
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  });

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));
  const ver_project = () => {
    navigate(`/project_details`)
  }

    return (
        <>
        <Box sx={{
          padding: '22px'
        }}>
        <Box sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
            marginBottom: '20px'
            }}>
              <Typography variant="h4" component="h4">
                Dashboard
              </Typography>
            
            <LoadingButton
            variant='outlined'
            color='success'
            onClick={createProjecto}
            loading={loading}
            >
            Criar projecto
          </LoadingButton>
        </Box>
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>        
        {Array.from(Array(6)).map((_, index) => (
          <Grid item xs={2} sm={4} md={4} key={index}>
            <Paper
            sx={{
                margin: 'auto',
                maxWidth: 500,
                flexGrow: 1,
                backgroundColor: (theme) =>
                theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
            }}
            className='cardDash'
            >
        <Grid container spacing={2}>
            <Grid item>
            <ButtonBase className="imgDash" sx={{ width: 128, height: 128 }}>
                <Img alt="complex" src={assets.images.imgsDash} />
            </ButtonBase>
            </Grid>
            <Grid item xs={12} sm container>
            <Grid item xs container direction="column">
            <div className="cardBodyDest">
            <h3><b>Project Name</b></h3>
                <div className="Descriptions">Descriptions</div>
                <div className="id">ID: 1030114</div>
            </div>
                <Grid item className="text-right" sx={{paddingRight: '20px'}}>
                <Button className="btn-dshs"
                onClick={ver_project}
                >ver projecto</Button>
                </Grid>
            </Grid>
            </Grid>
        </Grid>
        </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
    </Box>
        </>
      )
}

export default Home