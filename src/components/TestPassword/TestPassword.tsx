import React, { useState } from 'react';
import './TestPassword.scss';
import { StrengthType } from '../../types/StrengthType';

function validatePassword(password: string) {
  const passwordEasyPattern = /^[a-zA-Z]+$|^\d+$|^[\W_]+$/;
  const passwordMediumPattern = /^(?=.*[a-zA-Z])(?=.*[\W_])[a-zA-Z\W_]+$|^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]+$|^(?=.*\d)(?=.*[\W_])[\d\W_]+$/;
  const passwordStrongPattern = /^(?=.*[a-zA-Z])(?=.*[\W_])(?=.*\d)[a-zA-Z\W_\d]+$/;

  if (!password) {
    return StrengthType.NONE;
  }

  if (password.length < 8) {
    return StrengthType.SHORT;
  }
  
  if (passwordEasyPattern.test(password)) {
    return StrengthType.EASY;
  }
  
  if (passwordMediumPattern.test(password)) {
    return StrengthType.MEDIUM;
  }
  
  if (passwordStrongPattern.test(password)) {
    return StrengthType.STRONG;
  }
}

export const TestPassword: React.FC = React.memo(() => {
  const [password, setPassword] = useState('');
  const [passwordStrength , setPasswordStrength] = useState(StrengthType.NONE);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    setPassword('');
    setPasswordStrength(StrengthType.NONE);
  };

  const handlePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setPassword(value);
    setPasswordStrength(validatePassword(value) as StrengthType);
  };

  return (
    <main className="testPassword">
      <div className="testPassword__container">
        <h1 className="testPassword__title">
          Test Password
        </h1>

        <form
          action="/#"
          method="POST"
          className="testPassword__form"
          onSubmit={handleSubmit}
        >
          <label htmlFor="password" className="testPassword__label">
            Password:
          </label>

          <input
            id="password"
            type="password"
            name="password"
            required
            autoComplete="on"
            autoFocus
            placeholder="Enter a password"
            className="testPassword__field"
            value={password}
            onChange={handlePassword}
          />
        </form>

        {['easy', 'medium', 'strong'].map(strength => (
          <section
            key={strength}
            className={`
              testPassword__strength
              testPassword__strength--${passwordStrength}
            `}
          >
            {strength}
          </section>
        ))}
      </div>
    </main>
  );
});
