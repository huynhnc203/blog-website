import React from "react";
import { Grid, Box } from "@chakra-ui/react";
import Sidebar from "../../SideBar/SideBar.tsx"
import BlogPageContent from "./BlogPageContent.jsx";
import BlogPageRight from "./BlogPageRight.jsx";

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
                <BlogPageRight/>
            </Box>
        </Grid>
        </div>
    )
}

export default BlogPage;