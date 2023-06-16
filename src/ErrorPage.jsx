import { useRouteError } from "react-router-dom"
export const ErrorPage = () => {
    const error = useRouteError()
    return (
            <div>
                <h1>Oooops!</h1>
                <p>The page you were looking for does not exist.</p>
                <i>{error.statusText || error.message}</i>
            </div>
  )
}
