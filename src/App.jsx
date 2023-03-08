import './css/global.css'
import CssBaseLine from '@mui/material/CssBaseline'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AppLayout from './components/layout/AppLayout'
import AuthLayout from './components/layout/AuthLayout'
import Home from './pages/Home'
import Board from './pages/Board'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Calender from './pages/Calender'
import CreateProject from './pages/CreateProject'
import Dash from './pages/Dash'
import ProjectDetails from './pages/ProjectDetails'

function App() {
  const theme = createTheme({
    palette: { mode: 'light' }
  })

  return (
    <ThemeProvider theme={theme}>
      <CssBaseLine />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<AuthLayout />}>
            <Route path='login' element={<Login />} />
            <Route path='signup' element={<Signup />} />
          </Route>
          <Route path='/' element={<AppLayout />}>
            <Route index element={<Home />} />
            <Route path='boards' element={<Home />} />
            <Route path='boards/:boardId' element={<Board />} />
            <Route path='calendar' element={<Calender />} />
            <Route path='create_project' element={<CreateProject />} />
            <Route path='dash' element={<Dash />} />
            <Route path='project_details' element={<ProjectDetails />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
