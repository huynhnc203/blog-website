import React from "react";
import { Grid, Box } from "@chakra-ui/react";
import Sidebar from "../../SideBar/SideBar.tsx"


const BlogPage = () => {
    return (
        <div>
        <Grid templateColumns="0.5fr 2fr 1fr" gap={6}>
            <Box w="100%" h="10">
                <Sidebar />
            </Box>
            <Box w="100%" h="10">
                <h1>Toi la phuc dep trai</h1>
            </Box>
            <Box w="100%" h="10">
                <h3>vip nhat he mat trời</h3>
            </Box>
        </Grid>
        </div>
    )
}

export default BlogPage;