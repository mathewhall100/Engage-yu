
// Default theme for whole app. 

import { createMuiTheme } from '@material-ui/core/styles'

const theme = createMuiTheme({
    palette: {
      primary: {
        main: '#2d404b',
        dark: '#28353d'
      },
    },
    breakpoints: {
      values: {
        lg: 1380
      }
    }
  })

  export default theme