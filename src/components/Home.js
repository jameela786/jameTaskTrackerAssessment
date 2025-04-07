// import { Component } from "react/cjs/react.production";
import {Component} from 'react'
import { MdDelete } from "react-icons/md";
import { IoMdCloseCircle,IoMdCheckmarkCircle } from "react-icons/io";
import './home.css'
// import uuidv4 from 'uuid';
class Home extends Component{
    state={inputText:'',taskList:[],id:0,taskStatus:false}

    componentDidMount(){
        localStorage.getItem('taskList')
    }

    InputChange = (event)=>{
        this.setState({inputText:event.target.value})
    }

    AddTaskfunction = ()=>{
        const {inputText,id,taskList} = this.state
        const newtask = {id:id+1,task:inputText,taskStatus:false}
        // console.log(newtask)
        this.setState((prevState)=>({taskList:[...prevState.taskList,newtask],inputText:'',id:prevState.id+1}))
        localStorage.setItem("taskList",taskList)
    }

    ontaskCompletion = (id)=>{
        const {taskList} = this.state
        let taskUpdated = taskList.map((eachItem)=>
            (eachItem.id===id) ? {...eachItem,taskStatus:!eachItem.taskStatus} : eachItem
        )        
    

        this.setState({taskList:taskUpdated})
    }

    onDeleteTask = (id) =>{
        const {taskList} = this.state
        const filteredTask = taskList.filter((eachItem)=>(
            eachItem.id !== id
        ))
        console.log("todo deleteid = ",id)
        this.setState({taskList:filteredTask})
    }

    render(){
        const {taskList,inputText} = this.state
        console.log(taskList,typeof(taskList))
        return(
            <div className="HomeContainer">
                <div className='cardContainer'>
                <h1 className="header">Task Tracker</h1>
                    <div className="input_Container">
                        <input type="text" className='input_field' name="taskdetails"  value={inputText} onChange={this.InputChange}/>
                        <button className="addBtn" onClick={this.AddTaskfunction}>Add</button>
                    </div>
                    <div className='taskDisplayContainer'>
                        {
                            taskList.map((eachItem)=> (
                                <div className='taskDisplay' key={eachItem.id}>
                                    
                                    <button className='markCompleted' onClick={()=>this.ontaskCompletion(eachItem.id)}>
                                        { eachItem.taskStatus ? <IoMdCheckmarkCircle size={24} color='green'/> : <IoMdCloseCircle size={24} color='grey'/>}
                                    </button>
                                    
                                    <p className={eachItem.taskStatus ? 'markAsComplete' : ''}>{eachItem.task}</p>
                                    <button className="delete_btn" onClick={()=>{this.onDeleteTask(eachItem.id)}}>
                                        <MdDelete size={24} color='purple'/>
                                    </button>
                                </div>
                                
                            ))
                        }
                        
                    </div>
                </div>
            </div>            
        )
    }
}
export default Home