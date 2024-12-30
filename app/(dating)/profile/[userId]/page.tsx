import UserCard from "@/components/(dating)/Profile/UserCard/userCard";

interface ProfilePageProps {
    params: {
        userId: string;
    }
}

export default function ProfilePage({ params }: ProfilePageProps) {
    return (
        <div className="container mx-auto py-8">
            <UserCard userId={params.userId} />
        </div>
    );
}