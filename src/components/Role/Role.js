import './Role.scss';
import { useState } from 'react';
import _ from 'lodash';
import { useEffect, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid'; // generate a random id
import { toast } from 'react-toastify';
import { createRoles } from '../../services/roleService';
import TableRole from './TableRole';

const Role = (props) => {
	// cho phép cha gọi hàm ở con (child - component)
	const childRef = useRef();

	const dataChildDefault = {
		url: '',
		description: '',
		isValidUrl: true,
	};

	const [listChilds, setListChilds] = useState({
		child1: dataChildDefault,
	});

	// onChange Input with array
	const handleOnChangeInput = (name, value, key) => {
		let _listChilds = _.cloneDeep(listChilds); // clone - cloneDeep để tránh bug state

		// key, name -
		_listChilds[key][name] = value;

		if (value && name === 'url') {
			// ở url, nếu có gia trị nhập trong input
			_listChilds[key]['isValidUrl'] = true; // set la true
		}
		setListChilds(_listChilds);
	};

	// Add Input
	const handleAddNewInput = () => {
		let _listChilds = _.cloneDeep(listChilds); // clone
		// create a child with a random id

		_listChilds[`child-${uuidv4()}`] = dataChildDefault; // add with data default

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

	// build Data
	const builddataToPersist = () => {
		let _listChilds = _.cloneDeep(listChilds); // clone
		let result = [];
		Object.entries(_listChilds).map(([key, child], index) => {
			result.push({
				url: child.url,
				description: child.description,
			});
		});
		return result;
	};

	const handleSave = async () => {
		// find invalid in listChids (tim 1 lan thoi)
		let invalidObj = Object.entries(listChilds).find(([key, child], index) => {
			return child && !child.url; // da add input nhung ko nhap value trong url
		});

		// undefinie: neu ko co invalid => cac input deu nhap het ko con chuoi rong de nhap =>
		if (!invalidObj) {
			//call api
			let data = builddataToPersist(); // get data input

			console.log('data: ', data);

			let res = await createRoles(data);

			if (res && res.EC === 0) {
				toast.success(res.EM);
				// console.log(childRef);
				// gọi hàm con để thực thi fectDataRole
				childRef.current.fetchListRolesAgain();
			}
		} else {
			//error - chưa nhập Input URL
			// console.log('>>> invalid: ', invalidObj);
			toast.error('Input URL must not be empty');
			let _listChilds = _.cloneDeep(listChilds); // clone - cloneDeep để tránh bug state
			const key = invalidObj[0]; // index dau tien cua id

			_listChilds[key]['isValidUrl'] = false; // set validate for input
			setListChilds(_listChilds);
		}
	};

	return (
		<div className='role-container'>
			<div className='container'>
				<div className='adding-roles mt-3'>
					<div className='title-role'>
						<h4>Add a new role...</h4>
					</div>
					<div className='role-parents'>
						{/* object.entries: => tra ve 2 bien key va value cua 1 object | index = la chi so cua 1 object */}
						{Object.entries(listChilds).map(([key, child], index) => {
							return (
								<div className='row role-child' key={`child-${key}`}>
									<div className={`col-5 form-group ${key}`}>
										<label>URL:</label>
										<input
											className={
												child.isValidUrl
													? 'form-control'
													: 'form-control is-invalid'
											}
											type='text'
											value={child.url}
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
											value={child.description}
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
							<button
								className='btn btn-warning mt-3'
								onClick={() => handleSave()}
							>
								Save
							</button>
						</div>
					</div>
				</div>
				<hr />

				<div className='mt-3'>
					<h4>List Current Roles: </h4>
					{/* cho phep cha goi method tu thằng con */}
					<TableRole ref={childRef} />
				</div>
			</div>
		</div>
	);
};

export default Role;
