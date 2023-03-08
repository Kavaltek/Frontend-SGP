import { Box, Button, Typography, Divider, TextField, IconButton, Card } from '@mui/material'
import { useEffect, useState } from 'react'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import AddOutlinedIcon from '@mui/icons-material/AddOutlined'
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'
import assets from '../../assets/index'
import sectionApi from '../../api/sectionApi'
import taskApi from '../../api/taskApi'
import TaskModal from './TaskModal'
import { 
  HiOutlineChatAlt, 
  HiOutlineFolderOpen, 
  HiOutlineDotsHorizontal, 
  HiOutlineTrash,
  HiOutlinePlus } from "react-icons/hi";
import '../../css/custom-kanban.css'


let timer
const timeout = 501

const Kanban = props => {
  const boardId = props.boardId
  const [data, setData] = useState([])
  const [selectedTask, setSelectedTask] = useState(undefined)

  useEffect(() => {
    setData(props.data)
  }, [props.data])

  const onDragEnd = async ({ source, destination }) => {
    if (!destination) return
    const sourceColIndex = data.findIndex(e => e.id === source.droppableId)
    const destinationColIndex = data.findIndex(e => e.id === destination.droppableId)
    const sourceCol = data[sourceColIndex]
    const destinationCol = data[destinationColIndex]

    const sourceSectionId = sourceCol.id
    const destinationSectionId = destinationCol.id

    const sourceTasks = [...sourceCol.tasks]
    const destinationTasks = [...destinationCol.tasks]

    if (source.droppableId !== destination.droppableId) {
      const [removed] = sourceTasks.splice(source.index, 1)
      destinationTasks.splice(destination.index, 0, removed)
      data[sourceColIndex].tasks = sourceTasks
      data[destinationColIndex].tasks = destinationTasks
    } else {
      const [removed] = destinationTasks.splice(source.index, 1)
      destinationTasks.splice(destination.index, 0, removed)
      data[destinationColIndex].tasks = destinationTasks
    }

    try {
      await taskApi.updatePosition(boardId, {
        resourceList: sourceTasks,
        destinationList: destinationTasks,
        resourceSectionId: sourceSectionId,
        destinationSectionId: destinationSectionId
      })
      setData(data)
    } catch (err) {
      alert(err)
    }
  }

  const createSection = async () => {
    try {
      const section = await sectionApi.create(boardId)
      setData([...data, section])
    } catch (err) {
      alert(err)
    }
  }

  const deleteSection = async (sectionId) => {
    try {
      await sectionApi.delete(boardId, sectionId)
      const newData = [...data].filter(e => e.id !== sectionId)
      setData(newData)
    } catch (err) {
      alert(err)
    }
  }

  const updateSectionTitle = async (e, sectionId) => {
    clearTimeout(timer)
    const newTitle = e.target.value
    const newData = [...data]
    const index = newData.findIndex(e => e.id === sectionId)
    newData[index].title = newTitle
    setData(newData)
    timer = setTimeout(async () => {
      try {
        await sectionApi.update(boardId, sectionId, { title: newTitle })
      } catch (err) {
        alert(err)
      }
    }, timeout);
  }

  const createTask = async (sectionId) => {
    try {
      const task = await taskApi.create(boardId, { sectionId })
      const newData = [...data]
      const index = newData.findIndex(e => e.id === sectionId)
      newData[index].tasks.unshift(task)
      setData(newData)
    } catch (err) {
      alert(err)
    }
  }

  const onUpdateTask = (task) => {
    const newData = [...data]
    const sectionIndex = newData.findIndex(e => e.id === task.section.id)
    const taskIndex = newData[sectionIndex].tasks.findIndex(e => e.id === task.id)
    newData[sectionIndex].tasks[taskIndex] = task
    setData(newData)
  }

  const onDeleteTask = (task) => {
    const newData = [...data]
    const sectionIndex = newData.findIndex(e => e.id === task.section.id)
    const taskIndex = newData[sectionIndex].tasks.findIndex(e => e.id === task.id)
    newData[sectionIndex].tasks.splice(taskIndex, 1)
    setData(newData)
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
    <>
      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <Button onClick={createSection}>
          Add section          
        </Button>
        <Typography variant='body2' fontWeight='700'>
          {data.length} Sections
        </Typography>
      </Box>
      <Divider sx={{ margin: '10px 0' }} />
      <DragDropContext onDragEnd={onDragEnd}>
        <Box sx={{
          display: 'flex',
          alignItems: 'flex-start',
          width: 'calc(100vw - 400px)',
          overflowX: 'auto'
        }}>
          {
            data.map(section => (
              <div key={section.id} style={{ width: '350px', backgroundColor: "#F5F5F5", margin: 4 }} className='br-10'>
                <Droppable key={section.id} droppableId={section.id}>
                  {(provided) => (
                    <Box
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      sx={{ width: '350px', padding: '16px', marginRight: '10px' }}
                    >
                      <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginBottom: '10px'
                      }}>
                        <TextField
                          value={section.title}
                          onChange={(e) => updateSectionTitle(e, section.id)}
                          placeholder='Untitled'
                          variant='outlined'
                          className='fontCircularStdBook'
                          sx={{
                            flexGrow: 1,
                            '& .MuiOutlinedInput-input': { padding: 0 },
                            '& .MuiOutlinedInput-notchedOutline': { border: 'unset' },
                            '& .MuiOutlinedInput-root': { fontSize: '1rem', fontWeight: '700' }
                          }}
                        />
                        
                        <IconButton
                          variant='outlined'
                          size='small'
                          sx={{
                            color: 'gray',
                            '&:hover': { color: 'green' }
                          }}
                          onClick={() => createTask(section.id)}
                        >
                          <HiOutlinePlus  className='icon-menu' />
                        </IconButton>
                        <IconButton
                          variant='outlined'
                          size='small'
                          sx={{
                            color: 'gray',
                            '&:hover': { color: 'red' }
                          }}
                          onClick={() => deleteSection(section.id)}
                        >
                          <HiOutlineTrash className='icon-menu' />
                        </IconButton>
                        
                      </Box>
                      <ColoredLine color="#5030E5" />
                      {/* tasks */}
                      {
                        section.tasks.map((task, index) => (
                          <Draggable key={task.id} draggableId={task.id} index={index}>
                            {(provided, snapshot) => (
                              <Card
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                sx={{
                                  padding: '15px',
                                  marginBottom: '10px',
                                  cursor: snapshot.isDragging ? 'grab' : 'pointer!important'
                                }}
                                onClick={() => setSelectedTask(task)}
                                className='card-task'
                              >
                                <Typography className='Typography-tesk'>
                                  <div className='d-flex-justify-content-between'>
                                    <div>
                                      <div className="badge-complet">
                                        Completo
                                      </div> 
                                    </div>
                                    <div>
                                      <HiOutlineDotsHorizontal/>
                                    </div>
                                  </div>
                                  <h4><b>{task.title === '' ? 'Untitled' : task.title}</b></h4>
                                  <img src={assets.images.imgTesk} alt="" />
                                  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur</p>
                                  <div className='d-flex-justify-content-between'>
                                    <span className='users '>
                                      <div className="avatar-users-ts">
                                        <img src={assets.images.user} alt="" />
                                      </div>
                                      <div className="avatar-users-ts">
                                        <img src={assets.images.imgTesk} alt="" />
                                      </div>
                                    </span>
                                    <span className='coments'>
                                      <HiOutlineChatAlt className='icon-t'/> <font>10 comentario</font> 
                                      <HiOutlineFolderOpen className='icon-t'/> <font>3 filies</font>
                                    </span>
                                  </div>
                                </Typography>
                              </Card>
                            )}
                          </Draggable>
                        ))
                      }
                      {provided.placeholder}
                    </Box>
                  )}
                  
                </Droppable>
              </div>
            ))
          }
        </Box>
      </DragDropContext>
      <TaskModal
        task={selectedTask}
        boardId={boardId}
        onClose={() => setSelectedTask(undefined)}
        onUpdate={onUpdateTask}
        onDelete={onDeleteTask}
      />
    </>
  )
}

export default Kanban