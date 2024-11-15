
import React, { useEffect, useState } from 'react';
import axios from 'axios';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { TextField } from '@mui/material';

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
            console.log(res.data);
            setTodoDetails(res.data);
        }).catch((err) => {
            console.log(err)
        })
    },[])

    const onStatusChange = (e,todoId) => {
        console.log(todoId);
        console.log(e.target.checked);
        const status = e.target.checked ? "completed" : "ongoing"
        axios.put("http://localhost:3002/todo/edit/"+todoId,{
            status:status
        }).then((res) => {
            console.log(res.data);
            if(res.data){
                window.location.reload();
            }
        }).catch((err)=> {
            console.log(err);
        })
    }

    const onDelete = (todoId) => {
        console.log(todoId);
        if(window.confirm("Are You Sure You Want to Delete the Task ?")){
            axios.delete("http://localhost:3002/todo/delete/"+todoId).then((res) => {
                console.log(res);
                alert("deletetion successfull");
                window.location.reload();
            }).catch((err) => {
                alert("error in deletion");
                console.log(err);
            })
        }
    }


    const onTodoInputChange = (e) => {
        setNewTodo({...newTodo, [e.target.name]:e.target.value});
    }
    const handleAddTodo = () => {
        console.log(newTodo);
        axios.post("http://localhost:3002/todo/add",{
            description:newTodo.description,
            status:newTodo.status
        }).then((res) => {
            console.log(res.data);
            if(res.data){
                alert("Todo Added Successfully");
                window.location.reload();
            }
        }).catch((err) => {
            console.log(err);
        })
    }

    return (
        <div>

            <h3>Todo Lists</h3>

            <div>
                <Button onClick={handleOpen}>+ Add Todo</Button>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Add New Todo Task
                    </Typography>
                    
                    <TextField id="filled-basic" label="Todo Description" variant="filled" name="description" onChange={(e)=>onTodoInputChange(e)} fullWidth /><br />

                    <button type="button" style={{marginTop:"0.2rem",padding:"0.6rem",backgroundColor:"green"}} onClick={handleAddTodo}>Add</button>

                    </Box>
                </Modal>
            </div>



            {/* card view */}
            <div>
                    {todoDetails.map((todo, index) => 

                        
                        <div key={index} style={{display:"flex",flexDirection:"row"}}>
                        {todo.status === 'completed' 
                            ?
                            <input type="checkbox" name="status" checked id="status" onChange={(e)=>onStatusChange(e,todo._id)}/>
                            :
                            <input type="checkbox" name="status" id="status" onChange={(e)=>onStatusChange(e,todo._id)}/>

                        }
                            {todo.status === 'completed' 
                            ?
                             <h4><strike>{todo.description}</strike></h4>
                            : 
                             <h4>{todo.description} </h4>
                        }

                            <button type="button" onClick={()=>onDelete(todo._id)} style={{backgroundColor:"red",color:"white"}}>Delete</button>
                        </div>
                    
                    )}
            </div>

            
        </div>
    )

}

export default Dashboard;