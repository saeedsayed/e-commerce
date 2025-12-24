import BlogList from '@/components/blogPageComponents/BlogList'
import { PageHeader } from '@/components/common'

const page = () => {
    return (
        <div className='container mb-20'>
            <PageHeader
                bg={"/images/header_bg_1.jpeg"}
                title={"Our Blog"}
                description={"Home ideas and design inspiration"}
                paths={[
                    { name: "Home", path: "/" },
                    { name: "Blog", path: "/blog" },
                ]}
            />
            <div className='h-10 bg-primary mt-5 mb-10'/>
            <BlogList/>
        </div>
    )
}

export default page