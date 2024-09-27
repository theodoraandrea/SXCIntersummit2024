import React, { useState, useEffect } from "react";
import { useUser } from "../../contexts/user-context";
import Navbar from "../../components/navbar";
import Spinner from "../../components/elements/spinner";
import { getChambersRegistrationData } from "../../service/services";

const ChambersSummary = () => {
  const { profileData, isLoggedIn, loading } = useUser();
  const [response, setResponse] = useState({});
  const [userData, setUserData] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isLoggedIn) {
      fetchRegistrationData();
    }
  }, [isLoggedIn]);

  useEffect(() => {
    if (!loading) {
      setUserData(profileData);
    }
  }, [loading, profileData]);

  const fetchRegistrationData = async () => {
    try {
      setIsLoading(true);
      const response = await getChambersRegistrationData();
      setResponse(response?.data?.chamber || {});
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileLinks = (link) => {
    if (Array.isArray(link) && link.length > 0) {
      return link[0];
    }
    return "";
  };

  return (
    <div>
      <Navbar />
      <div className="bg-primary-1 w-full min-h-screen p-4 text-white">
        {isLoading ? (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <Spinner />
          </div>
        ) : (
          <div className=" md:gap-x-4 md:gap-y-4">
            <div className="grid grid-cols-1 gap-y-4 md:col-span-2 mx-2 sm:mx-8 py-4 md:py-8">
              <h1 className="text-gradient font-bold mx-8 text-4xl md:text-5xl text-center">
                Chambers Registration Summary
              </h1>
              <p className="text-sm md:text-base text-center mx-2 sm:mx-32 md:max-w-lg lg:mx-auto">
                You have registered successfully. Please review the information
                below.
              </p>
            </div>

            <div className="flex flex-col min-w-full rounded-lg bg-opacity-25 items-center">
              {response ? (
                <div className="bg-primary-4 mt-4 md:mx-5 max-w-full sm:max-w-md p-8 rounded-lg shadow-lg">
                  <div className="text-sm md:text-base">
                    <p>
                      <strong>Industry Types:</strong>{" "}
                      {response?.industryType?.join(", ")}
                    </p>
                    <p>
                      <strong>CV:</strong>{" "}
                      <a
                        href={handleFileLinks(response?.cv)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline"
                      >
                        View CV
                      </a>
                    </p>

                    <div className="mt-4">
                      <strong>Questions:</strong>
                      {response?.question?.map((q, index) => (
                        <div key={index}>
                          {Object.keys(q).map((key) => (
                            <p key={key}>
                              <strong>{key}:</strong> {q[key]}
                            </p>
                          ))}
                        </div>
                      ))}
                    </div>

                    <div className="mt-4">
                      <strong>Screenshots:</strong>
                      {response?.screenshotChambers?.map((link, index) => (
                        <div key={index}>
                          <a
                            href={handleFileLinks(link)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:underline"
                          >
                            Screenshot {index + 1}
                          </a>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <></>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChambersSummary;
