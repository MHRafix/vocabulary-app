import lessonApiRepository from "@/app/api/repositories/lesson.repo"
import UserProtectorWithSession from "@/app/config/authProtection/userProtectorWithSession"
import ClientAppLayout from "@/components/layout/ClientLayout/ClientAppLayout"
import { Container, Space, Title } from "@mantine/core"
import { useQuery } from "@tanstack/react-query"
import { NextPage } from "next"
import { useRouter } from "next/router"

const SingleLesson: NextPage = () => {
  const router = useRouter()

  	// get single lesson
	const {
		data,
		isLoading,
		refetch: onRefetch,
		isRefetching,
	} = useQuery({
		queryKey: [`learner_lesson_${router?.query?.lessonId}`],
		queryFn: async () => await lessonApiRepository.getLesson(router?.query?.lessonId as string),
    enabled: Boolean(router?.query?.lessonId)
	});
  
  return (
    <ClientAppLayout>
      <Container size={"lg"}>	
    <Space h={50} />
    <Title order={2} tt={"capitalize"}>{`${data?.title} - ${data?.number}` || "Single Lesson Title"}</Title>
    <Space h={20} />
    </Container>
    </ClientAppLayout>
  );
};

export default UserProtectorWithSession(SingleLesson)