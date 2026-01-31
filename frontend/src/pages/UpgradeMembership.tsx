import { useNavigate } from "react-router-dom";
import { upgrade } from "../api/user.api";
import { useAuth } from "../context/AuthContext";

const order = { A: 1, B: 2, C: 3 };

const UpgradeMembership = () => {
  const { user,logout } = useAuth();
  const navigate = useNavigate();

  if (!user) return null;

  const handleUpgrade = async (type: "A" | "B" | "C") => {
    try {
      await upgrade(user.id, type);
      alert("Membership berhasil di-upgrade");
      logout()
      navigate("/");
    } catch (error) {
      alert("Gagal upgrade membership");
    }
  };

  const plans = [
    {
      type: "A",
      name: "Basic",
      price: "Gratis",
      desc: "Akses 3 Artikel dan 3 Video",
    },
    {
      type: "B",
      name: "Premium",
      price: "Rp 49.000",
      desc: "Akses 10 Artikel dan 10 Video",
    },
    {
      type: "C",
      name: "VIP",
      price: "Rp 99.000",
      desc: "Akses Seluruh Artikel dan Video",
    },
  ] as const;

  return (
    <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center px-4">
      <div className="w-full max-w-6xl">
       
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            Upgrade Membership
          </h1>
          <p className="text-white/60">
            Pilih paket yang sesuai dengan kebutuhanmu 🚀
          </p>
        </div>

        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan) => {
            const isCurrent = user.membership_type === plan.type;
            const isLocked =
              order[plan.type] < order[user.membership_type];

            return (
              <div
                key={plan.type}
                className={`relative rounded-2xl p-6 flex flex-col justify-between
                  border backdrop-blur
                  ${
                    isCurrent
                      ? "border-blue-500 bg-blue-500/10 scale-105"
                      : "border-white/10 bg-slate-900"
                  }
                  ${isLocked ? "opacity-50" : ""}
                  transition
                `}
              >
                {/* Badge */}
                {isCurrent && (
                  <span className="absolute top-4 right-4 text-xs px-3 py-1 rounded-full bg-blue-600">
                    Active
                  </span>
                )}

                {isLocked && (
                  <span className="absolute top-4 right-4 text-xs px-3 py-1 rounded-full bg-slate-700">
                    Locked
                  </span>
                )}

                <div>
                  <h2 className="text-xl font-semibold mb-2">
                    {plan.name}
                  </h2>
                  <p className="text-3xl font-bold mb-3">
                    {plan.price}
                  </p>
                  <p className="text-white/70 text-sm leading-relaxed">
                    {plan.desc}
                  </p>
                </div>

                <button
                  disabled={isCurrent || isLocked}
                  onClick={() => handleUpgrade(plan.type)}
                  className={`mt-8 py-2.5 rounded-lg font-medium transition
                    ${
                      isCurrent
                        ? "bg-slate-700 cursor-not-allowed"
                        : isLocked
                          ? "bg-slate-800 cursor-not-allowed"
                          : "bg-blue-600 hover:bg-blue-700"
                    }
                  `}
                >
                  {isCurrent
                    ? "Current Plan"
                    : isLocked
                      ? "Unavailable"
                      : "Upgrade"}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default UpgradeMembership;
