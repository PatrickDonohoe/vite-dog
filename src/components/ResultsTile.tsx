// Need to create a reusable tile with fields populated by the 3rd party API. 
// Will include image, breed name, and description of breed.
import { Card, CardActions, CardContent, CardMedia, SelectChangeEvent, Typography } from '@mui/material';
import ConButton from './ConButton';
import Input from './Input';
// import { useTheCatApi } from '../custom-hooks/FetchDogData';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { server_calls } from '../api/server';


// MediaCard from Material UI
// interface TileProps {
//   component: 'img'
//   src: 'string'
// }
interface props {
  name: string;
}

interface ResultsTileProps {
  url: string;
  breeds: [{
    name: string;
    breed_group: string;
    life_span: string;
    height: {metric: string};
    weight: {metric: string};
    temperament: string;
    reference_image_id: string;
  }]
}

interface ResultsTileProps2 {
  url: string;
  breeds: [{
    name: string;
    breed_group: string;
    life_span: string;
    height: {metric: string};
    weight: {metric: string};
    temperament: string;
    reference_image_id: string;
  }]
}

const ResultsTile = (props: ResultsTileProps2) => {
  
  const [notes, setNotes] = useState<string>('')
  const { register, handleSubmit } = useForm({})

  // const disableButton = ({ text, isTrue }) => {

  // }

  const handleNoteChange = (event: SelectChangeEvent<string>) => {
    let value = event.target.value
    setNotes(
      value
    )
  }

  const onSubmit = async (event: any) => {
    if (event)event.preventDefault()
    console.log('submitting')
    const details = await server_calls.create_note(notes)
      setNotes(details)
      console.log(notes)
  }

  return (
    <div className='bg-gray-500'>
      <Card className='items-center mx-auto my-3 pt-2 ' sx={{ maxWidth: 500 }}>
          <Typography gutterBottom variant='h5' component='div'>
            {/* {props.name} */}
          </Typography>
          <CardMedia className='bg-slate-200'
            component='img'
            sx={{ height: 250 }}
            image='https://cdn2.thedogapi.com/images/BFRYBufpm.jpg'
          />
          <CardContent className='bg-slate-200'>
            <Typography gutterBottom variant='h5' component='div'>
              {`Breed Name: Akita`}
            </Typography>
          </CardContent>
          <CardContent className='bg-slate-300'>
            <Typography variant='body2' color='text.secondary'>
              {`Breed Group: Working`}
            </Typography>
            <Typography variant='body2' color='text.secondary'>
              {`Life Span: 10 - 14 years`}
            </Typography>
            <Typography variant='body2' color='text.secondary'>
              {`Weight: 29 - 52 Kg`}
            </Typography>
            <Typography variant='body2' color='text.secondary'>
              {`Height: 61 - 71 cm`}
            </Typography>
            <Typography variant='body2' color='text.secondary'>
              {`Temperament: Docile, Alert, Responsive, Dignified, Composed, Friendly, Receptive, Faithful, Courageous`}
            </Typography>
          </CardContent>
          <div className='bg-slate-200'>
            <label className='px-2' htmlFor='notes'>Notes</label>
            <Input {...register('note_input')} name='note_input' onChange={ handleNoteChange }
              placeholder='Add notes about this breed here if you would like to add it to your favorites.' />
          </div>
          <div className='content-between bg-slate-200'>
            <CardActions>
              {/* TODO: add visible/hidden functionality for Submit button */}
              {/* If add_favorite button == true && 'notes' == true, Submit button is visible */}
              <ConButton type='button' id='favorite'
                className='flex justify-start bg-slate-300 p-2 rounded hover:gl-slate-800 text-white'
              >
                Add Favorite
              </ConButton>
              {/* need a way to submit information to add favorites */}
              <ConButton type='submit' id='submit'
                className='flex justify-start bg-slate-300 p-2 rounded hover:gl-slate-800 text-white'
              >
                Submit
              </ConButton>
            </CardActions>
          </div>
      </Card>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Card className='items-center mx-auto my-3 pt-2 ' sx={{ maxWidth: 500 }}>
            <CardMedia
              className='bg-slate-200'
              component='img'
              sx={{ height: 250 }}
              image={props.url}
            />
            <CardContent className='bg-slate-200'>
              <Typography gutterBottom variant='h5' component='div'>
                {`Breed Name: ${props.breeds[0].name}`}
              </Typography>
            </CardContent>
            <CardContent className='bg-slate-300'>
              <Typography variant='body2' color='text.secondary'>
                {`Breed Group: ${props.breeds[0].breed_group}`}
              </Typography>
              <Typography variant='body2' color='text.secondary'>
                {`Life Span: ${props.breeds[0].life_span}`}
              </Typography>
              <Typography variant='body2' color='text.secondary'>
                {`Weight: ${props.breeds[0].weight.metric} Kg`}
              </Typography>
              <Typography variant='body2' color='text.secondary'>
                {`Height: ${props.breeds[0].height.metric} cm`}
              </Typography>
              <Typography variant='body2' color='text.secondary'>
                {`Temperament: ${props.breeds[0].temperament}`}
              </Typography>
            </CardContent>
            <div>
              <label htmlFor='notes'>Notes</label>
              <Input {...register('note_input')} name='note_input' onChange={ handleNoteChange }
                placeholder='Add notes about this breed here if you would like to add it to your favorites.' />
            </div>
            <CardActions>
              <ConButton type='submit' id='favorite-button'
                className='flex justify-start bg-slate-300 p-2 rounded hover:gl-slate-800 text-white'
              >
                Add Favorite
              </ConButton>
            </CardActions>
          </Card>
      </form>
    </div>
  )
}

export default ResultsTile
