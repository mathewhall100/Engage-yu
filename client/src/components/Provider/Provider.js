import React, { PureComponent } from 'react'
import axios from 'axios'
import ProviderRoutes from '../../routes/ProviderRoutes'

export default class Provider extends PureComponent {

  componentDidMount() {
      // this.props.history.push({
      //     pathname: '/admin/provider/find'
      // })
  }

  render() {
    return  <ProviderRoutes />
  }
}