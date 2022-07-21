import React,{Component} from "react";

export  default class AddToDo extends Component{

    constructor(props) {
        super(props);

        this.state={
            task:'',
            category:'',
            status:'',
            editId:'',
            editClick:false,
            todo:[],
            filteredVale:[]

        }


    }

    componentDidMount() {
        const requestOptions={
            method:'GET',
            header:{'Content-Type':'application/json'}
        }
        fetch('https://localhost:7209/todo',requestOptions)
            .then(res=>{return res.json()})
            .then(data=>{
                this.setState({
                    todo:data
                })
                //console.log(data)
            })
    }

    onChangeTask=(e)=>{
        e.preventDefault();
        this.setState({
            task:e.target.value
        })

    }
    onChangeCategory=(e)=>{
        e.preventDefault();
        this.setState({
            category:e.target.value
        })

    }
    onChangeStatus=(e)=>{
        e.preventDefault();
        this.setState({
            status:e.target.value
        })
        //console.log(this.state.status)

    }

    /*selectToDo=(post)=>{
        const {task:sTask,category:sCategory,status:sStatus}=post
        //console.log(task,category,status)
        this.setState({
            task:sTask,
            category:sCategory,
            sStatus:sStatus
        })
        console.log(this.state.task)

    }*/

    //search
    filterData(todo,searchKey){
        //console.log(searchKey)
        const result=todo.filter((Task)=>
            Task.task.toLowerCase().includes(searchKey)||
            Task.category.toLowerCase().includes(searchKey)||
            Task.status.toLowerCase().includes(searchKey)||
            Task.task.includes(searchKey)||
            Task.category.includes(searchKey)||
            Task.status.includes(searchKey)
        )
        this.setState({
            filteredVale:result
        })

    }
    handleSearchArea=(e)=>{
        const searchKey=e.currentTarget.value;
        /*const requestOptions={
            method:'GET',
            header:{'Content-Type':'application/json'}
        }*/
        /*fetch('https://localhost:7209/todo',requestOptions)
            .then(res=>{return res.json()})
            .then(data=>{
                console.log(data,searchKey)
                this.filterData(data,searchKey)

            })*/
        this.filterData(this.state.todo,searchKey)


    }



    //insert
    onSubmit=()=>{
        const task={
            task:this.state.task,
            category:this.state.category,
            status:this.state.status,
        }

        //console.log(task);

        const url='https://localhost:7209/todo'
        const options={
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json;charset=UTF-8'
            },
            body:JSON.stringify(task)
        }

        fetch(url,options)
            .then(res=>{
                alert("Inserted successfully")
                console.log(res.status)

            }).catch((err)=>{
                console.error(err)
        })

    }
    //update
    onUpdate=()=>{
        const task={
            task:this.state.task,
            category:this.state.category,
            status:this.state.status,
        }

        console.log(task);

        const url=`https://localhost:7209/todo/${this.state.editId}`
        const options={
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json;charset=UTF-8'
            },
            body:JSON.stringify(task)
        }

        fetch(url,options)
            .then(res=>{
                alert("Updated successfully")
                console.log(res.status)
                const requestOptions={
                    method:'GET',
                    header:{'Content-Type':'application/json'}
                }
                fetch('https://localhost:7209/todo',requestOptions)
                    .then(res=>{return res.json()})
                    .then(data=>{
                        this.setState({
                            todo:data,
                            editClick:false
                        })
                        //console.log(data)
                    })

            }).catch((err)=>{
            console.error(err)
        })

    }

    //delete
    onDelete=(e)=>{
        const {id}=e.target
        const url=`https://localhost:7209/todo/${id}`
        const options={
            method:'DELETE',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json;charset=UTF-8'
            },
        }

        fetch(url,options)
            .then(res=>{
                alert("Deleted successfully")
                console.log(res.status)
                const requestOptions={
                    method:'GET',
                    header:{'Content-Type':'application/json'}
                }
                fetch('https://localhost:7209/todo',requestOptions)
                    .then(res=>{return res.json()})
                    .then(data=>{
                        this.setState({
                            todo:data,
                        })
                        //console.log(data)
                    })

            }).catch((err)=>{
            console.error(err)
        })

    }


    render(){
        return(
            <div className="m-3">
                <div>
                    <form onSubmit={this.onSubmit}>
                        <div className="mb-3">
                            <label htmlFor="task" className="form-label">Enter task</label>
                            <input type="text" className="form-control" id="task"
                                   aria-describedby="emailHelp"  onChange={this.onChangeTask}/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="task" className="form-label">Enter category</label>
                            <input type="text" className="form-control" id="task"
                                   aria-describedby="emailHelp"  onChange={this.onChangeCategory}/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="task" className="form-label">Enter status</label>
                            <input type="text" className="form-control" id="task"
                                   aria-describedby="emailHelp"  onChange={this.onChangeStatus}/>
                        </div>
                        <div>
                            <input type="submit" value="Add Task" className="btn btn-primary"/>
                        </div>
                    </form>
                </div>
                <div>
                    <div className="row">
                        <div className="col-lg-9 mt-2 mb-2"/>
                        <div className="col-lg-3 mt-2 mb-2"/>
                        <input className="form-control" type="search" placeholder="Search" name="searchTask" onChange={this.handleSearchArea}/>

                    </div>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Task</th>
                                <th>Category</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                        {this.state.filteredVale.length===0 &&
                            this.state.todo.map(data=>{
                                return <tr key={data.id}>
                                    <td>{this.state.editClick && data.id === this.state.editId?(
                                        <input type="text" className="form-control" id="task"
                                               aria-describedby="emailHelp" value={this.state.task}  onChange={this.onChangeTask}/>
                                    ):(data.task)}</td>
                                    <td>{this.state.editClick && data.id === this.state.editId?(
                                        <input type="text" className="form-control" id="task"
                                               aria-describedby="emailHelp" value={this.state.category} onChange={this.onChangeCategory}/>
                                    ):(data.category)}</td>
                                    <td>{this.state.editClick && data.id === this.state.editId?(
                                        <input type="text" className="form-control" id="task"
                                               aria-describedby="emailHelp" value={this.state.status} onChange={this.onChangeStatus}/>
                                    ):(data.status)}</td>
                                    <td>
                                        <button id={data.id} className="btn btn-warning"   onClick={event => {
                                            event.preventDefault();
                                            this.setState({
                                                task:data.task,
                                                category:data.category,
                                                status:data.status,
                                                editId:data.id,
                                                editClick:true
                                            })
                                            //this.onChangeClick()
                                            /*const task={
                                                task:data.task,
                                                category:data.category,
                                                status:data.status,
                                            }*/
                                            //console.log(task);
                                            //console.log(this.state)
                                            //this.selectToDo(task)

                                        }
                                        }>{this.state.editClick && data.id === this.state.editId ? "Cancel" : "Update"}</button>
                                        {
                                            this.state.editClick && data.id === this.state.editId &&(
                                                <button className="btn btn-primary" onClick={this.onUpdate}>Save</button>
                                            )
                                        }
                                        <button id={data.id} className="btn btn-danger" onClick={e=>this.onDelete(e)}>
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            })
                        }
                        {this.state.filteredVale.length>0 &&
                            this.state.filteredVale.map(data=>{
                                return <tr key={data.id}>
                                    <td>{this.state.editClick && data.id === this.state.editId?(
                                        <input type="text" className="form-control" id="task"
                                               aria-describedby="emailHelp" value={this.state.task}  onChange={this.onChangeTask}/>
                                    ):(data.task)}</td>
                                    <td>{this.state.editClick && data.id === this.state.editId?(
                                        <input type="text" className="form-control" id="task"
                                               aria-describedby="emailHelp" value={this.state.category} onChange={this.onChangeCategory}/>
                                    ):(data.category)}</td>
                                    <td>{this.state.editClick && data.id === this.state.editId?(
                                        <input type="text" className="form-control" id="task"
                                               aria-describedby="emailHelp" value={this.state.status} onChange={this.onChangeStatus}/>
                                    ):(data.status)}</td>
                                    <td>
                                        <button id={data.id} className="btn btn-warning"   onClick={event => {
                                            event.preventDefault();
                                            this.setState({
                                                task:data.task,
                                                category:data.category,
                                                status:data.status,
                                                editId:data.id,
                                                editClick:true
                                            })
                                            //this.onChangeClick()
                                            /*const task={
                                                task:data.task,
                                                category:data.category,
                                                status:data.status,
                                            }*/
                                            //console.log(task);
                                            //console.log(this.state)
                                            //this.selectToDo(task)

                                        }
                                        }>{this.state.editClick && data.id === this.state.editId ? "Cancel" : "Update"}</button>
                                        {
                                            this.state.editClick && data.id === this.state.editId &&(
                                                <button className="btn btn-primary" onClick={this.onUpdate}>Save</button>
                                            )
                                        }
                                        <button id={data.id} className="btn btn-danger" onClick={e=>this.onDelete(e)}>
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            })
                        }
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }

}