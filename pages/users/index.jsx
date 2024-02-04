import { useEffect, useState } from 'react';
import axios from 'axios';
import { Row, Table, Tag } from "antd";
import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import FromOfUser from './FromOfUser';
import DeleteUser from './DeleteUser';
const UserList = () => {
  const [users, setUsers] = useState([]);
  const [newUserName, setNewUserName] = useState('');
  const [newUserUsername, setNewUserUsername] = useState('');
  const [editData, setEditData] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteIsModalOpen] = useState(false);


  /** Add start */
  const handleAdd = () => {
    setIsModalOpen(true);
    setEditData(null);
  };
  /** Add end */



  /** edit start */
  const handleEdit = (data) => {
    setEditData(data);
    setIsModalOpen(true);
  }
  /** edit end */


  /** Delete start */
  const handleDelete = (data) => {
    setEditData(data);
    setDeleteIsModalOpen(true);
  }
  const closeDeleteModal = () => {
    setDeleteIsModalOpen(false);
  };
  /** Delete end */


  /**Modal close Function  Start*/
  const closeModal = () => {
    setIsModalOpen(false);
  };
  /**Modal close Function  End*/

  console.log("users", users)


  const fetchUsers = async () => {
    try {
      const response = await axios.get('/users.json');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };
  useEffect(() => {
    fetchUsers();
  }, []);



  const reFetchHandler = (isRender) => {
    if (isRender) fetchUsers();
  };

  const handleCreateUser = async () => {
    try {
      const response = await axios.post('/api/createUser', {
        name: newUserName,
        username: newUserUsername,
      });

      setUsers(prevUsers => [...prevUsers, response.data]);
      setNewUserName('');
      setNewUserUsername('');
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };





  const columns = [
    {
      title: "SL",
      fixed: "left",
      // render: (text, record, index) => index + 1,
      dataIndex: "id"
    },
    {
      title: "Name",
      dataIndex: "name"
    },
    {
      title: "User Name",
      dataIndex: "username",
    },
    {
      title: "Email",
      dataIndex: "email",
    },

    {
      title: "Action",
      key: "action",
      fixed: "right",
      width: 100,
      render: (row) => actionButton(row),
    },
  ];


  const actionButton = (row) => {
    return (
      <>
        <Row
          justify="space-between"
          style={{ display: "flex", alignItems: "center" }}
        >
          <a style={{ color: "green" }}>
            <EyeOutlined style={{ fontSize: "22px" }} />
          </a>

          <a onClick={() => handleEdit(row)} className="text-primary">
            <EditOutlined style={{ fontSize: "22px" }} />
          </a>

          <a onClick={() => handleDelete(row)} className="text-danger">
            <DeleteOutlined style={{ fontSize: "22px" }} />
          </a>
        </Row>
      </>
    );
  };


  return (



    <div className="flex flex-col gap-10">
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="py-6 px-4 md:px-6 xl:px-7.5 flex justify-between items-center border-b border-stroke dark:border-strokedark">
          <h4 className="text-xl font-semibold text-black dark:text-white">
            All Users
          </h4>
          <button
            href="#"
            className="inline-flex items-center justify-center rounded-full bg-primary py-2 px-5 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
            onClick={handleAdd}
          >
            Add
            <span className="button-icon-space ml-5">
              <FontAwesomeIcon icon={faPlusCircle} />
            </span>
          </button>
        </div>

        <FromOfUser setUsers={setUsers} isOpen={isModalOpen} onClose={closeModal} setEditData={editData} isParentRender={reFetchHandler} />
        <DeleteUser setUsers={setUsers} isOpen={isDeleteModalOpen} onClose={closeDeleteModal} data={editData} isParentRender={reFetchHandler} />

        <Table
          className="border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark text-black dark:text-white"
          columns={columns}
          dataSource={users}
          scroll={{ x: "max-content" }}
        />
      </div>
    </div>

  );
};

export default UserList;
