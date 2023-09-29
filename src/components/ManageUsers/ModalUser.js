import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useEffect, useState } from 'react';
import { getGroup, createNewUser } from '../../services/userService';
import { toast } from 'react-toastify';
import _ from 'lodash';

// Modal Create a User
const ModalUser = (props) => {
	// props
	const { action, dataModalUser } = props;

	// input - modalUser
	// cách viết code ngắn thay cho khỏi tạo nhiều biến useState :
	// states: => dùng để đặt các biến mặc đinh lại khi create thành công/ hoặc thực thi nhiều lần..
	const defaultUserData = {
		email: '',
		phone: '',
		username: '',
		password: '',
		address: '',
		sex: '',
		group: '',
	};

	//  Validate Input - Default
	const validInputsDefault = {
		email: true,
		phone: true,
		username: true,
		password: true,
		address: true,
		sex: true,
		group: true,
	};

	// States Input and onCHange Inputs
	const [userData, setUserData] = useState(defaultUserData);
	const [validInputs, setValidInputs] = useState(validInputsDefault);

	// get data group - luu giá trị group (table group)
	const [userGroups, setUserGroups] = useState([]);

	useEffect(() => {
		getGroups();
	}, []);

	useEffect(() => {
		// xac dinh action la update (button edit) và gán data để edit
		if (action === 'UPDATE') {
			console.log('check data set: ', {
				...dataModalUser,
				group: dataModalUser.Group ? dataModalUser.Group.id : '',
			});
			setUserData({
				...dataModalUser,
				group: dataModalUser.Group ? dataModalUser.Group.id : '',
			});
		}
	}, [dataModalUser]); // cập nhập giá trị vừa thay đổi

	// Fix ..
	useEffect(() => {
		if (action === 'CREATE') {
			if (userGroups && userGroups.length > 0) {
				setUserData({ ...userData, group: userGroups[0].id }); // là 0 chỉ số index trong mảng (object của data) <= coi như index 0 là mặc định
			}
		}
	}, [action]);

	// get data group - Option: add data gender
	const getGroups = async () => {
		let res = await getGroup(); // call APi in userService
		if (res && res.data && +res.data.EC === 0) {
			setUserGroups(res.data.DT);
			if (res.data.DT && res.data.DT.length > 0) {
				let groups = res.data.DT;
				// ghi de - để lấy giá trị group (1,2,3) => do biến group là string emepty nên cần set mặc đinh là 1
				setUserData({ ...userData, group: groups[0].id }); // là 0 chỉ số index trong mảng (object của data) <= coi như index 0 là mặc định
			}
		} else {
			toast.error(res.data.EM);
		}
	};

	// States Input and onCHange Inputs
	const handleOnChangeInput = (value, name) => {
		// do bien userData la const => ko thay doi gia tri nen phai tao bien moi va clone userData
		let _userData = _.cloneDeep(userData);
		_userData[name] = value; // gán giá trí đúng tên name trong mảng _userData
		// update thay doi gia tri cho userData
		setUserData(_userData);
	};

	// check Validate Inputs : check xem các value trong input có rỗng ko ? (chú ý chỉ check 1 lượt input)
	const checkValidateInputs = () => {
		// set Valid default
		setValidInputs(validInputsDefault); // vì bước này sẽ yều cầu check lại lần nữa.
		// console.log('Check user data: ', userData);
		// create user
		let arr = ['email', 'phone', 'password', 'group'];
		let check = true;
		for (let i = 0; i < arr.length; i++) {
			if (!userData[arr[i]]) {
				// nếu empty
				// neu ko ton tai
				toast.error(`Empty Input ${arr[i]}`);
				let _validInputs = _.cloneDeep(validInputsDefault);
				_validInputs[arr[i]] = false;
				setValidInputs(_validInputs);
				check = false;
				break; // thoat vong lap
			}
		}

		return check;
	};

	// Button Save - create a user
	const handleConfirmUser = async () => {
		let check = checkValidateInputs();
		if (check === true) {
			// clone va ghi de
			let res = await createNewUser({
				...userData,
				groupId: userData['group'],
			}); // fix to get GroupId
			// create success
			if (res.data && +res.data.EC === 0) {
				props.onHide();
				// tạo user thành công thì nên xóa/ hoặc để các input là mặc đinh.
				setUserData({ ...defaultUserData, group: userGroups[0].id }); // 0 là index của mảng group
			}
			if (res.data && +res.data.EC !== 0) {
				toast.error(res.data.EM);
				// show error in input
				let _validInputs = _.cloneDeep(validInputsDefault);
				_validInputs[res.data.DT] = false;
				setValidInputs(_validInputs);
			}
		}
	};

	// close Modal create/update
	const handleCloseModalUser = () => {
		props.onHide();
		setUserData(defaultUserData);
		setValidInputs(validInputsDefault);
	};

	return (
		<>
			<Modal
				size='lg'
				show={props.show}
				onHide={() => handleCloseModalUser()}
				className='modal-user'
			>
				<Modal.Header closeButton>
					<Modal.Title id='contained-modal-title-vcenter'>
						<span>
							{props.action === 'CREATE' ? 'Create new user' : 'Edit a user'}
						</span>
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<div className='content-body'>
						<div className='row'>
							<div className='col-12 col-sm-6 form-group'>
								<label>
									Email adress (<span className='red'>*</span>):
								</label>
								<input
									disabled={action === 'CREATE' ? false : true}
									className={
										validInputs.email
											? 'form-control'
											: 'form-control is-invalid'
									}
									type='email'
									value={userData.email}
									onChange={(event) =>
										handleOnChangeInput(event.target.value, 'email')
									}
								/>
							</div>
							<div className='col-12 col-sm-6 form-group'>
								<label>
									Phone number (<span className='red'>*</span>):
								</label>
								<input
									disabled={action === 'CREATE' ? false : true}
									className={
										validInputs.phone
											? 'form-control'
											: 'form-control is-invalid'
									}
									type='text'
									value={userData.phone}
									onChange={(event) =>
										handleOnChangeInput(event.target.value, 'phone')
									}
								/>
							</div>
							<div className='col-12 col-sm-6 form-group'>
								<label>Username:</label>
								<input
									className='form-control'
									type='text'
									value={userData.username}
									onChange={(event) =>
										handleOnChangeInput(event.target.value, 'username')
									}
								/>
							</div>
							{/* hide password when used to edit/ only show when used to create */}

							<div className='col-12 col-sm-6 form-group'>
								{action === 'CREATE' && (
									<>
										<label>
											Password (<span className='red'>*</span>):
										</label>
										<input
											className={
												validInputs.password
													? 'form-control'
													: 'form-control is-invalid'
											}
											type='password'
											value={userData.password}
											onChange={(event) =>
												handleOnChangeInput(event.target.value, 'password')
											}
										/>
									</>
								)}
							</div>

							<div className='col-12 col-sm-12 form-group'>
								<label>Address:</label>
								<input
									className='form-control'
									type='text'
									value={userData.address}
									onChange={(event) =>
										handleOnChangeInput(event.target.value, 'address')
									}
								/>
							</div>
							<div className='col-12 col-sm-6 form-group'>
								<label>Gender:</label>
								<select
									className='form-select'
									onChange={(event) =>
										handleOnChangeInput(event.target.value, 'sex')
									}
									value={userData.sex}
								>
									<option value={'Male'}>Male</option>
									<option value={'Female'}>Female</option>
									<option value={'Other'}>Other</option>
								</select>
							</div>
							<div className='col-12 col-sm-6 form-group'>
								<label>
									Group (<span className='red'>*</span>):
								</label>
								<select
									className={
										validInputs.password
											? 'form-select'
											: 'form-select is-invalid'
									}
									// Add value to select
									value={userData.group}
									onChange={(event) =>
										handleOnChangeInput(event.target.value, 'group')
									}
								>
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
						</div>
					</div>
				</Modal.Body>
				<Modal.Footer>
					<Button variant='secondary' onClick={() => handleCloseModalUser()}>
						Close
					</Button>
					<Button variant='primary' onClick={() => handleConfirmUser()}>
						{action === 'CREATE' ? 'Create' : 'Update'}
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
};

export default ModalUser;
