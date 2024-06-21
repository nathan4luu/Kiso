import { useUser } from "../api/user";

export default function Dashboard() {
  const user = useUser()
  if (user.status === "success") {
    return (
      <>
        <h1>
          <b>Welcome, {user.data.displayName} you are logged in.</b>
        </h1>
        <p>This is EduCards</p>
      </>
    );
  }
}
