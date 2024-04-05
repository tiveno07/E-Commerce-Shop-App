import React, { useState } from "react";
import { Header } from "../components/Layout/Header";
import { ProfileSidebar } from "../components/Profile/ProfileSidebar";
import { ProfileContent } from "../components/Profile/ProfileContent";
import styles from "../styles/styles";

export const ProfilePage = () => {
  const [active, setActive] = useState(1);
  return (
    <div>
      <Header />
      <div className={`${styles.section} py-10 flex`}>
        <div className="w-[50px] 800px:w-[335px] sticky 800px:mt-0 mt-[18%]">
          <ProfileSidebar active={active} setActive={setActive} />
        </div>
        <ProfileContent active={active} />
      </div>
    </div>
  );
};
