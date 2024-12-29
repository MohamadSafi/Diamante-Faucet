import React, { useState } from "react";
import { TabSelector } from "./tabs/TabSelector";
import { ManualKeyForm } from "./faucet-options/ManualKeyForm";
import { WalletConnectForm } from "./faucet-options/WalletConnectForm";
import { GenerateKeyForm } from "./faucet-options/GenerateKeyForm";

export const FaucetForm = () => {
  const [activeTab, setActiveTab] = useState("manual");

  const renderForm = () => {
    switch (activeTab) {
      case "manual":
        return <ManualKeyForm />;
      case "wallet":
        return <WalletConnectForm />;
      case "generate":
        return <GenerateKeyForm />;
      default:
        return null;
    }
  };

  return (
    <div>
      <TabSelector activeTab={activeTab} onTabChange={setActiveTab} />
      {renderForm()}
    </div>
  );
};
