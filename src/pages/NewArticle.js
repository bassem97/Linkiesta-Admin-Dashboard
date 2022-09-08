import {Link as RouterLink} from 'react-router-dom';
import {createEditor, Editor, Transforms} from "slate";
import {useCallback, useState} from "react";
import {withReact, Slate, Editable} from "slate-react";


// material
import {
    Grid,
    Button,
    Container,
    Stack,
    Typography,
    TextField,
    InputAdornment,
    IconButton,
    TextareaAutosize
} from '@mui/material';
// components
import Page from '../components/Page';
import Iconify from '../components/Iconify';
import SlateEditor from "../components/SlateEditor/SlateEditor";
import MultipleSelectChip from "../components/MultipleSelectChip";
import {Serializer} from "../utils/Serializer";


// ----------------------------------------------------------------------

const SORT_OPTIONS = [
    {value: 'latest', label: 'Latest'},
    {value: 'popular', label: 'Popular'},
    {value: 'oldest', label: 'Oldest'},
];

const categories = [
    {
        name : "Health",
        id : 1
    },
    {
        name : "Technology",
        id : 2
    },
    {
        name : "Science",
        id : 3
    },
    {
        name : "Sports",
        id : 4
    },
    {
        name : "Politics",
        id : 5
    }

];


// ----------------------------------------------------------------------


export default function NewArticle({authenticatedUser}) {
    const [article, setArticle] = useState({
        title: '',
        description: '',
        content: '',
        categories : [],
        author: authenticatedUser.id
    });

    const [content,setContent] = useState([
        {
            type:'paragaph',
            children:[{text:'Write your article here'}],
        },
    ]);

    const onContentChange = (newValue) => {
        setContent(newValue);
        console.log(newValue);
        console.log(Serializer({children: newValue}));
        setArticle({...article, content: newValue});
    }



    // take the array object and return the array of ids and then set it to the article
    const handleChangeId = (event) => {
        const {target : {value}} = event;
        const ids = categories.filter((category) => value.includes(category.name))
            .map((category) => category.id);
        setArticle({...article, categories: ids});
    }



    return (
        <Page title="New Article">
            <Container>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                    <Typography variant="h4" gutterBottom>
                        New Article
                    </Typography>
                    <Button variant="contained" component={RouterLink} to="#"
                            startIcon={<Iconify icon="eva:plus-fill"/>}>
                        Save
                    </Button>
                </Stack>

                <Stack spacing={3}>
                    {/* title text field */}
                    <TextField
                        name="title"
                        label="title"
                        onChange={(e) => setArticle({...article, title: e.target.value})}
                    />

                    {/* categories select */}
                    <MultipleSelectChip label="Categories" values={categories} handleChangeId={handleChangeId}/>

                    {/* description textarea */}
                    <TextareaAutosize
                        minRows={3}
                        aria-label="maximum height"
                        placeholder="Article description"
                        onChange={(e) => setArticle({...article, description: e.target.value})}
                    />

                    {/* content */}
                    <Typography variant="h5" gutterBottom>
                        Content :
                    </Typography>
                    <SlateEditor value={content} onChange={onContentChange}/>
                </Stack>

            </Container>
        </Page>
    );
}
