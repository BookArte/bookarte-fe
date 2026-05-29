import { Outlet } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';

const AdminLayout = () => {
    return (
        <div className="admin_container">
            <AdminSidebar />
            <main className="admin_main_content">
                <Outlet />
            </main>
        </div>
    );
};

export default AdminLayout;