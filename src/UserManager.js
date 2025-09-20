import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';
import './UserManager.css';

function UserManager({ onLogout }) {
  const [users, setUsers] = useState([]);
  const [editingUserId, setEditingUserId] = useState(null);
  const [newUser, setNewUser] = useState({
    UserId: '',
    FirstName: '',
    LastName: '',
    UserPass: '',
    UserType: '',
    Sex: false,
    ThemeIndex: 0
  });

  useEffect(() => {
    const fetchUsers = async () => {
      const { data, error } = await supabase.from('PaSaveUsers').select('*');
      if (!error) setUsers(data);
    };
    fetchUsers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editingUserId) {
      await supabase
        .from('PaSaveUsers')
        .update({ ...newUser, LastSeen: new Date().toISOString() })
        .eq('UserId', editingUserId);

      const updatedList = users.map(user =>
        user.UserId === editingUserId ? { ...newUser, UserId: editingUserId } : user
      );
      setUsers(updatedList);
      setEditingUserId(null);
    } else {
      const { data } = await supabase.from('PaSaveUsers').insert([
        { ...newUser, LastSeen: new Date().toISOString() }
      ]);
      setUsers([...users, data[0]]);
    }

    setNewUser({
      UserId: '',
      FirstName: '',
      LastName: '',
      UserPass: '',
      UserType: '',
      Sex: false,
      ThemeIndex: 0
    });
  };

const removeUser = async (userId) => {
  const confirmed = window.confirm(`آیا مطمئن هستید که می‌خواهید کاربر "${userId}" را حذف کنید؟`);
  if (!confirmed) return;

  await supabase.from('PaSaveUsers').delete().eq('UserId', userId);
  setUsers(users.filter(user => user.UserId !== userId));
};


  return (
    <div className="manager-container">
      <header className="manager-header">
        <h1>مدیریت کاربران</h1>
        <button className="logout-btn" onClick={onLogout}>خروج</button>
      </header>

      <form className="user-form" onSubmit={handleSubmit}>
        <input type="text" placeholder="UserId" value={newUser.UserId}
          onChange={(e) => setNewUser({ ...newUser, UserId: e.target.value })}
          required disabled={editingUserId !== null} />
        <input type="text" placeholder="FirstName" value={newUser.FirstName}
          onChange={(e) => setNewUser({ ...newUser, FirstName: e.target.value })} />
        <input type="text" placeholder="LastName" value={newUser.LastName}
          onChange={(e) => setNewUser({ ...newUser, LastName: e.target.value })} />
        <input type="password" placeholder="UserPass" value={newUser.UserPass}
          onChange={(e) => setNewUser({ ...newUser, UserPass: e.target.value })} />
        <input type="text" placeholder="UserType" value={newUser.UserType}
          onChange={(e) => setNewUser({ ...newUser, UserType: e.target.value })} />
        <label>
          <input type="checkbox" checked={newUser.Sex}
            onChange={(e) => setNewUser({ ...newUser, Sex: e.target.checked })} />
          جنسیت: مرد؟
        </label>
        <input type="number" placeholder="ThemeIndex" value={newUser.ThemeIndex}
          onChange={(e) => setNewUser({ ...newUser, ThemeIndex: parseInt(e.target.value) })} />
        <button type="submit">{editingUserId ? 'ذخیره تغییرات' : 'افزودن کاربر'}</button>
      </form>

      <div className="user-table-wrapper">
        <table className="user-table">
          <thead>
            <tr>
              <th>UserId</th>
              <th>LastName</th>
              <th>UserType</th>
              <th className="desktop-only">FirstName</th>
              <th className="desktop-only">Sex</th>
              <th className="desktop-only">LastSeen</th>
              <th className="desktop-only">ThemeIndex</th>
              <th>عملیات</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.UserId}>
                <td>{user.UserId}</td>
                <td>{user.LastName}</td>
                <td>{user.UserType}</td>
                <td className="desktop-only">{user.FirstName}</td>
                <td className="desktop-only">{user.Sex ? 'مرد' : 'زن'}</td>
                <td className="desktop-only">{new Date(user.LastSeen).toLocaleString()}</td>
                <td className="desktop-only">{user.ThemeIndex}</td>
                <td>
                  <button className="edit-btn" onClick={() => {
                    setNewUser({ ...user });
                    setEditingUserId(user.UserId);
                  }}>✏️ ویرایش</button>{' '}
                  <button className="delete-btn" onClick={() => removeUser(user.UserId)}>🗑️ حذف</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UserManager;
