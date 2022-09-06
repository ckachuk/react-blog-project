
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';

const Comment = (props)=>{

    return(
        <Card sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 1,
            gridTemplateRows: 'auto',
            gridTemplateAreas: `"body body body body"
            ". . . ."
            "user . . date"`,
            m:3,
            }}>
                <Typography  sx={{ gridArea: 'body', m:3}} variant='body1'>{props.comment.body}</Typography>
                <Typography  sx={{ gridArea: 'user', m:3}} variant='subtitle2'>{props.comment.user.username}</Typography>
                <Typography  sx={{ gridArea: 'date', m:3}} variant='subtitle2'>{props.comment.date_created}</Typography>
        </Card>
    )
}


export default Comment;
