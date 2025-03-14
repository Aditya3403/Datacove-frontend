import { Check } from "lucide-react";
import React, { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import PricingData from "../../Data/PricingData";
import axios from "axios";

const UserPlans = () => {
  const { membershipDetails } = useContext(AppContext);

  // Find current plan from PricingData
  const currentPlan = PricingData.find(
    (plan) => plan.monthlyPriceId === membershipDetails?.planId
  );

  // Get upgrade plans (plans with higher price than current plan)
  const upgradePlans = PricingData.filter(
    (plan) =>
      parseFloat(plan.monthlyPrice) >
      parseFloat(membershipDetails?.amount || "0")
  );

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleUpgrade = async (newPlanId) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/membership/upgrade-current-plant",
        {
          userId: membershipDetails.userId,
          newPlanId: newPlanId,
        }
      );
      console.log(response.data);
      window.location.href = response.data.url;
    } catch (error) {
      console.error("Error upgrading plan:", error);
    }
  };

  // const handleUpgrade = (planLink) => {
  //   if (planLink) {
  //     window.location.href = planLink; // Redirect user to Stripe checkout
  //   } else {
  //     console.error("Invalid payment link");
  //   }
  // };

  return (
    <div className="min-h-screen text-white p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Your Plan</h1>

        {/* Current Plan Section */}
        {/* {currentPlan && (
          <div className="mb-12">
            <div className="bg-[#0c1234] rounded-xl p-6 border border-[#7214FF]">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-semibold mb-2">
                    {currentPlan.title}
                  </h2>
                  <p className="text-[#8F9BB7]">{currentPlan.description}</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold">
                    ${membershipDetails?.amount}/month
                  </p>
                  <p className="text-[#8F9BB7] text-sm">
                    Current billing period:
                  </p>
                  <p className="text-[#8F9BB7] text-sm">
                    {formatDate(membershipDetails?.currentPeriodStart)} -{" "}
                    {formatDate(membershipDetails?.currentPeriodEnd)}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {currentPlan.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <Check size={18} className="text-[#7214FF]" />
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )} */}

        {/* Available Upgrades Section */}
        {upgradePlans.length > 0 && (
          <>
            <h2 className="text-2xl font-bold mb-4">Available Upgrades</h2>
            <p className="text-[#8F9BB7] mb-8">
              Upgrade your plan to unlock more features and capabilities.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {upgradePlans.map((plan) => (
                <div
                  key={plan.id}
                  className="bg-[#0c1234] rounded-xl p-6 border border-[#1a1f37] hover:border-[#7214FF] transition-all"
                >
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h3 className="text-xl font-semibold mb-2">
                        {plan.title}
                      </h3>
                      <p className="text-[#8F9BB7] text-sm">
                        {plan.description}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold">${plan.monthlyPrice}</p>
                      <p className="text-[#8F9BB7] text-sm">per month</p>
                    </div>
                  </div>

                  <div className="space-y-4 mb-6">
                    {plan.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <Check size={18} className="text-[#FF1F6F]" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-4">
                    <button
                      className="w-full bg-[#FF1F6F] hover:bg-[#ff1f6fcc] text-white py-3 rounded-lg"
                      onClick={() => handleUpgrade(plan.monthlyPriceId)}
                    >
                      Upgrade Monthly
                    </button>

                    <button
                      className="w-full bg-transparent border border-[#FF1F6F] hover:bg-[#FF1F6F]/10 text-white py-3 rounded-lg"
                      onClick={() => handleUpgrade(plan.annuallyPriceId)}
                    >
                      Upgrade Annually
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default UserPlans;
