import { useNavigate } from "react-router";
import { GetUserDetails } from "../api/api";
import { type UserDetails } from "../assets/Types";
import { useState, useEffect } from "react";
import DashboardCard from "../components/DashboardCards";
import { Spinner } from "../components/ui/spinner";

const Dashboard = () => {
  const navigator = useNavigate();
  const [currentUserData, setCurrentUserData] = useState<UserDetails | null>(
    null,
  );

  useEffect(() => {
    const fetchData = async () => {
      const accessToken = localStorage.getItem("accessToken");
      const refreshToken = localStorage.getItem("refreshToken");
      const tokens = accessToken === null || refreshToken === null;
      if (tokens) {
        navigator("/login");
      } else {
        try {
          const fetchedUserData = await GetUserDetails(
            accessToken,
            refreshToken,
          );

          if (fetchedUserData && "id" in fetchedUserData) {
            setCurrentUserData(fetchedUserData as UserDetails);
          } else {
            navigator("/login");
          }
        } catch (error) {
          navigator("/login");
        }
      }
    };
    fetchData();
  }, []);

  if (!currentUserData) {
    return (
      <div className=" flex h-full flex-col items-center justify-center bg-linear-to-br from-slate-50 via-sky-50 to-indigo-100 p-6 text-slate-800 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 dark:text-slate-200">
        <Spinner />
        <span className="text-lg tabular-nums">Loding your Data</span>
      </div>
    );
  }

  const cards = [
    {
      title: "Personal Info",
      iconPath: "user",
      rows: [
        { label: "First Name", value: currentUserData.firstName },
        { label: "Last Name", value: currentUserData.lastName },
        { label: "Maiden Name", value: currentUserData.maidenName },
        { label: "Age", value: currentUserData.age?.toString() },
        { label: "Gender", value: currentUserData.gender, capitalize: true },
        { label: "Birth Date", value: currentUserData.birthDate },
      ],
    },
    {
      title: "Physical Details",
      iconPath: "heart",
      rows: [
        { label: "Height", value: `${currentUserData.height} cm` },
        { label: "Weight", value: `${currentUserData.weight} kg` },
        { label: "Eye Color", value: currentUserData.eyeColor },
        { label: "Hair Color", value: currentUserData.hair?.color },
        { label: "Hair Type", value: currentUserData.hair?.type },
        { label: "Blood Group", value: currentUserData.bloodGroup },
      ],
    },
    {
      title: "Contact",
      iconPath: "mail",
      rows: [
        { label: "Email", value: currentUserData.email },
        { label: "Phone", value: currentUserData.phone },
        { label: "Username", value: currentUserData.username },
        { label: "IP Address", value: currentUserData.ip },
        { label: "MAC Address", value: currentUserData.macAddress },
        { label: "University", value: currentUserData.university },
      ],
    },
    {
      title: "Address",
      iconPath: "location",
      rows: [
        { label: "Street", value: currentUserData.address?.address },
        { label: "City", value: currentUserData.address?.city },
        { label: "State", value: currentUserData.address?.state },
        { label: "State Code", value: currentUserData.address?.stateCode },
        { label: "Postal Code", value: currentUserData.address?.postalCode },
        { label: "Country", value: currentUserData.address?.country },
        {
          label: "Coordinates",
          value: `${currentUserData.address?.coordinates?.lat}, ${currentUserData.address?.coordinates?.lng}`,
        },
      ],
    },
    {
      title: "Bank Details",
      iconPath: "bank",
      rows: [
        { label: "Card Type", value: currentUserData.bank?.cardType },
        { label: "Card Number", value: currentUserData.bank?.cardNumber },
        { label: "Expires", value: currentUserData.bank?.cardExpire },
        { label: "Currency", value: currentUserData.bank?.currency },
        { label: "IBAN", value: currentUserData.bank?.iban },
      ],
    },
    {
      title: "Company",
      iconPath: "company",
      rows: [
        { label: "Company Name", value: currentUserData.company?.name },
        { label: "Department", value: currentUserData.company?.department },
        { label: "Title", value: currentUserData.company?.title },
        { label: "Address", value: currentUserData.company?.address?.address },
        { label: "City", value: currentUserData.company?.address?.city },
        { label: "Country", value: currentUserData.company?.address?.country },
      ],
    },
    {
      title: "Crypto Wallet",
      iconPath: "crypto",
      rows: [
        { label: "Coin", value: currentUserData.crypto?.coin },
        { label: "Network", value: currentUserData.crypto?.network },
        {
          label: "Wallet Address",
          value: currentUserData.crypto?.wallet,
          mono: true,
        },
      ],
    },
    {
      title: "Security",
      iconPath: "security",
      rows: [
        { label: "EIN", value: currentUserData.ein },
        { label: "SSN", value: currentUserData.ssn },
        { label: "User Agent", value: currentUserData.userAgent, mono: true },
      ],
    },
  ];

  return (
    <div className="bg-linear-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 p-6">
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-700 mb-6">
        <div className="h-32 bg-linear-to-br from-blue-100 via-purple-200 to-rose-200 dark:bg-linear-to-r dark:from-blue-500 dark:via-purple-500 dark:to-pink-500"></div>
        <div className="px-6 pb-6">
          <div className="flex flex-col sm:flex-row items-center sm:items-end -mt-16 mb-4 gap-4">
            <img
              src={currentUserData.image}
              alt={currentUserData.username}
              className="w-28 h-28 rounded-full border-4 border-white dark:border-slate-800 shadow-lg object-cover bg-gray-200 dark:bg-slate-600"
            />
            <div className="text-center sm:text-left flex-1">
              <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
                {currentUserData.firstName} {currentUserData.lastName}
              </h1>
              <p className="text-slate-600 dark:text-slate-400 text-lg">
                @{currentUserData.username}
              </p>
            </div>
            <div className="flex gap-2">
              <span
                className={`px-4 py-1.5 rounded-full text-sm font-semibold ${
                  currentUserData.role === "admin"
                    ? "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300"
                    : "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
                }`}
              >
                {currentUserData.role?.toUpperCase()}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card, index) => (
          <DashboardCard
            key={index}
            title={card.title}
            iconPath={card.iconPath}
            rows={card.rows}
          />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
