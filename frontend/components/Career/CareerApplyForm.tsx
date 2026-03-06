import { Formik } from 'formik';
import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { GoArrowUpRight } from 'react-icons/go';

export interface CareerApplyFormProps {
  jobTitle?: string;
  jobLocation?: string;
  onSuccess?: () => void;
}

interface ApplyFormValues {
  fullName: string;
  email: string;
  phone: string;
  cvFile: File | null;
  coverLetterFile: File | null;
}

const initialValues: ApplyFormValues = {
  fullName: '',
  email: '',
  phone: '',
  cvFile: null,
  coverLetterFile: null,
};

const validate = (values: ApplyFormValues) => {
  const errors: Partial<Record<keyof ApplyFormValues, string>> = {};
  if (!values.fullName) {
    errors.fullName = 'Required';
  }
  if (!values.email) {
    errors.email = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }
  if (!values.phone) {
    errors.phone = 'Required';
  }
  if (!values.cvFile) {
    errors.cvFile = 'Required';
  }
  if (!values.coverLetterFile) {
    errors.coverLetterFile = 'Required';
  }
  return errors;
};

const inputStyle = {
  border: 0,
  borderBottom: '1px solid #D9DBE9',
  borderRadius: 0,
  background: 'transparent',
  fontSize: 14,
};

const CareerApplyForm: React.FC<CareerApplyFormProps> = ({ jobTitle, jobLocation, onSuccess }) => {
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [submitErrorMessage, setSubmitErrorMessage] = useState<string | null>(null);

  return (
    <Formik
      initialValues={initialValues}
      validate={validate}
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        setSubmitStatus('idle');
        setSubmitErrorMessage(null);

        try {
          const formData = new FormData();
          formData.append('fullName', values.fullName);
          formData.append('email', values.email);
          formData.append('phone', values.phone);
          if (jobTitle) formData.append('jobTitle', jobTitle);
          if (jobLocation) formData.append('jobLocation', jobLocation);
          formData.append('jobUrl', window?.location.href);
          if (values.cvFile) formData.append('cvFile', values.cvFile);
          if (values.coverLetterFile) formData.append('coverLetterFile', values.coverLetterFile);

          const response = await fetch('/api/career-apply', {
            method: 'POST',
            body: formData,
          });

          const data = await response.json().catch(() => ({}));

          if (!response.ok) {
            const message =
              (typeof data?.error === 'string' && data.error) ||
              'Submission failed. Please try again.';
            throw new Error(message);
          }

          setSubmitStatus('success');
          resetForm();
          if (onSuccess) onSuccess();
        } catch (err) {
          setSubmitStatus('error');
          const msg = (err as Error)?.message || 'Submission failed. Please try again.';
          setSubmitErrorMessage(msg);
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {({
        handleSubmit,
        handleChange,
        handleBlur,
        setFieldValue,
        values,
        touched,
        errors,
        isSubmitting,
      }) => (
        <Form noValidate onSubmit={handleSubmit} className="p-0">
          <Form.Group className="mb-3" controlId="fullName">
            <Form.Label className="text-dark fs-13 fw-medium">
              Full Name<span className="ms-2 primary-text">*</span>
            </Form.Label>
            <Form.Control
              type="text"
              name="fullName"
              style={inputStyle}
              value={values.fullName}
              onChange={handleChange}
              onBlur={handleBlur}
              isInvalid={touched.fullName && !!errors.fullName}
              placeholder="Full Name"
              required
              autoComplete="name"
            />
            <Form.Control.Feedback type="invalid">{errors.fullName}</Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="email">
            <Form.Label className="text-dark fs-13 fw-medium">
              Email<span className="ms-2 primary-text">*</span>
            </Form.Label>
            <Form.Control
              type="email"
              name="email"
              style={inputStyle}
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              isInvalid={touched.email && !!errors.email}
              placeholder="you@email.com"
              autoComplete="email"
              required
            />
            <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="phone">
            <Form.Label className="text-dark fs-13 fw-medium">
              Phone<span className="ms-2 primary-text">*</span>
            </Form.Label>
            <Form.Control
              type="tel"
              name="phone"
              style={inputStyle}
              value={values.phone}
              onChange={handleChange}
              onBlur={handleBlur}
              isInvalid={touched.phone && !!errors.phone}
              placeholder="Your phone number"
              autoComplete="tel"
              required
            />
            <Form.Control.Feedback type="invalid">{errors.phone}</Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="coverLetterFile">
            <Form.Label className="text-dark fs-13 fw-medium">
              Upload Cover Letter <span className="ms-2 primary-text">*</span>
            </Form.Label>
            <Form.Control
              type="file"
              name="coverLetterFile"
              accept=".pdf,.doc,.docx"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setFieldValue('coverLetterFile', e.currentTarget.files && e.currentTarget.files[0]);
              }}
              style={{
                background: 'transparent',
                fontSize: 14,
                border: 0,
                paddingLeft: 0,
                paddingRight: 0,
                borderBottom: '1px solid #D9DBE9',
                borderRadius: 0,
              }}
              isInvalid={touched.coverLetterFile && !!errors.coverLetterFile}
              required
            />
            <Form.Control.Feedback type="invalid">{errors.coverLetterFile}</Form.Control.Feedback>
            {values.coverLetterFile && (
              <div className="mt-1 fs-12 text-muted">Selected: {values.coverLetterFile.name}</div>
            )}
          </Form.Group>
          <Form.Group className="mb-3" controlId="cvFile">
            <Form.Label className="text-dark fs-13 fw-medium">
              Upload Resume<span className="ms-2 primary-text">*</span>
            </Form.Label>
            <Form.Control
              type="file"
              name="cvFile"
              accept=".pdf,.doc,.docx"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setFieldValue('cvFile', e.currentTarget.files && e.currentTarget.files[0]);
              }}
              style={{
                background: 'transparent',
                fontSize: 14,
                border: 0,
                paddingLeft: 0,
                paddingRight: 0,
                borderBottom: '1px solid #D9DBE9',
                borderRadius: 0,
              }}
              isInvalid={touched.cvFile && !!errors.cvFile}
              required
            />
            <Form.Control.Feedback type="invalid">{errors.cvFile}</Form.Control.Feedback>
            {values.cvFile && (
              <div className="mt-1 fs-12 text-muted">Selected: {values.cvFile.name}</div>
            )}
          </Form.Group>
          {submitStatus === 'success' && (
            <div className="text-success fs-14 mb-3">Application submitted.</div>
          )}
          {submitStatus === 'error' && (
            <div className="text-danger fs-14 mb-3">
              {submitErrorMessage ?? 'Submission error. Please try again.'}
            </div>
          )}
          <div className="d-flex justify-content-end mt-5">
            <Button
              variant="dark"
              type="submit"
              style={{
                width: 'max-content',
                minWidth: 164,
                padding: '9px 16px',
                textAlign: 'center',
                borderRadius: 4,
                letterSpacing: 'var(--letter-spacing)',
                fontWeight: 500,
                fontSize: 14,
                textTransform: 'uppercase',
              }}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                'SUBMITTING...'
              ) : (
                <>
                  SUBMIT APPLICATION{' '}
                  <span>
                    <GoArrowUpRight size={18} />
                  </span>
                </>
              )}
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default CareerApplyForm;
