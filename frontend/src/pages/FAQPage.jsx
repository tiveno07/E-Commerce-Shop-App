import React, { useState } from "react";
import { Header } from "../components/Layout/Header";
import { Footer } from "../components/Layout/Footer";
import styles from "../styles/styles";

export const FAQPage = () => {
  return (
    <div>
      <Header activeHeading={5} />
      <Faq />
      <Footer />
    </div>
  );
};

const Faq = () => {
  const [activeTab, setActiveTab] = useState(0);

  const toggleTab = (tab) => {
    if (activeTab === tab) {
      setActiveTab(0);
    } else {
      setActiveTab(tab);
    }
  };

  return (
    <div className={`${styles.section}`}>
      <h2 className="text-3xl font-bold text-gray-900 mb-0">FAQ</h2>
      <div className="mx-auto space-y-4">
        {/*single faq*/}
        <div className="border-b border-x-gray-200 pb-4">
          <button
            className="flex items-center justify-between w-full"
            onClick={() => toggleTab(1)}
          >
            <span className="text-lg font-medium text-gray-900">
              how do i track my order?
            </span>
            {activeTab === 1 ? (
              <svg
                className="h-6 w-6 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="h-6 w-6 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 517 7-7 7"
                />
              </svg>
            )}
          </button>
          {activeTab === 1 && (
            <div className="mt-4">
              <p className="text-base text-gray-500">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eius
                voluptates explicabo fugit odit numquam! Quas excepturi
                aspernatur error consectetur? Quidem eaque adipisci maxime
                expedita, possimus facilis necessitatibus obcaecati reiciendis
                officia soluta perferendis cupiditate saepe quia, autem fuga
                enim eligendi facere quisquam fugit, incidunt a alias beatae.
                Molestias asperiores ad aut id itaque minima, magni dignissimos
                inventore distinctio odio sequi consequuntur alias consequatur
                quia iste, esse ut dolor eligendi vel totam aspernatur quo
                numquam? Sed perferendis numquam aliquam reiciendis dolor magni
                vero, in voluptatibus, labore, architecto similique veritatis
                ducimus soluta!
              </p>
            </div>
          )}
        </div>
        <div className="border-b border-x-gray-200 pb-4">
          <button
            className="flex items-center justify-between w-full"
            onClick={() => toggleTab(7)}
          >
            <span className="text-lg font-medium text-gray-900">
              how do i make payments?
            </span>
            {activeTab === 7 ? (
              <svg
                className="h-6 w-6 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="h-6 w-6 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 517 7-7 7"
                />
              </svg>
            )}
          </button>
          {activeTab === 7 && (
            <div className="mt-4">
              <p className="text-base text-gray-500">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eius
                voluptates explicabo fugit odit numquam! Quas excepturi
                aspernatur error consectetur? Quidem eaque adipisci maxime
                expedita, possimus facilis necessitatibus obcaecati reiciendis
                officia soluta perferendis cupiditate saepe quia, autem fuga
                enim eligendi facere quisquam fugit, incidunt a alias beatae.
                Molestias asperiores ad aut id itaque minima, magni dignissimos
                inventore distinctio odio sequi consequuntur alias consequatur
                quia iste, esse ut dolor eligendi vel totam aspernatur quo
                numquam? Sed perferendis numquam aliquam reiciendis dolor magni
                vero, in voluptatibus, labore, architecto similique veritatis
                ducimus soluta!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
