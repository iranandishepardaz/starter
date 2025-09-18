import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';

function UserManager() {
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
    await supabase.from('PaSaveUsers').delete().eq('UserId', userId);
    setUsers(users.filter(user => user.UserId !== userId));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {/* فرم ورودی کاربر */}
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

      <table>
        <thead>
          <tr>
            <th>UserId</th><th>FirstName</th><th>LastName</th><th>UserPass</th>
            <th>UserType</th><th>Sex</th><th>LastSeen</th><th>ThemeIndex</th><th>عملیات</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.UserId}>
              <td>{user.UserId}</td>
              <td>{user.FirstName}</td>
              <td>{user.LastName}</td>
              <td>{user.UserPass}</td>
              <td>{user.UserType}</td>
              <td>{user.Sex ? 'مرد' : 'زن'}</td>
              <td>{new Date(user.LastSeen).toLocaleString()}</td>
              <td>{user.ThemeIndex}</td>
              <td>
                <button onClick={() => removeUser(user.UserId)}>حذف</button>{' '}
                <button onClick={() => {
                  setNewUser({ ...user });
                  setEditingUserId(user.UserId);
                }}>ویرایش</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserManager;
