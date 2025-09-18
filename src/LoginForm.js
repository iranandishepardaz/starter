import React, { useState } from 'react';
import { supabase } from './supabaseClient';
import './LoginForm.css'; // اضافه کن برای استایل جدا

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

    onLogin(data);
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <h2>ورود مدیر</h2>
        <input
          type="text"
          placeholder="نام کاربری"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="رمز عبور"
          value={userPass}
          onChange={(e) => setUserPass(e.target.value)}
          required
        />
        <button type="submit">ورود</button>
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
}

export default LoginForm;
