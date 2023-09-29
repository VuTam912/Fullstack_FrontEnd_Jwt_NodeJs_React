import { toast } from 'react-toastify';
import { fetchAllUser, deleteUser } from '../../services/userService';
import './Users.scss';
import { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import ModalDelete from './ModalDelete';
import ModalUser from './ModalUser';

const Users = (props) => {
	// data list User for table
	const [listUsers, setListUsers] = useState([]);
	// pagination Page
	const [currentPage, setCurrentPage] = useState(1);
	const [currentLimit, setCurrentLimit] = useState(3); // only get 3 row in 1 page
	const [totalPage, setTotalPage] = useState(0);

	// Modal delete
	const [isShowModalDelete, setIsShowModalDelete] = useState(false);
	const [dataModal, setDataModal] = useState({}); // get data email => show title modal delete

	// Modal update/create User
	const [isShowModalCreate, setIsShowModalCreate] = useState(false);
	const [actionModalUser, setActionModalUser] = useState('CREATE');
	const [dataModalUser, setDataModalUser] = useState({}); // get data to edit

	// when render done is execute call fetchUsers
	useEffect(() => {
		fetchUsers();
	}, [currentPage]); // fetchUser sẽ chạy lại khi currentPage nhận được thay đổi giá trị mới từ handlePageClick

	// lay data va refresh data lai
	const fetchUsers = async () => {
		// nếu có tham số trên url api or ko có
		let response = await fetchAllUser(currentPage, currentLimit);

		// check
		if (response && response.data && +response.data.EC === 0) {
			// chú ý tên data trong object của backend
			setTotalPage(response.data.DT.totalPages);
			setListUsers(response.data.DT.users);

			// console.log('--check res: ', response.data.DT);
		}
	};

	//  Pagination = phân trang (Page)
	// Invoke when user click to request another page.
	const handlePageClick = async (event) => {
		// Update the current page
		setCurrentPage(+event.selected + 1); // do index = 0

		// option 1: add currentPage trong useEffect để kick hoạt gọi call await fetchUser mỗi khi biến currentPage cập nhập giá trị mới
	};

	// Delete User - show Modal
	const handleDeleteUser = (user) => {
		setDataModal(user); // set Data
		setIsShowModalDelete(true);
	};

	// button close modal delete
	const handleClose = () => {
		setIsShowModalDelete(false);
		setDataModal({}); // xóa thành công đặt lại dataModal là emepty/null
	};

	// confirm delete user
	const confirmDeleteUser = async () => {
		let response = await deleteUser(dataModal);
		console.log('--check user: ', response);
		if (response && response.data.EC === 0) {
			fetchUsers();
			toast.success(response.data.EM);
			setIsShowModalDelete(false); // hide Modal
		} else {
			toast.error(response.data.EM);
		}
	};

	// Hide/close modal create User
	const onHideModalUser = async () => {
		setIsShowModalCreate(false);
		setDataModalUser({}); // set null for all input
		await fetchUsers(); // refresh data <- if modal create success
	};

	// Update User - show Modal (tái sử dụng modal create)
	const handleEditUser = (user) => {
		setActionModalUser('UPDATE');
		setDataModalUser(user);
		setIsShowModalCreate(true);
	};

	// Refresh
	const handleRefresh = async () => {
		await fetchUsers(); // load Data API
	};

	return (
		<>
			<div className='container'>
				<div className='manage-users-container'>
					<div className='user-header'>
						<div className='title my-3'>
							<h3>Manage Users</h3>
						</div>
						<div className='actions mb-3'>
							<button
								className='btn btn-success me-2'
								onClick={() => handleRefresh()}
							>
								<i className='fa fa-refresh'></i> Refresh
							</button>
							<button
								className='btn btn-primary'
								onClick={() => {
									setIsShowModalCreate(true);
									setActionModalUser('CREATE');
								}}
							>
								<i class='fa fa-plus-circle'></i> Add new user
							</button>
						</div>
					</div>
					<div className='user-body'>
						<table className='table table-hover table-bordered'>
							<thead>
								<tr>
									<th scope='col'>No</th>
									<th scope='col'>Id</th>
									<th scope='col'>Email</th>
									<th scope='col'>Username</th>
									<th scope='col'>Group</th>
									<th scope='col'>Action</th>
								</tr>
							</thead>
							<tbody>
								{listUsers && listUsers.length > 0 ? (
									<>
										{listUsers.map((item, index) => {
											return (
												<tr key={`row-${index}`}>
													<td>
														{(currentPage - 1) * currentLimit + index + 1}
													</td>
													<td>{item.id}</td>
													<td>{item.email}</td>
													<td>{item.username}</td>
													<td>{item.Group ? item.Group.name : ''}</td>
													<td>
														<span
															title='Edit'
															className='edit'
															onClick={() => handleEditUser(item)}
														>
															<i class='fa fa-pencil'></i>
														</span>
														<span
															title='Delete'
															className='delete'
															onClick={() => handleDeleteUser(item)}
														>
															<i class='fa fa-trash'></i>
														</span>
													</td>
												</tr>
											);
										})}
									</>
								) : (
									<tr>
										<td>
											<>
												<span>Not found users</span>
											</>
										</td>
									</tr>
								)}
							</tbody>
						</table>
					</div>
					{/* nếu có/không data thì show/hide pagination */}
					{totalPage > 0 && (
						<div className='user-footer'>
							<ReactPaginate
								nextLabel='next >'
								onPageChange={handlePageClick}
								pageRangeDisplayed={3}
								marginPagesDisplayed={4}
								pageCount={totalPage}
								previousLabel='< previous'
								pageClassName='page-item'
								pageLinkClassName='page-link'
								previousClassName='page-item'
								previousLinkClassName='page-link'
								nextClassName='page-item'
								nextLinkClassName='page-link'
								breakLabel='...'
								breakClassName='page-item'
								breakLinkClassName='page-link'
								containerClassName='pagination'
								activeClassName='active'
								renderOnZeroPageCount={null}
							/>
						</div>
					)}
				</div>
			</div>
			{/* Modal Delete User */}
			<ModalDelete
				show={isShowModalDelete}
				handleClose={handleClose}
				confirmDeleteUser={confirmDeleteUser}
				dataModal={dataModal}
			/>
			{/* Modal Create/update User */}
			<ModalUser
				onHide={onHideModalUser} // close
				show={isShowModalCreate} // show
				action={actionModalUser}
				dataModalUser={dataModalUser}
			/>
		</>
	);
};

export default Users;
