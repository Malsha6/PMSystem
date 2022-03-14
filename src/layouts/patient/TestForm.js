import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./TestForm.scss";
import TextError from "../../validations/TextError";

const initialValues = {
  name: "",
};

const onSubmit = (values) => {
  console.log(values);
};

const validate = (values) => {
  let errors = {};

  if (!values.name) {
    errors.name = "Required";
  }

  return errors;
};

const validationSchema = Yup.object({
  name: Yup.string().required("Required"),
});

function TestForm() {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {/* <Form> automatically links to onSubmit method*/}
      {(formik) => {
        return (
          <Form>
            <div className="form-control">
              <label>Name</label>
              <Field type="text" id="name" name="name"></Field>
              {/*component="div" wraps the error msg related to name in a div/custom react tag  */}
              <ErrorMessage name="name" component={TextError} />
              <button type='submit' disabled={!formik.isValid}>Submit</button>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
}

export default TestForm;
