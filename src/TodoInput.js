import React, { useState } from 'react';

function TodoInput({ onAdd }) {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim() !== '') {
      onAdd(text); // فقط از تابعی که از App اومده استفاده می‌کنیم
      setText('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="یه کار جدید بنویس..."
      />
      <button type="submit">اضافه کن</button>
    </form>
  );
}

export default TodoInput;
