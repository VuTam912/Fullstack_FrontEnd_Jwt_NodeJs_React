import { useState } from 'react';
import './GroupRole.scss';
import { useEffect } from 'react';
import { getGroup } from '../../services/userService';
import {
	fetchAllRoles,
	fetchRoleByGroup,
	assignRolesToGroup,
} from '../../services/roleService';
import { toast } from 'react-toastify';
import _, { set } from 'lodash';

const GroupRole = (props) => {
	// get data group - luu giá trị group (table group)
	const [userGroups, setUserGroups] = useState([]);
	const [selectGroup, setSelectGroup] = useState('');
	const [listRoles, setListRoles] = useState([]);

	const [assignRolesByGroup, setAssignRoleByGroup] = useState([]);

	useEffect(() => {
		getGroups();
		getAllRoles();
	}, []);

	// get data group - Option: add data gender
	const getGroups = async () => {
		let res = await getGroup(); // call APi in userService
		if (res && res && +res.EC === 0) {
			setUserGroups(res.DT);
		} else {
			toast.error(res.EM);
		}
	};

	// getData Roles
	const getAllRoles = async () => {
		let data = await fetchAllRoles();

		if (data && +data.EC === 0) {
			setListRoles(data.DT);
		}
	};

	// onChange - <select>
	const handleOnChangeGroup = async (value) => {
		setSelectGroup(value);
		if (value) {
			let data = await fetchRoleByGroup(value);
			console.log('>> check data: ', data);
			if (data && +data.EC === 0) {
				let result = buidDataRolesbyGroup(data.DT.Roles, listRoles);
				setAssignRoleByGroup(result);
			}
		}
	};

	// buid data roles by group
	const buidDataRolesbyGroup = (groupRoles, allRoles) => {
		let result = [];
		if (allRoles && allRoles.length > 0) {
			allRoles.map((role) => {
				// build object
				let object = {};
				object.url = role.url;
				object.id = role.id;
				object.description = role.description;
				object.isAssigned = false;
				if (groupRoles && groupRoles.length > 0) {
					// set false/true
					object.isAssigned = groupRoles.some(
						(item) => item.url === object.url
					);
				}

				result.push(object);
			});
		}
		return result;
	};

	// handle event onChange checkbox - update
	const handleSelectRole = (value) => {
		const _assignRolesByGroup = _.cloneDeep(assignRolesByGroup);

		// find index trong array _assignRolesByGroup | note: add +item.id === +value => để tránh so sánh với kiểu dữ liệu string với integer
		let foundIndex = _assignRolesByGroup.findIndex(
			(item) => +item.id === +value
		);

		// if found
		if (foundIndex > -1) {
			// toggle true/false
			_assignRolesByGroup[foundIndex].isAssigned =
				!_assignRolesByGroup[foundIndex].isAssigned;
		}
		setAssignRoleByGroup(_assignRolesByGroup);
	};

	const buildDataToSave = () => {
		// data = {groupId: 4, groupRoles: [{}, {}..]}
		let result = {};
		const _assignRolesByGroup = _.cloneDeep(assignRolesByGroup);
		result.groupId = selectGroup; // get GroupID
		// get groupRoles with isAssigned is true
		let groupRolesFilter = _assignRolesByGroup.filter(
			(item) => item.isAssigned === true
		);
		let finalGroupsFilter = groupRolesFilter.map((item) => {
			// create object data to store
			let data = { groupId: +selectGroup, roleId: +item.id };
			return data;
		});

		// console.log('final:', finalGroupsFilter);
		result.groupRoles = finalGroupsFilter;
		return result;
	};

	const handleSave = async () => {
		let data = buildDataToSave();

		let res = await assignRolesToGroup(data);
		if (res && res.EC === 0) {
			toast.success(res.EM);
		}
	};

	return (
		<div className='group-role-container'>
			<div className='container'>
				<div className='container mt-3'>
					<h4>Group Role: </h4>
					<div className='assign-group-role'>
						<div className='col-12 col-sm-6 form-group'>
							<label>
								Select Group: (<span className='red'>*</span>):
							</label>
							<select
								className={'form-select'}
								onChange={(event) => handleOnChangeGroup(event.target.value)}
							>
								<option value=''>Please select your group</option>

								{userGroups &&
									userGroups.length > 0 &&
									userGroups.map((item, index) => {
										return (
											<option key={`group-${index}`} value={item.id}>
												{item.name}
											</option>
										);
									})}
							</select>
						</div>
						<hr />
						{selectGroup && (
							<div className='roles'>
								<h5>Assign Roles:</h5>
								{assignRolesByGroup &&
									assignRolesByGroup.length > 0 &&
									assignRolesByGroup.map((item, index) => {
										return (
											<div className='form-check' key={`list-roles-${index}`}>
												<input
													className='form-check-input'
													type='checkbox'
													value={item.id}
													checked={item.isAssigned === true ? true : false}
													id={`list-roles-${index}`}
													onChange={(event) =>
														handleSelectRole(event.target.value)
													}
												/>
												<label
													className='form-check-label'
													for={`list-roles-${index}`}
												>
													{item.url}
												</label>
											</div>
										);
									})}
								<div className='mt-3'>
									<button
										className='btn btn-warning'
										onClick={() => handleSave()}
									>
										Save
									</button>
								</div>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default GroupRole;
