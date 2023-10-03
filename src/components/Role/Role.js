import './Role.scss';
import { useState } from 'react';
import _ from 'lodash';
import { useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid'; // generate a random id

const Role = (props) => {
	const [listChilds, setListChilds] = useState({
		child1: { url: '', description: '' },
	});

	// change Input with array
	const handleOnChangeInput = (name, value, key) => {
		let _listChilds = _.cloneDeep(listChilds); // clone - cloneDeep để tránh bug state

		// key, name -
		_listChilds[key][name] = value;

		setListChilds(_listChilds);
	};

	// Add Input
	const handleAddNewInput = () => {
		let _listChilds = _.cloneDeep(listChilds); // clone
		// create a child with a random id

		_listChilds[`child-${uuidv4()}`] = {
			url: '',
			description: '',
		};

		// update state
		setListChilds(_listChilds);
	};

	// delete input
	const handleDeleteInput = (key) => {
		let _listChilds = _.cloneDeep(listChilds); // clone
		// delete a object in array
		delete _listChilds[key];
		// update state
		setListChilds(_listChilds);
	};

	return (
		<div className='role-container'>
			<div className='container'>
				<div className='mt-3'>
					<div className='title-role'>
						<h4>Add a new role...</h4>
					</div>
					<div className='role-parents'>
						{/* object.entries: => tra ve 2 bien key va value cua 1 object | index = la chi so cua 1 object */}
						{Object.entries(listChilds).map(([key, value], index) => {
							return (
								<div className='row role-child' key={`child-${key}`}>
									<div className={`col-5 form-group ${key}`}>
										<label>URL:</label>
										<input
											type='text'
											className='form-control'
											value={value.url}
											onChange={(e) =>
												handleOnChangeInput('url', e.target.value, key)
											}
										/>
									</div>

									<div className='col-5 form-group'>
										<label>Description:</label>
										<input
											type='text'
											className='form-control'
											value={value.description}
											onChange={(e) =>
												handleOnChangeInput('description', e.target.value, key)
											}
										/>
									</div>
									<div className='col-2 mt-3 actions'>
										<i
											className='fa fa-plus-circle add'
											onClick={() => handleAddNewInput(key)}
										></i>
										{/* neu co hơn 1 role-chile thi show button delete */}
										{index >= 1 && (
											<i
												className='fa fa-trash delete'
												onClick={() => handleDeleteInput(key)}
											></i>
										)}
									</div>
								</div>
							);
						})}

						<div>
							<button className='btn btn-warning mt-3'>Save</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Role;
