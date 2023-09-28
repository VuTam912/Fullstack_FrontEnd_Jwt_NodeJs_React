import { fetchAllUser } from '../../services/userService';
import './Users.scss';
import { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';

const Users = (props) => {
	const [listUsers, setListUsers] = useState([]);
	// pagination Page
	const [currentPage, setCurrentPage] = useState(1);
	const [currentLimit, setCurrentLimit] = useState(3); // only get 3 row in 1 page
	const [totalPage, setTotalPage] = useState(0);

	// when render done is execute call fetchUsers
	useEffect(() => {
		fetchUsers();
	}, [currentPage]); // fetchUser sẽ chạy lại khi currentPage nhận được thay đổi giá trị mới từ handlePageClick

	const fetchUsers = async () => {
		// nếu có tham số trên url api or ko có
		let response = await fetchAllUser(currentPage, currentLimit);

		// check
		if (response && response.data && +response.data.EC === 0) {
			// chú ý tên data trong object của backend
			setTotalPage(response.data.DT.totalPages);
			setListUsers(response.data.DT.users);

			console.log('--check res: ', response.data.DT);
		}
	};

	//  Pagination = phân trang (Page)
	// Invoke when user click to request another page.
	const handlePageClick = async (event) => {
		// Update the current page
		setCurrentPage(+event.selected + 1); // do index = 0

		// option 1: add currentPage trong useEffect để kick hoạt gọi call await fetchUser mỗi khi biến currentPage cập nhập giá trị mới
	};

	return (
		<div className='container'>
			<div className='manage-users-container'>
				<div className='user-header'>
					<div className='title'>
						<h3>Table Users</h3>
					</div>
					<div className='actions'>
						<button className='btn btn-success'>Refresh</button>
						<button className='btn btn-primary'>Add new user</button>
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
												<td>{index + 1}</td>
												<td>{item.id}</td>
												<td>{item.email}</td>
												<td>{item.username}</td>
												<td>{item.Group ? item.Group.name : ''}</td>
												<td>
													<button className='btn btn-warning'>Edit</button>
													<button className='btn btn-danger mx-2'>
														Delete
													</button>
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
	);
};

export default Users;
