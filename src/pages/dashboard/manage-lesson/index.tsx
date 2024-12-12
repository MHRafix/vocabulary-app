import DashboardProtectorWithSession from '@/app/config/authProtection/DashboardProtector';
import DashboardLayout from '@/components/custom/dashboard/dashboardLayout';
import { NextPage } from 'next';

const ManageLessons: NextPage = () => {
	return <DashboardLayout title='Manage Lesson'>ManageLessons</DashboardLayout>;
};

export default DashboardProtectorWithSession(ManageLessons);
