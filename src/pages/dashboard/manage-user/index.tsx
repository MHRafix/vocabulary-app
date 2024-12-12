import DashboardProtectorWithSession from '@/app/config/authProtection/DashboardProtector';
import DashboardLayout from '@/components/custom/dashboard/dashboardLayout';
import { NextPage } from 'next';

const ManageUser: NextPage = () => {
	return <DashboardLayout title='Manage User'>ManageUser</DashboardLayout>;
};

export default DashboardProtectorWithSession(ManageUser);
