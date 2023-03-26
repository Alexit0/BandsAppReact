import { useRouteError } from "react-router-dom";
// import MainNavigation from "../components/MainNavigation";

const ErrorPage = () => {
  const error = useRouteError();

  let title = "Some Error Occured!";
  let message = "Something went wrong...";

  if (error.status === 500) {
    message = error.data.message
  }

  if (error.status === 404) {
    title = 'Not found!'
    message = 'Could not find page'
  }

  return (
    <> 
      <main>
        <h1>{title}</h1>
        <p>{message}</p>
      </main>
    </>
  );
};

export default ErrorPage;
