import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import IconButton from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';
import { elapsedTime, truncatedStory } from '../utilities/utils';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import { useNavigate } from 'react-router-dom';

export const PostCard = ({id, title, description, photoUrl, likes, timestamp, maxLength}) => {
  let navigate = useNavigate();
   
  return (
    <Card sx={{ width: 320 }}>
      <div>
        <Typography level="title-lg">{title}</Typography>
        <Typography level="body-sm">{elapsedTime(timestamp)}</Typography>
        <IconButton
          aria-label="bookmark Bahamas Islands"
          variant="plain"
          color="neutral"
          size="sm"
          sx={{ position: 'absolute', top: '0.875rem', right: '0.5rem' }}
        >
        <ThumbUpIcon />{likes.length}
        </IconButton>
      </div>
      <AspectRatio minHeight="120px" maxHeight="200px">
        <img
          src={photoUrl}
          loading="lazy"
          alt={title}
        />
      </AspectRatio>
      <CardContent orientation="horizontal">
        <div>
          <Typography fontSize="lg" fontWeight="lg">
            {truncatedStory(description, maxLength)}
          </Typography>
          
        </div>
        <Button
          variant="solid"
          size="md"
          color="primary"
          aria-label="Explore Bahamas Islands"
          sx={{ ml: 'auto', alignSelf: 'center', fontWeight: 600 }}
          onClick={() => navigate('details/' + id)}
        >
          Több információ
        </Button>
      </CardContent>
    </Card>
  );
}