import Breadcrumb from "@/components/Common/Breadcrumb";
import Admin from '@/components/(admin)'

const AdminPage = () => {
    return (
        <>
            <Breadcrumb
                pageName="Admin Page"
                description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. In varius eros eget sapien consectetur ultrices. Ut quis dapibus libero."
            />

            <Admin />
        </>
    );
};

export default AdminPage;
