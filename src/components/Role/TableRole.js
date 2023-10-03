import { useState, forwardRef, useImperativeHandle } from 'react'; // call child method from parent (component)
import { fetchAllRoles, deleteRole } from '../../services/roleService';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

// forwardRef = cho phep goi thằng phương thức của con từ cha (component)
const TableRole = forwardRef((props, ref) => {
	const [listRoles, setListRoles] = useState([]);

	useEffect(() => {
		getAllRoles();
	}, []); // [] <= run once

	// (component) parent will use this method to call child method
	useImperativeHandle(ref, () => ({
		fetchListRolesAgain() {
			getAllRoles();
		},
	}));

	// getData
	const getAllRoles = async () => {
		let data = await fetchAllRoles();

		if (data && +data.EC === 0) {
			setListRoles(data.DT);
		}
	};
	const handleDeleteRole = async (role) => {
		let data = await deleteRole(role);
		if (data && +data.EC === 0) {
			toast.success(data.EM);
			await getAllRoles();
		}
	};

	return (
		<>
			<table className='table table-hover table-bordered'>
				<thead>
					<tr>
						<th scope='col'>Id</th>
						<th scope='col'>URL</th>
						<th scope='col'>Description</th>
						<th scope='col'>Action</th>
					</tr>
				</thead>
				<tbody>
					{listRoles && listRoles.length > 0 ? (
						<>
							{listRoles.map((item, index) => {
								return (
									<tr key={`row-${index}`}>
										<td>{item.id}</td>
										<td>{item.url}</td>
										<td>{item.description}</td>

										<td>
											<span
												title='Delete'
												className='delete'
												onClick={() => handleDeleteRole(item)}
											>
												<i
													className='fa fa-trash'
													style={{ cursor: 'pointer' }}
												></i>
											</span>
										</td>
									</tr>
								);
							})}
						</>
					) : (
						<tr>
							<td colSpan={4} align='center'>
								<>
									<span>Not found roles</span>
								</>
							</td>
						</tr>
					)}
				</tbody>
			</table>
		</>
	);
});

export default TableRole;
