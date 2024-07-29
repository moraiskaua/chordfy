import { Create, SimpleForm, TextInput, required } from 'react-admin';

export const CourseCreate = () => {
  return (
    <Create>
      <SimpleForm>
        <TextInput source="title" label="Title" validate={[required()]} />
        <TextInput source="image" label="Image" validate={[required()]} />
      </SimpleForm>
    </Create>
  );
};
