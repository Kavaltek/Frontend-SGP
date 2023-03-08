import { useSelector, useDispatch } from 'react-redux'
import { Box, Drawer, IconButton, List, ListItem, ListItemButton, Typography } from '@mui/material'
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined'
import AppsOutlinedIcon from '@mui/icons-material/AppsOutlined';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined'
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined';
import PlaylistAddCheckOutlinedIcon from '@mui/icons-material/PlaylistAddCheckOutlined';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import { Link, useNavigate, useParams } from 'react-router-dom'
import { 
  HiOutlineViewGrid,
  HiOutlineChatAlt,
  HiOutlineClipboardList,
  HiOutlineUsers,
  HiOutlineCog
} from "react-icons/hi";
import assets from '../../assets/index'
import { useEffect, useState } from 'react'
import boardApi from '../../api/boardApi'
import { setBoards } from '../../redux/features/boardSlice'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import FavouriteList from './FavouriteList'

const Sidebar = () =>
{
  const user = useSelector((state) => state.user.value)
  const boards = useSelector((state) => state.board.value)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { boardId } = useParams()
  const [activeIndex, setActiveIndex] = useState(0)

  const sidebarWidth = 250

  useEffect(() =>
  {
    const getBoards = async () =>
    {
      try
      {
        const res = await boardApi.getAll()
        dispatch(setBoards(res))
      } catch (err)
      {
        alert(err)
      }
    }
    getBoards()
  }, [dispatch])

  useEffect(() =>
  {
    const activeItem = boards.findIndex(e => e.id === boardId)
    if (boards.length > 0 && boardId === undefined)
    {
      navigate(`/boards/${boards[0].id}`)
    }
    setActiveIndex(activeItem)
  }, [boards, boardId, navigate])

  const logout = () =>
  {
    localStorage.removeItem('token')
    navigate('/login')
  }

  const onDragEnd = async ({ source, destination }) =>
  {
    const newList = [...boards]
    const [removed] = newList.splice(source.index, 1)
    newList.splice(destination.index, 0, removed)

    const activeItem = newList.findIndex(e => e.id === boardId)
    setActiveIndex(activeItem)
    dispatch(setBoards(newList))

    try
    {
      await boardApi.updatePositoin({ boards: newList })
    } catch (err)
    {
      alert(err)
    }
  }

  const addBoard = async () =>
  {
    try
    {
      const res = await boardApi.create()
      const newList = [res, ...boards]
      dispatch(setBoards(newList))
      navigate(`/boards/${res.id}`)
    } catch (err)
    {
      alert(err)
    }
  }

  const home = () => {
    navigate(`/`)
  }
  const ver_projectos = () => {
    navigate('/dash')
  }
  const ColoredLine = ({ color }) => (
    <hr
        style={{
            color: color,
            backgroundColor: color,
            height: 2,
            border: 'none'
        }}
    />
  );

  return (
    <Drawer
      container={window.document.body}
      variant='permanent'
      open={true}
      sx={{
        width: sidebarWidth,
        height: '100vh',
        '& > div': { borderRight: '2' }
      }}
    >
      <div className="img-menu-drawer">
      <img src={assets.images.logo} style={{ width: '140px'}} alt='app logo' />
      </div>
      <List
        disablePadding
        sx={{
          width: sidebarWidth,
          height: '100vh',
          backgroundColor: assets.colors.secondary
        }}
      >
        <ListItem>
          <Box sx={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
            }} className='
            sidebar-menu-link
            '>
            <IconButton onClick={home}>
              <HiOutlineViewGrid className='icon-menu' />
            </IconButton>
            <Typography variant='body2'>
              Home
            </Typography>
          </Box>
        </ListItem>
        <ListItem>
          <Box sx={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
            }} className='
            sidebar-menu-link
            '>
            <IconButton >
              <HiOutlineChatAlt className='icon-menu' />
            </IconButton>
            <Typography variant='body2'>
              Inbox
            </Typography>
          </Box>
        </ListItem>
        <ListItem>
          <Box sx={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
            }} className='
            sidebar-menu-link
            '>
            <IconButton >
              <HiOutlineClipboardList className='icon-menu' />
            </IconButton>
            <Typography variant='body2' onClick={ver_projectos} fontWeight='700'>
              Projectos
            </Typography>
          </Box>
        </ListItem>
        <ListItem>
          <Box sx={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
            }} className='
            sidebar-menu-link
            '>
            <IconButton >
              <HiOutlineUsers className='icon-menu' />
            </IconButton>
            <Typography variant='body2'>
              Membros
            </Typography>
          </Box>
        </ListItem>
        
        <ListItem>
          <Box sx={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
            }} className='
            sidebar-menu-link
            '>
            <IconButton >
              <HiOutlineCog className='icon-menu' />
            </IconButton>
            <Typography variant='body2'>
              Configurações
            </Typography>
          </Box>
        </ListItem>
        <div className="hr-menu"/>       
        <Box sx={{ paddingTop: '10px' }}  />
        <FavouriteList />
        <Box sx={{ paddingTop: '10px' }} />
        <ListItem>
          <Box sx={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <Typography variant='body2'>
              <b>Meus Projectos</b>
            </Typography>
            <IconButton onClick={addBoard}>
              <AddBoxOutlinedIcon className='icon-menu' />
            </IconButton>
          </Box>
        </ListItem>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable key={'list-board-droppable-key'} droppableId={'list-board-droppable'}>
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                {
                  boards.map((item, index) => (
                    <Draggable key={item.id} draggableId={item.id} index={index}>
                      {(provided, snapshot) => (
                        <ListItemButton
                          ref={provided.innerRef}
                          {...provided.dragHandleProps}
                          {...provided.draggableProps}
                          selected={index === activeIndex}
                          component={Link}
                          to={`/boards/${item.id}`}
                          sx={{
                            pl: '20px',
                            cursor: snapshot.isDragging ? 'grab' : 'pointer!important'
                          }}
                        >
                          <Typography
                            variant='body2'
                          
                            sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
                          >
                            {item.icon} {item.title}
                          </Typography>
                        </ListItemButton>
                      )}
                    </Draggable>
                  ))
                }
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </List>
    </Drawer>
  )
}

export default Sidebar