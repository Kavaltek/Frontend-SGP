import React from 'react';
import Calendar from '../components/common/Calendar';
import { HiChevronDown } from "react-icons/hi";
function Calender() {
  return <main>
    <div className='pp-4'>
      <h2>Roadmap do produto</h2>
      <h5 className='mtt-4'>Chart how your business grows</h5>
     <h2>2017</h2>
    </div>
     <div>
     <div>
      <div className="task-grup">
        Team Dev
      </div>
     <div className='taks'>
      <div className='cad-tast cad-tast-blue' style={{width: '40%'}}>
        <div className="progress-bar cad-tast-progress-blue" style={{width: '30%'}}>
          <span className='text'>Base de dados designer</span>
        </div>        
      </div>
      <div className='cad-tast cad-tast-orange' style={{width: '20%'}}>
        <div className="progress-bar cad-tast-progress-orange" style={{width: '10%'}}>
          <span className='text'>Base de dados designer</span>
        </div>        
      </div>  
      <div className="task-grup">
      Team Designers 
      </div> 
      <div className='cad-tast mm-10 cad-tast-green' style={{width: '50%'}}>
        <div className="progress-bar cad-tast-progress-green" style={{width: '30%'}}>
          <span className='text'>Base de dados designer</span>
        </div>        
      </div> 
      <div className='cad-tast' style={{width: '20%'}}>
        <div className="progress-bar" style={{width: '50%'}}>
          <span className='text'>Base de dados designer</span>
        </div>        
      </div>  
      <div className='cad-tast' style={{width: '70%'}}>
        <div className="progress-bar" style={{width: '90%'}}>
          <span className='text'>Base de dados designer</span>
        </div>        
      </div>      
    </div>
     </div>
    <Calendar/>
     </div>
  </main>
}

export default Calender;