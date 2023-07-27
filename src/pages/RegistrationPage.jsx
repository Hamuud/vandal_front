import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import cn from 'classnames';

import { authService } from '../services/authService.js';
import { usePageError } from '../hooks/usePageError.js';

const validateName = (value) => {
  if (!value) {
    return 'Name is required';
  }
};

const validateSurname = (value) => {
  if (!value) {
    return 'Surname is required';
  }
};

function validatePhone(value) {
  if (!value) {
    return 'Phone is requred';
  }

  const phonePattern = /^\+?[0-9]+$/;

  if (!phonePattern.test(value)) {
    return 'Phone is not valid';
  }
}

function validateEmail(value) {
  if (!value) {
    return 'Email is required';
  }

  const emailPattern = /^[\w.+-]+@([\w-]+\.){1,3}[\w-]{2,}$/;

  if (!emailPattern.test(value)) {
    return 'Email is not valid';
  }
}

const validatePassword = (value) => {
  if (!value) {
    return 'Password is required';
  }

  if (value.length < 6) {
    return 'At least 6 characters';
  }
};

export const RegistrationPage = () => {
  const [error, setError] = usePageError('');
  const [registered, setRegistered] = useState(false);

  if (registered) {
    return (
      <section className="">
        <h1 className="title">Check your email</h1>
        <p>We have sent you an email with the activation link</p>
      </section>
    );
  }

  return (
    <>
      <Formik
        initialValues={{
          email: '',
          password: '',
          name: '',
        }}
        validateOnMount={true}
        onSubmit={({ email, password, name, surname, phone }, formikHelpers) => {
          formikHelpers.setSubmitting(true);

          authService.register({ email, password, name, surname, phone })
            .then(() => {
              setRegistered(true);
            })
            .catch((error) => {
              if (error.message) {
                setError(error.message);
              }

              if (!error.response?.data) {
                return;
              }

              const { errors, message } = error.response.data;

              formikHelpers.setFieldError('email', errors?.email);
              formikHelpers.setFieldError('password', errors?.password);
              formikHelpers.setFieldError('name', errors?.name);
              formikHelpers.setFieldError('surname', errors?.surname);
              formikHelpers.setFieldError('phone', errors?.phone);

              if (message) {
                setError(message);
              }
            })
            .finally(() => {
              formikHelpers.setSubmitting(false);
            })
          }
        }
      >
        {({ touched, errors, isSubmitting }) => (
          <Form className="box">
            <h1 className="title">Sign up</h1>
            <div className="field">
              <label htmlFor="Name" className="label">
                Name
              </label>

              <div className="control has-icons-left has-icons-right">
                <Field
                  validate={validateName}
                  name="name"
                  type="name"
                  id="name"
                  placeholder="John"
                  className={cn('input', {
                    'is-danger': touched.name && errors.name,
                  })}
                />

                <span className="icon is-small is-left">
                  <i className="fa fa-user"></i>
                </span>

                {touched.name && errors.name && (
                  <span className="icon is-small is-right has-text-danger">
                    <i className="fas fa-exclamation-triangle"></i>
                  </span>
                )}
              </div>

              {touched.name && errors.name ? (
                <p className="help is-danger">{errors.name}</p>
              ) : (
                <p className="help">This field is required</p>
              )}
            </div>

            <div className="field">
              <label htmlFor="Surname" className="label">
                Surname
              </label>

              <div className="control has-icons-left has-icons-right">
                <Field
                  validate={validateSurname}
                  name="surname"
                  type="surname"
                  id="surname"
                  placeholder="Smith"
                  className={cn('input', {
                    'is-danger': touched.surname && errors.surname,
                  })}
                />

                <span className="icon is-small is-left">
                  <i className="fa fa-user"></i>
                </span>

                {touched.surname && errors.surname && (
                  <span className="icon is-small is-right has-text-danger">
                    <i className="fas fa-exclamation-triangle"></i>
                  </span>
                )}
              </div>

              {touched.surname && errors.surname ? (
                <p className="help is-danger">{errors.surname}</p>
              ) : (
                <p className="help">This field is required</p>
              )}
            </div>

            <div className="field">
              <label htmlFor="Phone" className="label">
                Phone
              </label>

              <div className="control has-icons-left has-icons-right">
                <Field
                  validate={validatePhone}
                  name="phone"
                  type="phone"
                  id="phone"
                  placeholder="+1 123-456-7890"
                  className={cn('input', {
                    'is-danger': touched.phone && errors.phone,
                  })}
                />

                <span className="icon is-small is-left">
                  <i className="fa fa-phone"></i>
                </span>

                {touched.surname && errors.phone && (
                  <span className="icon is-small is-right has-text-danger">
                    <i className="fas fa-exclamation-triangle"></i>
                  </span>
                )}
              </div>

              {touched.phone && errors.phone ? (
                <p className="help is-danger">{errors.phone}</p>
              ) : (
                <p className="help">This field is required</p>
              )}
            </div>

            <div className="field">
              <label htmlFor="email" className="label">Email</label>

              <div className="control has-icons-left has-icons-right">
                <Field
                  validate={validateEmail}
                  name="email"
                  type="email"
                  id="email"
                  placeholder="e.g. bobsmith@gmail.com"
                  className={cn('input', {
                    'is-danger': touched.email && errors.email,
                  })}
                />

                <span className="icon is-small is-left">
                  <i className="fa fa-envelope"></i>
                </span>

                {touched.email && errors.email && (
                  <span className="icon is-small is-right has-text-danger">
                    <i className="fas fa-exclamation-triangle"></i>
                  </span>
                )}
              </div>

              {touched.email && errors.email && (
                <p className="help is-danger">{errors.email}</p>
              )}
            </div>

            <div className="field">
              <label htmlFor="password" className="label">
                Password
              </label>

              <div className="control has-icons-left has-icons-right">
                <Field
                  validate={validatePassword}
                  name="password"
                  type="password"
                  id="password"
                  placeholder="*******"
                  className={cn('input', {
                    'is-danger': touched.password && errors.password,
                  })}
                />

                <span className="icon is-small is-left">
                  <i className="fa fa-lock"></i>
                </span>

                {touched.password && errors.password && (
                  <span className="icon is-small is-right has-text-danger">
                    <i className="fas fa-exclamation-triangle"></i>
                  </span>
                )}
              </div>

              {touched.password && errors.password ? (
                <p className="help is-danger">{errors.password}</p>
              ) : (
                <p className="help">At least 6 characters</p>
              )}
            </div>

            <div className="field">
              <button
                type="submit"
                className={cn('button is-success has-text-weight-bold', {
                  'is-loading': isSubmitting,
                })}
                disabled={isSubmitting || errors.email || errors.password || errors.name}
              >
                Sign up
              </button>
            </div>

            Already have an account?
            {' '}
            <Link to="/login">Log in</Link>
          </Form>
        )}
      </Formik>

      {error && <p className="notification is-danger is-light">{error}</p>}
    </>
  );
};
