import { ChangeEventHandler, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth0 } from '@auth0/auth0-react';

import Alert from './Alert';
import { BreedDetailsProps } from '../types/breedDetailsProps';
import { server_calls } from '../api/server';


// Passing in breedDetails from Results.tsx to populate the <Card>
const TWResultsTile = ({ breedDetails }: { breedDetails: BreedDetailsProps }) => {
  const { register, handleSubmit } = useForm({})
  const { user } = useAuth0();
  const [alert, setAlert] = useState(false)

  const openAlert = () => setAlert(true);
  const closeAlert = () => setAlert(false);

  // setting up state for the notes users can write if they wish to save a breed as a favorite
  const [notes, setNotes] = useState<string>('')

  const handleNoteChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (event) => {
    setNotes(event.target.value)
    console.log(notes)
  }
  console.log(breedDetails)

  const onSubmitFavorite = (data: any, event: any) => {
    if (event) event.preventDefault()
    console.log('submitting')
    // console.log(id)
    console.log(data['notes'])
    console.log(breedDetails.breeds[0].reference_image_id)
    console.log(user?.sub)
    server_calls.create_note({
      'notes': notes,
      'image_id': breedDetails.breeds[0].reference_image_id,
      'user_id': user?.sub
    })
    openAlert();
    setNotes('');

  }

  return (
    <div>
      {breedDetails
        ? (
          <form onSubmit={handleSubmit(onSubmitFavorite)}
            className='flex flex-direction-row py-5 justify-center bg-[#EFF2C0]'
          >
            <article className='rounded-xl border-2 border-gray-700 bg-[#EAE2B7] p-4 object-contain'>

              <div className='flex justify-around space-x-2'>
                <img
                  alt='picture of the chosen breed'
                  src={breedDetails.url}
                  // TODO: fix flex of image. card needs to be the same size each time while allowing flex
                  className='flex-2 max-w-md rounded-full object-contain shadow-xl
                          aspect-auto'
                />

                <div className='flex flex-col m-auto justify-center bg-[#FCBF49] border-[#D62828] 
                  border-2 rounded-md 
                  '>
                  <h3 className='flex text-lg font-medium justify-center text-[#D62828]'>
                    Breed Name:
                  </h3>
                  <h3 className='flex text-lg font-medium justify-center text-center text-[#D62828]'>
                    {breedDetails.breeds[0].name}
                  </h3>
                  <div flex-1>
                    <ul className='m-1 flex flex-wrap justify-center'>
                      <li className='p-1 leading-none'>
                        <a href='#' className='text-xs font-medium text-[#003049] text-center'>
                          Adoptable Pets for this Breed
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <ul className='mt-4 p-4 space-y-2 bg-[#FCBF49] border-[#D62828] 
                text-[#003049] border-2 rounded-md'
              >
                <li>
                  <h5>
                    {`Breed Name: ${breedDetails.breeds[0].name}`}
                  </h5>
                </li>
                <li>
                  <h5>
                    {`Breed Group: ${breedDetails.breeds[0].breed_group}`}
                  </h5>
                </li>
                <li>
                  <h5>
                    {`Life Span: ${breedDetails.breeds[0].life_span}`}
                  </h5>
                </li>
                <li>
                  <h5>
                    {`Weight: ${breedDetails.breeds[0].weight.metric} Kg`}
                  </h5>
                </li>
                <li>
                  <h5>
                    {`Height: ${breedDetails.breeds[0].height.metric} cm`}
                  </h5>
                </li>
                <li>
                  <h5>
                    {`Temperament: ${breedDetails.breeds[0].temperament}`}
                  </h5>
                </li>
              </ul>
              <div>
                <label className='mx-2' htmlFor='notesele'>Notes:</label>
              </div>
              <div className='flex justify-center'>
                <textarea
                  className='box-border w-9/12 rounded-md border-2 border-[#D62828] text-black p-2'
                  {...register('notes')}
                  name='note'
                  value={notes}
                  id='notesele'
                  onChange={handleNoteChange}
                  placeholder='Add notes about this breed here if you would like to add it to your favorites.'
                />
              </div>
              <div className='flex justify-end'>
                <button
                  // TODO: add success alert
                  type='submit'
                  id='favorite-button'
                  disabled={notes.length === 0}
                  // TODO: add disabled color scheme
                  className='p-2 m-2 bg-[#FCBF49] hover:bg-[#F77F00] justify-center border-[#D62828] border rounded-md text-[#003049] hover:text-white'
                >
                  Add Favorite
                </button>
              </div>
              {alert ? 
                (
                  <Alert
                    onClose={closeAlert}
                    message='Your favorites list has been updated.'
                  />
                ) : (<></>)
              }
            </article>
            
          </form>

        ) : (null)
      }

    </div>
  )
}

export default TWResultsTile;