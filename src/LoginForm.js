import React, { useState } from 'react';
import { supabase } from './supabaseClient';

function LoginForm({ onLogin }) {
  const [userId, setUserId] = useState('');
  const [userPass, setUserPass] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    const { data, error: fetchError } = await supabase
      .from('PaSaveUsers')
      .select('*')
      .eq('UserId', userId)
      .eq('UserPass', userPass)
      .single();

    if (fetchError || !data) {
      setError('نام کاربری یا رمز عبور اشتباه است');
      return;
    }

    if (!data.UserType.includes('ADM;')) {
      setError('دسترسی شما محدود است');
      return;
    }

    onLogin(data); // ارسال اطلاعات کاربر به کامپوننت اصلی
  };

  return (
    <form onSubmit={handleLogin}>
      <h2>ورود مدیر</h2>
      <input
        type="text"
        placeholder="UserId"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="UserPass"
        value={userPass}
        onChange={(e) => setUserPass(e.target.value)}
        required
      />
      <button type="submit">ورود</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  );
}

export default LoginForm;
