import React from "react";
import { Grid, Box } from "@chakra-ui/react";
import Sidebar from "../../SideBar/SideBar.tsx"
import BlogPageContent from "./BlogPageContent.jsx";

const BlogPage = () => {
    return (
        <div>
        <Grid templateColumns="0.5fr 2fr 0.5fr" gap={6}>
            <Box w="100%" h="10">
                <Sidebar />
            </Box>
            <Box w="100%" h="10">
                <BlogPageContent/>
            </Box>
            <Box w="100%" h="10">
                <h3>vip nhat he mat trời</h3>
            </Box>
        </Grid>
        </div>
    )
}

export default BlogPage;