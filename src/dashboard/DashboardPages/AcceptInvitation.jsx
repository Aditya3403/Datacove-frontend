import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

const AcceptInvitation = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token"); // Get token from URL
  console.log("TOKEN", token);

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Fetch invitation details when page loads
  useEffect(() => {
    async function fetchInvitation() {
      try {
        const res = await axios.get(
          `http://localhost:3000/api/v1/dashboard/fetch-invitation?token=${token}`
        );
        console.log("Response is" ,res)
        const inviteeEmail = res.data.invitation.email;
        // console.log("ACCEPT", res.data.invitation);
        setEmail(inviteeEmail);
      } catch (err) {
        setError("Invalid or expired invitation.");
      }
    }
    if (token) {
      fetchInvitation();
    }
  }, [token]);

  // Handle form submission
  const handleAccept = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const res = await axios.post(
        "http://localhost:3000/api/v1/dashboard/accept-invitation",
        {
          token,
          email,
          name,
          password,
        }
      );

      setSuccess("Invitation accepted successfully! Redirecting...");
      setTimeout(() => {
        window.location.href = `/`; // Redirect after success
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        maxWidth: "400px",
        margin: "auto",
        padding: "20px",
        textAlign: "center",
        marginTop: "10rem",
      }}
    >
      <h2>Join Invitation</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}

      {!error && (
        <form onSubmit={handleAccept} className="space-y-3">
          <input
            type="email"
            value={email}
            disabled
            placeholder="Email"
            className="w-full p-3 border border-violet-400/20 rounded-xl bg-white/5 text-white placeholder-gray-400 focus:outline-none focus:border-violet-400/40 focus:ring-1 focus:ring-violet-400/40 transition-all duration-200"
          />
          <input
            type="text"
            placeholder="Enter your name"
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full p-3 border border-violet-400/20 rounded-xl bg-white/5 text-white placeholder-gray-400 focus:outline-none focus:border-violet-400/40 focus:ring-1 focus:ring-violet-400/40 transition-all duration-200"
          />
          <input
            type="password"
            placeholder="Create a password"
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-3 border border-violet-400/20 rounded-xl bg-white/5 text-white placeholder-gray-400 focus:outline-none focus:border-violet-400/40 focus:ring-1 focus:ring-violet-400/40 transition-all duration-200"
          />
          <button type="submit" disabled={loading}>
            {loading ? "Accepting..." : "Accept Invitation"}
          </button>
        </form>
      )}
    </div>
  );
};

export default AcceptInvitation;
