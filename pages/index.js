import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from "@mui/material/Button";

import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeItem from '@mui/lab/TreeItem';
import {TextField} from "@mui/material";
import {useState} from "react";

const data = {
    id: 'root',
    name: 'Test',
    children: [
        {
            id: '1',
            name: 'alt - 1',
        },
        {
            id: '3',
            name: 'alt - 2',
            children: [
                {
                    id: '4',
                    name: 'alt - alt - 1',
                },
                {
                    id: '5',
                    name: 'alt - alt - 2',
                },
            ],
        },
    ],
};
const maxIdData = 5;

export default function Index() {

    const [val, setVal] = useState('');
    const [tree, setTree] = useState(data);
    const [maxId, setMaxId] = useState(maxIdData);
    const [selectedNode, setSelectedNode] = useState();
    const findPositionAndAddItem = (object, id, val) => {
        if (object.hasOwnProperty('id') && object.id === id) {
            if (!object.hasOwnProperty('children')){
                object.children = [];
            }
            object.children.push({id : (maxId+1).toString(), name : val});
            return object;
        }
        if (Array.isArray(object)) {
            object.map((each) => {
                each = findPositionAndAddItem(each, id, val);
                return each;
            })
        }
        if (object.hasOwnProperty('children')) {
            object.children = findPositionAndAddItem(object.children, id, val);
            return object;
        }
        return object;
    }
    const addItem = () => {
        setMaxId(maxId+1);
        let obj = findPositionAndAddItem(tree, selectedNode, val);
        setTree(obj);
        console.log(maxId);
    }

    const handleChange = async (event, node) => {
        setSelectedNode(node);
    }

    const renderTree = (nodes) => (
        <TreeItem key={nodes.id} nodeId={nodes.id} label={nodes.name}>
            {Array.isArray(nodes.children)
                ? nodes.children.map((node) => renderTree(node))
                : null}
        </TreeItem>
    );

    return (
        <Container maxWidth="sm">
            <Box sx={{my: 4}}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Material UI - Next.js TreeView example
                </Typography>
                <TextField id="outlined-basic" label="Yazı" variant="outlined" value={val}
                           onChange={(e) => setVal(e.target.value)}/>
                <Button variant="contained" onClick={addItem}>
                    Ekle
                </Button>
                <TreeView
                    aria-label="rich object"
                    defaultCollapseIcon={<ExpandMoreIcon/>}
                    defaultExpanded={['root']}
                    defaultExpandIcon={<ChevronRightIcon/>}
                    onNodeSelect={handleChange}
                    sx={{height: 210, flexGrow: 1, maxWidth: 400, overflowY: 'auto'}}
                >
                    {renderTree(tree)}
                </TreeView>
            </Box>
        </Container>
    );
}
