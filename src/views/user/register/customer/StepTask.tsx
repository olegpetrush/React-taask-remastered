import React from "react";
import { Formik, Form, Field } from "formik";
import { FormGroup, Label } from "reactstrap";
import IntlMessages from "../../../../helpers/IntlMessages";
import { validateNotEmpty, validateNotMinusOne } from "../../../../helpers/Validators";

export const StepTask = ({formRef, industries}) => {
  return (
    <div className="wizard-basic-step">
        <h3 className="text-center">1. Fortæl os om din opgave</h3>
      <Formik
        innerRef={(instance) => {
            formRef[0] = instance;
          }}
        initialValues={{
          branch_id: "-1",
          description: "",
          urgency: "-1",
        }}
        onSubmit={() => {}}
      >
        {({ errors, touched }) => (
          <Form className="av-tooltip tooltip-label-bottom">
            <FormGroup className="form-group has-float-label">
              <Label>
                <IntlMessages id="app.chooseIndustry" />
              </Label>
              <Field
                className="form-control"
                as="select"
                type="text"
                name="branch_id"
                validate={validateNotMinusOne}
              >
                {industries.map((x, y) => {
                  return (
                    <option key={x.id} value={x.id} disabled={x.id === -1}>
                      {x.name}
                    </option>
                  );
                })}
              </Field>
              {errors.branch_id && touched.branch_id && (
                <div className="invalid-feedback d-block">
                  {errors.branch_id}
                </div>
              )}
            </FormGroup>
            <FormGroup className="form-group has-float-label">
              <Label>
                <IntlMessages id="user.task_description" />
              </Label>
              <Field
                className="form-control"
                type="textarea"
                as="textarea"
                rows="5"
                name="description"
                validate={validateNotEmpty}
              />
              {errors.description && touched.description && (
                <div className="invalid-feedback d-block">
                  {errors.description}
                </div>
              )}
            </FormGroup>
            <FormGroup className="form-group has-float-label">
              <Label>
                <IntlMessages id="user.task_priority" />
              </Label>
              <Field
                className="form-control"
                as="select"
                type="text"
                name="urgency"
                validate={validateNotMinusOne}
              >
                <option key="-1" value="-1" disabled>
                  Vælg prioritet
                </option>
                <option key="1" value="very_low">Meget lidt</option>
                <option key="2" value="low">Lidt</option>
                <option key="3" value="maybe">Middel</option>
                <option key="4" value="high">Meget</option>
                <option key="5" value="very_high">Rigtig meget</option>
              </Field>
              {errors.urgency && touched.urgency && (
                <div className="invalid-feedback d-block">
                  {errors.urgency}
                </div>
              )}
            </FormGroup>
          </Form>
        )}
      </Formik>
    </div>
  );
};
