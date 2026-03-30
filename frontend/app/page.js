import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

export default function Home() {
  return (
    <div>

      <Navbar />

      <div className="flex">

        <Sidebar />

        <div className="p-10 w-full">

          <h1 className="text-3xl font-bold mb-5">
            Dashboard
          </h1>

          <div className="grid grid-cols-3 gap-5">

            <div className="card bg-base-100 shadow">
              <div className="card-body">
                <h2 className="card-title">
                  Users
                </h2>
                <p>100 Data</p>
              </div>
            </div>

            <div className="card bg-base-100 shadow">
              <div className="card-body">
                <h2 className="card-title">
                  Products
                </h2>
                <p>50 Data</p>
              </div>
            </div>

            <div className="card bg-base-100 shadow">
              <div className="card-body">
                <h2 className="card-title">
                  Orders
                </h2>
                <p>25 Data</p>
              </div>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}