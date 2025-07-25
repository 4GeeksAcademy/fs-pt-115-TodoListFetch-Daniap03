import React, { useEffect, useState } from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => {
	
	const [tareas, setTareas] = useState([])


	const [InputValue, setInputValue] = useState("")


	const OnInputChange =(e)=>{
		setInputValue(e.target.value)
		
	}

	const handleKeyUp = (e)=>{
		if(e.key === "Enter"){
			setTareas([...tareas,InputValue])
			setInputValue("")	
		}
	}
	const eliminarTarea = async (id) => {
		await fetch (`https://playground.4geeks.com/todo/todos/${id}`, {
			method: "DELETE"
		})
		getTareas()
	}
		
	const getTareas = async () => {
		const response = await fetch ("https://playground.4geeks.com/todo/users/daniap03")
		console.log(response);
		if(!response.ok){
			console.log("Hay que crear al usuario");
			crearUsuario()
		}
		const data = await response.json()
		console.log(data.todos);
		setTareas(data.todos)
	}


	const crearUsuario = async () => {
		const response = await fetch ("https://playground.4geeks.com/todo/users/daniap03",{
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify()
		})
		console.log(response);
		const data = await response.json()
		console.log(data);
		getTareas()
	}

	useEffect(()=>{
		getTareas()
	},[])

	return (
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
						<div className="border border-grey p-2 w-100 ">
							{tarea}
						</div>
						<button className="btn btn-dark" onClick={()=>eliminarTarea(index)}>
							X
						</button>
					</div>
				))}

				

			</div>
				
		</div>
	)
};

export default Home;