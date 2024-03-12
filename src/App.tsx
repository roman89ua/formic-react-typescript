import {} from "react";
import "./App.scss";
import { Button, Container, Form } from "react-bootstrap";
import {
  Field,
  Formik,
  Form as FormikForm,
  ErrorMessage,
  FieldProps,
  FieldArray,
} from "formik";

import { object, string, number, ObjectSchema, array } from "yup";
import TextError from "./components/TextError";

enum FormValues {
  name = "name",
  surname = "surname",
  age = "age",
  email = "email",
  youtubeChanel = "youtubeChanel",
  comment = "comment",
  address = "address",
  socialMedia = "socialMedia",
  facebook = "facebook",
  instagram = "instagram",
  phoneNumbers = "phoneNumbers",
  listOfPH = "listOfPH",
}

type FormType = {
  name: string;
  surname: string;
  age: number;
  email: string;
  youtubeChanel: string;
  comment: string;
  address: string;
  socialMedia: {
    facebook: string;
    instagram: string;
  };
  phoneNumbers: Array<string>;
};

type FormErrorsType<Type> = {
  [Property in keyof Type]: string | undefined;
};

const defaultFormValues: FormType = {
  name: "",
  surname: "",
  age: 0,
  email: "",
  youtubeChanel: "",
  comment: "",
  address: "",
  socialMedia: {
    facebook: "",
    instagram: "",
  },
  phoneNumbers: ["", ""],
};

const validationSchema: ObjectSchema<FormType> = object().shape({
  name: string().required(),
  surname: string().required(),
  age: number().required().positive(),
  email: string().email().required(),
  youtubeChanel: string().required(),
  comment: string().required().max(20).min(1),
  address: string().required(),
  socialMedia: object().shape({
    facebook: string().required(),
    instagram: string().required(),
  }),
  phoneNumbers: array().of(string().required()).required(),
});

function App() {
  return (
    <Formik
      initialValues={defaultFormValues}
      onSubmit={(values, formikHelpers) => {
        console.log({ values });
        formikHelpers.resetForm();
      }}
      validationSchema={validationSchema}
    >
      <Container className="d-flex flex-column justify-items">
        <h1 className="text-center">Formik practice</h1>
        <FormikForm noValidate>
          <Form.Group>
            <Form.Label
              htmlFor={FormValues.name}
              className="w-100"
              // className={`w-100 ${
              //   formik.errors[FormValues.name] && formik.touched.name
              //     ? "error-label"
              //     : ""
              // } `}
            >
              <span>Name</span>
              <Field
                type="text"
                id={FormValues.name}
                name={FormValues.name}
                className="form-control"
              />
              <ErrorMessage name={FormValues.name} render={TextError} />
            </Form.Label>
          </Form.Group>

          <Form.Group>
            <Form.Label className="w-100" htmlFor={FormValues.surname}>
              <span>Surname</span>
              <Field
                type="text"
                id={FormValues.surname}
                name={FormValues.surname}
                className="form-control"
              />
              <ErrorMessage name={FormValues.surname} render={TextError} />
            </Form.Label>
          </Form.Group>

          <Form.Group>
            <Form.Label className="w-100" htmlFor={FormValues.age}>
              <span>Age</span>
              <Field
                type="number"
                id={FormValues.age}
                min={0.1}
                max={200}
                step={0.1}
                name={FormValues.age}
                className="form-control"
              />

              <ErrorMessage name={FormValues.age} render={TextError} />
            </Form.Label>
          </Form.Group>

          <Form.Group>
            <Form.Label className="w-100" htmlFor={FormValues.email}>
              <span>Email</span>
              <Field
                type="email"
                id={FormValues.email}
                name={FormValues.email}
                className="form-control"
              />
              <ErrorMessage name={FormValues.email} render={TextError} />
            </Form.Label>
          </Form.Group>

          <Form.Group>
            <Form.Label htmlFor={FormValues.youtubeChanel} className="w-100">
              <span>Youtube chanel</span>
              <Field
                type="text"
                id={FormValues.youtubeChanel}
                name={FormValues.youtubeChanel}
                className="form-control"
              />

              <ErrorMessage
                name={FormValues.youtubeChanel}
                render={TextError}
              />
            </Form.Label>
          </Form.Group>

          <Form.Group>
            <Form.Label htmlFor={FormValues.comment} className="w-100">
              <span>Comment</span>
              <Field
                type="text"
                as="textarea"
                id={FormValues.comment}
                name={FormValues.comment}
                className="form-control"
              />
              <ErrorMessage name={FormValues.comment} render={TextError} />
            </Form.Label>
          </Form.Group>

          <Form.Group>
            <Form.Label htmlFor={FormValues.address} className="w-100">
              <span>Address</span>
              <Field name={FormValues.address}>
                {(props: FieldProps) => {
                  const { field, form, meta } = props;
                  console.log(props);
                  return (
                    <input
                      type="text"
                      id={FormValues.address}
                      placeholder="Here should be your address"
                      className="form-control"
                      {...field}
                    />
                  );
                }}
              </Field>
              <ErrorMessage name={FormValues.address} render={TextError} />
            </Form.Label>
          </Form.Group>

          <Form.Group>
            <Form.Label htmlFor={FormValues.facebook} className="w-100">
              <span>Facebook</span>
              <Field
                className="form-control"
                type="text"
                name={`${FormValues.socialMedia}.${FormValues.facebook}`}
                id={FormValues.facebook}
              />
              <ErrorMessage
                name={`${FormValues.socialMedia}.${FormValues.facebook}`}
                render={TextError}
              />
            </Form.Label>
          </Form.Group>

          <Form.Group>
            <Form.Label htmlFor={FormValues.instagram} className="w-100">
              <span>Instagram</span>
              <Field
                className="form-control"
                type="text"
                name={`${FormValues.socialMedia}.${FormValues.instagram}`}
                id={FormValues.instagram}
              />
              <ErrorMessage
                name={`${FormValues.socialMedia}.${FormValues.instagram}`}
                render={TextError}
              />
            </Form.Label>
          </Form.Group>

          <Form.Group>
            <Form.Label
              htmlFor={`${FormValues.phoneNumbers}[0]`}
              className="w-100"
            >
              <span>Primary phone numbers</span>
              <Field
                className="form-control"
                type="text"
                name={`${FormValues.phoneNumbers}[0]`}
                id="primary-phone-number"
              />
              <ErrorMessage
                name={`${FormValues.phoneNumbers}[0]`}
                render={TextError}
              />
            </Form.Label>
            <Form.Label
              htmlFor={`${FormValues.phoneNumbers}[1]`}
              className="w-100"
            >
              <span>Secondary phone number</span>

              <Field
                className="form-control"
                type="text"
                name={`${FormValues.phoneNumbers}[1]`}
                id="secondary-phone-number"
              />
              <ErrorMessage
                name={`${FormValues.phoneNumbers}[1]`}
                render={TextError}
              />
            </Form.Label>
          </Form.Group>

          <Form.Group>
            <Form.Label
              htmlFor={`${FormValues.phoneNumbers}[1]`}
              className="w-100"
            >
              <span>List of phone number</span>

              <FieldArray
                // className="form-control"
                // type="text"
                name={`${FormValues.listOfPH}`}
                // id="secondary-phone-number"
              >
                {() => {
                  return "something";
                }}
              </FieldArray>
              <ErrorMessage
                name={`${FormValues.phoneNumbers}[1]`}
                render={TextError}
              />
            </Form.Label>
          </Form.Group>

          <section className="d-flex gap-3" title="form button section ">
            <Button variant="primary" type="submit" disabled={false}>
              Submit
            </Button>
          </section>
        </FormikForm>
      </Container>
    </Formik>
  );
}

export default App;
