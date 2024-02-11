import { GVTextField } from '../src'
import { Field, Form, Formik } from 'formik'
import { string } from 'yup'
import React from 'react'
import Box from '@mui/material/Box'
import { render } from '@testing-library/react'

test('GVTextField render', () => {
  render(
    <Box>
      <Formik
        initialValues={{ text: string }}
        onSubmit={(values) => {
          console.log(values.text)
        }}
      >
        {({ values }) => (
          <Form>
            <Field
              key={1}
              name={`text`}
              label={'my text'}
              component={GVTextField}
              onClick={() => {
                console.log(values.text)
              }}
            />
          </Form>
        )}
      </Formik>
    </Box>,
  )
})
