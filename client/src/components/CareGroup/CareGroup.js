import React, { PureComponent } from 'react'
import CareGroupRoutes from '../../routes/CareGroupRoutes'

export default class CareGroup extends PureComponent {

    componentDidMount() {
        this.props.history.push({
            pathname: '/admin/caregroup/find'
        })
    }

  render() {
    return  <CareGroupRoutes />
  }
}
