import DashboardProtectorWithSession from '@/app/config/authProtection/DashboardProtector';
import DashboardLayout from '@/components/custom/dashboard/dashboardLayout';
import { NextPage } from 'next';

const ManageVocabulary: NextPage = () => {
	return (
		<DashboardLayout title='Manage Vocabulary'>
			ManageVocabulary
		</DashboardLayout>
	);
};

export default DashboardProtectorWithSession(ManageVocabulary);
