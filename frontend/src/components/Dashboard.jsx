
import React, { useEffect, useState } from 'react';
import axios from 'axios';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { TextField } from '@mui/material';
import './Dashboard.css'
import Swal from 'sweetalert2'
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function Dashboard() {
    const [todoDetails, setTodoDetails] = useState([]);
    const [newTodo, setNewTodo] = useState({
        description:'',
        status:"ongoing"
    })

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    useEffect(() => {
        axios.get("http://localhost:3002/todo/all").then((res) => {
            setTodoDetails(res.data);
        }).catch((err) => {
            console.log(err)
        })
    },[])

    const onStatusChange = (e,todoId) => {
        let status ="";
        status = e.target.checked ? "completed" : "ongoing"
        axios.put("http://localhost:3002/todo/edit/"+todoId,{
            status
        }).then((res) => {
            if(res.data){
                setTodoDetails(todoDetails.map((todo) => todo._id === todoId ? {...todo,status} : todo))
            }
        }).catch((err)=> {
            console.log(err);
        })
    }

    const onDelete = (todoId) => {
        Swal.fire({
            title: "Do you want to save the changes?",
            showCancelButton: true,
            confirmButtonText: "Delete",
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                axios.delete("http://localhost:3002/todo/delete/"+todoId).then((res) => {
                    if(res.data){
    
                        setTodoDetails(todoDetails.filter((todo) => todo._id !=todoId))
                    }
                    // window.location.reload();
                }).catch((err) => {
                    alert("error in deletion");
                    console.log(err);
                })
              Swal.fire("Deleted!", "", "info");
            }
          });

    }
    
    const onTodoInputChange = (e) => {
        setNewTodo({...newTodo, [e.target.name]:e.target.value});
    }
    const handleAddTodo = () => {
        axios.post("http://localhost:3002/todo/add",{
            description:newTodo.description,
            status:newTodo.status
        }).then((res) => {
            if(res.data){
                Swal.fire({
                    title: "New Task Added ",
                    icon: "success"
                  });
                setTodoDetails([...todoDetails, res.data.data]);
            }
        }).catch((err) => {
            console.log(err);
        })
    }

    return (
        <div>

            <h3>Todo Lists</h3>

            <div className='add-todo'>
                
                    <TextField id="filled-basic" required={true} label="Add item ..." variant="outlined" name="description" onChange={(e)=>onTodoInputChange(e)} fullWidth /><br />

                    <button type="button" className='add-btn' onClick={handleAddTodo}>Add</button>

                    {/* </Box> */}
                {/* </Modal> */}
            </div>



            {/* card view */}
            <div className='card-box'>
                    {todoDetails.map((todo, index) => 

                        <div key={index} className='card'>
                            <div className='todo-name'>
                        {todo.status === 'completed' 
                            ?
                            <input type="checkbox" name="status" checked id="status" onChange={(e)=>onStatusChange(e,todo._id)}/>
                            :
                            <input type="checkbox" name="status" id="status" onChange={(e)=>onStatusChange(e,todo._id)}/>

                        }
                        {/* <span className='checkbox-style'>kjki</span> */}
                            {todo.status === 'completed' 
                            ?
                             <p><strike>{todo.description}</strike></p>
                            : 
                             <p>{todo.description} </p>
                        }
                        </div>
                            <div className='btn'>
                            <button type="button" onClick={()=>onDelete(todo._id)}>Delete</button>
                            </div>
                        </div>
                    
                    )}
            </div>

            
        </div>
    )

}

export default Dashboard;