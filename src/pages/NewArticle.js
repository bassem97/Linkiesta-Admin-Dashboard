import { Link as RouterLink } from 'react-router-dom';
import {createEditor, Editor, Transforms} from "slate";
import {useCallback, useState} from "react";
import {withReact,Slate,Editable} from "slate-react";





// material
import { Grid, Button, Container, Stack, Typography } from '@mui/material';
// components
import Page from '../components/Page';
import Iconify from '../components/Iconify';






// ----------------------------------------------------------------------

const SORT_OPTIONS = [
  { value: 'latest', label: 'Latest' },
  { value: 'popular', label: 'Popular' },
  { value: 'oldest', label: 'Oldest' },
];


// ----------------------------------------------------------------------



export default function NewArticle() {
  const initialValue = [
    {
      type: 'paragraph',
      children: [{ text: 'A line of text in a paragraph.' }],
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
          <Button variant="contained" component={RouterLink} to="#" startIcon={<Iconify icon="eva:plus-fill" />}>
            Save
          </Button>
        </Stack>

        <Slate editor={editor} value={initialValue} >
          <Editable
              // Define a new handler which prints the key that was pressed.
              renderElement={renderElement}
              onKeyDown={event => {
                if (event.key === '`' && event.ctrlKey) {
                  event.preventDefault()
                  // Determine whether any of the currently selected blocks are code blocks.
                  const [match] = Editor.nodes(editor, {
                    match: n => n.type === 'code',
                  })
                  // Toggle the block type depending on whether there's already a match.
                  Transforms.setNodes(
                      editor,
                      { type: match ? 'paragraph' : 'code' },
                      { match: n => Editor.isBlock(editor, n) }
                  )
                }
              }}
          />
        </Slate>




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
