import React, { useEffect, useState } from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => {

	const [tareas, setTareas] = useState([])

	const[InputValue, setInputValue] = useState("")

	const OnInputChange = (e) =>{
		setInputValue(e.target.value)
	}

	const handleKeyUp = (e)=>{
		if(e.key === "Enter"){
			crearTarea(InputValue)
			setInputValue("")
		}
	}

	const getTareas = async () => {
		const response = await fetch ("https://playground.4geeks.com/todo/users/dani")
		if(!response.ok){
			console.log("hay que crear un usuario");
			crearUsuario()
			return
		}
		const data =await response.json()
		setTareas(data.todos)
	}

	const crearUsuario = async () => {
		const response = await fetch ("https://playground.4geeks.com/todo/users/dani",{
		method: "POST"
	})
		const data = await response.json()
		getTareas()
	}

	const crearTarea = async (tarea) => {
	const response = await fetch ("https://playground.4geeks.com/todo/todos/dani",{
		method:"POST",
		headers:{
			"Content-Type": "application/json"
		},
		body : JSON.stringify({ label: tarea, is_done: false })
	})
	const data = await response.json()
	getTareas()
	}

	const  eliminarTareas = async (id) => {
	await fetch(`https://playground.4geeks.com/todo/todos/${id}`, {
		method: "DELETE"
	});
	getTareas();
}

	useEffect(()=>{
		getTareas()
	},[])


	return(
		<div className="container">
			<h2 className="d-flex justify-content-center align-items-center">TODOLIST</h2>
			<label className="form-label" htmlFor="name">Escribe una tarea</label>
			<input
			className="form-control"
			name="name"
			type="text"
			value={InputValue}
			onChange={OnInputChange}
			onKeyUp={handleKeyUp}
			/>

			<div className="row">
				{tareas.map((tarea,index)=>(
					<div className="d-flex justify-content-center align-items-center" key={index}>
						<div className="border border-grey p-2 w-100 ">{tarea.label}</div>
						<button className="btn btn-dark" onClick={() => eliminarTareas(tarea.id)}>X</button>
					</div>
				))}
			</div>
		</div>
	)
}
	
	

export default Home;  