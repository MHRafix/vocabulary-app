import UserProtectorWithSession from '@/app/config/authProtection/userProtectorWithSession';
import ClientAppLayout from '@/components/layout/ClientLayout/ClientAppLayout';
import { NextPage } from 'next';

const LessonsPage: NextPage = () => {
	return (
		<ClientAppLayout>
			<div>Lessons</div>
		</ClientAppLayout>
	);
};

export default UserProtectorWithSession(LessonsPage);
