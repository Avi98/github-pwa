import { useEffect,  } from "react"
import App from 'next/app'

const MyApp = ({Component, pageProps}) =>{
    
    return <Component {...pageProps}/>
}

MyApp.getInitialProps = async (appContext) => {
  // calls page's `getInitialProps` and fills `appProps.pageProps`
  const appProps = await App.getInitialProps(appContext);

  return { ...appProps }
}
export default MyApp