import { Box, TextField } from "@mui/material"
import LoadingButton from '@mui/lab/LoadingButton'
import { IconButton } from '@mui/material'
import { useState, Fragment } from "react"
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined'
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import projectApi from '../api/projectApi'
import { useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from 'react-redux'


const steps = ['Topo de Projecto', 'Recursos', 'Privacidade', 'Membros'];


const CreateProject = () => {
  const navigate = useNavigate()
  const [activeStep, setActiveStep] = useState(0);
  let [increment, setIncrement] = useState(0);
  const [completed, setCompleted] = useState({});

  //dados do formulario
  const user = useSelector((state) => state.user.value)

  const [tipo, setTipo] = useState('')
  const [name, setNome] = useState('')
  const [descricao, setDescricao] = useState('')
  const [privacidade, setPrivacidade] = useState('')
  const [membros, setMembros] = useState([])

  const handleMembros = (e) => {
    const values = e.target.value.split(';')
    setMembros(values)
  }
  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed,
          // find the first step that has been completed
          steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
    setIncrement(activeStep + 1)
    console.log(user)
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    setIncrement(activeStep - 1)
  };

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  const handleComplete = () => {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    handleNext();
  };

  const handleReset = async () => {
    setActiveStep(0);
    setIncrement(0);
    setCompleted({});
    try {
      const apiProject = await projectApi.create({name, description: descricao, tipo, privacidade, membros})
      navigate(`/dash`)
    } catch (error) {
      console.log(error)
    }
    
  };

  const selectPrivacidade = [
    {
      value: 'Publico',
      label: 'Publico',
    },
    {
      value: 'Privado',
      label: 'Privado',
    },
    {
      value: 'Oculto',
      label: 'Oculto',
    }
  ];

  const selectType = [
    {
      value: 'projecto',
      label: 'Projecto'
    },
    {
      value: 'Grupo de Trabalho',
      label: 'Grupo de Trabalho'
    }
  ]

 
    return (
        <>
        <Box sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
            }}>
            <Box sx={{marginLeft: '55px'}}>
              <h1>Criar Projecto</h1>
            </Box>
            <Box sx={{marginRight: '50px'}}>
            <IconButton variant='outlined' color='error' >
            <Button sx={{
              backgroundColor: 'lightBlue'
            }}
            
            >Ver Projectos</Button>
            </IconButton>
            </Box>
        </Box>
        <Box sx={{ padding: '10px 50px', backgroundColor: '#fff' }}>
            <Box>
                <Box sx={{ width: '100%'}}>
                    <Stepper nonLinear activeStep={activeStep}>
                      {steps.map((label, index) => (
                        <Step key={label} completed={completed[index]}>
                          <StepButton color="inherit" onClick={handleStep(index)}>
                            {label}
                          </StepButton>
                        </Step>
                      ))}
                    </Stepper>
                    <div>
                      {allStepsCompleted() ? (
                        <Fragment>
                          <Typography sx={{ mt: 2, mb: 1 }}>
                            Todos os passos terminados - Terminaste
                          </Typography>
                          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                            <Box sx={{ flex: '1 1 auto' }} />
                            <Button onClick={handleReset}>Reset</Button>
                          </Box>
                        </Fragment>
                      ) : (
                        <Fragment >
                          {
                          (increment === 0) ? (
                            <>
                              <Box sx={{ mt: 2, mb: 1, py: 1 }}>
                                <TextField
                                  id="outlined-select-currency"
                                  select
                                  label="Tipo de Projecto"
                                  helperText="Ecolha o tipo do projecto"
                                  onChange={(e) => { setTipo(e.target.value)}}
                                >
                                  {selectType.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                      {option.label}
                                    </MenuItem>
                                  ))}
                                </TextField>
                              </Box>
                            </>
                            ) : (

                              (increment === 1) ? (

                                <Box sx={{ mt: 2, mb: 1, py: 1 }}>
                                  <Box
                                    component="form"
                                    sx={{
                                      '& .MuiTextField-root': { m: 1, width: '25ch' },
                                    }}
                                    noValidate
                                    autoComplete="off"
                                  >
                                    <div>
                                      <TextField
                                        id="outlined-multiline-flexible"
                                        label="Nome"
                                        multiline
                                        maxRows={4}
                                        onChange={(e) => {setNome(e.target.value)}}
                                      />
                                      
                                    </div>
                                    <div>
                                      <TextField
                                        id="standard-multiline-static"
                                        label="Descrição"
                                        placeholder="Descrição"
                                        multiline
                                        rows={4}
                                        variant="standard"
                                        onChange={(e) => {setDescricao(e.target.value)}}
                                      />
                                    </div>
                                  </Box>
                                </Box>
                                ) : (

                                  (increment === 2) ? (
                                    <Box sx={{ mt: 2, mb: 1, py: 1 }}>
                                        <Box
                                          component="form"
                                          sx={{
                                            '& .MuiTextField-root': { m: 1, width: '25ch' },
                                          }}
                                          noValidate
                                          autoComplete="off"
                                        >
                                          <div>
                                            <TextField
                                              id="outlined-select-currency"
                                              select
                                              label="Privacidade"
                                              onChange={(e) => { setPrivacidade(e.target.value)}}
                                              defaultValue="EUR"
                                              helperText="O nível de privacidade regula quem pode ingressar e ver as informações da equipe."
                                            >
                                              {selectPrivacidade.map((option) => (
                                                <MenuItem key={option.value} value={option.value}>
                                                  {option.label}
                                                </MenuItem>
                                              ))}
                                            </TextField>
                                          </div>
                                        </Box>
                                    </Box>
                                  ) : (

                                    <Box sx={{ mt: 2, mb: 1, py: 1 }}>
                                      <Box
                                        component="form"
                                        sx={{
                                          '& .MuiTextField-root': { m: 1, width: '25ch' },
                                        }}
                                        noValidate
                                        autoComplete="off"
                                      >
                                        <div>
                                          <TextField
                                            id="standard-multiline-static"
                                            label="Membros"
                                            placeholder="Membros"
                                            onChange={handleMembros}
                                            multiline
                                            rows={4}
                                            variant="standard"
                                          />
                                        </div>
                                      </Box>
                                    </Box>
                                  )
                                )
                              
                            )
                          }
                          
                          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                            <Button
                              color="inherit"
                              disabled={activeStep === 0}
                              onClick={handleBack}
                              sx={{ mr: 1 }}
                            >
                              Voltar
                            </Button>
                            <Box sx={{ flex: '1 1 auto' }} />
                            <Button onClick={handleNext} sx={{ mr: 1, backgroundColor: 'lightBlue' }}>
                              Próximo
                            </Button>
                            {activeStep !== steps.length &&
                              (completed[activeStep] ? (
                                <Typography variant="caption" sx={{ display: 'inline-block' }}>
                                  Passo {activeStep + 1} completo
                                </Typography>
                              ) : (
                                <Button
                                sx={{
                                  backgroundColor: 'lightBlue'
                                }}
                                 onClick={handleComplete}>
                                  {completedSteps() === totalSteps() - 1
                                    ? 'Terminar'
                                    : 'Complete o Passo'}
                                </Button>
                              ))}
                          </Box>
                        </Fragment>
                      )}
                    </div>
                  </Box>
            </Box>
        </Box>
        </>
      )
}

export default CreateProject