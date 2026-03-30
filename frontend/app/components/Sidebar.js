export default function Sidebar() {
  return (
    <div className="w-64 h-screen bg-base-200 p-5">

      <ul className="menu">

        <li>
          <a className="active">
            Dashboard
          </a>
        </li>

        <li>
          <a>
            Users
          </a>
        </li>

        <li>
          <a>
            Products
          </a>
        </li>

        <li>
          <a>
            Settings
          </a>
        </li>

      </ul>

    </div>
  );
}