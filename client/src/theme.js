
// Default theme for whole app. 

import { createMuiTheme } from '@material-ui/core/styles'

const theme = createMuiTheme({
    palette: {
      primary: {
        main: '#2d404b',
        dark: '#28353d'
      },
      secondary: {
        main: "#eeeeee",
        dark: "#dddddd"
      }
    },
    breakpoints: {
      values: {
        lg: 1380
      }
    }
  })

  export default theme