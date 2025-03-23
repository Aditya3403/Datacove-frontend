import React from "react";
import { useSearchParams } from "react-router-dom";
import { Check, X } from "lucide-react";
import useAppStore from "../../store/useAppStore.js";
const AcceptClientInvitation = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const name = searchParams.get("inviterName");
  const email = searchParams.get("email"); // Assuming email is also passed as a query parameter
  const { user} = useAppStore();
  const handleClientAccept = async () => {
    try {
      if (!user.invitations || user.invitations.length === 0) {
        console.error("No invitations found.");
        return;
      }
  
      // Extract all invitee emails from invitations array
      const invitationEmails = user.invitations.map(invite => invite.inviteeEmail);
  
      const response = await fetch("http://localhost:3000/api/v1/dashboard/acceptClientInvitation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ emails: invitationEmails }), // Send array of emails
      });
  
      const data = await response.json();
      console.log(data);
      if (data.success) {
        console.log("All invitations accepted!");
      } else {
        console.error("Failed to accept invitations:", data.message);
      }
    } catch (error) {
      console.error("Error accepting invitations:", error);
    }
  };
  

  const handleClientDecline = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/v1/dashboard/declineClientInvitation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, token }), // Include both email and token in the request body
      });

      const data = await response.json();
      if (data.success) {
        console.log("Invitation declined!");
        alert("Invitation declined successfully!");
      } else {
        alert(`Failed to decline invitation: ${data.message}`);
      }
    } catch (error) {
      console.error("Error declining invitation:", error);
      alert("An error occurred while declining the invitation.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full border border-violet-100">
        <div className="space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-violet-900 mb-2">
              Confirmation Required
            </h2>
            <p className="text-violet-600 capitalize">
              {name} has invited you to join their organization.
            </p>
          </div>

          <div className="flex gap-4">
            <button
              onClick={handleClientAccept}
              className="flex-1 flex items-center justify-center gap-2 bg-violet-600 hover:bg-violet-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 shadow-sm hover:shadow-md"
            >
              <Check size={20} />
              Accept
            </button>

            <button
              onClick={handleClientDecline}
              className="flex-1 flex items-center justify-center gap-2 bg-white hover:bg-violet-50 text-violet-600 border-2 border-violet-200 px-6 py-3 rounded-lg font-medium transition-colors duration-200"
            >
              <X size={20} />
              Decline
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AcceptClientInvitation;