import React, { PureComponent } from 'react'
import PatientRoutes from '../../routes/PatientRoutes'

export default class Patient extends PureComponent {

  componentDidMount() {
      this.props.history.push({
          pathname: '/admin/patient/find'
      })
  }

  render() {
    return  <PatientRoutes />
  }
}