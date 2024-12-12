import UserProtectorWithSession from '@/app/config/authProtection/userProtectorWithSession';
import { NextPage } from 'next';

const TutorialsPage: NextPage = () => {
	return <div>TutorialsPage:NextPage</div>;
};

export default UserProtectorWithSession(TutorialsPage);
