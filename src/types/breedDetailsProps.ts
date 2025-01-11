export interface BreedDetailsProps {
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