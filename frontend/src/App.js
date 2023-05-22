import { Fragment, useEffect, useState } from 'react';
import './App.css';

// components
import InputDepartment from './components/InputDepartment';
import ListDepartment from './components/ListDepartments';

const baseURL = process.env.NODE_ENV==='production' ? "/api/v1/departments" : 'http://localhost:5001/api/v1/departments';

function App() {
	const [departments, setDepartments] = useState([]);

	const getDepartments = async () => {
		try {
			const response = await fetch(
				baseURL
			);
			const jsonData = await response.json();
			console.log('jsonData', jsonData)

			setDepartments(jsonData);      
      
		} catch (err) {
      console.error(err.message);      
		}
	};
  
	useEffect(() => {
    getDepartments();
	}, []);
  
  console.log('appJs departments', departments);

	return (
		<Fragment>
			<div className="container">
				<InputDepartment baseURL={baseURL} departments={departments} setDepartments={setDepartments} />
				<ListDepartment baseURL={baseURL} departments={departments} setDepartments={setDepartments} />
			</div>
		</Fragment>
	);
}

export default App;
