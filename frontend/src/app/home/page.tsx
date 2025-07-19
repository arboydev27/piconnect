import Home from "@/components/ui/home-page";
import Sidebar from "@/components/ui/sidebar";
import React from "react";

const page = () => {
  return (
    <div>
      <Sidebar>
        <Home />
      </Sidebar>
    </div>
  );
};

export default page;
