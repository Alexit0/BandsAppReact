import { json, redirect } from "react-router-dom";
import AuthForm from "../components/UI/AuthForm";

const AuthenticationPage = () => {
  return <AuthForm />;
};

export default AuthenticationPage;

export async function action({ request }) {
  const searchParams = new URL(request.url).searchParams;
  let mode = searchParams.get("mode") || "login";

  if (mode !== "login" && mode !== "signup") {
    throw json({ message: "Unsupported mode." }, { status: 422 });
  }
  const data = await request.formData();
  const authData = {
    email: data.get("email"),
    password: data.get("password"),
  };
  console.log(authData);

  const response = await fetch("http://localhost:5000/" + mode, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(authData),
  });

  if (
    response.status === 422 ||
    response.status === 401 ||
    response.status === 400
  ) {
    return response;
  }

  if (!response.ok) {
    throw json({ message: "Could not authenticate user." }, { status: 500 });
  }

  const resData = await response.json();
  console.log(resData);
  const token = resData.access_token;
  console.log("token => ",token)

  localStorage.setItem("token", token);
  const exp = new Date();
  exp.setHours(exp.getHours() + 1);
  localStorage.setItem("expiration", exp.toISOString());

  return redirect("/");
}
