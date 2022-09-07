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


// ----------------------------------------------------------------------

const SORT_OPTIONS = [
    {value: 'latest', label: 'Latest'},
    {value: 'popular', label: 'Popular'},
    {value: 'oldest', label: 'Oldest'},
];

const categories = [
    'Health',
    'Sport',
    'Politics',
    'Economy',
    'Science',
    'Technology',
    'Art',
    'Music',
    'Film',
    'Books',
    'Food',
    'Travel'
];


// ----------------------------------------------------------------------


export default function NewArticle() {
    const initialValue = [
        {
            type: 'paragraph',
            children: [{text: 'A line of text in a paragraph.'}],
        },
    ]
    const [editor] = useState(() => withReact(createEditor()))

    const renderElement = useCallback(props => {
        switch (props.element.type) {
            case 'code':
                return <CodeElement {...props} />
            default:
                return <DefaultElement {...props} />
        }
    }, [])

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
                <form>
                    <Stack spacing={3}>
                        {/* title text field */}
                        <TextField
                            name="title"
                            label="title"
                        />

                        {/* categories select */}
                        <MultipleSelectChip label="Categories" values={categories}/>

                        {/* description textarea */}
                        <TextareaAutosize
                            minRows={3}
                            aria-label="maximum height"
                            placeholder="Article description"
                        />

                        {/* content */}
                        <Typography variant="h5" gutterBottom>
                            Content :
                        </Typography>
                        <SlateEditor/>
                    </Stack>
                </form>


                {/* <Stack mb={5} direction="row" alignItems="center" justifyContent="space-between"> */}
                {/*   <BlogPostsSearch posts={POSTS} /> */}
                {/*   <BlogPostsSort options={SORT_OPTIONS} /> */}
                {/* </Stack> */}

                {/* <Grid container spacing={3}> */}
                {/*   {POSTS.map((post, index) => ( */}
                {/*     <BlogPostCard key={post.id} post={post} index={index} /> */}
                {/*   ))} */}
                {/* </Grid> */}
            </Container>
        </Page>
    );
}

// Define a React component renderer for our code blocks.
const CodeElement = props => {
    return (
        <pre {...props.attributes}>
      <code>{props.children}</code>
    </pre>
    )
}
const DefaultElement = props => {
    return <p {...props.attributes}>{props.children}</p>
}
