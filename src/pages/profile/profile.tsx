import { ProfileUI } from '@ui-pages';
import React, { FC, SyntheticEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { loginUser, selectUser } from '../../services/slices/userSlice';

export const Profile: FC = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  /** TODO: взять переменную из стора */
  // const user = {
  //   name: '',
  //   email: ''
  // };

  const [formValue, setFormValue] = useState({
    name: user!.name,
    email: user!.email,
    password: ''
  });

  // useEffect(() => {
  //   dispatch(getUser());
  // }, []);

  // useEffect(() => {
  //   setFormValue((prevState) => ({
  //     ...prevState,
  //     name: user?.name || '',
  //     email: user?.email || ''
  //   }));
  // }, [user]);

  const isFormChanged =
    formValue.name !== user?.name ||
    formValue.email !== user?.email ||
    !!formValue.password;

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    // if (!formValue.name || !formValue.email) return;
    // dispatch(
    //   loginUser({ password: formValue.password, email: formValue.email })
    // );
  };

  const handleCancel = (e: SyntheticEvent) => {
    e.preventDefault();
    setFormValue({
      name: user!.name,
      email: user!.email,
      password: ''
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValue((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <ProfileUI
      formValue={formValue}
      isFormChanged={isFormChanged}
      handleCancel={handleCancel}
      handleSubmit={handleSubmit}
      handleInputChange={handleInputChange}
    />
  );

  // return null;
};
